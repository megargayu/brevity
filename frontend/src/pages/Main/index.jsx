import { useEffect, useState } from "react";

import { Box, Modal, Button, IconButton, Tabs, Tab } from "@mui/material";
import Typography from "@mui/material/Typography";

import Navbar from "../../components/Navbar";
import TaskList from "../../components/TaskList";
import Calendar from "../../components/Calendar";
import Heatmap from "../../components/Heatmap";

import CalendarIcon from "@mui/icons-material/CalendarToday";
import HeatmapIcon from "@mui/icons-material/ViewCompact";
import StatisticModal from "./StatisticModal";

import { API_URL } from "../../vars";

const Main = () => {
  const [tasks, setTasks] = useState([]);

  const [taskStarted, setTaskStarted] = useState(null);
  const [timeTaskStarted, setTimeTaskStarted] = useState(null);

  useEffect(() => {
    if (taskStarted === null) {
      if (timeTaskStarted !== null) {
      }

      setTimeTaskStarted(null);
      return;
    }

    setTimeTaskStarted(Date.now());
  }, [taskStarted]);

  const getTasks = async () => {
    const response = await fetch(API_URL + "todos/");
    const raw = await response.json();

    console.log("updated tasks");

    setTasks(raw.map((val) => ({ ...val, due_date: new Date(val.due_date) })));
  };

  useEffect(() => {
    getTasks();
  }, []);

  const [statisticsModalOpen, setStatisticsModalOpen] = useState(false);

  return (
    <>
      <Box className="w-full h-full bg-[#202020] flex flex-col">
        <Navbar
          timeTaskStarted={timeTaskStarted}
          openStatistics={() => setStatisticsModalOpen(true)}
        />
        <Box className="flex flex-row grow">
          <TaskList
            title="Inbox"
            tasks={tasks}
            updateTasks={getTasks}
            taskStarted={taskStarted}
            setTaskStarted={setTaskStarted}
            timeTaskStarted={timeTaskStarted}
          />

          <StatisticModal
            open={statisticsModalOpen}
            setOpen={setStatisticsModalOpen}
            taskStarted={taskStarted}
          />
        </Box>
      </Box>
    </>
  );
};

export default Main;
