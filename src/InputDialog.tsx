import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'

const InputDialog = ({ isOpen, onClose, day }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{day}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur eaque necessitatibus modi sapiente
          doloremque itaque dignissimos porro? Aut a consequuntur nam reiciendis, corrupti harum, asperiores sint
          laboriosam esse quo iste.
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default InputDialog
