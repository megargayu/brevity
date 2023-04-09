import { Box, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import Pagination from "./Pagination";
import "react-calendar-heatmap/dist/styles.css";
import daysAfter from "../util/daysAfter";

const Heatmap = ({ data }) => {
  const [startDate, setStartDate] = useState(new Date("2023-01-02"));

  const [currentVal, setCurrentVal] = useState(null);

  return (
    <Box className="w-full grow h-[calc(75vh-2rem)] flex flex-col items-center">
      <Box className="w-3/4 flex flex-col mt-8 grow">
        <Pagination
          currentText={startDate.getFullYear()}
          onLeft={() => setStartDate(daysAfter(startDate, -365))}
          onRight={() => setStartDate(daysAfter(startDate, 365))}
        />

        <Tooltip
          title={
            currentVal !== null &&
            `${currentVal?.count} event(s) on ${currentVal?.date}.`
          }
          className="mt-2"
          followCursor
        >
          <Box>
            <CalendarHeatmap
              startDate={startDate}
              endDate={daysAfter(startDate, 365)}
              values={data}
              showWeekdayLabels={true}
              classForValue={(value) => {
                if (!value) return "fill-[#202020]";

                const values = [
                  "fill-green-400",
                  "fill-green-600",
                  "fill-green-700",
                  "fill-green-800",
                  "fill-green-900",
                ];

                return values[Math.min(value.count - 1, 4)];
              }}
              onMouseOver={(e, val) => {
                setCurrentVal(val);
              }}
            />
          </Box>
        </Tooltip>

        <Box className="mt-5 w-full grow bg-slate-700 rounded-xl flex justify-center items-center">
          <Typography className="text-white text-5xl">More Coming Soon!</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Heatmap;
