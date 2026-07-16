export const NEW_YORK_TIME_ZONE = 'America/New_York'

export type DayName = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

export type BusinessDay = {
  day: DayName
  openMinutes: number
  closeMinutes: number
  openLabel: string
  closeLabel: string
  hoursLabel: string
}

export const businessHours: BusinessDay[] = [
  { day: 'Monday', openMinutes: 600, closeMinutes: 1140, openLabel: '10:00 AM', closeLabel: '7:00 PM', hoursLabel: '10:00 AM to 7:00 PM' },
  { day: 'Tuesday', openMinutes: 600, closeMinutes: 1140, openLabel: '10:00 AM', closeLabel: '7:00 PM', hoursLabel: '10:00 AM to 7:00 PM' },
  { day: 'Wednesday', openMinutes: 600, closeMinutes: 1140, openLabel: '10:00 AM', closeLabel: '7:00 PM', hoursLabel: '10:00 AM to 7:00 PM' },
  { day: 'Thursday', openMinutes: 600, closeMinutes: 1140, openLabel: '10:00 AM', closeLabel: '7:00 PM', hoursLabel: '10:00 AM to 7:00 PM' },
  { day: 'Friday', openMinutes: 600, closeMinutes: 1140, openLabel: '10:00 AM', closeLabel: '7:00 PM', hoursLabel: '10:00 AM to 7:00 PM' },
  { day: 'Saturday', openMinutes: 540, closeMinutes: 1080, openLabel: '9:00 AM', closeLabel: '6:00 PM', hoursLabel: '9:00 AM to 6:00 PM' },
  { day: 'Sunday', openMinutes: 600, closeMinutes: 960, openLabel: '10:00 AM', closeLabel: '4:00 PM', hoursLabel: '10:00 AM to 4:00 PM' },
]

export type NewYorkDateParts = { day: DayName; hour: number; minute: number }
export type BusinessStatus = { isOpen: boolean; currentDay: DayName; message: string }

export function getNewYorkDateParts(date = new Date()): NewYorkDateParts {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: NEW_YORK_TIME_ZONE,
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  })
  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]))
  return { day: parts.weekday as DayName, hour: Number(parts.hour), minute: Number(parts.minute) }
}

export function getNextOpening(currentDay: DayName) {
  const currentIndex = businessHours.findIndex(({ day }) => day === currentDay)
  const nextDay = businessHours[(currentIndex + 1) % businessHours.length]
  return { ...nextDay, dayLabel: currentDay === 'Sunday' ? nextDay.day : 'tomorrow' }
}

export function getBusinessStatus(date = new Date()): BusinessStatus {
  const current = getNewYorkDateParts(date)
  const today = businessHours.find(({ day }) => day === current.day)!
  const currentMinutes = current.hour * 60 + current.minute

  if (currentMinutes < today.openMinutes) {
    return { isOpen: false, currentDay: current.day, message: `Closed · Opens today at ${today.openLabel}` }
  }
  if (currentMinutes < today.closeMinutes) {
    return { isOpen: true, currentDay: current.day, message: `Open now · Closes at ${today.closeLabel}` }
  }
  const next = getNextOpening(current.day)
  return { isOpen: false, currentDay: current.day, message: `Closed · Opens ${next.dayLabel} at ${next.openLabel}` }
}
