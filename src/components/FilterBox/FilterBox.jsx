
import "./ReactSelect.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { setStatusFilter } from "../../redux/filters/slice";
import { selectFilter } from "../../redux/teachers/selectors";
import { useId } from "react";

import css from "./FilterBox.module.css";
import { CustomStyles } from "./CustomStylesFilter";

export default function FilterBox() {
  const dispatch = useDispatch();
  const languageFieldId = useId();
  const levelFieldId = useId();
  const priceFieldId = useId();

  const filters = useSelector(selectFilter);

  const handleFilterChange = (key, value) => {
    dispatch(setStatusFilter({ [key]: value }));
  };

  const languageOptions = [
    { value: "", label: "All" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
    { value: "Mandarin Chinese", label: "Mandarin Chinese" },
    { value: "Italian", label: "Italian" },
    { value: "German", label: "German" },
    { value: "Korean", label: "Korean" },
    { value: "English", label: "English" },
  ];

  const levelOptions = [
    { value: "", label: "All" },
    { value: "A1 Beginner", label: "A1 Beginner" },
    { value: "A2 Elementary", label: "A2 Elementary" },
    { value: "B1 Intermediate", label: "B1 Intermediate" },
    { value: "B2 Upper-Intermediate", label: "B2 Upper-Intermediate" },
    { value: "C1 Advanced", label: "C1 Advanced" },
    { value: "C2 Proficient", label: "C2 Proficient" },
  ];

  const priceOptions = [
    { value: "", label: "All" },
    { value: "25", label: "25" },
    { value: "27", label: "27" },
    { value: "28", label: "28" },
    { value: "30", label: "30" },
    { value: "35", label: "35" },
  ];

  return (
    <div className={css.filtresBlock}>
      <div className={css.fieldBlock}>
        <label htmlFor={languageFieldId} className={css.filtrlable}>
          Languages
        </label>
        <div className={css.filtrFieldPadding}>
          <Select
            id={languageFieldId}
            options={languageOptions}
            className={css.filtrField}
            classNamePrefix="react-select"
            styles={CustomStyles("221px")}
            value={languageOptions.find(
              (option) => option.value === filters.values.languages
            )}
            onChange={(selected) =>
              handleFilterChange("languages", selected.value)
            }
          />
        </div>
      </div>

      <div className={css.fieldBlock}>
        <label htmlFor={levelFieldId} className={css.filtrlable}>
          Level of knowledge
        </label>
        <div className={css.filtrFieldPadding}>
          <Select
            id={levelFieldId}
            options={levelOptions}
            className={css.filtrField}
            classNamePrefix="react-select"
            styles={CustomStyles("198px")}
            value={levelOptions.find(
              (option) => option.value === filters.values.levels
            )}
            onChange={(selected) =>
              handleFilterChange("levels", selected.value)
            }
          />
        </div>
      </div>

      <div className={css.fieldBlock}>
        <label htmlFor={priceFieldId} className={css.filtrlable}>
          Price
        </label>
        <div className={css.filtrFieldPadding} width="124px">
          <Select
            id={priceFieldId}
            styles={CustomStyles("124px")}
            classNamePrefix="react-select"
            options={priceOptions}
            className={css.filtrField}
            value={priceOptions.find(
              (option) => option.value === `${filters.values.price_per_hour}`
            )}
            onChange={(selected) =>
              handleFilterChange("price_per_hour", selected.value)
            }
          />
          <p className={css.dollarSign}>$</p>
        </div>
      </div>
    </div>
  );
}