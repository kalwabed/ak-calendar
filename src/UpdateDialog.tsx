import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { OnChangeValue } from 'react-select'
import Select from 'react-select/creatable'

import { Calendar, Event } from './types'
import { useCalendar } from './useCalendar'

interface UpdateDialogProps {
  isOpen: boolean
  onClose: () => void
  day: Calendar
  event: Event
}

// TODO: handle color change
const UpdateDialog = ({ isOpen, onClose, day, event }: UpdateDialogProps) => {
  if (!event || !day) return null

  const [inviteesEmail, setInviteesEmail] = useState(event.invitees)
  const [name, setName] = useState(event.name)
  const [startTime, setStartTime] = useState(event.time.start)
  const [finishTime, setFinishTime] = useState(event.time.end)
  const { updateEvent } = useCalendar()
  const toast = useToast()

  const options = useMemo(() => {
    return event.invitees.map(email => ({ value: email, label: email }))
  }, [event])

  const handleOnChange = (newValue: OnChangeValue<{ value: string; label: string }, true>) => {
    setInviteesEmail(newValue.map(({ value }) => value))
  }

  const handleOnSubmit = () => {
    console.log('name', name)
    console.log('startTime', startTime)
    console.log('finishTime', finishTime)
    console.log('inviteesEmail', inviteesEmail)
    if (!name || !startTime || !finishTime || inviteesEmail.length === 0) {
      toast({ status: 'error', title: 'Please fill all fields', position: 'top' })
      return
    }

    updateEvent({ ...event, name, time: { start: startTime, end: finishTime }, invitees: inviteesEmail }, day.id)
    onClose()
    toast({ status: 'success', title: 'Event updated', position: 'top' })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <FormControl>
              <FormLabel id="name">Event name</FormLabel>
              <Input
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. 7pm Dinner at Bob's"
              />
            </FormControl>

            <HStack justify="space-between" w="full">
              <FormControl isRequired>
                <FormLabel id="start-time">Start</FormLabel>
                <Input defaultValue={event.time.start} onChange={e => setStartTime(e.target.value)} type="time" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel id="finish-time">Finish</FormLabel>
                <Input defaultValue={event.time.end} onChange={e => setFinishTime(e.target.value)} type="time" />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel htmlFor="emails">Invitees</FormLabel>
              <Select isMulti defaultValue={options} onChange={handleOnChange} id="emails" options={options} />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleOnSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdateDialog
