import { useParams } from "react-router-dom";
import Calendar from "../component/Calendar.tsx";

export const Records = () => {
  const { year, month, day } = useParams();
  return (
    <div>
      <h1>Training Records</h1>
      <p>This is the records page.</p>
      <p>Here you can view and manage your training records.</p>
      <hr />
      <div>
        <strong>選択された日付:</strong>
        <div>年: {year}</div>
        <div>月: {month}</div>
        <div>日: {day}</div>
      </div>
      <Calendar />
    </div>
  );
}