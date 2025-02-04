
import css from "./AddWord.module.css";
import { useDispatch, useSelector } from "react-redux";

import { addWord, fetchWordsOwn } from "../../redux/words/operations";
import { selectActiveModal } from "../../redux/modal/selectors";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { closeModal } from "../../redux/modal/slice";
import Categories from "../Dashboard/Filters/Categories";
import { CustomStylesAddWord } from "../Dashboard/Filters/CustomStylesAddWord";
import Modal from "react-modal";
import { showSuccess, showError } from "../ToastComponent/ToastComponent";

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
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, "Invalid word format")
    .min(2, "Too short")
    .max(20, "Too long")
    .required("Required"),
});

export default function AddWordModal() {
  const activeModal = useSelector(selectActiveModal);
  const isModalOpen = activeModal === "addWordModal";
  const dispatch = useDispatch();

  const uaFieldId = useId();
  const enFieldId = useId();

  const initialContact = {
    ua: "",
    en: "",
    category: "",
    isIrregular: "",
  };

  const handleSubmit = (values, actions) => {
      const dataToSubmit = {
        ...values,
        ua: values.ua.trim().toLowerCase(),
        en: values.en.trim().toLowerCase(),
        category: values.category,
      };
    if (dataToSubmit.category !== "verb") {
      delete dataToSubmit.isIrregular;  
    }

    dispatch(addWord(dataToSubmit))
      .unwrap()
      .then(() => {   
        showSuccess({message:"The word has been added"});
        handleClose();
         dispatch(fetchWordsOwn());
      })
      .catch(() => {
        showError({message:"Was error, please try again"});
      });

    actions.resetForm();
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
        <h3 className={css.title}>Add word</h3>
        <p className={css.addWordTxt}>
          Adding a new word to the dictionary is an important step in enriching
          the language base and expanding the vocabulary.
        </p>
        <Formik
          initialValues={initialContact}
          onSubmit={handleSubmit}
          validationSchema={validationControl}
        >
          <Form className={css.formStyle}>
            <Categories
              className={css.addWordModal}
              CustomStyles={CustomStylesAddWord}
              addRadio={true}
            />
            <div className={css.fialdStyle}>
              <Field
                className={css.field}
                id={uaFieldId}
                type="text"
                name="ua"
              />
              <label htmlFor={uaFieldId} className={css.label}>
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
              <Field
                className={css.field}
                id={enFieldId}
                type="text"
                name="en"
              />
              <label htmlFor={enFieldId} className={css.label}>
                <svg className={css.flagImg}>
                  <use href="/sprite.svg#icon-united-kingdom"></use>
                </svg>
                Ukrainian
              </label>

              <ErrorMessage
                className={css.errField}
                name="en"
                component="span"
              />
            </div>
            <div className={css.btnBlock}>
              <button type="submit" className={css.btnForm}>
                Add
              </button>
              <button
                type="button"
                onClick={handleClose}
                className={css.btnForm}
              >
                Cancel
              </button>
            </div>
            <Toaster />
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
