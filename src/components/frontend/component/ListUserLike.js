import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BackgroundLetterAvatars from './Avatar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '1px solid #aaa',
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

export default function TransitionsModal({ fontIcon, title, userName }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <span>
      <span onClick={handleOpen} >{fontIcon}</span>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 700,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography sx={{ color: "red" }} id="transition-modal-title" variant="h3" component="h2">
              Danh sách {title}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2, fontSize: "16px", fontWeight: "bold" }}>
              {
                userName ? userName.map((item) => {
                  return <div
                    style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
                  >
                    <BackgroundLetterAvatars name={item} />
                    <span style={{ paddingLeft: "10px" }}>{item}</span>
                  </div>
                }) : ""
              }
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </span>
  );
}