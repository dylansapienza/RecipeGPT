import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Message from "./Message/Message";
import InputBox from "./InputBox/Inputbox";
import React, { useState, useRef, useEffect } from "react";

const startingMessages = [
  { message: "Hello", user: true },
  { message: "Hi", user: false },
  { message: "How are you?", user: true },
  { message: "Good, you?", user: false },
  { message: "I'm good", user: true },
  { message: "That's good", user: false },
  { message: "What are you doing?", user: true },
  { message: "Nothing much", user: false },
];

export default function Chat() {
  const [messages, setMessages] = useState(startingMessages); // Create a state variable to keep track of messages
  const messageEndRef = useRef<HTMLDivElement>(null);

  function addMessage(message: string, user: boolean) {
    // Create a new message object
    const newMessage = { message: message, user: user };
    // Add new message to messages array
    setMessages([...messages, newMessage]);
  }

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Grid xs={10}>
      <Sheet
        sx={{
          height: "90vh",
          mx: "auto", // margin left & rights
          my: 1, // margin top & bottom
          pt: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
      >
        <div>
          <Typography level="h4" sx={{ px: 1 }}>
            Recipe Chat
          </Typography>
        </div>
        <Sheet
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // This pushes children apart
            backgroundColor: "#f7f7f7",
            borderRadius: "sm",
          }}
        >
          <Stack
            sx={{
              flexGrow: 1,
              overflowY: "auto", // Add vertical scroll
              maxHeight: "calc(90vh - 12vh)", // You'll need to adjust some_offset_value to account for header space, input box space, etc.
            }}
          >
            {messages.map(
              (
                message,
                index // Added an index as key for React's list rendering
              ) => (
                <Message key={index} messageProps={message} />
              )
            )}
            <div ref={messageEndRef} />
          </Stack>
          <InputBox addMessage={addMessage} />
        </Sheet>
      </Sheet>
    </Grid>
  );
}
