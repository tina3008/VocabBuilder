import css from "./Statistics.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectStatistics } from "../../../redux/words/selectors";
import { fetchStatistics } from "../../../redux/words/operations";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { openModal } from "../../../redux/modal/slice";
import AddWordModal from "../../AddWord/AddWord";
import { selectActiveModal } from "../../../redux/modal/selectors";

export default function Statistics() {
  const dispatch = useDispatch();
  const statistics = useSelector(selectStatistics);
  const activeModal = useSelector(selectActiveModal);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  const handleModalOpen = () => {
    dispatch(openModal("addWordModal"));
  };

  return (
    <div className={css.statisticBlock}>
      <p className={css.statisitcTxt}>
        To study: <span className={css.mainTxt}>{statistics} </span>
      </p>
      <div className={css.statisticBtn}>
        <button className={css.btnText} onClick={handleModalOpen}>
          Add word
          <svg className={css.imgBtn} width="20" height="20">
            <use href="/sprite.svg#icon-plus"></use>
          </svg>
        </button>

        <NavLink to="/training" className={css.btnText}>
          Train oneself
          <svg className={css.imgBtn} width="20" height="20">
            <use href="/sprite.svg#icon-arrow"></use>
          </svg>
        </NavLink>
      </div>
      {activeModal === "addWordModal" && <AddWordModal />}
    </div>
  );
}
