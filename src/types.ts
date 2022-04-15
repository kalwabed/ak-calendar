export type Calendar = {
  id: string
  day: number
  month: number
  year: number
  isCurrentMonth: boolean
  isCurrentYear: boolean
  isToday: boolean
  events: Event[]
}

export type Event = {
  name: string
  time: {
    start: string
    end: string
  }
  invitees: string[]
  color?: string
  id?: string
}
