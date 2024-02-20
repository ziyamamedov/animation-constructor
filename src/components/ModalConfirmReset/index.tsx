import React from 'react'
import styled from 'styled-components'
import {AppButton} from '../AppButton'
import {AppCloseButton} from '../UI/AppCloseButton'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const ModalConfirmReset: React.FC<ModalProps> = ({isOpen, onConfirm, onClose}) => {
  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer>
        <ModalHeader>
          <AppCloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          <p>This will delete the animation for the selected element</p>
        </ModalBody>
        <ModalFooter>
          <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  )
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.div`
  background-color: white;
  width: 400px;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ModalBody = styled.div`
  margin-bottom: 20px;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ConfirmButton = styled(AppButton)`
  margin-right: 12px;
`

const CancelButton = styled(AppButton)`
  background-color: #f44336;
`

