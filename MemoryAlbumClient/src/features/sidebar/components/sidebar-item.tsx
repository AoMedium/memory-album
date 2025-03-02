import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { JSX, useState } from "react";

interface SidebarItemProps {
  text?: string;
  icon: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export default function SidebarItem(props: SidebarItemProps) {
  const [isVisible, setVisible] = useState(false);

  return (
    <ListItem sx={{ justifyContent: "center" }} key={props.text} disablePadding>
      <ListItemButton
        sx={{ padding: "15px", borderRadius: "10px" }}
        onClick={props.onClick}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: "center",
          }}
        >
          {props.icon}
        </ListItemIcon>
        {props.text && (
          <ListItemText
            sx={[
              {
                position: "absolute",
                left: "110%",
                background: "white",
                borderRadius: "10px",
                padding: "8px 20px",
                boxShadow: "4px 4px 10px rgba(0,0,0,0.25)",

                transition: "opacity 225ms, visibility 225ms",
              },
              isVisible && {
                opacity: 1,
                visibility: "visible",
              },
              !isVisible && {
                opacity: 0,
                visibility: "hidden",
              },
            ]}
            disableTypography // Disable default nested Typography component
          >
            <Typography
              sx={{
                fontSize: "14px",
                color: "grey",
              }}
            >
              {props.text}
            </Typography>
          </ListItemText>
        )}
      </ListItemButton>
    </ListItem>
  );
}
