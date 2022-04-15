import { Box, Text, chakra, Button, VStack } from '@chakra-ui/react'

import { Calendar, Event } from './types'

const DateContent = ({
  calendar,
  handleOpenInputModal,
  handleOpenUpdateModal
}: {
  calendar: Calendar
  handleOpenInputModal: (cal: Calendar) => void
  handleOpenUpdateModal: (cal: Calendar, event: Event) => void
}) => {
  const { day, isCurrentMonth, isToday, events } = calendar

  return (
    <Box minHeight="165px" pos="relative" border="1px solid black">
      <chakra.button
        display="flex"
        flexDir="column"
        pos="absolute"
        inset={0}
        w="full"
        onClick={() => handleOpenInputModal(calendar)}
        bgColor={!isCurrentMonth && '#f0f0f0'}
        color={!isCurrentMonth && 'rgb(165, 164, 164)'}
      >
        <Text
          alignSelf="flex-end"
          p={2}
          px={2.5}
          m={1}
          fontWeight="bold"
          rounded={isToday && 'full'}
          color={isToday && 'white'}
          w="fit-content"
          bgColor={isToday && 'blue.500'}
        >
          {day}
        </Text>
      </chakra.button>
      <VStack mt={14} align="center" justify="center" px={2}>
        {events?.map(ev => (
          <Button
            isFullWidth
            key={ev.name}
            variant="ghost"
            size="xs"
            onClick={() => handleOpenUpdateModal(calendar, ev)}
            justifyContent="start"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            leftIcon={<chakra.span bgColor={ev.color} rounded="full" p={1} />}
          >
            <Text as="span" fontWeight="normal" mr={1}>
              {ev.time.start}
            </Text>
            {ev.name}
          </Button>
        ))}
      </VStack>
    </Box>
  )
}

export default DateContent
