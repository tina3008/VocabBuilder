import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../../redux/words/operations";
import css from "./TrainingRoom.module.css";
import {
  selectLoading,
  selectTasks,
  selectError,
} from "../../redux/words/selectors";
import { Suspense, useEffect, useState } from "react";
import TrainingRoomEmpty from "./TrainingRoomEmpty/TrainingRoomEmpty";
import Loader from "../Loader/Loader.jsx";
import { Link, useLocation } from "react-router-dom";

export default function TrainingRoom() {
  const dispatch = useDispatch();
  const tasksData = useSelector(selectTasks);
  const loading = useSelector(selectLoading);
  const allTasks = tasksData || [];
  const [showEmpty, setShowEmpty] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchTasks());

    const timer = setTimeout(() => {
      setShowEmpty(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <section className={css.barPosition}>
      {allTasks.length > 0 ? (
        <>
          {loading && <Loader />}
          <Suspense fallback={<Loader />}>
            <ul className={css.listPlase}>
              {allTasks.map((task, index) => (
                <li key={index} className={css.list}>
                  <Link
                    to={`/training/${task._id}`}
                    state={location}
                    className={css.link}
                  >
                    {task.ua && <p>{task.ua}</p>}
                    {task.en && <p>{task.en}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          </Suspense>
        </>
      ) : (
        showEmpty && <TrainingRoomEmpty />
      )}
    </section>
  );
}
