import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { nanoid } from "nanoid";
import secondsSinceDay from "../util/secondsSinceDay";
import Pagination from "./Pagination";
import isSameDay from "../util/isSameDay";
import getSunday from "../util/getSunday";
import daysAfter from "../util/daysAfter";
import { useState } from "react";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Event = ({ event }) => {
  const secondsToPx = (seconds, offset = 0) =>
    `max(calc(3rem * 24 / (24 * 60 * 60) * ${seconds} + ${offset}px), 1.5rem)`;

  return (
    <Box
      className="relative bg-blue-600 rounded-lg px-2"
      sx={{
        // Number of pixels (3rem * 24) divided by number of seconds in a day (24 * 60 * 60) multiplied by the actual second value of the date (100)
        top: secondsToPx(event.start),
        height: secondsToPx(event.length, -3),
        paddingTop: event.length >= 4000 ? "0.5rem" : "0.1rem",
      }}
    >
      <Typography className="text-white text-sm font-bold overflow-ellipsis line-clamp-1">
        {event.title}
      </Typography>
      {event.length >= 2500 && (
        <Typography className="text-white text-sm overflow-ellipsis line-clamp-1">
          {Math.round(event.length / 60 / 60 * 10) / 10} hour(s)
        </Typography>
      )}
    </Box>
  );
};

const CalendarRow = ({ date, events }) => {
  return (
    <Box className="grow basis-full h-[calc(3rem*24)] custom-grid border-l-0 border-y-0 border-solid border-r border-[#484848] pr-2">
      {events.map((event) =>
        isSameDay(event.begin, date) ? (
          <Event
            event={{
              start: secondsSinceDay(event.begin),
              length: secondsSinceDay(event.end) - secondsSinceDay(event.begin),
              title: event.title,
            }}
          />
        ) : (
          <></>
        )
      )}
    </Box>
  );
};

const Calendar = ({ events }) => {
  const [currentStartDate, setCurrentStartDate] = useState(
    getSunday(new Date())
  );

  return (
    <Box className="w-full flex flex-col mt-8 grow">
      <Pagination
        currentText={
          daysAfter(currentStartDate, 7).getMonth() !==
          currentStartDate.getMonth()
            ? `${
                monthNames[currentStartDate.getMonth()]
              } ${currentStartDate.getFullYear()} - ${
                monthNames[daysAfter(currentStartDate, 7).getMonth()]
              } ${daysAfter(currentStartDate, 7).getFullYear()}`
            : `${
                monthNames[currentStartDate.getMonth()]
              } ${currentStartDate.getFullYear()}`
        }
        onLeft={() => setCurrentStartDate(daysAfter(currentStartDate, -7))}
        onRight={() => setCurrentStartDate(daysAfter(currentStartDate, 7))}
      />

      <Box className="w-full flex flex-row mt-3">
        <Box className="w-20"></Box>
        <Box className="w-full flex flex-row grow pr-[calc(1rem+1px)]">
          {days.map((day, i) => (
            <Box className="grow basis-full">
              <Typography
                className="text-center mx-2 pb-2 uppercase font-bold text-[#d3caba]"
                key={nanoid()}
              >
                {day.substring(0, 3)}
              </Typography>
              <Typography
                className="text-center text-3xl mx-2 pb-2 uppercase text-[#d3caba]"
                key={nanoid()}
              >
                {daysAfter(currentStartDate, i).getDate()}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="h-[calc(83.33vh-16rem)] flex flex-row w-full overflow-auto mt-3">
        <Box className="flex flex-row w-full grow">
          <Box className="w-16 mr-2 mt-6">
            {[...Array(24).keys()].map((time) => (
              <Box className="h-12 flex items-center" key={nanoid()}>
                <Typography className="text-[#d3caba] text-right w-full capitalize text-xs font-extralight">
                  {(time % 12) + 1} {time >= 12 ? "PM" : "AM"}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box className="w-2 h-[calc(3rem*24)] custom-grid border-l-0 border-y-0 border-solid border-r border-[#484848]"></Box>

          <Box className="flex flex-row w-full grow">
            {[...Array(7).keys()].map((day) => (
              <CalendarRow
                date={daysAfter(currentStartDate, day)}
                events={events}
                key={nanoid()}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
