import css from "./Dashboard.module.css"
import Filters from "./Filters/Filters";
import Statistics from "./Statistics/Statistics";

export default function Dashboard() {
    
    return (
      <div className={css.dashBoardCower}>     
        <Filters />
        <Statistics />
      </div>
    );
}