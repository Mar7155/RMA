import React, { useState } from "react";
import type { ChangeEventHandler } from "react";
import { setHours, setMinutes } from "date-fns";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';

const MyCalendar = () => {
  const [selected, setSelected] = useState<Date>();
  const [timeValue, setTimeValue] = useState<string>("00:00");

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    setSelected(newSelectedDate);
    setTimeValue(time);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setSelected(date);
      return;
    }
    const [hours, minutes] = timeValue.split(":").map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );
    setSelected(newDate);
  };

  const handleReserveClick = () => {
    if (selected) {
      alert(`Tu reservación se hizo para el día y hora ${selected?.toLocaleString()}`);
      window.location.href = "/Clases";
    } else {
      alert("Por favor, selecciona una fecha y una hora.");
    }
  };

  return (
    <div className="calendar-container">
      <h2>Selecciona una Fecha y Hora</h2>

      {/* Selector de hora */}
      <form style={{ marginBlockEnd: "1em" }}>
        <label>
          Elige la hora:{" "}
          <input type="time" value={timeValue} onChange={handleTimeChange} />
        </label>
      </form>

      {/* Selector de día */}
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleDaySelect}
        fromDate={new Date()}
        footer={`Fecha seleccionada: ${selected ? selected.toLocaleString() : "ninguna"}`}
        className="day-picker" 
      />

      <button className="reserve-btn" onClick={handleReserveClick}>
        Reservar
      </button>
    </div>
  );
};

export default MyCalendar;
