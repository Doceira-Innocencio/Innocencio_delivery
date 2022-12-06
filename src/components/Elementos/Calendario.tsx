import { useState } from "react";
import { Calendar } from "react-calendar";

export default function Calendario() {
  const dates = [
    new Date("2022-12-24").toDateString(),
    new Date("2022-12-25").toDateString(),
  ];
  return (
    <div className="calendarioContainer">
      <Calendar
        locale="pt-br"
        tileClassName={({ date, view }) => {
          if (view === "month" && date.getDay() === 1) {
            return "fechado";
          } else {
            if (dates.includes(date.toDateString())) {
              return "spot";
            }
            return null;
          }
        }}
      />
    </div>
  );
}
