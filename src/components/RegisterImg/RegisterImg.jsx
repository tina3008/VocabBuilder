import css from "./RegisterImg.module.css";

export default function RegisterImg() {
  return (
    <div className={css.mainImg}>
      <img
        src="/home.png"
        alt="study people image"
        className={css.imgRegister}
      />
      <div className={css.imgfon}>   
      </div>
      {location.pathname === "/login" && (<p className={css.imgTxt}>Word · Translation · Grammar · Progress</p>)}
    </div>
  );
}
