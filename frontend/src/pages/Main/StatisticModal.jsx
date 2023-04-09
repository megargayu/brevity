import StyledModal from "../../components/StyledModal";
import { useEffect, useState } from "react";

import { Box, Tabs, Tab } from "@mui/material";

import Calendar from "../../components/Calendar";
import Heatmap from "../../components/Heatmap";

import { API_URL } from "../../vars";
import dateToHeatmap from "../../util/dateToHeatmap";

const StatisticModal = ({ open, setOpen, taskStarted }) => {
  const [value, setValue] = useState(0);

  const [events, setEvents] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(API_URL + "events");
      const raw = await response.json();

      const newEvents = raw.map((val) => ({
        ...val,
        begin: new Date(val.begin),
        end: new Date(val.end),
      }));

      setEvents(newEvents);
      console.log(newEvents);
    })();
  }, [taskStarted]);

  return (
    <StyledModal
      open={open}
      onClose={() => setOpen(false)}
      className="w-5/6 h-5/6"
    >
      <Box className="w-full flex flex-row justify-center items-center h-10 space-x-3">
        <Tabs value={value} onChange={(e, val) => setValue(val)}>
          <Tab
            label="Calendar View"
            className="text-2xl  normal-case pb-3 font-bold"
          />
          <Tab
            label="Heatmap View"
            className="text-2xl  normal-case pb-3 font-bold"
          />
        </Tabs>
      </Box>

      {value === 0 && <Calendar events={events} />}
      {value === 1 && (
        <Heatmap
          data={Object.entries(
            events.reduce((result, val) => {
              const formatted = dateToHeatmap(val.begin);
              result[formatted] = ++result[formatted] || 1;
              return result;
            }, {})
          ).reduce((result, val) => {
            const [date, count] = val;
            result.push({ date, count });
            return result;
          }, [])}
        />
      )}
    </StyledModal>
    // <Modal
    //   open={open}
    //   onClose={() => setOpen(false)}
    // >
    //   <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5/6 h-5/6 bg-neutral-900 p-5 rounded-xl">
    //     <IconButton
    //       className="absolute top-3 right-3"
    //       onClick={() => setOpen(false)}
    //     >
    //       <CloseIcon className="w-8 h-8" />
    //     </IconButton>

    //     {children}
    //   </Box>
    // </Modal>
  );
};

export default StatisticModal;
