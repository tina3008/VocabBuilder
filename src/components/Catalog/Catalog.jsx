import FilterBox from "../FilterBox/FilterBox";
import TeacherList from "../TeacherList/TeacherList";
import { fetchTeachers } from "../../redux/teachers/operations";
import { selectError, selectLoading } from "../../redux/teachers/selectors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import css from "./Catalog.module.css";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { visibleTeachers } from "../../redux/teachers/slice";

function Catalog({ showFavoritesOnly }) {
  const ITEMS_PER_LOAD = 4;

  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);
  const allTeachers = useSelector(visibleTeachers);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_LOAD);
  };

  const currentTeachers = allTeachers.slice(0, visibleCount);

  return (
    <section className={css.fullPage}>
      <FilterBox />
      <div className={css.fullTeacherList}>
        <div className={css.teachersList}>
          {currentTeachers.length > 0 ? (
            <TeacherList
              filtrTeachers={currentTeachers}
              showFavoritesOnly={showFavoritesOnly}
            />
          ) : (
            <p>No teachers found</p>
          )}
        </div>
        <div className={css.btnLoad}>
          {currentTeachers.length < allTeachers.length && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </div>
      </div>
      {isLoading && <Loader>Loading message</Loader>}
      {isError && <ErrorMessage />}
    </section>
  );
}

export default Catalog;
