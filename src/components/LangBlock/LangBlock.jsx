import { useId, useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import css from "./LangBlock.module.css";
import TrialLesson from "../TrialLesson/TrialLesson";
import { openModal } from "../../redux/modal/slice";
import { selectActiveModal } from "../../redux/modal/selectors";
import { useDispatch, useSelector } from "react-redux";

export default function LangBlock({ teacher, showDetails }) {
  const { levels } = teacher;

  const levelFieldId = useId();

  const dispatch = useDispatch();
  const activeModal = useSelector(selectActiveModal);

  const handleSubmit = (values, actions) => {
    dispatch(openModal("langLevel"));
    actions.resetForm();
    console.log("activeModal:", activeModal);
  };

  const initialValues = {
    levels: showDetails && levels.includes("A1 Beginner") ? "A1 Beginner" : "",
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => {
          useEffect(() => {
            if (showDetails && levels.includes("A1 Beginner")) {
              setFieldValue("level", "A1 Beginner");
            }
          }, [showDetails, levels, setFieldValue]);

          return (
            <Form>
              <div className={css.list}>
                {levels.map((level, index) => (
                  <label
                    key={index}
                    className={`${css.langBtn} ${
                      values.level === level ? css.selected : ""
                    }`}
                  >
                    <Field
                      type="radio"
                      name="level"
                      value={level}
                      id={`${levelFieldId}-${index}`}
                      className={css.hiddenCheck}
                    />
                    {level}
                  </label>
                ))}
              </div>

              {(values.level || showDetails) && (
                <button type="submit" className={css.btnSubmit}>
                  Book trial lesson
                </button>
              )}
            </Form>
          );
        }}
      </Formik>
      {activeModal === "langLevel" && <TrialLesson teacher={teacher} />}
    </div>
  );
}
