import { FiSettings } from "react-icons/fi"; 
import React, { useState, useEffect } from 'react';
import { Checkbox, Button, Dialog, DialogTitle, DialogContent, FormControlLabel } from '@mui/material';



const SettingsPopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);

  useEffect(() => {
    const savedAutoScroll = localStorage.getItem('autoScroll') === 'true';
    setAutoScroll(savedAutoScroll);
  }, []);

  const handleAutoScrollChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoScroll(event.target.checked);
    localStorage.setItem('autoScroll', String(event.target.checked));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button variant="outlined" onClick={handleClickOpen}>
      <FiSettings  >
        Open Settings
      </FiSettings>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={<Checkbox checked={autoScroll} onChange={handleAutoScrollChange} />}
            label="Auto Scroll"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SettingsPopup;
