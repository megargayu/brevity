import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import secondsToString from "../util/secondsToString";

const Navbar = ({ timeTaskStarted, openStatistics }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [timeElapsed, setTimeElapsed] = useState(0);

  let updater;
  useEffect(() => {
    clearInterval(updater);
    setTimeElapsed(0);

    updater = setInterval(() => {
      setTimeElapsed(Math.floor((new Date() - timeTaskStarted) / 1000));
    }, 500);

    return () => clearInterval(updater);
  }, [timeTaskStarted]);

  return (
    <div className="w-full h-12 bg-[#282828] p-2 px-5 flex flex-row space-x-10 items-center">
      <Typography className="text-white ">brevity</Typography>
      <Box className="w-full flex flex-row space-x-4">
        <Box className="grow flex justify-end items-center">
          {timeTaskStarted !== null && (
            <Tooltip title="Time elapsed doing this task">
              <Box className="flex flex-row rounded bg-opacity-20 bg-black py-1.5 px-3">
                <AccessTimeIcon className="text-white mr-3" />
                <Typography className="text-white">
                  {secondsToString(timeElapsed)}
                </Typography>
              </Box>
            </Tooltip>
          )}
        </Box>

        <Tooltip title="Open Statistics">
          <IconButton onClick={openStatistics}>
            <AssessmentIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  );
};

export default Navbar;
