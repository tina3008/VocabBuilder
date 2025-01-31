import css from "./Filters.module.css";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { setStatusFilter } from "../../../redux/filters/slice";
import {
  selectFilter,
  selectCategories,
  selectPageType,
} from "../../../redux/words/selectors";
import { useField, useFormikContext } from "formik";
import { useEffect } from "react";
import { fetchCategories } from "../../../redux/words/operations";

export default function Categories({ className, CustomStyles, addRadio }) {
  const { setFieldValue, values } = useFormikContext();
  const [field] = useField("category");
  const dispatch = useDispatch();
  const filters = useSelector(selectFilter);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleFilterChange = (field, value) => {
    setFieldValue(field, value);
    dispatch(setStatusFilter({ [field]: value }));
  };

  const categoryOptions = [
    { value: "", label: "Categories" },
    ...categories.map((category) => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1),
    })),
  ];

  const isVerbSelected = addRadio ? "verb" : values.category === "verb";

  return (
    <>
      <div className={css.filterItem}>
        {categories.length && (
          <Select
            options={categoryOptions}
            className={className}
            styles={CustomStyles()}
            value={categoryOptions.find(
              (option) => option.value === values.category
            )}
            onChange={(selected) =>
              handleFilterChange("category", selected.value)
            }
          />
        )}
      </div>
      {isVerbSelected && (
        <div className={css.filterItem}>
          <label className={css.radioPosition}>
            <input
              className={addRadio ? css.customAddWordRadio : css.customRadio}
              type="radio"
              name="isIrregular"
              value="true"
              checked={values.isIrregular === "true"}
              onChange={() => setFieldValue("isIrregular", "true")}
            />
            Regular
          </label>
          <label className={css.radioPosition}>
            <input
              className={addRadio ? css.customAddWordRadio : css.customRadio}
              type="radio"
              name="isIrregular"
              value="false"
              checked={values.isIrregular === "false"}
              onChange={() => setFieldValue("isIrregular", "false")}
            />
            Irregular
          </label>
        </div>
      )}
    </>
  );
}
