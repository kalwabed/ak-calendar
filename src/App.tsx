import { useEffect, useState } from 'react'
import { Box, useDisclosure } from '@chakra-ui/react'

import InputDialog from './InputDialog'
import { Calendar } from './types'
import DateContent from './DateContent'
import { useCalendar } from './useCalendar'

function App() {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [selectedDay, setSelectedDay] = useState<Calendar>()
  const { calendar, initialCalendar } = useCalendar()

  const handleOpenInputModal = (day: Calendar) => {
    setSelectedDay(day)
    onOpen()
  }

  useEffect(() => {
    if (calendar.length === 0) {
      initialCalendar()
    }
  }, [])

  return (
    <div className="App">
      <Box
        as="header"
        textAlign="center"
        display="grid"
        gridTemplateColumns="repeat(7, minmax(250px, 1fr))"
        padding={8}
        pb={0}
        fontWeight="medium"
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
      <Box textAlign="center" display="grid" gridTemplateColumns="repeat(7, minmax(250px, 1fr))" px={8} py={6}>
        {calendar.map((cal, i) => (
          <DateContent key={cal.id} calendar={cal} handleOpenModal={handleOpenInputModal} />
        ))}
      </Box>
    </div>
  )
}

export default App
