import css from "./PasswordField.module.css";
import { Field } from "formik";
import { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import CustomMessage from "../CustomMessage/CustomMessage";

export default function PasswordField({ errors, touched }) {
  const [eyeOpen, setEyeOpen] = useState(true);

  const handleEyeToggle = () => {
    setEyeOpen(!eyeOpen);
  };

  return (
    <div className={css.eyerelative}>
      <button type="button" className={css.btnEye} onClick={handleEyeToggle}>
        {eyeOpen ? (
          <FiEyeOff size={19} className={css.eye} />
        ) : (
          <FiEye size={19} className={css.eye} />
        )}
      </button>

      <Field
        type={eyeOpen ? "password" : "text"}
        name="password"
        className={`${css.field} ${
          errors && touched
            ? css.errorField
            : touched && !errors
            ? css.successField
            : ""
        }`}
        placeholder="Password"
      />

      <CustomMessage name="password" errors={errors} touched={touched} />
    </div>
  );
}
