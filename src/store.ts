import { atomWithStorage } from 'jotai/utils'

import { Calendar } from './types'

export const calendarState = atomWithStorage<Calendar[]>('calendar', [])
