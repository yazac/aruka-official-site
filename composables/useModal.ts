// composables/useModal.ts
type ModalContentType = "works" | "notice"

interface ModalPayload {
  type: ModalContentType
  id?: string
  [key: string]: unknown
}

interface ModalState {
  isOpen: boolean
  payload: ModalPayload | null
}

export function useModal() {
  const modal = useState<ModalState>('modal', () => ({
    isOpen: false,
    payload: null,
  }))

  function openModal(payload: ModalPayload) {
    modal.value.payload = payload
    modal.value.isOpen = true
  }

  function closeModal() {
    modal.value.isOpen = false
    modal.value.payload = null
  }

  return { modal, openModal, closeModal }
}