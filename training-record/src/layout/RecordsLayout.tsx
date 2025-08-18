import {Outlet} from "react-router";
import {useParams} from "react-router-dom";
import {Calendar} from "../component/Calendar.tsx";


export const RecordsLayout = () => {
  return (
    <div>
      This is the Records Layout.
      <Calendar />
      <Outlet />
    </div>
  )
}