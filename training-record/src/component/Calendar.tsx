import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import ja from "date-fns/locale/ja";
import {useParams} from "react-router-dom";

export const Calendar = () => {

  const {year, month, day} = useParams<{ year: string; month: string; day: string }>();

  const selectedDate = year && month && day ? new Date(Number(year), Number(month) - 1, Number(day)) : new Date();

  return (
    <div>
      <h1>Training Calendar</h1>
      <p>This is the calendar page.</p>
      <p>Here you can view and manage your training schedule.</p>
      <hr />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
        <DateCalendar value={selectedDate} />
      </LocalizationProvider>
    </div>
  );
}