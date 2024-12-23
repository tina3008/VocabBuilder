import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

export default function Homepage() {
  return (
    <section className={css.homeMain}>
      <p className={css.txtHome}>
  homepage
      </p>
    </section>
  );
}