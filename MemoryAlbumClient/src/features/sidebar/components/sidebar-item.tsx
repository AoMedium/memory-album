import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { JSX } from "react";

interface SidebarItemProps {
  text?: string;
  icon: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export default function SidebarItem(props: SidebarItemProps) {
  return (
    <ListItem sx={{ justifyContent: "center" }} key={props.text} disablePadding>
      <ListItemButton
        sx={{ padding: "15px", borderRadius: "10px" }}
        onClick={props.onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: "center",
          }}
        >
          {props.icon}
        </ListItemIcon>
        {/* <ListItemText primary={props.text} /> */}
      </ListItemButton>
    </ListItem>
  );
}
