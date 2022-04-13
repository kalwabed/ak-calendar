import { useMemo } from 'react'
import './App.css'

function App() {
  const getCurrentMonthCalendar = () => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
    const firstDayOfMonthIndex = firstDayOfMonth.getDay()
    const lastDayOfMonthIndex = lastDayOfMonth.getDay()
    const daysInMonth = lastDayOfMonth.getDate()
    const daysInPreviousMonth = new Date(currentYear, currentMonth, 0).getDate()
    const daysInNextMonth = new Date(currentYear, currentMonth + 2, 0).getDate()
    const daysInPreviousMonthIndex = firstDayOfMonthIndex === 0 ? 6 : firstDayOfMonthIndex - 1
    const daysInNextMonthIndex = lastDayOfMonthIndex === 0 ? 6 : lastDayOfMonthIndex - 1
    const calendar = []

    for (let i = 0; i < 42; i++) {
      if (i < firstDayOfMonthIndex) {
        // previous month
        calendar.push({
          day: daysInPreviousMonth - daysInPreviousMonthIndex + i,
          month: currentMonth - 1,
          year: currentYear,
          isCurrentMonth: false,
          isCurrentYear: true,
          isToday: false
        })
      } else if (i < daysInMonth + firstDayOfMonthIndex) {
        // current month
        calendar.push({
          day: i - firstDayOfMonthIndex + 1,
          month: currentMonth,
          year: currentYear,
          isCurrentMonth: true,
          isCurrentYear: true,
          isToday: new Date().getDate() === i - firstDayOfMonthIndex + 1
        })
      }
    }

    console.log(calendar)
    return calendar
  }

  const calendar = useMemo(() => getCurrentMonthCalendar(), [])

  return (
    <div className="App">
      <header className="header-grid">
        <p>Monday</p>
        <p>Tuesday</p>
        <p>Wednesday</p>
        <p>Thursday</p>
        <p>Friday</p>
        <p>Saturday</p>
        <p>Sunday</p>
      </header>

      <div className="date-grid">
        {calendar.map(({ day, isToday, isCurrentMonth }, i) => (
          <div key={day + i} className={`day ${!isCurrentMonth && 'previous-month'}`}>
            <p className={isToday ? 'today' : ''}>{day}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
