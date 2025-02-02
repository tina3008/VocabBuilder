import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveModal,
  selectModalData,
} from "../../../redux/modal/selectors";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { closeModal, setModalData } from "../../../redux/modal/slice";
import Modal from "react-modal";
import css from "./WellDone.module.css";
import {  useNavigate } from "react-router-dom";

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

export default function WellDone() {
  const activeModal = useSelector(selectActiveModal);
  const data = useSelector(selectModalData);
  const isModalOpen = activeModal === "wellDone";
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const doneTrue = data.filter((item) => item.isDone === true);
  const doneFalse = data.filter((item) => item.isDone === false);

  const handleClose = () => {
    dispatch(closeModal());
    navigate("/dictionary");
 dispatch(setModalData(0));
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

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        style={customStyles}
        className={css.modal}
      >
        <h3 className={css.title}>Well done</h3>
        <div className={css.textDone}>
          <div className={css.answer}>
            <h3 className={css.answerTitle}>Сorrect answers: </h3>
            <ul className={css.list}>
              {doneTrue.map((item) =>
                item.task === "en" ? (
                  <li key={item._id} className={css.wordList}>
                    {item.en}
                  </li>
                ) : (
                  <li key={item._id} className={css.wordList}>
                    {item.ua}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className={css.answer}>
            <h3 className={css.answerTitle}>Mistakes:</h3>
            <ul className={css.list}>
              {doneFalse.map((item) =>
                item.task === "en" ? (
                  <li key={item._id} className={css.wordList}>
                    {item.en}
                  </li>
                ) : (
                  <li key={item._id} className={css.wordList}>
                    {item.ua}
                  </li>
                )
              )}
            </ul>
            <div className={css.imgplase}></div>
          </div>
        </div>
        <div className={css.imgposition}>
          <img src="/book.png" alt="book image" className={css.img} />
        </div>
        <button onClick={handleClose} className={css.btnX}>
          <svg className={css.imgX}>
            <use href="/sprite.svg#icon-x"></use>
          </svg>
        </button>
      </Modal>
    </>
  );
}
