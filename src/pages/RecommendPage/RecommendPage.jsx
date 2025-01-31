
import { Link } from "react-router-dom";
import css from "./RecommendPage.module.css";
import { allWords } from "../../redux/words/operations";
// import { fetchWordsOwn } from "../../redux/words/operations";
import { useDispatch, useSelector } from "react-redux";
import { visibleWords } from "../../redux/words/slice";
import {
  selectError,
  selectLoading,
  selectWords,
} from "../../redux/words/selectors";
import { useEffect, useState } from "react";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import WordList from "../../components/WordList/WordList";
import PageCower from "../../components/PageCower/PageCower";

export default function RecommendPage() {
  const ITEMS_PER_LOAD = 7;
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  // const items = useSelector(selectWords);
   const items = useSelector((state) => state.words.recommendPage?.items);
  useEffect(() => {
    dispatch(allWords());
  }, [dispatch]);

  const allList = useSelector(visibleWords("recommend"));
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);


  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_LOAD);
  };

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
  );
}
