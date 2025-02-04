import Dashboard from "../Dashboard/Dashboard";
import css from "./PageCower.module.css";
import { PaginatedItems } from "../PaginatedItems/PaginatedItems";
import { useSelector } from "react-redux";
import {
  selectDictionaryPage,
  selectRecommendPage,
} from "../../redux/words/selectors";
import { fetchWordsOwn, allWords } from "../../redux/words/operations";

export default function PageCower({ children }) {
  const dictionaryPage = useSelector(selectDictionaryPage);
  const recommendPage = useSelector(selectRecommendPage);

  return (
    <div className={css.cowerPage}>
      <div className={css.position}>
        <Dashboard />
        <div className={css.cowerTable}>{children}</div>
        <div className={css.pagination}>
          {location.pathname === "/dictionary" ? (
            <PaginatedItems
              items={dictionaryPage.items}
              totalPage={dictionaryPage.totalPage}
              currentPage={dictionaryPage.currentPage || 1}
              fetchAction={fetchWordsOwn}
            />
          ) : (
            <PaginatedItems
              items={recommendPage.items}
              totalPage={recommendPage.totalPage}
              currentPage={recommendPage.currentPage}
              fetchAction={allWords}
            />
          )}
        </div>
      </div>
    </div>
  );
}
