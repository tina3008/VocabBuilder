import css from "./RegisterPage.module.css";
import RegisterImg from "../../components/RegisterImg/RegisterImg";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

export default function RegisterPage() {
  return (
    <section className={css.registerContainer}>
      <div className={css.position}>
        <div className={css.registerInfo}>
          <RegistrationForm />
        </div>
        <div className={css.registerImg}>
          <RegisterImg />       
        </div>
      </div>
    </section>
  );
}
