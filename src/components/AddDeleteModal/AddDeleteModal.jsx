import React from "react";
import Modal from "react-modal";
import { useModalControl } from "../hook/UseModalControl";
import ChangeWordModal from "../AddWord/ChangeWordModal";
import css from "./AddDeleteModal.module.css";
import { useDispatch } from "react-redux";
import { deleteWord } from "../../redux/words/operations";
import toast from "react-hot-toast";
import { selectWords } from "../../redux/words/selectors.js";
import { visibleWords } from "../../redux/words/slice.js";
import { showError, showSuccess } from "../ToastComponent/ToastComponent.jsx";
import { closeModal } from "../../redux/modal/slice.js";

const adjustPosition = (position, direction) => {
  const padding = 10;
  const windowSize =
    direction === "top" ? window.innerHeight : window.innerWidth;
  const elementSize = 124;
  let numericPosition = parseFloat(position);

  if (numericPosition + elementSize / 2 > windowSize - padding) {
    numericPosition = windowSize - elementSize / 2 - padding;
  }
  if (numericPosition - elementSize / 2 < padding) {
    numericPosition = elementSize / 2 + padding;
  }

  return `${numericPosition}px`;
};

export default function AddDeleteModal({ wordToChange }) {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(18, 20, 23, 0.20)",
    },
    content: {
      position: "absolute",
      top: adjustPosition(wordToChange?.position?.top || "50%", "top"),
      left: adjustPosition(wordToChange?.position?.left || "50%", "left"),
      transform: "translate(-50%, -50%)",
      border: "none",
      borderRadius: "15px",
      background: "var(--fff)",
      overflow: "visible",
      boxShadow: "0px 4px 47px 0px rgba(18, 20, 23, 0.08)",
    },
  };
  Modal.setAppElement("#root");

  const { showModal, hideModal, isActive } = useModalControl();

  const handleEdit = () => {
    showModal("changeModal");
  };
  const dispatch = useDispatch();

  const handleClose = () => {
      dispatch(closeModal());
    };
 
const handleDelete = () => {
  if (!wordToChange?._id) {
    showError({ message: "Invalid word ID" });
    return;
  }

  dispatch(deleteWord(wordToChange._id))
    .unwrap()
    .then(() => {
      showSuccess({ message: "The word has been deleted" });
      closeModal();
      hideModal();
    })
    .catch((err) => {
      console.error("Delete error:", err);
      showError({ message: "There was an error, please try again" });
    });
};
  return (
    <>
      {isActive("addDelModal") && (
        <Modal
          isOpen={isActive("addDelModal")}
          onRequestClose={hideModal}
          style={customStyles}
          className={css.modal}
        >
          <button onClick={handleEdit} className={css.btn}>
            <svg className={css.btnImg} width="16" height="16">
              <use href="/sprite.svg#icon-edit-pen"></use>
            </svg>
            Edit
          </button>
          <button onClick={handleDelete} className={css.btn}>
            <svg className={css.btnImg} width="16" height="16">
              <use href="/sprite.svg#icon-trash"></use>
            </svg>
            Delete
          </button>
        </Modal>
      )}
      {isActive("changeModal") && wordToChange && (
        <ChangeWordModal wordToChange={wordToChange} />
      )}
    </>
  );
}
