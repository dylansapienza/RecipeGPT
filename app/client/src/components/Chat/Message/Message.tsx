import Divider from "@mui/joy/Divider";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import LocalDiningRoundedIcon from "@mui/icons-material/LocalDiningRounded";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import Box from "@mui/material/Box"; // Importing Box component

interface messageProps {
  message: string;
  user: boolean;
}

export default function Message({
  messageProps,
}: {
  messageProps: messageProps;
}) {
  const backgroundColor = messageProps.user ? "#C9DDF8" : "#C2EFE6";
  const icon = messageProps.user ? (
    <Person2RoundedIcon />
  ) : (
    <LocalDiningRoundedIcon />
  );

  return (
    <>
      <Sheet
        sx={{
          px: 3,
          py: 1.5,
          mx: 1,
          backgroundColor: backgroundColor,
          display: "flex",
          flexDirection: "row",
          alignItems: "center", // Center items vertically
          wordBreak: "break-word",
        }}
      >
        {/* Inline icon in front of message with a box around it */}
        <Box
          sx={{
            border: "2px solid black",
            borderRadius: "0.5rem",
            p: 0.5,
            mr: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-start", // This will make the icon align to the top when the message wraps to multiple lines
          }}
        >
          {icon}
        </Box>
        <Typography
          sx={{
            whiteSpace: "pre-line",
          }}
        >
          {messageProps.message}
        </Typography>
      </Sheet>

      <Divider sx={{ mx: 1 }} />
    </>
  );
}
