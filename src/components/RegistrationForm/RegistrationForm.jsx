import css from "./RegistrationForm.module.css";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { register } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import PasswordField from "./PasswordField/PasswordField";
import { NavLink } from "react-router-dom";
import CustomMessage from "./CustomMessage/CustomMessage";
import { useNavigate } from "react-router-dom";

const validationControl = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
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

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then((data) => {
        toast.success("Registration successful!", {
          style: { background: "white", color: "black" },
          position: "top-center",
        });
        actions.resetForm();
        navigate("/dictionary");
      })
      .catch((err) => {
        toast(`Registration failed: ${err.toString()}`, {
          style: { background: "red" },
          containerStyle: {
            position: "top-center",
          },
        });
      });
  };

  return (
    <div className={css.registrationForm}>
      <h2 className={css.regTitle}>Register</h2>
      <p className={`${css.regTxt} ${css.text}`}>
        To start using our services, please fill out the registration form
        below. All fields are mandatory:
      </p>

      <Formik
        initialValues={{
          name: "",
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
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={`${css.field} ${
                    errors.name && touched.name
                      ? css.errorField
                      : touched.name && !errors.name
                      ? css.successField
                      : ""
                  }`}
                />
                <CustomMessage
                  name="name"
                  errors={errors.name}
                  touched={touched.name}
                />
              </div>
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
              Register
            </button>
            <Toaster />
          </Form>
        )}
      </Formik>
      <NavLink to="/login" className={css.switchPageBtn}>
        Login
      </NavLink>
    </div>
  );
}
