import { nanoid } from "nanoid";

import {
  Box,
  Button,
  Modal,
  Typography,
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Chip,
} from "@mui/material";
import Task from "./Task";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import StyledModal from "./StyledModal";

import { API_URL } from "../vars";

const getToday = () => {
  return dayjs().hour(0).minute(0).second(0).millisecond(0);
};

const TaskList = ({
  title,
  tasks,
  updateTasks,
  taskStarted,
  setTaskStarted,
  timeTaskStarted
}) => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [addTitle, setAddTitle] = useState("");
  const [addDueDate, setAddDueDate] = useState(getToday());
  const [addTags, setAddTags] = useState([]);

  const closeModal = () => {
    setAddModalOpen(false);
    setAddTitle("");
    setAddDueDate(getToday());
    setAddTags([]);
  };

  const createTask = async () => {
    if (addTitle === "" || addDueDate === null) return;

    console.log({
      title: addTitle,
      due_date: addDueDate.toISOString(),
      tags: addTags,
    });

    const response = await fetch(API_URL + "todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: addTitle,
        due_date: addDueDate.toISOString(),
        tags: addTags,
      }),
    });

    console.log(await response.text());

    await updateTasks();
    closeModal();
  };

  return (
    <Box className="m-4 grow">
      <Typography
        component="h2"
        className="text-white mb-2 mt-5 font-bold text-xl"
      >
        {title}
      </Typography>

      <Box className="flex flex-col border-x-0 border-t-0 border-neutral-700 border-solid">
        {tasks.map((task) => (
          <Task
            task={task}
            key={nanoid()}
            updateTasks={updateTasks}
            taskStarted={taskStarted}
            setTaskStarted={setTaskStarted}
            timeTaskStarted={timeTaskStarted}
          />
        ))}
      </Box>

      <StyledModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        className="w-1/2 h-1/2"
      >
        <Typography className="text-white text-3xl font-bold">
          Add Task
        </Typography>

        <TextField
          fullWidth
          className="mt-8"
          label="Title"
          value={addTitle}
          onChange={(ev) => setAddTitle(ev.target.value)}
        />

        <Box className="flex flex-row space-x-5">
          <DatePicker
            label="Due Date"
            className="mt-12"
            value={addDueDate}
            onChange={(val) => setAddDueDate(val)}
          />
          <Box className="mt-6">
            <InputLabel id="demo-multiple-name-label">Tags</InputLabel>
            <Select
              label="Tags"
              multiple
              value={addTags}
              onChange={(ev) =>
                setAddTags(
                  typeof ev.target.value === "string"
                    ? ev.target.value.split(",")
                    : ev.target.value
                )
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              className="min-w-[20rem] h-14"
            >
              <MenuItem value="School">School</MenuItem>
              <MenuItem value="For Fun!">For Fun!</MenuItem>
              <MenuItem value="Extracurriculars">Extracurriculars</MenuItem>
            </Select>
          </Box>
        </Box>

        <Box className="flex w-full justify-center">
          <Button startIcon={<AddIcon />} className="mt-6" onClick={createTask}>
            Create Task
          </Button>
        </Box>
      </StyledModal>

      <Button
        startIcon={<AddIcon />}
        className="mt-2"
        onClick={() => setAddModalOpen(true)}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default TaskList;
