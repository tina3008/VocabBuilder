import { NavLink } from "react-router-dom";
import css from "./BurderMenue.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedin } from "../../redux/auth/selectors";
import AuthFound from "../Navigation/AuthFound/AuthFound";
import { logOut } from "../../redux/auth/operations";

export default function BurderMenue({ closeMenu }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const isLoggedin = useSelector(selectIsLoggedin);

  const handleLogout = () => {
    dispatch(logOut());
    closeMenu(!closeMenu);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1440px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        closeMenu();
      }
    };

    mediaQuery.addEventListener("change", handleResize);
    handleResize(); 

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [closeMenu]);

  return (
    <div className={css.burgerMenue}>
      <button className={css.burgerBtn} type="button" onClick={closeMenu}>
        <svg width="20" height="20">
          <use href="/sprite.svg#icon-x" className={css.xImage}></use>
        </svg>
      </button>

      <div className={css.authBlock}>
        <AuthFound context="BurgerMenu" />
      </div>
      <ul className={css.container}>
        <li>
          <NavLink to="/dictionary" className={css.link} onClick={closeMenu}>
            Dictionary
          </NavLink>
        </li>
        <li>
          <NavLink to="/recommend" className={css.link} onClick={closeMenu}>
            Recommend
          </NavLink>
        </li>
        <li>
          {isLoggedin && (
            <NavLink to="/training" className={css.link} onClick={closeMenu}>
              Training
            </NavLink>
          )}
        </li>
        <li>
          <button className={css.link} type="button" onClick={handleLogout}>
            Log Out
          </button>
        </li>
      </ul>
      <div className={css.imgBlock}>
        <img src="/home.png" alt="study people image" className={css.img} />
      </div>
    </div>
  );
}
