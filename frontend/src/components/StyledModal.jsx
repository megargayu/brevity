import { Box, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StyledModal = ({ open, onClose, children, className }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className={`${className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-900 p-5 rounded-xl`}>
        <IconButton
          className="absolute top-3 right-3"
          onClick={onClose}
        >
          <CloseIcon className="w-8 h-8" />
        </IconButton>

        {children}
      </Box>
    </Modal>
  );
};

export default StyledModal;