import css from "./TrainingRoomEmpty.module.css";
import { useNavigate, NavLink } from "react-router-dom";
import AddWordModal from "../../AddWord/AddWord";
import { selectActiveModal } from "../../../redux/modal/selectors";
import { useModalControl } from "../../../hook/UseModalControl";
import { useDispatch, useSelector } from "react-redux";

export default function TrainingRoomEmpty() {
  const { showModal, hideModal, isActive } = useModalControl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeModal = useSelector(selectActiveModal);

  const handleAddWord = () => {
    if (activeModal !== "addWordModal") {
      showModal("addWordModal");
      navigate("/dictionary");
    }
  };

  return (
    <div className={css.conteinerEmpty}>
      <div className={css.imgposition}>
        <img src="/list.png" alt="list image" className={css.imgList} />
      </div>

      <div className={css.textPart}>
        <h2 className={css.title}>
          You don't have a single word to learn right now.{" "}
        </h2>
        <p className={css.text}>
          Please create or add a word to start the workout. We&nbsp; want to
          improve your vocabulary and develop your knowledge, so please share
          the words you are interested in adding to your study.
        </p>
        <div className={css.btnBlock}>
          <button className={css.btnAdd} onClick={handleAddWord}>
            Add word
          </button>
          <NavLink to="/recommend" className={css.btnCancel}>
            Cancel
          </NavLink>
        </div>
      </div>
      {isActive("addWordModal") && <AddWordModal />}
    </div>
  );
}
