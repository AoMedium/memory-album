import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const styles = {
  colors: {
    fill: {
      primary: "rgb(83, 153, 251)",
      secondary: "white",
    },
    text: {
      primary: "white",
      secondary: "rgb(83, 153, 251)",
    },
  },
};

export default function AddEventButton() {
  return (
    <IconButton
      sx={{
        position: "absolute",
        bottom: "calc(2 * 30px)", // TODO: define as global page margin
        right: "calc(2 * 30px)",

        background: styles.colors.fill.secondary,
        color: styles.colors.text.secondary,

        ":hover": {
          background: styles.colors.fill.primary,
          color: styles.colors.text.primary,
        },
      }}
    >
      <Add sx={{ fontSize: "35px" }} />
    </IconButton>
  );
}
