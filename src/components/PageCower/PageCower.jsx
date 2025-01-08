import Dashboard from "../Dashboard/Dashboard";
import css from "./PageCower.module.css";

export default function PageCower({ children }) {
  return (
    <div className={css.cowerPage}>
      <div className={css.position}>
        <Dashboard />
        <div className={css.cowerTable}>{children}</div>
      </div>
    </div>
  );
}