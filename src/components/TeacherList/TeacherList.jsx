import css from "./TeacherList.module.css";
import CardHead from "../CardHead/CardHead";
import LangBlock from "../LangBlock/LangBlock";
import Detalis from "../Detalis/Detalis";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function TeacherList({
  filtrTeachers,
  showFavoritesOnly = false,
}) {
  const [showDetails, setShowDetails] = useState({});
  const favorites = useSelector((state) => state.filters.favorites);

  const handleReadMoreClick = (id) => {
    setShowDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const teachersToDisplay = showFavoritesOnly
    ? filtrTeachers.filter((teacher) => favorites.includes(teacher.id))
    : filtrTeachers;

  return (
    <ul className={css.list}>
      {teachersToDisplay.map((teacher) => {
        const {
          id,
          name,
          surname,
          languages,
          avatar_url,
          lesson_info,
          conditions,
          reviews,
          experience,
        } = teacher;

        return (
          <li key={id} className={css.card}>
            <div className={css.avatarWraper}>
              <svg width="12" height="12" className={css.pointPhoto}>
                <use href="/sprite.svg#icon-photo_point"></use>
              </svg>
              <img
                className={css.avatar}
                width={96}
                src={avatar_url}
                alt="Teacher's avatar"
              />
            </div>

            <div className={css.info}>
              <CardHead teacher={teacher} />
              <p className={css.teacherName}>
                {name} {surname}
              </p>
              <ul className={css.teachersInfo}>
                <li className={css.info}>
                  <div className={css.langInfo}>
                    <p className={css.nameInfo}>Speaks: </p>&nbsp;
                    <p className={css.leanguage}>{languages.join(", ")}</p>
                  </div>
                </li>
                <li className={css.info}>
                  <p className={css.description}>
                    <span className={css.nameInfo}>Lesson Info: </span>
                    {lesson_info}
                  </p>
                </li>
                <li className={css.info}>
                  <p className={css.description}>
                    <span className={css.nameInfo}>Conditions: </span>
                    {conditions}
                  </p>
                </li>
              </ul>
              {!showDetails[id] && (
                <button
                  onClick={() => handleReadMoreClick(id)}
                  className={css.buttonMore}
                >
                  Read more
                </button>
              )}
              {showDetails[id] && (
                <Detalis reviews={reviews} experience={experience} />
              )}
              <div className={css.lanBlock}>
                <LangBlock teacher={teacher} showDetails={showDetails[id]} />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
