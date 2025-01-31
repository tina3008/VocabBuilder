import css from "./AddWord.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { closeModal } from "../../redux/modal/slice";
import { changeWord } from "../../redux/words/operations";
import { selectActiveModal } from "../../redux/modal/selectors";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

export const validationControl = Yup.object().shape({
  ua: Yup.string()
    .matches(/^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u, "Invalid word format")
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("Required"),
  en: Yup.string()
    .matches(/^[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*$/, "Invalid word format")
    .min(2, "Too short")
    .max(20, "Too long")
    .required("Required"),
});

export default function ChangeWordModal({ wordToChange }) {
  const activeModal = useSelector(selectActiveModal);
  const isModalOpen = activeModal === "changeModal";
  const dispatch = useDispatch();

  if (activeModal !== "changeModal") return null;
  if (!isModalOpen) {
    return null;
  }

  const { _id: id, en, ua, category, isIrregular } = wordToChange;

  const initialContact = {
    ua: ua,
    en: en,
  };

  
const handleSubmit = (values, actions) => {
  const { en, ua } = values;
  dispatch(changeWord({ id, en, ua, category, isIrregular }))
    .unwrap()
    .then(() => {
      toast("The word has been changed", {
        style: {
          background: "var(--white)",
          color: "var(---color_success)",
        },
        position: "top-center",
      });
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

  actions.resetForm();
  dispatch(closeModal());
};

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

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        style={customStyles}
        className={css.modal}
      >
        <Formik
          initialValues={initialContact}
          onSubmit={handleSubmit}
          validationSchema={validationControl}
        >
          <Form className={css.formStyle}>
            <div className={css.fialdStyle}>
              <Field className={css.field} type="text" name="ua" />
              <label name="ua" className={css.label}>
                <svg className={css.flagImg}>
                  <use href="/sprite.svg#icon-ukraine"></use>
                </svg>
                Ukrainian
              </label>
              <ErrorMessage
                className={css.errField}
                name="ua"
                component="span"
              />
            </div>

            <div className={css.fialdStyle}>
              <Field className={css.field} type="text" name="en" />
              <label name="en" className={css.label}>
                <svg className={css.flagImg}>
                  <use href="/sprite.svg#icon-united-kingdom"></use>
                </svg>
                English
              </label>

              <ErrorMessage
                className={css.errField}
                name="en"
                component="span"
              />
            </div>
            <div className={css.btnBlock}>
              <button type="submit" className={css.btnForm}>
                Save
              </button>
              <button
                type="button"
                onClick={handleClose}
                className={css.btnForm}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>

        <button onClick={handleClose} className={css.btnX}>
          <svg className={css.imgX}>
            <use href="/sprite.svg#icon-x"></use>
          </svg>
        </button>
      </Modal>
    </>
  );
}
