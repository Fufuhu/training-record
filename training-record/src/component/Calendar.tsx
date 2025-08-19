import {DateCalendar, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import ja from "date-fns/locale/ja";
import {useParams, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

export const Calendar = () => {

  const {year, month, day} = useParams<{ year: string; month: string; day: string }>();
  const navigate = useNavigate();

  const selectedDate = year && month && day ? new Date(Number(year), Number(month) - 1, Number(day)) : new Date();

  const changeDay = (diff: number) => {
    const base = selectedDate instanceof Date ? selectedDate : new Date();
    const newDate = new Date(base);
    newDate.setDate(base.getDate() + diff);
    navigate(`/records/${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}`);
  };

  return (
    <div>
      <h1>Training Calendar</h1>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => changeDay(-1)}
          >
            Prev Day
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const today = new Date();
              navigate(`/records/${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`);
            }}
          >
            Today
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => changeDay(1)}
          >
            Next Day
          </Button>
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
          <DateCalendar
            value={selectedDate}
            onChange={(date) => {
              if (date) {
                navigate(`/records/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`);
              }
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}