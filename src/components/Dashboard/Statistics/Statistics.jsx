import css from "./Statistics.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectStatistics, selectedWord } from "../../../redux/words/selectors";
import { fetchStatistics } from "../../../redux/words/operations";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import AddWordModal from "../../AddWord/AddWord";
import { selectActiveModal } from "../../../redux/modal/selectors";
import ChangeWordModal from "../../AddWord/ChangeWordModal";
import { useModalControl } from "../../../hook/UseModalControl";

export default function Statistics() {
  const wordToChange = useSelector(selectedWord);

  const { showModal, hideModal, isActive } = useModalControl();
  const dispatch = useDispatch();
  const statistics = useSelector(selectStatistics);
  const activeModal = useSelector(selectActiveModal);

  const handleEdit = () => {
    if (activeModal !== "addWordModal") {
      showModal("addWordModal");
    }
  };

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  return (
    <div className={css.statisticBlock}>
      <p className={css.statisitcTxt}>
        To study: <span className={css.mainTxt}>{statistics} </span>
      </p>
      <div className={css.statisticBtn}>
        {location.pathname === "/dictionary" && (
          <button className={css.btnText} onClick={handleEdit}>
            Add word
            <svg className={css.imgBtn} width="20" height="20">
              <use href="/sprite.svg#icon-plus"></use>
            </svg>
          </button>
        )}

        <NavLink to="/training" className={css.btnText}>
          Train oneself
          <svg className={css.imgBtn} width="20" height="20">
            <use href="/sprite.svg#icon-arrow"></use>
          </svg>
        </NavLink>
      </div>

      {isActive("addWordModal") && <AddWordModal />}
      {isActive("changeModal") && (
        <ChangeWordModal wordToChange={wordToChange} />
      )}
    </div>
  );
}
