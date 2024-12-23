import { Link } from "react-router-dom";
import css from "../NotFoundPage/NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <section className={css.nonContainer}>     
      <p className={css.txt}>
        Sorry, page not found! Please go to{" "}
        <Link to="/" className={css.linkHome}>
          home page
        </Link>
        !
      </p>
    </section>
  );
}
