import css from "./TrainingWord.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { useState, useRef } from "react";
import Loader from "../../components/Loader/Loader";
import { fetchTasks, fetchAnswers } from "../../redux/words/operations";
import {
  selectTasks,
  selectLoading,
  selectError,
  selectWord,
  selectAnswers,
} from "../../redux/words/selectors";
import  { Toaster } from "react-hot-toast";
import { showInfo, showError } from "../ToastComponent/ToastComponent.jsx";
import { validationControl } from "../AddWord/AddWord";
import { openModal, setModalData } from "../../redux/modal/slice";
import { selectActiveModal } from "../../redux/modal/selectors";
import { setSelectWord, setSelectAnswers } from "../../redux/words/slice";
import WellDone from "./WellDone/WellDone";

export default function TrainingWordId() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const selectedWord = useSelector(selectWord);
  const answers = useSelector(selectAnswers);
  const [progressValue, setProgressValue] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(() => {
    return tasks.findIndex((task) => task._id === id);
  });
  const formikRef = useRef(null);
  const activeModal = useSelector(selectActiveModal);

  useEffect(() => {
    dispatch(fetchTasks())
      .unwrap()
      .then((response) => {
        const tasksArray = response.tasks;
        const index = tasksArray.findIndex((task) => task._id === id);

        if (index !== -1) {
          setCurrentIndex(index);
          dispatch(setSelectWord(tasksArray[index]));
        }
      });
  }, [id, dispatch]);

  if (!tasks.length || currentIndex === -1) return <p>Loading...</p>;
  const word = tasks[currentIndex];
  if (!word) return <p>Loading word...</p>;
  const { _id, en, ua, task } = word;

  const handleSubmit = (values, actions) => {
    const updatedAnswers = [...answers, { ...word, ...values }];
    dispatch(setSelectAnswers(updatedAnswers));
    if (currentIndex + 1 < tasks.length) {
      const nextWord = tasks[currentIndex + 1];
      setCurrentIndex((prevIndex) => prevIndex + 1);
      dispatch(setSelectWord(nextWord));
      actions.resetForm({
        values: {
          en: nextWord.en || "",
          ua: nextWord.ua || "",
        },
      });
      setProgressValue((prevProgress) =>
        Math.round(prevProgress + 100 / tasks.length)
      );
    } else {
        showInfo({message:"This is the last word"});
    }
  };

  const handleSave = (values, actions) => {
    const updatedAnswers = [...answers, { ...word, ...values }];
    if (values.en == "" || values.ua == "") {
      showError({ message: "Please input answer" });      
    } else {
      dispatch(setSelectAnswers(updatedAnswers));

      dispatch(fetchAnswers(updatedAnswers))
        .unwrap()
        .then((data) => {
          dispatch(openModal("wellDone"));
          dispatch(setModalData(data));
        })
        .catch((err) => {
          showError({ message: `Failed to fetch words: ${err}` });       
        });
      if (actions) {
        actions.resetForm({
          values: {
            en: word.en || "",
            ua: word.ua || "",
          },
        });
      }
    }
  };

  const Initial = {
    en: word?.en || "",
    ua: word?.ua || "",
  };

  const SaveButton = () => {
    const { values, resetForm } = useFormikContext();
    return (
      <button
        className={css.btnAdd}
        onClick={(e) => {
          e.preventDefault();
          handleSave(values, { resetForm });
        }}
      >
        Save
      </button>
    );
  };

  return (
    <div className={css.cowerPage}>
      {loading && <Loader />}
      <Suspense fallback={<Loader />}>
        <svg style={{ visibility: "hidden", position: "absolute" }}>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C6D8D3" />
              <stop offset="100%" stopColor="#85AA9F" />
            </linearGradient>
          </defs>
        </svg>
        <div className={css.position}>
          <div>
            {loading ? (
              <Loader />
            ) : (
              <div className={css.progress}>
                <p className={css.progressTxt}>{progressValue}%</p>
                <CircularProgressbar
                  value={progressValue}
                  strokeWidth={15}
                  styles={buildStyles({
                    strokeLinecap: "round",
                    pathTransitionDuration: 0.8,
                    pathColor: "url(#gradient)",
                    trailColor: "#fff",
                  })}
                />
              </div>
            )}
          </div>
          <div className={css.studyCower}>
            <div className={css.enUaBlock}>
              <div className={css.study}>
                <Formik
                  initialValues={Initial}
                  enableReinitialize={true}
                  onSubmit={handleSubmit}
                  validationSchema={validationControl}
                  innerRef={formikRef}
                >
                  {() => (
                    <Form className={css.form} autoComplete="off">
                      {ua ? (
                        <>
                          <Field
                            type="text"
                            name="en"
                            placeholder="Введіть переклад"
                            className={css.input}
                          />
                          <ErrorMessage
                            className={css.errField}
                            name="en"
                            component="span"
                          />
                        </>
                      ) : (
                        <>
                          <Field
                            type="text"
                            name="ua"
                            placeholder="Введіть переклад"
                            className={css.input}
                          />
                          <ErrorMessage
                            className={css.errField}
                            name="ua"
                            component="span"
                          />
                        </>
                      )}

                      {currentIndex + 1 < tasks.length && (
                        <button type="submit" className={css.nextBtn}>
                          Next
                          <svg className={css.image} height="20" width="20">
                            <use href="/sprite.svg#icon-arrow"></use>
                          </svg>
                        </button>
                      )}
                      <Toaster />
                      <div className={css.buttonBlock}>
                        <SaveButton />
                        <NavLink to="/dictionary" className={css.btnCancel}>
                          Cancel
                        </NavLink>
                      </div>
                    </Form>
                  )}
                </Formik>

                {ua ? (
                  <div className={css.langName}>
                    <p>English</p>
                    <svg className={css.image} height="32" width="32">
                      <use href="/sprite.svg#icon-united-kingdom"></use>
                    </svg>
                  </div>
                ) : (
                  <div className={css.langName}>
                    <p>Ukrainian</p>
                    <svg className={css.image} height="32" width="32">
                      <use href="/sprite.svg#icon-ukraine"></use>
                    </svg>
                  </div>
                )}
              </div>

              {ua ? (
                <div className={css.study}>
                  <p className={css.txt}>{ua}</p>
                  <div className={css.langName}>
                    <p>Ukrainian</p>
                    <svg className={css.image} height="32" width="32">
                      <use href="/sprite.svg#icon-ukraine"></use>
                    </svg>
                  </div>
                </div>
              ) : (
                <div className={css.study}>
                  <p className={css.txt}>{en}</p>
                  <div className={css.langName}>
                    <p>English</p>
                    <svg className={css.image} height="32" width="32">
                      <use href="/sprite.svg#icon-united-kingdom"></use>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Suspense>
      {activeModal === "wellDone" && <WellDone />}
    </div>
  );
}
