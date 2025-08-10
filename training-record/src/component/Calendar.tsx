import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const today = new Date();

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = new Date(year, month, 1).getDay();
  const navigate = useNavigate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
  };

  // 日付セル生成
  const dates: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    dates.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    dates.push(d);
  }

  return (
    <div style={{ width: 320, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={prevMonth}>前月</button>
        <span>{year}年 {month + 1}月</span>
        <button onClick={nextMonth}>次月</button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
        <thead>
          <tr>
            <th>日</th>
            <th>月</th>
            <th>火</th>
            <th>水</th>
            <th>木</th>
            <th>金</th>
            <th>土</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(Math.ceil(dates.length / 7))].map((_, rowIdx) => (
            <tr key={rowIdx}>
              {dates.slice(rowIdx * 7, rowIdx * 7 + 7).map((date, colIdx) => (
                <td
                  key={colIdx}
                  style={{
                    border: "1px solid #ccc",
                    height: 32,
                    textAlign: "center",
                    cursor: date ? "pointer" : "default",
                    background:
                      date === today.getDate() && month === today.getMonth() && year === today.getFullYear()
                        ? "#e0f7fa"
                        : date === selectedDate
                        ? "#ffe082"
                        : undefined
                  }}
                  onClick={() => {
                    if (date) {
                      setSelectedDate(date);
                      navigate(`/records/${year}/${month + 1}/${date}`);
                    }
                  }}
                >
                  {date ? date : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
