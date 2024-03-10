import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const HandleToMail = () => {
  window.location.href = "https://main.gigasoft.com.pl/m/contact";
};

const Navbar = ({
  model,
  setModel,
  apiKey,
  setApiKey,
  clearMessages,
  isMobile,
}: any) => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  async function fetchModels() {
    const response = await fetch("https://main.gigasoft.com.pl/v2/chat/completions");
    if (response.ok) {
      const json = await response.json();
      setModels(json.models);
    }
  }
  useEffect(() => {
    fetchModels();
  }, []);
  useEffect(() => {
    if (models.length > 0 ) {
      setSelectedModel(models[0]);
    }
  }, [models, model]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleModelChange = (event: { target: { value: any } }) => {
    setModel(event.target.value);
  };

  const handleApiKeyChange = (event: { target: { value: any } }) => {
    setApiKey(event.target.value);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <img
          src="https://gigasoft.com.pl/logo.png"
          alt="logo"
          style={{ marginRight: 20, height: "40px" }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GigaSoft
        </Typography>
        {!isMobile && (
          <>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="model-select-label">Model</InputLabel>
              <Select
                labelId="model-select-label"
                id="model-select"
                value={model}
                onChange={handleModelChange}
                label="Model"
              >
                {models.map((model) => (
                  <MenuItem key={model} value={model}>
                    {model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {model !== models[0] && (
              <TextField
                id="api-key-input"
                label="API Key"
                variant="filled"
                type="password"
                value={apiKey}
                onChange={handleApiKeyChange}
                sx={{ marginRight: 2 }}
              />
            )}
            <Button onClick={clearMessages}>Clear Messages</Button>
            <Button onClick={HandleToMail}>Help</Button>
          </>
        )}
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem button>
              <ListItemText primary="Clear Messages" onClick={clearMessages} />
            </ListItem>
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="model-select-label">Model</InputLabel>
              <Select
                labelId="model-select-label"
                id="model-select"
                value={model}
                onChange={handleModelChange}
                label="Model"
                type="password"

              >
                {models.map((model) => (
                  <MenuItem key={model} value={model}>
                    {model}
                  </MenuItem>
                ))}{" "}
              </Select>
            </FormControl>
            {model !== models[0] && (
              <TextField
                id="api-key-input"
                label="API Key"
                variant="filled"
                value={apiKey}
                onChange={handleApiKeyChange}
                sx={{ marginRight: 4, marginLeft:1}}
              />
            )}
            <Button sx={{ml:1}} onClick={HandleToMail}>Help</Button>

          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
