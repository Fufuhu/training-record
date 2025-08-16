import {Outlet} from "react-router";
import Calendar from "../component/Calendar.tsx";
import {useParams} from "react-router-dom";


export const RecordsLayout = () => {
  const {year, month, day} = useParams<{ year: string; month: string; day: string }>();
  return (
    <div>
      This is the Records Layout.
      <Calendar highlightYear={year} highlightMonth={month} highlightDay={day} />
      <Outlet />
    </div>
  )
}