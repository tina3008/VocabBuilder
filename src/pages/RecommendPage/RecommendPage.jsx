import { allWords } from "../../redux/words/operations";
import { useDispatch, useSelector } from "react-redux";
import { memoWordsSelector, visibleWords } from "../../redux/words/slice";
import {
  selectError,
  selectLoading,
  selectRecomendWords,
} from "../../redux/words/selectors";
import { useEffect, useState, useMemo } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import WordList from "../../components/WordList/WordList";
import PageCower from "../../components/PageCower/PageCower";

export default function RecommendPage() {
   const ITEMS_PER_LOAD = 7;
   const dispatch = useDispatch();
   const isLoading = useSelector(selectLoading);
   const isError = useSelector(selectError);
   const items = useSelector(selectRecomendWords);
   const visibleWordsSelector = useMemo(memoWordsSelector, []);
   const allList = useSelector((state) =>
     visibleWordsSelector(state, "recommend")
   );

   const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

   useEffect(() => {
     dispatch(allWords());
   }, [dispatch]);

   useEffect(() => {
     setVisibleCount(ITEMS_PER_LOAD);
   }, [allList]);

   const handleLoadMore = () => {
     setVisibleCount((prevCount) => prevCount + ITEMS_PER_LOAD);
   };

   const currentWords = allList.slice(0, visibleCount);

  return (
    <>
      <PageCower>
        <>          
          {currentWords.length > 0 ? (
            <WordList filtrWords={currentWords} />
          ) : (
            <p>No words found</p>
          )}
        </>

        {isLoading && <Loader>Loading message</Loader>}
        {isError && <ErrorMessage />}
      </PageCower>
    </>
  );
}
