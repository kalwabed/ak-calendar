import { useEffect, useState } from 'react'
import { Box, Heading, useDisclosure, useToast } from '@chakra-ui/react'

import InputDialog from './InputDialog'
import { Calendar, Event } from './types'
import DateContent from './DateContent'
import { useCalendar } from './useCalendar'
import UpdateDialog from './UpdateDialog'

function App() {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { isOpen: updateIsOpen, onClose: updateOnClose, onOpen: updateOnOpen } = useDisclosure()
  const [selectedDay, setSelectedDay] = useState<Calendar>()
  const [selectedEvent, setSelectedEvent] = useState<Event>()
  const { calendar, initialCalendar } = useCalendar()
  const toast = useToast()

  const handleOpenInputModal = (day: Calendar) => {
    if (day.events.length === 3) {
      toast({
        status: 'warning',
        position: 'top',
        title: 'You can only add 3 events per day',
        duration: 3000
      })
      return
    }
    setSelectedDay(day)
    onOpen()
  }

  const handleOpenUpdateModal = (day: Calendar, event: Event) => {
    setSelectedDay(day)
    setSelectedEvent(event)
    updateOnOpen()
  }

  useEffect(() => {
    if (calendar.length === 0) {
      initialCalendar()
    }
  }, [])

  return (
    <Box p={8}>
      <Heading>{new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())}</Heading>
      <Box
        as="header"
        textAlign="center"
        display="grid"
        overflow="hidden"
        gridTemplateColumns={['repeat(7, minmax(50px, 1fr))', 'repeat(7, minmax(13.7vw, 1fr))']}
        fontWeight="bold"
        mt={4}
      >
        <p>Monday</p>
        <p>Tuesday</p>
        <p>Wednesday</p>
        <p>Thursday</p>
        <p>Friday</p>
        <p>Saturday</p>
        <p>Sunday</p>
      </Box>

      <InputDialog isOpen={isOpen} onClose={onClose} day={selectedDay} />
      <UpdateDialog event={selectedEvent} day={selectedDay} isOpen={updateIsOpen} onClose={updateOnClose} />
      <Box
        textAlign="center"
        display="grid"
        overflow="auto"
        gridTemplateColumns={['repeat(7, minmax(200px, 1fr))', 'repeat(7, minmax(13.7vw, 1fr))']}
      >
        {calendar.map((cal, i) => (
          <DateContent
            key={cal.id}
            calendar={cal}
            handleOpenInputModal={handleOpenInputModal}
            handleOpenUpdateModal={handleOpenUpdateModal}
          />
        ))}
      </Box>
    </Box>
  )
}

export default App
