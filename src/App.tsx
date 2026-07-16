import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, ArrowRight, Instagram, MapPin, Menu, Phone, Scissors, Star, X } from 'lucide-react'

import logo from '../ChatGPT Image Jul 16, 2026, 02_03_15 PM (1).png'
import exteriorNight from '../Screenshot 2026-07-16 134453.png'
import stations from '../Screenshot 2026-07-16 134506.png'
import interiorLong from '../Screenshot 2026-07-16 134529.png'
import waitingArea from '../Screenshot 2026-07-16 134548.png'
import adultCut from '../Screenshot 2026-07-16 134620.png'
import kidsCollage from '../Screenshot 2026-07-16 134640.png'
import { businessHours, getBusinessStatus } from './businessHours'

gsap.registerPlugin(ScrollTrigger)

export const BOOKSY_URL = 'http://booksy.com/en-us/1670709_michaels-barber-studio_barber-shop_30579_east-islip?do=invite&_branch_match_id=1606373804674467232&utm_medium=social_post_creator&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs/VN/dwdc2qDC4NjEqyrytKTUstKsrMS49PKsovL04tsnXOKMrPTQUAqt5/wTwAAAA='
const INSTAGRAM_URL = 'https://www.instagram.com/michaelsbarberstudio/'
const PHONE_URL = 'tel:+16319485475'

const services = [
  ['Haircut', '45 min', '$30'],
  ['Beard', '15 min', '$15'],
  ['Haircut & Beard', '45 min', '$40'],
  ['Kid’s Haircut', '30 min', '$25'],
  ['Head Shave', '30 min', '$30'],
  ['Eyebrow Shaping', '10 min', '$10'],
  ['Head Shave & Beard Trim', '45 min', '$40'],
  ['Full Service', '1 hr', '$50'],
  ['Hot Towel Shave', '30 min', '$25'],
  ['Shape Up', '30 min', '$20'],
]

const reviews = [
  { quote: 'High quality experience.', name: 'Google customer', platform: 'Google Review' },
  { quote: 'Best Barbershop around. Clean, great atmosphere, cuts are amazing.', name: 'Google customer', platform: 'Google Review' },
  { quote: 'I took my seven year old and Michael was patient and so kind.', name: 'Jaclyn Tobin', platform: 'Google Review' },
]

function BookLink({ children = 'Book on Booksy', className = '' }: { children?: React.ReactNode; className?: string }) {
  return <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer" className={`button ${className}`}><span>{children}</span><ArrowRight size={15} /></a>
}

function BusinessStatusDisplay() {
  const [status, setStatus] = useState(() => getBusinessStatus())

  useEffect(() => {
    const interval = window.setInterval(() => setStatus(getBusinessStatus()), 60_000)
    return () => window.clearInterval(interval)
  }, [])

  return <div className={`business-status ${status.isOpen ? 'is-open' : 'is-closed'}`} aria-live="polite">
    <span className="status-dot" aria-hidden="true" />
    <span>{status.message}</span>
  </div>
}

function BusinessHours() {
  const [status, setStatus] = useState(() => getBusinessStatus())

  useEffect(() => {
    const interval = window.setInterval(() => setStatus(getBusinessStatus()), 60_000)
    return () => window.clearInterval(interval)
  }, [])

  return <div className="hours">
    <p className="hours-label">Studio hours</p>
    {businessHours.map(({ day, hoursLabel }) => {
      const isToday = day === status.currentDay
      return <div className={isToday ? 'hours-row is-today' : 'hours-row'} key={day}>
        <span>{day}</span><strong>{hoursLabel}</strong>{isToday && <small>Today</small>}
      </div>
    })}
  </div>
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(0)

  useLayoutEffect(() => {
    if (!root.current) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const media = gsap.matchMedia()
    const refresh = () => ScrollTrigger.refresh()
    const context = gsap.context(() => {
      if (reducedMotion) return

      gsap.from('.hero-content > *', { opacity: 0, y: 24, duration: .75, stagger: .08, ease: 'power3.out' })
      gsap.from('.hero-visual', { opacity: 0, x: 30, duration: .9, ease: 'power3.out' })

      media.add('(min-width: 900px)', () => {
        const transition = gsap.timeline({
          scrollTrigger: {
            trigger: '.signature',
            start: 'top top',
            end: '+=850',
            scrub: .65,
            pin: true,
            anticipatePin: 1,
          },
        })
        transition
          .to('.signature-logo', { scale: .7, y: -8, duration: .4, ease: 'power2.inOut' })
          .to('.signature-line', { scaleX: 1, duration: .6, ease: 'power2.inOut' }, 0)
          .to('.signature-panel-left', { xPercent: -103, duration: .8, ease: 'power2.inOut' }, .25)
          .to('.signature-panel-right', { xPercent: 103, duration: .8, ease: 'power2.inOut' }, .25)
          .fromTo('.signature-reveal', { opacity: .65, y: 18 }, { opacity: 1, y: 0, duration: .45 }, .65)
      })

      media.add('(max-width: 899px)', () => {
        const transition = gsap.timeline({
          scrollTrigger: {
            trigger: '.signature',
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * 1.5)}`,
            scrub: .5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        transition
          .fromTo('.signature-line', { scaleX: 0 }, { scaleX: 1, duration: .52, ease: 'power2.inOut' }, 0)
          .to('.signature-logo', { scale: .78, y: -10, duration: .42, ease: 'power2.inOut' }, 0)
          .to('.signature-panel-left', { yPercent: -103, duration: .78, ease: 'power2.inOut' }, .22)
          .to('.signature-panel-right', { yPercent: 103, duration: .78, ease: 'power2.inOut' }, .22)
          .fromTo('.signature-reveal', { opacity: .65, y: 14 }, { opacity: 1, y: 0, duration: .4 }, .58)

        return () => transition.scrollTrigger?.kill()
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 22,
          duration: .7,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray<HTMLElement>('[data-image]').forEach((element) => {
        gsap.fromTo(element, { y: 14, scale: .985 }, {
          y: 0, scale: 1, duration: .8, ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })

      document.fonts.ready.then(refresh)
      const images = Array.from(root.current?.querySelectorAll('img') ?? [])
      images.forEach((image) => { if (!image.complete) image.addEventListener('load', refresh, { once: true }) })
      requestAnimationFrame(refresh)
    }, root)

    window.addEventListener('orientationchange', refresh)

    return () => {
      window.removeEventListener('orientationchange', refresh)
      media.revert()
      context.revert()
    }
  }, [])

  const review = reviews[reviewIndex]
  const moveReview = (direction: number) => setReviewIndex((reviewIndex + direction + reviews.length) % reviews.length)

  return <div ref={root}>
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Michael’s Barber Studio home"><img src={logo} alt="" /><span>Michael’s<br />Barber Studio</span></a>
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#studio" onClick={() => setMenuOpen(false)}>Studio</a>
        <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
        <a href="#visit" onClick={() => setMenuOpen(false)}>Visit</a>
      </nav>
      <BookLink className="header-book" />
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section className="hero" id="top">
        <div className="container grid-12 hero-grid">
          <div className="hero-content">
            <p className="eyebrow">East Islip, New York</p>
            <h1>Precision,<br /><em>Refined.</em></h1>
            <p className="hero-copy">East Islip’s newest upscale barber studio, specializing in skin fades, hot towel shaves, tapers, and sharp shape ups.</p>
            <BusinessStatusDisplay />
            <div className="hero-actions"><BookLink /><a className="text-link" href={PHONE_URL}><Phone size={15} />Call the Studio</a></div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo"><img src={interiorLong} alt="Interior of Michael’s Barber Studio" /></div>
            <img className="hero-logo" src={logo} alt="Michael’s Barber Studio emblem" />
            <span className="hero-index">EST. 2025 · 80C</span>
          </div>
        </div>
      </section>

      <section className="signature" aria-label="Transition into services">
        <div className="signature-reveal">
          <div className="signature-label signature-label-left"><strong>01</strong><span>Services</span></div>
          <div className="signature-label signature-label-right"><span>Pricing</span><ArrowRight /></div>
        </div>
        <div className="signature-panel signature-panel-left"><img src={stations} alt="Barber stations" /></div>
        <div className="signature-panel signature-panel-right"><img src={stations} alt="" /></div>
        <img className="signature-logo" src={logo} alt="Michael’s Barber Studio" />
        <div className="signature-line" />
      </section>

      <section className="services section" id="services">
        <div className="container grid-12">
          <aside className="services-intro" data-reveal>
            <p className="section-number">02 / Services</p>
            <h2>Choose your<br /><em>next cut.</em></h2>
            <p>Book your next appointment through Booksy.</p>
            <BookLink />
          </aside>
          <div className="service-list">
            {services.map(([name, duration, price], index) => <div className="service-row" key={name} data-reveal>
              <span className="service-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{name}</h3>
              <small>{duration}</small>
              <strong>{price}</strong>
              <a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer">Book <ArrowRight size={14} /></a>
            </div>)}
          </div>
        </div>
      </section>

      <section className="studio section-dark" id="studio">
        <div className="container">
          <div className="studio-heading" data-reveal><div><p className="section-number">03 / The Studio</p><h2>Clean space.<br /><em>Sharp work.</em></h2></div><p>A modern East Islip studio shaped around cleanliness, a friendly atmosphere, and attention to detail.</p></div>
          <div className="editorial-grid">
            <figure className="studio-main" data-image><img src={stations} alt="Barber chairs and work stations inside Michael’s Barber Studio" loading="lazy" /><figcaption>The studio · East Islip</figcaption></figure>
            <figure className="studio-wait" data-image><img src={waitingArea} alt="Waiting area inside the studio" loading="lazy" /><figcaption>Clean, comfortable atmosphere</figcaption></figure>
            <figure className="studio-cut" data-image><img src={adultCut} alt="Finished adult fade haircut" loading="lazy" /><figcaption>Precision finish</figcaption></figure>
            <figure className="studio-kids" data-image><img src={kidsCollage} alt="Two views of a child’s finished haircut" loading="lazy" /><figcaption>Patient and kind with kids</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="reviews section" id="reviews">
        <div className="container grid-12 review-layout">
          <div className="review-rating" data-reveal><p className="section-number">04 / Reviews</p><div><Star fill="currentColor" /><strong>5.0</strong></div><p>Google · 5 reviews</p><p>Booksy · 7 reviews</p></div>
          <div className="review-quote" data-reveal>
            <p className="review-platform">{review.platform}</p>
            <blockquote>“{review.quote}”</blockquote>
            <div className="review-footer"><span>{review.name}</span><div><button onClick={() => moveReview(-1)} aria-label="Previous review"><ArrowLeft /></button><span>{reviewIndex + 1} / {reviews.length}</span><button onClick={() => moveReview(1)} aria-label="Next review"><ArrowRight /></button></div></div>
          </div>
        </div>
      </section>

      <section className="visit section-dark" id="visit">
        <div className="container grid-12 visit-grid">
          <div className="visit-lead" data-reveal><p className="section-number">05 / Book & Visit</p><h2>Your next cut<br /><em>starts here.</em></h2><div className="visit-actions"><BookLink /><a className="button button-outline" href={PHONE_URL}><span>Call the Studio</span><Phone size={15} /></a></div><div className="exterior-frame" data-image><img src={exteriorNight} alt="Michael’s Barber Studio exterior at night" loading="lazy" /></div></div>
          <div className="visit-details" data-reveal>
            <h3>Michael’s Barber Studio</h3>
            <div className="detail-row"><MapPin /><p>80 Carleton Ave<br />East Islip, NY 11730</p></div>
            <div className="detail-row"><Phone /><a href={PHONE_URL}>(631) 948-5475</a></div>
            <div className="detail-row"><Instagram /><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@michaelsbarberstudio</a></div>
            <BusinessHours />
          </div>
        </div>
      </section>
    </main>

    <footer className="footer"><div className="container footer-grid"><a className="footer-brand" href="#top"><img src={logo} alt="" /><span>Michael’s Barber Studio</span></a><p>80 Carleton Ave<br />East Islip, NY 11730</p><div><a href={BOOKSY_URL} target="_blank" rel="noopener noreferrer">Booksy</a><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a><a href={PHONE_URL}>Call</a></div><small>Homepage mockup by Bellmore Web Design</small></div></footer>
    <a className="mobile-book" href={BOOKSY_URL} target="_blank" rel="noopener noreferrer"><Scissors size={17} />Book on Booksy</a>
  </div>
}

export default App
