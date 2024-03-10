import ImageIcon from "@mui/icons-material/Image";
import React, { FormEvent, useEffect, useState } from "react";

import {
  Box,
  TextField,
  IconButton,
  useMediaQuery,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Avatar,
  Dialog,
  InputAdornment,
  CircularProgress,
  LinearProgress,
  Button,
  Grid,
  Chip,
  Paper,
  FormControlLabel,
  Grow,
  Switch,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useGigaAI from "../GIGAI_SDK/core/frontend/react";
import CodeBlock from "./Markdown";
import Navbar from "./Navbar";
import AppImages, { ImageFile } from "./Images";
import QueryButton from "./Detalis/Query";
import CodeResult from "./Detalis/CodeInterpreters";
import UrlTracker from "./Detalis/Search";
// Welcome :) 
const Start = () => {
  return (
    <Box
      bgcolor={"#262626"}
      borderRadius={4}
      borderBottom={1}
      borderColor={"#313131"}
      p={2}
      mb={2}
      width="fit-content"
      maxWidth="95%"
      alignSelf="flex-start"
      sx={{ whiteSpace: "break-spaces", overflowWrap: "break-word" }}
    >
      <Avatar src={`https://main.gigasoft.com.pl/logo.png`} />
      <Box sx={{ mt: 1, p: 2 }}>
        Hello, how i can help You today? {"\n"}
        Do you have any problem?
      </Box>
      <Button sx={{ ml: 1 }} variant="contained"
        onClick={() => window.location.href = "https://main.gigasoft.com.pl/m/contact"}
      >FeedBack </Button>

      <Box sx={{ mt: 1 }}>
        <Button onClick={() => window.location.href = "https://main.gigasoft.com.pl/m/API"}>
          Create Your Api Key
        </Button>
      </Box>

    </Box>
  )
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Chat() {
  const storedMessages = JSON.parse(
    typeof window !== "undefined"
      ? localStorage.getItem("messages") || "[]"
      : "[]"
  );
  const [images, setImages] = useState<ImageFile[]>([]);
  const [model, setModel] = useState(() => {
    const storedModel =
      typeof window !== "undefined" ? localStorage.getItem("model") : "";
    return storedModel || "";
  });

  const [apiKey, setApiKey] = useState(() => {
    const storedApiKey =
      typeof window !== "undefined" ? localStorage.getItem("apiKey") : "";
    return storedApiKey || "";
  });
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event as unknown as FormEvent<HTMLFormElement>);
    }
  };

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useGigaAI({
    api: "AI/api/chat",
    initialMessages: storedMessages,
    additionalData: {
      images: images[0]?.preview || undefined,
      model,
      apiKey,
    },
  })
  useEffect(() => {
    if (model !== "") {
      localStorage.setItem("model", model);
    }
  }, [model]);

  useEffect(() => {
    localStorage.setItem("apiKey", apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
    if (isLoading)
      setImages([])
  }, [messages]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isImagesPopupOpen, setImagesPopupOpen] = useState(false);

  const toggleImagesPopup = () => {
    setImagesPopupOpen(!isImagesPopupOpen);
  };

  const clearMessages = () => {
    stop();
    localStorage.removeItem("messages");
    window.location.reload();
  };




  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar
        model={model}
        setModel={setModel}
        apiKey={apiKey}
        setApiKey={setApiKey}
        clearMessages={clearMessages}
        isMobile={isMobile}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          boxSizing: "border-box",
          mt: 4,
          pb: isMobile ? "20%" : "10%",
        }}
      >
        <Box
          sx={{
            mt: 7,
            flexGrow: 1,
            overflow: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.length === 0 && (<Start></Start>)}
          {messages.map((m, index) => (
            <Box
              key={index}
              bgcolor={m.role === "user" ? "#262626" : "#232424"}
              borderRadius={4}
              borderBottom={1}
              borderColor={"#313131"}
              p={2}
              mb={2}
              width="fit-content"
              maxWidth="95%"
              alignSelf={m.role === "user" ? "flex-end" : "flex-start"}
              sx={{ whiteSpace: "break-spaces", overflowWrap: "break-word" }}
            >
              {m.role === "user" ? (
                <div style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}>
                  <Avatar />
                  {m.content}{" "}
                </div>
              ) : (
                <div>
                  <Box sx={{ m: 1, p: 1 }}>

                    <Avatar src={`https://main.gigasoft.com.pl/logo.png`} />
                    {/*Old detalis, working on data! Shit */}
                    {/*<Details data={data} id={m.id}></Details>*/}

                    <Chip sx={{ mt: 1 }} label={m.ExternID}></Chip>
                    {m.model && (
                      <Box sx={{ m: 1 }}>
                        <Paper
                          variant="outlined"
                          sx={{
                            p: 1,
                            backgroundColor: "#2a2a2a",
                          }}
                        >
                          Model: {m.model}
                        </Paper>
                      </Box>
                    )}
                    {m.web?.Query && (
                      <QueryButton Query={m.web?.Query} />
                    )}
                    {m.code?.Python3_result && (
                      <CodeResult Code={m.code?.Python3_result} Type={"python"} />
                    )}
                    {m.code?.php_result && (
                      <CodeResult Code={m.code?.php_result} Type={"php"} />
                    )}
                    {m.web?.Analyzing_URL && (
                      <UrlTracker url={m.web.Analyzing_URL} />
                    )}
                  </Box>
                  <CodeBlock text={m.content} />
                </div>
              )}
            </Box>
          ))}
        </Box>

        {model !== "GigAI-v1" && (
          <Dialog
            open={isImagesPopupOpen}
            onClose={toggleImagesPopup}
            fullWidth
            maxWidth="sm"
          >
            <AppImages images={images} setImages={setImages} />
          </Dialog>
        )}
        {isLoading && (
          <div>
            <Box sx={{ position: "center" }}>
              <Box
                bgcolor={"#232424"}
                borderRadius={4}
                sx={{
                  position: "fixed",
                  bottom: "100px",
                  left: "30px",
                }}
              >
                <Button onClick={stop}>Stop Generating</Button>
              </Box>
            </Box>
          </div>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: isMobile ? "10px" : "20px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "background.paper",
            zIndex: 1000,
          }}
        >
          <TextField
            fullWidth
            placeholder="Say something..."
            autoComplete="off"
            value={input}
            disabled={isLoading}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            multiline
            sx={{ mr: 1, flex: 1, overflow: "auto" }}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "primary.main" }} />
            ) : (
              <>
                {model !== "GigAI-v1" && (
                  <IconButton onClick={toggleImagesPopup} disabled={isLoading}>
                    <ImageIcon />
                  </IconButton>
                )}
                <IconButton type="submit" color="primary" disabled={isLoading}>
                  <SendIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
