import css from "./RegisterPage.module.css";
import RegisterImg from "../../components/RegisterImg/RegisterImg";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <section className={css.registerContainer}>
      <div className={css.position}>
        <div className={css.loginInfo}>
          <LoginForm />
        </div>
        <div className={css.registerImg}>
          <RegisterImg />
        </div>
      </div>
    </section>
  );
}
