import {
  Button,
  FormControl,
  FormLabel,
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
  const [time, setTime] = useState('')
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
    addEvent({ name, time, invitees: inviteesEmail }, day.id)
    onClose()
    toast({ status: 'success', title: 'Event added' })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add new event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <FormControl>
              <FormLabel id="name">Event name</FormLabel>
              <Input autoFocus onChange={e => setName(e.target.value)} placeholder="e.g. 7pm Dinner at Bob's" />
            </FormControl>

            <FormControl>
              <FormLabel id="time">Time</FormLabel>
              <Input onChange={e => setTime(e.target.value)} type="time" />
            </FormControl>

            <FormControl>
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
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default InputDialog
