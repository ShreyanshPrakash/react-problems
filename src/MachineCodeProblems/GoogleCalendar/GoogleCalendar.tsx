import { fillTheDates, getFirstDayOfMonth } from "./utils";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Styles = styled.div`
  .actions-header {
    display: flex;
    justify-content: space-around;
  }
`;

const Calendar = styled.div`
  width: 700px;
  height: 500px;

  display: grid;
  grid-template: repeat(5, 1fr) / repeat(7, 1fr);
  grid-gap: 8px;
`;

const Cell = styled.div`
  background-color: white;
  place-content: center;
  color: black;
  border-radius: 8px;
  cursor: pointer;

  &.empty-cell {
    opacity: 0.1;
  }

  &.cell-header {
    opacity: 0.4;
  }

  .event {
    background-color: lightgreen;
    margin: 4px;
    border-radius: 8px;
  }
`;

const CalendarHeader = styled.div`
  width: 700px;
  height: 100px;
  margin: 24px 0px;

  display: grid;
  grid-template: repeat(1, 1fr) / repeat(7, 1fr);
  grid-gap: 8px;
`;

const MonthTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const DEFAULTS = {
  WEEK_HEAD_SMALL: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  MONTH_HEAD_SMALL: [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ],
  CALENDAR_SIZE: 7 * 5,
};

export const GoogleCalendar = () => {
  const [cells, setCells] = useState(new Array(DEFAULTS.CALENDAR_SIZE).fill(1));
  const [activeDate, setActiveDate] = useState(new Date());
  const [eventsMap, setEventsMap] = useState(new Map());

  useEffect(() => {
    handleMonthChange();
  }, [activeDate]);

  const handleMonthChange = () => {
    const firstDayOfMonth = getFirstDayOfMonth(activeDate);
    const arragedDaysOfMonth = fillTheDates(
      firstDayOfMonth,
      DEFAULTS.CALENDAR_SIZE
    );
    setCells(arragedDaysOfMonth);
  };

  /*
    Actions Methods
  */

  const getActiveMonthLabel = () => {
    const month = DEFAULTS.MONTH_HEAD_SMALL[activeDate.getMonth()];
    const year = activeDate.getFullYear();
    return `${month} - ${year}`;
  };

  const handlePrevClick = () => {
    let currentMonth = activeDate.getMonth();
    let currentYear = activeDate.getFullYear();
    // [MAIN]
    if (currentMonth === 0) {
      currentMonth = 12;
      currentYear--;
    }
    const str = `${currentMonth}/1/${currentYear}`;
    const prevMonthDate = new Date(str);

    setActiveDate(prevMonthDate);
  };

  const handleNextClick = () => {
    let currentMonth = activeDate.getMonth();
    let currentYear = activeDate.getFullYear();
    // [MAIN]
    if (currentMonth === 11) {
      currentMonth = 1; // Even though index starts at 0, this should be 1
      // y ? cause I am using string to pass in the Date constructor.
      // There we need 1 for jan
      currentYear++;
    } else {
      currentMonth = currentMonth + 2;
    }

    const str = `${currentMonth}/1/${currentYear}`;
    const nextMonthDate = new Date(str);
    setActiveDate(nextMonthDate);
  };

  /*
    Cell Methods
  */

  const getEventForTheDay = (monthDay: number, date: Date = activeDate) => {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const str = `${currentMonth}/${monthDay}/${currentYear}`;
    const events = eventsMap.get(str);

    return events || "";
  };

  const handleCellClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const id = event.currentTarget.getAttribute("data-id");
    const currentMonth = activeDate.getMonth();
    const currentYear = activeDate.getFullYear();

    const str = `${currentMonth}/${id}/${currentYear}`;
    const eventsMapCopy = new Map(eventsMap);
    eventsMapCopy.set(str, str);
    setEventsMap(eventsMapCopy);
  };

  return (
    <Styles>
      <div className="actions-header">
        <button onClick={handlePrevClick}>{"<"}</button>
        <MonthTitle>{getActiveMonthLabel()}</MonthTitle>
        <button onClick={handleNextClick}>{">"}</button>
      </div>
      <CalendarHeader className="calendar-wrapper">
        {DEFAULTS.WEEK_HEAD_SMALL.map((cell: string, index: number) => {
          return (
            <Cell key={index} className="cell-item cell-header">
              <span>{cell}</span>
            </Cell>
          );
        })}
      </CalendarHeader>
      <Calendar className="calendar-wrapper">
        {cells.map((cell: number, index: number) => {
          return (
            <Cell
              key={index}
              className={`cell-item ${!cell && "empty-cell"}`}
              onClick={handleCellClick}
              data-id={cell}
            >
              <div>{cell}</div>
              <div className="event">{getEventForTheDay(cell)}</div>
            </Cell>
          );
        })}
      </Calendar>
    </Styles>
  );
};
