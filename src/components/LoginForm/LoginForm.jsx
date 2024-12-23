import css from "../RegistrationForm/RegistrationForm.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../../redux/auth/operations.js";
import { useDispatch } from "react-redux";
import PasswordField from "../RegistrationForm/PasswordField/PasswordField";
import CustomMessage from "../RegistrationForm/CustomMessage/CustomMessage";
import * as Yup from "yup";

export default function LoginForm() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const validationControl = Yup.object().shape({
    email: Yup.string()
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email format")
      .min(3, " Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
        "Invalid password format"
      )
      .min(5, "Too short")
      .max(18, "Too long")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {

    dispatch(login(values))
      .unwrap()
      .then((data) => {
        toast.success("Login successful!", {
          style: { background: "white", color: "black" },
          position: "top-center",
        });
        actions.resetForm();
        navigate("/dictionary");
      })
      .catch((err) => {
        toast(`Login failed: ${err.toString()}`, {
          style: { background: "red" },
          containerStyle: {
            position: "top-center",
          },
        });
        console.log("send err,", err);
      });
  };

  return (
    <div className={css.registrationForm}>
      <h2 className={css.regTitle}>Login</h2>
      <p className={`${css.loginTxt} ${css.text}`}>
        Please enter your login details to continue using our service:
      </p>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationControl}
      >
        {({ errors, touched }) => (
          <Form className={css.form} autoComplete="off">
            <div className={css.fialdStyle}>
              <div className={css.fieldPosition}>
                <Field
                  type="email"
                  name="email"
                  className={`${css.field} ${
                    errors.email && touched.email
                      ? css.errorField
                      : touched.email && !errors.email
                      ? css.successField
                      : ""
                  }`}
                  placeholder="Email"
                />
                <CustomMessage
                  name="email"
                  errors={errors.email}
                  touched={touched.email}
                />
              </div>
              <PasswordField
                errors={errors.password}
                touched={touched.password}
              />
            </div>
            <button type="submit" className={css.btn}>
              Login
            </button>
            <Toaster />
          </Form>
        )}
      </Formik>
      <NavLink to="/register" className={css.switchPageBtn}>
        Register
      </NavLink>
    </div>
  );
}
