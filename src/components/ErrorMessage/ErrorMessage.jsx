import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
    return (
      <div className={css.noFound}>
        <p className={css.noFound}>
          Whoops, something went wrong! Please try reloading this page!
        </p>txp
      </div>
    );
}