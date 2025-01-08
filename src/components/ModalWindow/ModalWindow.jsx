import css from "./ModalWindow.module.css";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modal/slice";
import { selectActiveModal } from "../../redux/modal/selectors";
import { useEffect } from "react";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(18, 20, 23, 0.20)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "30px",
    background: "var(--color_hover)",
    overflow: "visible",
  },
};

Modal.setAppElement("#root");

export default function ModalWindow({ children }) {
  const activeModal = useSelector(selectActiveModal);
  const isModalOpen =
    activeModal === "addWordModal" || activeModal === "changeModal";

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    if (activeModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  // if (activeModal !== "addWordModal" || "changeModal") return null;

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleClose}
      style={customStyles}
      className={css.modal}
    >
      <div>{children}</div>

      <button onClick={handleClose} className={css.btnX}>
        <svg className={css.imgX}>
          <use href="/sprite.svg#icon-x"></use>
        </svg>
      </button>
    </Modal>
  );
}
