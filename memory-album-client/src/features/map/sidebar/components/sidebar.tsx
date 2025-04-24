import {
  ChevronLeft,
  History,
  Image,
  MoreVert,
  Search,
  Settings,
  Share,
} from '@mui/icons-material';
import { Box, List } from '@mui/material';
import { useState } from 'react';
import SidebarItem from './sidebar-item';
import SidebarDivider from './sidebar-divider';
import { styles } from '@/config/constants';
import { useDispatch } from 'react-redux';
import { setListPanelOpen } from '@/state/event/event-list-slice';
import OpenSidebarButton from './open-sidebar-button';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  function handleSidebarOpen() {
    setOpen(true);
  }

  function handleSidebarClose() {
    setOpen(false);
  }

  function handleEventListOpen() {
    console.log('open');
    dispatch(setListPanelOpen(true));
  }

  return (
    <>
      {/* FIXME: open flag stopping animation from playing */}
      {open && (
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            height: '100vh',
          }}
        >
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
              <SidebarItem
                icon={<ChevronLeft />}
                onClick={handleSidebarClose}
              />
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
      )}
      <OpenSidebarButton open={open} handleSidebarOpen={handleSidebarOpen} />
    </>
  );
}
