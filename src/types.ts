export type Calendar = {
  day: number
  month: number
  year: number
  isCurrentMonth: boolean
  isCurrentYear: boolean
  isToday: boolean
  events: {
    title: string
    time: string
    invitees: string[]
    color: string
  }[]
}
