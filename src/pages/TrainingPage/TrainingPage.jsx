import { Link } from "react-router-dom";
import css from "./TrainingPage.module.css";
import { useSelector } from "react-redux";
import TrainingRoom from "../../components/TrainingRoom/TrainingRoom";

export default function TrainingPage() {
  return (
    <div className={css.cowerPage}>
      <div className={css.position}>
        <div className={css.cowerTable}>
          <TrainingRoom />
        </div>
      </div>
    </div>
  );
}
