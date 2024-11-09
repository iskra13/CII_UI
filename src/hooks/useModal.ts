import { useState } from "react"

export const useModal = () => {
  const [isOpenModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return {
    isOpenModal,
    handleOpenModal,
    handleCloseModal,
  };
}
