import css from "./Filters.module.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { setStatusFilter } from "../../../redux/filters/slice";
import { selectFilter } from "../../../redux/words/selectors";
import { CustomStyles } from "./CustomStylesFilter";
import { debounce } from "lodash";
import { useCallback } from "react";

export default function Filters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilter);

 const fetchResultsDebounced = useCallback(
   debounce((filter) => {
      filter
   }, 300),
   []
 );

  const handleInputChange = (event) => {
    const value = event.target.value;
    dispatch(setStatusFilter({ word: value }));
    fetchResultsDebounced(value);
  };

   const handleFilterChange = (key, value) => {
     dispatch(setStatusFilter({ [key]: value }));
   };
  const categoryOptions = [
    { value: "", label: "Categories" },
    { value: "verb", label: "Verb" },
    { value: "participle", label: "Participle" },
    { value: "noun", label: "Noun" },
    { value: "adjective", label: "Adjective" },
    { value: "pronoun", label: "Pronoun" },
    { value: "numerals", label: "Numerals" },
    { value: "adverb", label: "Adverb" },
    { value: "preposition", label: "Preposition" },
    { value: "conjunction", label: "Conjunction" },
    { value: "phrasal verb", label: "Phrasal verb" },
    { value: "functional phrase", label: "Functional phrase" },
  ];

  const isVerbSelected = filters.values.category === "verb";

  return (
    <div className={css.filtersBlock}>
      <div className={css.filterItem}>
        <input
          id="wordFilter"
          type="text"
          className={css.filterWord}
          placeholder="Find the word"
          value={filters.values.word || ""}
          onChange={handleInputChange}
        />
        <div className={css.searchWord}>
          <svg className={css.wordBtnImg} width="20" height="20">
            <use href="/sprite.svg#icon-search"></use>
          </svg>
        </div>
      </div>
      <div className={css.filterItem}>
        <Select
          options={categoryOptions}
          className={css.optionSize}
          styles={CustomStyles()}
          value={categoryOptions.find(
            (option) => option.value === filters.values.category
          )}
          onChange={(selected) =>
            handleFilterChange("category", selected.value)
          }
        />
      </div>
      {isVerbSelected && (
        <div className={css.filterItem}>
          <label className={css.radioPosition}>
            <input
              className={css.customRadio}
              type="radio"
              name="verbType"
              value="regular"
              checked={filters.values.verbType === "regular"}
              onChange={() => handleFilterChange("verbType", "regular")}
            />
            Regular
          </label>
          <label className={css.radioPosition}>
            <input
              className={css.customRadio}
              type="radio"
              name="verbType"
              value="irregular"
              checked={filters.values.verbType === "irregular"}
              onChange={() => handleFilterChange("verbType", "irregular")}
            />
            Irregular
          </label>
        </div>
      )}
    </div>
  );
}