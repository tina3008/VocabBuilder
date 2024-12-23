import css from "./Detalis.module.css";
import { BsPersonCircle } from "react-icons/bs";

export default function Detalis({ reviews, experience }) {
  return (
    <div className={css.detalBock}>
      <p className={css.experience}>{experience}</p>
      <ul className={css.review}>
        {reviews.map((review, index) => {
          const { reviewer_name, reviewer_rating, comment } = review;
          return (
            <li key={index} className={css.item}>
              <div className={css.list}>
                <BsPersonCircle size="44" classname={css.avatar} />
                <div className={css.txtBlok}>
                  <p className={css.name}>{reviewer_name}</p>
                  <div className={css.raiting}>
                    <svg width="12" height="12" className={css.star}>
                      <use href="/sprite.svg#icon-star"></use>
                    </svg>
                    <p> {reviewer_rating}</p>
                  </div>
                </div>
              </div>
              <p className={css.coment}>{comment}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
