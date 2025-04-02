import {
  ChevronLeft,
  ChevronRight,
  History,
  Image,
  MoreVert,
  Search,
  Settings,
  Share,
} from '@mui/icons-material';
import { Box, IconButton, List } from '@mui/material';
import { useState } from 'react';
import SidebarItem from './sidebar-item';
import SidebarDivider from './sidebar-divider';
import { styles } from '@/config/constants';
import { useDispatch } from 'react-redux';
import { setListPanelOpen } from '@/state/event/event-list-slice';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  function handleEventListOpen() {
    console.log('open');
    dispatch(setListPanelOpen(true));
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={[
          {
            position: 'absolute', // TODO: check if this is appropriate for avoiding collision with sidebar
            top: '50%',
            left: '8px',
            padding: '8px',
            transform: 'translateY(-50%)',
            background: (theme) => theme.palette.background.paper,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
          open && { display: 'none' },
        ]}
      >
        <ChevronRight />
      </IconButton>
      <Box
        id="sidebar"
        sx={[
          {
            margin: `auto ${styles.viewport.margin}`,
            background: 'white', // TODO: replace with theme paper color
            width: 'fit-content',
            height: 'fit-content',

            boxSizing: 'border-box',
            transform: 'none',
            transition: `transform ${styles.transition.duration} cubic-bezier(0, 0, 0.2, 1)`, // From MUI Drawer

            opacity: 0.9,
            visibility: 'visible',
            borderRadius: '10px',
            boxShadow: (theme) => theme.shadows[4],
          },
          !open && {
            transform: `translateX(calc(-100% - ${styles.viewport.margin}))`,
            transition: `
              transform ${styles.transition.duration} cubic-bezier(0, 0, 0.2, 1), 
              opacity ${styles.transition.duration}, visibility 1s`, // From MUI Drawer
            opacity: 0,
            visibility: 'hidden',
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
          <SidebarItem
            text="Events"
            icon={<Image />}
            onClick={handleEventListOpen}
          />
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
