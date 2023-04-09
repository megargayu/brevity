import { createElement, useEffect, useState, useRef } from "react";
import { Box, IconButton, Typography, Button, Modal } from "@mui/material";

import formatDate from "../util/formatDate";
import { nanoid } from "nanoid";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBox from "@mui/icons-material/CheckBox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SellIcon from "@mui/icons-material/Sell";
import { StaticDatePicker } from "@mui/x-date-pickers";
import useOutsideAlerter from "../hooks/useOutsideAlerter";
import StyledModal from "./StyledModal";
import { API_URL } from "../vars";

const Tag = ({ icon, color, text }) => {
  return (
    <Box className="flex flex-row items-center space-x-1 -mt-1">
      {createElement(icon, {
        className: `w-4 ${color}`,
      })}
      <Typography className={`text-sm ${color}`}>{text}</Typography>
    </Box>
  );
};

const Task = ({ task, updateTasks, taskStarted, setTaskStarted, timeTaskStarted }) => {
  const [checked, setChecked] = useState(false);
  const [dueDatePickerOpen, setDueDatePickerOpen] = useState(false);
  const [dueDate, setDueDate] = useState(task.due_date);

  const dueDatePickerRef = useRef(null);
  useOutsideAlerter(dueDatePickerRef, () => setDueDatePickerOpen(false));

  let updater;
  useEffect(() => {
    clearTimeout(updater);

    updater = setTimeout(async () => {
      const response = await fetch(API_URL + "todos/" + task._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...task,
          due_date: dueDate.toISOString(),
        }),
      });

      console.log(await response.json());
    }, 1000);
  }, [dueDate]);

  useEffect(() => {
    (async () => {
      if (checked) {
        const response = await fetch(
          API_URL + "todos/" + task._id,
          {
            method: "DELETE",
          }
        );

        console.log(response);

        await updateTasks();
      }
    })();
  }, [checked]);

  const handleStopTask = async () => {
    setTaskStarted(null);

    console.log(task.title);

    // Post this event!
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        begin: new Date(timeTaskStarted).toISOString(),
        end: new Date().toISOString(),
        title: task.title,
      }),
    });

    console.log(await response.json());
  };

  const handleStartTask = () => {
    setTaskStarted(task._id);
  };

  return (
    <Box className="text-white py-1.5 px-1 border-b-0 border-x-0 border-neutral-700 border-solid flex flex-col">
      <Box className="flex flex-row items-center mr-0.5">
        <IconButton color="default" onClick={() => setChecked(!checked)}>
          {checked ? (
            <CheckBox className="h-6 w-6 text-neutral-500" />
          ) : (
            <CheckBoxOutlineBlankIcon className="h-6 w-6 text-neutral-600" />
          )}
        </IconButton>

        <Typography className="text-white">{task.title}</Typography>

        <Box className="relative grow">
          <Button
            className={`absolute right-0 ${
              taskStarted === task._id ? "bg-red-500" : "bg-blue-500"
            } text-white disabled:bg-neutral-500 disabled:text-neutral-300`}
            variant="contained"
            onClick={
              taskStarted === task._id ? handleStopTask : handleStartTask
            }
            disabled={taskStarted !== null && taskStarted !== task._id}
          >
            {taskStarted === task._id ? "Stop Task" : "Start Task"}
          </Button>
        </Box>
      </Box>
      <Box className="flex flex-row items-center space-x-4 ml-11">
        <Box className="relative">
          <Button onClick={() => setDueDatePickerOpen(!dueDatePickerOpen)}>
            <Tag
              icon={CalendarTodayIcon}
              color={dueDate > new Date() ? "text-green-500" : "text-red-500"}
              text={formatDate(dueDate)}
            />
          </Button>

          <Box
            className="absolute top-[2.3rem] left-0 z-10 bg-black"
            ref={dueDatePickerRef}
          >
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              sx={{ display: dueDatePickerOpen ? "initial" : "none" }}
              onChange={(val) => setDueDate(val.toDate())}
            />
          </Box>
        </Box>

        {task.tags.map((tag) => (
          <Tag
            icon={SellIcon}
            color="text-orange-500"
            text={tag}
            key={nanoid()}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Task;
