import { useAtom } from 'jotai'

import { calendarState } from './store'
import { Calendar, Event } from './types'

const colorStocks = ['#ef5b5b', '#20a39e', '#ffba49']

export const useCalendar = () => {
  const [calendar, setCalendar] = useAtom(calendarState)

  const addEvent = (event: Event, dayId: string) => {
    const newCalendar = [...calendar]
    const day = newCalendar.find(day => day.id == dayId)

    if (day) {
      event.color = colorStocks[day.events.length ?? 0]
      day.events.push(event)
      setCalendar(newCalendar)
    }
  }

  const handleSetCalendar = (calendar: Calendar[]) => {
    setCalendar(calendar)
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

    handleSetCalendar(calendar)
  }

  return {
    addEvent,
    initialCalendar,
    setCalendar: handleSetCalendar,
    calendar
  }
}
