import {
  ChevronLeft,
  ChevronRight,
  History,
  Image,
  MoreVert,
  Search,
  Settings,
  Share,
} from "@mui/icons-material";
import { Box, IconButton, List } from "@mui/material";
import { useState } from "react";
import SidebarItem from "./sidebar-item";
import SidebarDivider from "./sidebar-divider";

const styles = {
  sidebar: {
    marginLeft: "30px",
    animationLength: "225ms",
  },
  openSidebarButton: {
    padding: "8px",
  },
};

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={[
          {
            position: "absolute", // TODO: check if this is appropriate for avoiding collision with sidebar
            top: "50%",
            left: styles.openSidebarButton.padding,
            padding: styles.openSidebarButton.padding,
            transform: "translateY(-50%)",
            background: "white",
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
          open && { display: "none" },
        ]}
      >
        <ChevronRight />
      </IconButton>
      <Box
        id="sidebar"
        sx={[
          {
            margin: `auto ${styles.sidebar.marginLeft}`,
            background: "white", // TODO: replace with theme paper color
            width: "fit-content",
            height: "fit-content",

            boxSizing: "border-box",
            transform: "none",
            transition: `transform ${styles.sidebar.animationLength} cubic-bezier(0, 0, 0.2, 1)`, // From MUI Drawer

            opacity: 0.9,
            visibility: "visible",
            borderRadius: "10px",
            boxShadow: "4px 4px 10px rgba(0,0,0,0.25)", // TODO: replace with theme for all box shadows
          },
          !open && {
            transform: `translateX(calc(-100% - ${styles.sidebar.marginLeft}))`,
            transition: `transform ${styles.sidebar.animationLength} cubic-bezier(0, 0, 0.2, 1), opacity ${styles.sidebar.animationLength}, visibility 1s`, // From MUI Drawer
            opacity: 0,
            visibility: "hidden",
          },
        ]}
      >
        <List
          sx={{
            padding: 0,
          }}
        >
          <SidebarItem icon={<ChevronLeft />} onClick={handleDrawerClose} />
          <SidebarItem text="Search" icon={<Search />} />
          <SidebarDivider />
          <SidebarItem text="Events" icon={<Image />} />
          <SidebarItem text="Timeline" icon={<History />} />
          <SidebarDivider />
          <SidebarItem text="Share" icon={<Share />} />
          <SidebarItem text="Settings" icon={<Settings />} />
          <SidebarItem text="More" icon={<MoreVert />} />
        </List>
      </Box>
    </Box>
  );
}
