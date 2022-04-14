import { useMemo, useState } from 'react'
import { Box, Text, chakra, useDisclosure, Button, VStack } from '@chakra-ui/react'

import InputDialog from './InputDialog'
import { Calendar } from './types'

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
    const calendar: Calendar[] = []

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
          events: [
            { color: '#FFC107', title: 'Event 1', invitees: ['john@kane.com'], time: '10:00 AM' },
            { color: '#FFC107', title: 'Event 2', invitees: ['john@kane.com'], time: '10:00 AM' },
            { color: '#FFC107', title: 'Event 3', invitees: ['john@kane.com'], time: '10:00 AM' }
          ]
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

      <Box textAlign="center" display="grid" gridTemplateColumns="repeat(7, minmax(250px, 1fr))" px={8} py={6}>
        <InputDialog isOpen={isOpen} onClose={onClose} day={selectedDay} />

        {calendar.map((cal, i) => (
          <Box key={cal.day + i} minHeight="165px" pos="relative" border="1px solid black">
            <chakra.button
              display="flex"
              flexDir="column"
              pos="absolute"
              inset={0}
              w="full"
              onClick={() => handleOpenInputModal(cal.day)}
              bgColor={!cal.isCurrentMonth && '#f0f0f0'}
              color={!cal.isCurrentMonth && 'rgb(165, 164, 164)'}
            >
              <Text
                alignSelf="flex-end"
                padding={4}
                fontWeight="bold"
                rounded={cal.isToday && 'md'}
                color={cal.isToday && 'red'}
              >
                {cal.day}
              </Text>
            </chakra.button>
            <VStack mt={14} align="center" justify="center" px={2}>
              {cal.events.map(ev => (
                <Button
                  isFullWidth
                  key={ev.title}
                  variant="ghost"
                  size="xs"
                  onClick={() => alert('ye')}
                  justifyContent="start"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  leftIcon={<chakra.span bgColor="red" rounded="full" p={1} />}
                >
                  awakw{ev.title} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, similique.
                </Button>
              ))}
            </VStack>
          </Box>
        ))}
      </Box>
    </div>
  )
}

export default App
