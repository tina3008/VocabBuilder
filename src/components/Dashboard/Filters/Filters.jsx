
import { Formik, Form } from "formik";
import Categories from "./Categories";
import css from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setPageType, setStatusFilter } from "../../../redux/filters/slice";
import { selectFilter, selectPageType } from "../../../redux/words/selectors";
import { debounce } from "lodash";
import { useCallback } from "react";
import { CustomStylesFilters } from "./CustomStylesFilter";

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilter);
  const pageType = useSelector(selectPageType);  

  const fetchResultsDebounced = useCallback(
    debounce((word) => {
      dispatch(setStatusFilter({ word }));
    }, 300),
    [dispatch]
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    fetchResultsDebounced(value);
    dispatch(setStatusFilter({ word: value })); 
  };

  return (
    <Formik
      initialValues={{
        category: filters.category || "",
        isIrregular: filters.isIrregular || "",
        word: filters.word || "",
      }}
      onSubmit={(values) => {
        dispatch(setStatusFilter(values));
      }}
    >
      <Form className={css.filtersBlock}>
        <div className={css.filterItem}>
          <input
            id="wordFilter"
            type="text"
            className={css.filterWord}
            placeholder="Find the word"
            defaultValue={filters.word || ""}
            onChange={handleInputChange}
          />
          <div className={css.searchWord}>
            <svg className={css.wordBtnImg} width="20" height="20">
              <use href="/sprite.svg#icon-search"></use>
            </svg>
          </div>
        </div>
        <Categories
          className={css.filtersCategory}
          CustomStyles={CustomStylesFilters}
        />
      </Form>
    </Formik>
  );
}