import { Link } from "react-router-dom";
import css from "./DictionaryPage.module.css";
import { allWords } from "../../redux/words/operations";
import { useDispatch, useSelector } from "react-redux";
import { visibleWords } from "../../redux/words/slice";
import {
  selectError,
  selectLoading,
  selectWords,
} from "../../redux/words/selectors";
import { useEffect, useState } from "react";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import WordList from "../../components/WordList/WordList";
import PageCower from "../../components/PageCower/PageCower";

export default function DictionaryPage() {
  const ITEMS_PER_LOAD = 4;
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const items = useSelector(selectWords);
  useEffect(() => {
    dispatch(allWords());
  }, [dispatch]);

  const allList = useSelector(visibleWords);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  // const handleLoadMore = () => {
  //   setVisibleCount((prevCount) => prevCount + ITEMS_PER_LOAD);
  // };

  const currentWords = allList.slice(0, visibleCount);


  return (
    <>
      <PageCower>
        <div className={css.wordList}>
          {currentWords.length > 0 ? (
            <WordList filtrWords={currentWords} />
     
          ) : (
            <p>No words found</p>
          )}
        </div>
        {isLoading && <Loader>Loading message</Loader>}
        {isError && <ErrorMessage />}
      </PageCower>
    </>
    // <section className={css.section}>
    //   <div className={css.position}>
    //     <div className={css.filterBlock}>{/* <FilterBox /> */}</div>
    //     <div>
    //       <div className={css.btnLoad}></div>
    //       <div className={css.wordList}>
    //         {currentWords.length > 0 ? (
    //           <WordList filtrWords={currentWords} />
    //         ) : (
    //           <p>No words found</p>
    //         )}
    //       </div>
    //       {/* {currentWords.length < allList.length && (
    //         <LoadMoreBtn onClick={handleLoadMore} />
    //       )} */}
    //     </div>
    //   </div>
    //   {isLoading && <Loader>Loading message</Loader>}
    //   {isError && <ErrorMessage />}
    // </section>
  );
}
