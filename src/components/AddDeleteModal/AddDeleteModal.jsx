import React from "react";
import Modal from "react-modal";
import { useModalControl } from "../hook/UseModalControl";
import ChangeWordModal from "../AddWord/ChangeWordModal";
import css from "./AddDeleteModal.module.css";
import { useDispatch } from "react-redux";
import { deleteWord } from "../../redux/words/operations";
import toast from "react-hot-toast";

import {selectWords} from "../../redux/words/selectors.js";

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
    // hideModal();
    showModal("changeModal");
  };

// console.log("wordToChange.id-", wordToChange._id);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteWord(wordToChange._id))
      .unwrap()
      .then(() => {  
        dispatch(visibleWords()); 
        toast("The word has been deleted", {
          style: {
            background: "var(--white)",
            color: "var(---color_success)",
          },
          position: "top-center",
        });
        handleClose();
      })
      .catch(() => {
        toast("Was error, please try again", {
          style: {
            background: "var(--color_error)",
            color: "var(--white)",
          },
          containerStyle: {
            top: 150,
            left: 20,
            bottom: 20,
            right: 20,
          },
        });
      });

   hideModal();
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
