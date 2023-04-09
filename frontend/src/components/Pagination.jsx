import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import secondsSinceDay from "../util/secondsSinceDay";

const Pagination = ({ currentText, onLeft, onRight }) => {
  return (
    <Box className="w-full flex flex-row justify-center items-center h-10 space-x-3">
      <IconButton className="text-[#d3caba]" onClick={onLeft}>
        <ChevronLeftIcon />
      </IconButton>
      <Typography className="text-[#d3caba] text-2xl min-w-[20rem] text-center">{currentText}</Typography>
      <IconButton className="text-[#d3caba] -ml-3" onClick={onRight}>
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default Pagination;
