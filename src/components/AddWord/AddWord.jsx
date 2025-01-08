import css from "./AddWord.module.css";

import { useDispatch, useSelector } from "react-redux";

import { addWordId } from "../../redux/words/operations";
import { selectActiveModal } from "../../redux/modal/selectors";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import ModalWindow from "../ModalWindow/ModalWindow";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { closeModal } from "../../redux/modal/slice";

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

  if (activeModal !== "addWordModal") return null;

  const uaFieldId = useId();
  const enFieldId = useId();

  const initialContact = {
    ua: "",
    en: "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(addWordId(values))
      .unwrap()
      .then(() => {
        toast("The word has been added", {
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
            color:"var(--white)"
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
  };

const handleClose = () => {
  dispatch(closeModal());
  };
  
  return (
    <>
      <ModalWindow>
        <Formik
          initialValues={initialContact}
          onSubmit={handleSubmit}
          validationSchema={validationControl}
        >
          <Form className={css.formStyle}>
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
          </Form>
        </Formik>
      </ModalWindow>
    </>
  );
}
