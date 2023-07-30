import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Message from "./Message/Message";
import InputBox from "./InputBox/InputBox";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

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

interface AxiosError {
  response?: {
    status: number;
  };
}

export default function Chat() {
  const [messages, setMessages] = useState(startingMessages); // Create a state variable to keep track of messages
  const messageEndRef = useRef<HTMLDivElement>(null);

  async function addMessage(message: string, user: boolean): Promise<number> {
    // Create a new message object
    const newMessage = { message: message, user: user };

    // Add new message to messages array
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      // Send message to flask API using axios
      const response = await axios.post("/api/chat", { message: message });
      console.log(response);
      // strip first newline characters from response, but allow other newlines after that
      response.data.message = response.data.message.replace(/^\n+/, "");
      // Use function form to ensure you're working with the latest state
      setMessages((prevMessages) => [...prevMessages, response.data]);

      // Return the status code
      return response.status;
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
      if (err.response) {
        // The request was made and the server responded with a status code outside of the range of 2xx
        // remove the message from the messages array
        setMessages((prevMessages) => prevMessages.slice(0, -1));
        return err.response.status;
      }
      return -1; // Indicate an error occurred but not from the server's response
    }
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
          height: "85vh",
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
