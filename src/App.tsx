import { useMemo, useState } from 'react'
import { Box, Text, chakra, useDisclosure } from '@chakra-ui/react'

import InputDialog from './InputDialog'

function App() {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [selectedDay, setSelectedDay] = useState()

  const handleOpenInputModal = day => {
    setSelectedDay(day)
    onOpen()
  }

  const getCurrentMonthCalendar = () => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
    const firstDayOfMonthIndex = firstDayOfMonth.getDay()
    const daysInMonth = lastDayOfMonth.getDate()
    const daysInPreviousMonth = new Date(currentYear, currentMonth, 0).getDate()
    const daysInPreviousMonthIndex = firstDayOfMonthIndex === 0 ? 6 : firstDayOfMonthIndex - 1
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
          isToday: false,
          events: []
        })
      } else if (i < daysInMonth + firstDayOfMonthIndex) {
        // current month
        calendar.push({
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

    return calendar
  }

  const calendar = useMemo(() => getCurrentMonthCalendar(), [])

  return (
    <div className="App">
      <Box
        as="header"
        textAlign="center"
        display="grid"
        gridTemplateColumns="repeat(7, 1fr)"
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

      <Box textAlign="center" display="grid" gridTemplateColumns="repeat(7, 1fr)" px={8} py={6}>
        <InputDialog isOpen={isOpen} onClose={onClose} day={selectedDay} />

        {calendar.map(({ day, isToday, isCurrentMonth }, i) => (
          <chakra.button
            key={day + i}
            minHeight="165px"
            border="1px solid black"
            pos="relative"
            display="flex"
            flexDir="column"
            w="full"
            cursor="pointer"
            onClick={() => handleOpenInputModal(day)}
            bgColor={!isCurrentMonth && '#f0f0f0'}
            color={!isCurrentMonth && 'rgb(165, 164, 164)'}
          >
            <Text alignSelf="flex-end" padding={4} fontWeight="bold" rounded={isToday && 'md'} color={isToday && 'red'}>
              {day}
            </Text>
          </chakra.button>
        ))}
      </Box>
    </div>
  )
}

export default App
