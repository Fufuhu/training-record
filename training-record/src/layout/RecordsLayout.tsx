import {Outlet} from "react-router";
import {TopBar} from "../component/TopBar.tsx";

export const RecordsLayout = () => {



  return (
    <div>
      <TopBar/>
      <Outlet />
    </div>
  )
}