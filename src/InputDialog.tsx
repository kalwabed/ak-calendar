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
import { useState } from 'react'
import { OnChangeValue } from 'react-select'
import Select from 'react-select/creatable'

import { Calendar } from './types'
import { useCalendar } from './useCalendar'

interface InputDialogProps {
  isOpen: boolean
  onClose: () => void
  day: Calendar
}

const InputDialog = ({ isOpen, onClose, day }: InputDialogProps) => {
  const [inviteesEmail, setInviteesEmail] = useState([])
  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [finishTime, setFinishTime] = useState('')
  const { addEvent } = useCalendar()
  const toast = useToast()

  const options = [
    { value: 'john@example.com', label: 'john@example.com' },
    { value: 'doe@example.com', label: 'doe@example.com' }
  ]

  const handleOnChange = (newValue: OnChangeValue<{ value: string; label: string }, true>) => {
    setInviteesEmail(newValue.map(({ value }) => value))
  }

  const handleOnSubmit = () => {
    if (!name || !startTime || !finishTime || inviteesEmail.length === 0) {
      toast({ status: 'error', title: 'Please fill all fields', position: 'top' })
      return
    }

    addEvent({ name, time: { start: startTime, end: finishTime }, invitees: inviteesEmail }, day.id)
    onClose()
    toast({ status: 'success', title: 'Event added', position: 'top' })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <FormControl isRequired>
              <FormLabel id="name">Event name</FormLabel>
              <Input autoFocus onChange={e => setName(e.target.value)} placeholder="e.g. 7pm Dinner at Bob's" />
            </FormControl>

            <HStack justify="space-between" w="full">
              <FormControl isRequired>
                <FormLabel id="start-time">Start</FormLabel>
                <Input onChange={e => setStartTime(e.target.value)} type="time" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel id="finish-time">Finish</FormLabel>
                <Input onChange={e => setFinishTime(e.target.value)} type="time" />
              </FormControl>
            </HStack>

            <FormControl isRequired>
              <FormLabel htmlFor="emails">Invitees</FormLabel>
              <Select isMulti onChange={handleOnChange} id="emails" options={options} />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleOnSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default InputDialog
