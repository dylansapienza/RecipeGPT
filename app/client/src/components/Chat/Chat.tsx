import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Message from "./Message/Message";
import InputBox from "./InputBox/InputBox";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard/RecipeCard";

interface Message {
  message: string;
  user: boolean;
}

const startingMessages: Message[] = [
  {
    message: "Hello, are there any recipes or food you'd like to make?",
    user: false,
  },
];

interface RecipeCardProps {
  recipeTitle: string;
  base64recipeImage: string;
  recipeAuthor: string;
  recipeTime: string;
  sourcePdfPath: string;
}

// const recipe: RecipeCardProps = {
//   recipeTitle: "Chicken Parmesan",
//   base64recipeImage: "",
//   recipeAuthor: "Ali Saigle",
//   recipeTime: "1 hour",
//   sourec: "",
// };

interface AxiosError {
  response?: {
    status: number;
  };
}

interface recipe_json {
  title: string;
  author: string;
  cooktime: string;
}

interface llmResponse {
  message: string;
  recipe_json: recipe_json | string;
  recipe_image: string;
  source_pdf_path: string;
  user: boolean;
}

export default function Chat({
  addSavedRecipe,
}: {
  addSavedRecipe: (recipe: RecipeCardProps) => void;
}) {
  const [messages, setMessages] = useState(startingMessages); // Create a state variable to keep track of messages
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [recipe, setRecipe] = useState<RecipeCardProps | null>(null);

  async function addMessage(message: string, user: boolean): Promise<number> {
    // Create a new message object
    const newMessage = { message: message, user: user };

    // Add new message to messages array
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      // Send message to flask API using axios
      const response = await axios.post("/api/chat", { message: message });
      console.log(response);

      const llmResponseData: llmResponse = response.data;
      // strip first newline characters from response, but allow other newlines after that
      const chatResponse = llmResponseData.message.replace(/^\n+/, "");
      // Use function form to ensure you're working with the latest state

      const newMessage: Message = {
        message: chatResponse,
        user: false,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // if recipe is returned from LLM, update recipe card

      if (typeof llmResponseData.recipe_json !== "string") {
        setRecipe({
          recipeTitle: llmResponseData.recipe_json.title,
          recipeAuthor: llmResponseData.recipe_json.author,
          recipeTime: llmResponseData.recipe_json.cooktime,
          base64recipeImage: llmResponseData.recipe_image,
          sourcePdfPath: llmResponseData.source_pdf_path,
        });
      }

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
    <Grid xs={9}>
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

            {recipe && (
              <RecipeCard {...recipe} addSavedRecipe={addSavedRecipe} />
            )}
            <div ref={messageEndRef} />
          </Stack>
          <InputBox addMessage={addMessage} />
        </Sheet>
      </Sheet>
    </Grid>
  );
}
