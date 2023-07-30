import React, { useState } from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { CircularProgress } from "@mui/joy";

export default function InputBox({
  addMessage,
}: {
  addMessage: (message: string, user: boolean) => void;
}) {
  // Create a state variable to keep track of input value
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function submitMessage() {
    if (inputValue === "") {
      return;
    } else {
      setIsLoading(true);
      addMessage(inputValue, true);
      setIsLoading(false);
      setInputValue("");
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      submitMessage();
    }
  }

  return (
    <>
      <Input
        sx={{ mx: 30, mt: 2, mb: 2, zIndex: 1, boxShadow: "sm" }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown} // Added this to handle the Enter key press
        endDecorator={
          <Button
            onClick={() => submitMessage()}
            disabled={inputValue === "" || isLoading}
          >
            {isLoading ? (
              <CircularProgress variant="soft" color="neutral" thickness={3} />
            ) : (
              <SendRoundedIcon />
            )}
          </Button>
        }
      />
    </>
  );
}
