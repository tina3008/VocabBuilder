import { Link } from "react-router-dom";
import css from "./DictionaryPage.module.css";
import { fetchWords } from "../../redux/words/operations";
import { useDispatch, useSelector } from "react-redux";
import { visibleWords } from "../../redux/words/slice";
import { selectError, selectLoading } from "../../redux/words/selectors";
import { useEffect } from "react";

export default function DictionaryPage() {
  const dispatch = useDispatch();
    const isLoading = useSelector(selectLoading);
    const isError = useSelector(selectError);
   useEffect(() => {
     dispatch(fetchWords());
   }, [dispatch]);
  

  return (
    <section className={css.section}>
      <p className={css.txtHome}>dictionary</p>
      {/* <p>{currentWords}</p> */}
    </section>
  );
}
