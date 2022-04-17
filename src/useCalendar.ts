import { useAtom } from 'jotai'
import { random } from '@ctrl/tinycolor'

import { calendarState } from './store'
import { Calendar, Event } from './types'

export const useCalendar = () => {
  const [calendar, setCalendar] = useAtom(calendarState)

  const addEvent = (event: Event, dayId: string) => {
    const newCalendar = [...calendar]
    const day = newCalendar.find(day => day.id == dayId)

    if (day) {
      event.color = random({ hue: 'random', luminosity: 'random' }).toHexString()
      event.id = crypto.randomUUID()
      day.events.push(event)
      setCalendar(newCalendar)
    }
  }

  const updateEvent = (updatedEvent: Event, dayId: string) => {
    const newCalendar = [...calendar]
    const day = newCalendar.find(day => day.id == dayId)

    if (day) {
      const eventIndex = day.events.findIndex(e => e.id == updatedEvent.id)
      if (eventIndex >= 0) {
        day.events[eventIndex] = updatedEvent
        setCalendar(newCalendar)
      }
    }
  }

  const initialCalendar = () => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
    const firstDayOfMonthIndex = firstDayOfMonth.getDay()
    const daysInMonth = lastDayOfMonth.getDate()
    const daysInPreviousMonth = new Date(currentYear, currentMonth, 0).getDate()
    const daysInPreviousMonthIndex = firstDayOfMonthIndex === 0 ? 6 : firstDayOfMonthIndex - 1
    const calendar: Calendar[] = []

    for (let i = 0; i < 42; i++) {
      if (i < firstDayOfMonthIndex) {
        // previous month
        calendar.push({
          id: crypto.randomUUID(),
          day: daysInPreviousMonth - daysInPreviousMonthIndex + i,
          month: currentMonth - 1,
          year: currentYear,
          isCurrentMonth: false,
          isCurrentYear: true,
          isToday: false,
          events: []
        })
      } else if (i < daysInMonth + firstDayOfMonthIndex) {
        // current month
        calendar.push({
          id: crypto.randomUUID(),
          day: i - firstDayOfMonthIndex + 1,
          month: currentMonth,
          year: currentYear,
          isCurrentMonth: true,
          isCurrentYear: true,
          isToday: new Date().getDate() === i - firstDayOfMonthIndex + 1,
          events: []
        })
      }
    }

    setCalendar(calendar)
  }

  const deleteEvent = (eventId: string, dayId: string): void => {
    const newCalendar = [...calendar]
    const day = newCalendar.find(day => day.id == dayId)

    if (day) {
      const eventIndex = day.events.findIndex(e => e.id == eventId)
      if (eventIndex >= 0) {
        day.events.splice(eventIndex, 1)
        setCalendar(newCalendar)
      }
    }
  }

  const resetTodayStatus = () => {
    const newCalendar = [...calendar]
    const todayDate = new Date().getDate()
    const todayMonth = new Date().getMonth()
    const todayYear = new Date().getFullYear()

    const calendarWithResettedToday = newCalendar.map(cal => {
      if (cal.isToday) {
        cal.isToday = false

        return cal
      }

      if (cal.day === todayDate && cal.month === todayMonth && cal.year === todayYear) {
        cal.isToday = true

        return cal
      }

      return cal
    })

    setCalendar(calendarWithResettedToday)
  }

  return {
    addEvent,
    updateEvent,
    deleteEvent,
    initialCalendar,
    resetTodayStatus,
    setCalendar,
    calendar
  }
}
