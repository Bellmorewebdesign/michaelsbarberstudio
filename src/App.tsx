import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowRight, Clock3, Instagram, MapPin, Menu, Phone, Scissors, Star, X } from 'lucide-react'

import logo from '../ChatGPT Image Jul 16, 2026, 02_03_15 PM (1).png'
import exteriorDay from '../Screenshot 2026-07-16 134440.png'
import exteriorNight from '../Screenshot 2026-07-16 134453.png'
import stations from '../Screenshot 2026-07-16 134506.png'
import interiorLong from '../Screenshot 2026-07-16 134529.png'
import waitingArea from '../Screenshot 2026-07-16 134548.png'
import partition from '../Screenshot 2026-07-16 134556.png'
import adultCut from '../Screenshot 2026-07-16 134620.png'
import kidsCollage from '../Screenshot 2026-07-16 134640.png'
import kidFade from '../Screenshot 2026-07-16 135634.png'
import portraitCut from '../Screenshot 2026-07-16 135644.png'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Replace when Michael's direct Booksy profile URL is confirmed.
const BOOKSY_URL = 'https://booksy.com/'
// Replace if the studio's exact Instagram profile URL differs.
const INSTAGRAM_URL = 'https://www.instagram.com/michaelsbarberstudio/'
const PHONE_HREF = 'tel:+16319485475'

const frames = [
  { image: exteriorDay, eyebrow: '80 Carleton Avenue', title: 'Step inside.', body: 'A modern barber studio in the heart of East Islip.' },
  { image: interiorLong, eyebrow: 'The Studio', title: 'Made for the details.', body: 'A considered space. A focused experience.' },
  { image: stations, eyebrow: 'The Standard', title: 'Clean. Precise. Upscale.', body: 'Every station set. Every detail intentional.' },
  { image: partition, eyebrow: 'The Atmosphere', title: 'Sharp work. Easy energy.', body: 'Premium, without the pretense.' },
]

const specialties = [
  ['01', 'Skin Fades', 'Clean transitions. Sharp finish.'],
  ['02', 'Hot Towel Shaves', 'A timeless ritual, done with care.'],
  ['03', 'Tapers', 'Refined detail with a natural finish.'],
  ['04', 'Shape Ups', 'Crisp lines. Precise edges.'],
]

const reviews = [
  'High quality experience.',
  'Best Barbershop around — clean, great atmosphere, cuts are amazing.',
  'I took my seven year old and Michael was patient and so kind.',
  'Nice friendly vibe, brand new equipment and extremely clean.',
]

const hours = [
  ['Monday', '10 AM – 7 PM'], ['Tuesday', '10 AM – 7 PM'], ['Wednesday', '10 AM – 7 PM'],
  ['Thursday', '10 AM – 7 PM'], ['Friday', '10 AM – 7 PM'], ['Saturday', '9 AM – 6 PM'], ['Sunday', '10 AM – 4 PM'],
]

function Button({ href, children, light = false, className = '' }: { href: string; children: React.ReactNode; light?: boolean; className?: string }) {
  return <a className={`button ${light ? 'button-light' : ''} ${className}`} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"><span>{children}</span><ArrowRight size={16} /></a>
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    gsap.from('.hero-copy > *', { y: 34, opacity: 0, duration: 1, stagger: .12, ease: 'power3.out' })
    gsap.from('.hero-image', { scale: 1.1, duration: 1.6, ease: 'power2.out' })
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
      gsap.from(el, { y: 50, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%', once: true } })
    })

    if (window.matchMedia('(min-width: 768px)').matches) {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: '.experience', start: 'top top', end: '+=3600', scrub: 1, pin: true, anticipatePin: 1 },
      })
      frames.forEach((_, index) => {
        if (index === 0) return
        timeline
          .to(`.frame-${index - 1}`, { opacity: 0, scale: 1.08, duration: 1 }, index * 1.15)
          .fromTo(`.frame-${index}`, { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: 1 }, index * 1.15)
          .fromTo(`.frame-copy-${index}`, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: .65 }, index * 1.15 + .2)
      })
      gsap.to('.experience-progress', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.experience', start: 'top top', end: '+=3600', scrub: true } })
    }
  }, { scope: root })

  return (
    <div ref={root}>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Michael's Barber Studio home"><img src={logo} alt="" /><span>Michael’s<br />Barber Studio</span></a>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Main navigation">
          <a href="#specialties" onClick={() => setMenuOpen(false)}>Specialties</a><a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a><a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a><a href="#visit" onClick={() => setMenuOpen(false)}>Visit</a>
          <Button href={BOOKSY_URL}>Book on Booksy</Button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="hero" id="top">
          <img className="hero-image" src={interiorLong} alt="The modern interior of Michael's Barber Studio" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="eyebrow">East Islip’s newest upscale barber studio</p>
            <h1>Precision lives<br /><em>in the details.</em></h1>
            <p className="hero-intro">Skin fades, hot towel shaves, tapers, and sharp shape ups in a clean, modern studio.</p>
            <div className="hero-actions"><Button href={BOOKSY_URL} light>Book on Booksy</Button><a href={PHONE_HREF} className="text-link"><Phone size={15} /> Call the studio</a></div>
          </div>
          <a href="#experience" className="scroll-cue"><span>Enter the studio</span><ArrowDown size={18} /></a>
          <div className="hero-mark"><img src={logo} alt="Michael's Barber Studio emblem" /></div>
        </section>

        <section className="experience" id="experience" aria-label="The studio experience">
          <div className="experience-progress" />
          {frames.map((frame, i) => <article className={`experience-frame frame-${i}`} key={frame.title} style={{ zIndex: i + 1 }}>
            <img src={frame.image} alt={i === 0 ? "Michael's Barber Studio storefront" : "Inside Michael's Barber Studio"} />
            <div className="frame-shade" />
            <div className={`frame-copy frame-copy-${i}`}><p className="eyebrow">{frame.eyebrow}</p><h2>{frame.title}</h2><p>{frame.body}</p></div>
            <span className="frame-number">0{i + 1} / 04</span>
          </article>)}
        </section>

        <section className="specialties section" id="specialties">
          <div className="section-heading" data-reveal><p className="eyebrow dark">The work</p><h2>Signature<br /><em>specialties.</em></h2><p>Focused services. Thoughtful execution. A clean finish every time.</p></div>
          <div className="specialty-list">
            {specialties.map(([num, title, body]) => <div className="specialty-row" key={title} data-reveal><span>{num}</span><h3>{title}</h3><p>{body}</p><ArrowRight /></div>)}
          </div>
        </section>

        <section className="gallery section-dark" id="gallery">
          <div className="gallery-heading" data-reveal><p className="eyebrow">Selected work</p><h2>The cut speaks<br /><em>for itself.</em></h2></div>
          <div className="gallery-grid">
            <figure className="gallery-a" data-reveal><img src={adultCut} alt="Precision adult haircut side profile" loading="lazy" /><figcaption>Clean transition</figcaption></figure>
            <figure className="gallery-b" data-reveal><img src={kidsCollage} alt="Two views of a child's finished fade haircut" loading="lazy" /><figcaption>Patient. Kind. Sharp.</figcaption></figure>
            <figure className="gallery-c" data-reveal><img src={portraitCut} alt="Finished shape up inside the studio" loading="lazy" /><figcaption>Defined finish</figcaption></figure>
            <figure className="gallery-d" data-reveal><img src={kidFade} alt="Rear view of a child's skin fade" loading="lazy" /><figcaption>Details at every angle</figcaption></figure>
          </div>
        </section>

        <section className="reviews section" id="reviews">
          <div className="rating-block" data-reveal><div><Star fill="currentColor" /><strong>5.0</strong></div><p>From 5 Google reviews</p></div>
          <div className="reviews-heading" data-reveal><p className="eyebrow dark">What clients notice</p><h2>Good work<br /><em>gets remembered.</em></h2></div>
          <div className="review-grid">{reviews.map((review, i) => <blockquote key={review} data-reveal><span>“</span><p>{review}</p><footer>Verified Google review <small>0{i + 1}</small></footer></blockquote>)}</div>
        </section>

        <section className="atmosphere section-dark">
          <div className="atmosphere-image" data-reveal><img src={waitingArea} alt="Clean waiting area inside Michael's Barber Studio" loading="lazy" /><div className="image-note">The studio<br /><span>East Islip, NY</span></div></div>
          <div className="atmosphere-copy" data-reveal><p className="eyebrow">More than the cut</p><h2>A studio built<br /><em>to feel right.</em></h2><p>Clean surroundings, a friendly atmosphere, and thoughtful attention to detail—whether it’s your first visit or your kid’s next cut.</p><div className="attribute-grid"><span>Open 7 days</span><span>Good for kids</span><span>Wheelchair accessible parking</span><span>Credit cards accepted</span></div></div>
        </section>

        <section className="booking">
          <img src={stations} alt="Barber stations at Michael's Barber Studio" loading="lazy" />
          <div className="booking-shade" />
          <div className="booking-copy" data-reveal><p className="eyebrow">Your chair is waiting</p><h2>Look sharp.<br /><em>Book your time.</em></h2><p>Reserve online through Booksy or call the studio.</p><div><Button href={BOOKSY_URL} light>Book on Booksy</Button><Button href={PHONE_HREF}>Call (631) 948-5475</Button></div></div>
        </section>

        <section className="visit section" id="visit">
          <div className="visit-info" data-reveal><p className="eyebrow dark">Visit the studio</p><h2>Right here in<br /><em>East Islip.</em></h2><div className="contact-line"><MapPin /><p>80 Carleton Ave<br />East Islip, NY 11730</p></div><div className="contact-line"><Phone /><a href={PHONE_HREF}>(631) 948-5475</a></div><div className="contact-line"><Instagram /><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@michaelsbarberstudio</a></div><a className="directions-link" href="https://maps.google.com/?q=80+Carleton+Ave+East+Islip+NY+11730" target="_blank" rel="noreferrer">Get directions <ArrowRight size={16} /></a></div>
          <div className="visit-image" data-reveal><img src={exteriorNight} alt="Michael's Barber Studio storefront at night" loading="lazy" /><span>Walk-ins welcome · Parking in rear<br /><small>Observed storefront details</small></span></div>
          <div className="hours" data-reveal><div className="hours-title"><Clock3 /><h3>Studio hours</h3></div>{hours.map(([day, time]) => <div className="hours-row" key={day}><span>{day}</span><strong>{time}</strong></div>)}</div>
        </section>
      </main>

      <footer className="footer"><div className="footer-brand"><img src={logo} alt="Michael's Barber Studio" /><h2>Michael’s<br />Barber Studio</h2></div><div><p>80 Carleton Ave<br />East Islip, NY 11730</p><a href={PHONE_HREF}>(631) 948-5475</a></div><div className="footer-links"><a href={BOOKSY_URL}>Booksy</a><a href={INSTAGRAM_URL}>Instagram</a><a href="#top">Back to top ↑</a></div><small>Homepage mockup by Bellmore Web Design</small></footer>
      <a className="mobile-book" href={BOOKSY_URL} target="_blank" rel="noreferrer"><Scissors size={17} />Book on Booksy</a>
    </div>
  )
}

export default App
