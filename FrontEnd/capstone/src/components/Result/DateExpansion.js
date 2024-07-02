import React, { useState } from "react";
import { format, addDays, subDays } from "date-fns";

function DateExpansion({ baseDate }) {
  const [userDate, setUserDate] = useState(baseDate);
  const [dates, setDates] = useState(generateDates(baseDate));
  const [selectedDate, setSelectedDate] = useState(null);

  function generateDates(baseDate) {
    const datesArray = [];
    for (let i = -3; i <= 3; i++) {
      datesArray.push({
        display: format(addDays(baseDate, i), "MMM d –") + format(addDays(baseDate, i + 53), "MMM d"),
        value: addDays(baseDate, i).toISOString().split('T')[0],
      });
    }
    return datesArray;
  }

  const handlePrevClick = () => {
    const newDate = subDays(userDate, 1);
    setUserDate(newDate);
    setDates(generateDates(newDate));
  };

  const handleNextClick = () => {
    const newDate = addDays(userDate, 1);
    setUserDate(newDate);
    setDates(generateDates(newDate));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Add your search logic here, using the selected date
    console.log("Search with date:", date);
  };

  return (
    <>
      <div className="flex flex-row items-center">
        <button onClick={handlePrevClick} className="nav-button">
          {"<"}
        </button>
        <div className="flex flex-row overflow-x-auto">
          {dates.map((date, index) => (
            <div key={index} className="date-container" onClick={() => handleDateClick(date.value)}>
              <div className="date-display">{date.display}</div>
              <div className="view-button">View</div>
            </div>
          ))}
        </div>
        <button onClick={handleNextClick} className="nav-button">
          {">"}
        </button>
      </div>
      <style jsx>{`
        .flex {
          display: flex;
        }
        .flex-row {
          flex-direction: row;
        }
        .items-center {
          align-items: center;
        }
        .nav-button {
          padding: 8px;
          background-color: #000;
          color: #fff;
          border: none;
          cursor: pointer;
        }
        .date-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px;
          margin: 4px;
          border: 1px solid #ddd;
          cursor: pointer;
        }
        .date-display {
          font-size: 14px;
          color: #234;
        }
        .view-button {
          font-size: 12px;
          color: #8592a6;
        }
      `}</style>
    </>
  );
}

export default DateExpansion;
