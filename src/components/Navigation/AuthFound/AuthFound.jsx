import css from "./AuthFound.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/auth/selectors";
import { logOut } from "../../../redux/auth/operations";
import { useEffect, useState } from "react";

export default function AuthFound({ context }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (user?.name) {
      const timer = setTimeout(() => {
        setDisplayName(user.name);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [user?.name]);

  return (
    <div className={css.wrapper}>
      <div className={css.userConeiner}>
        <p
          className={
            context === "BurgerMenu" ? css.usernamerBurger : css.username
          }
        >
          {displayName}
        </p>
        <div
          className={
            context === "BurgerMenu" ? css.userImageFonBurger : css.userImageFon
          }
        >
          <svg
            className={
              context === "BurgerMenu" ? css.userImageBurger : css.userImage
            }
            width="24"
            height="24"
          >
            <use href="/sprite.svg#icon-user"/>
          </svg>
        </div>
      </div>

      <button
        type="button"
        className={css.btn}
        onClick={() => dispatch(logOut())}
      >
        Log out
        <svg className={css.array} width="16" height="16">
          <use href="/sprite.svg#icon-arrow"></use>
        </svg>
      </button>
    </div>
  );
}
