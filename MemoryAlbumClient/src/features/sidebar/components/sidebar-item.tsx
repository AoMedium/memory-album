import { styles } from '@/config/constants';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { JSX, useState } from 'react';

interface SidebarItemProps {
  text?: string;
  icon: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

export default function SidebarItem(props: SidebarItemProps) {
  const [isVisible, setVisible] = useState(false);

  return (
    <ListItem sx={{ justifyContent: 'center' }} key={props.text} disablePadding>
      <ListItemButton
        sx={{ padding: '12px', borderRadius: '10px' }}
        onClick={props.onClick}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            justifyContent: 'center',
            color: styles.color.icon.main,
          }}
        >
          {props.icon}
        </ListItemIcon>
        {props.text && (
          <ListItemText
            sx={[
              {
                position: 'absolute',
                left: '110%',
                background: (theme) => theme.palette.background.paper,
                borderRadius: '10px',
                padding: '6px 20px',
                boxShadow: (theme) => theme.shadows[4],

                transition: `
                  opacity ${styles.transition.duration}, 
                  visibility ${styles.transition.duration}`,
              },
              isVisible && {
                opacity: 0.9, // TODO: add to theme
                visibility: 'visible',
              },
              !isVisible && {
                opacity: 0,
                visibility: 'hidden',
              },
            ]}
            disableTypography // Disable default nested Typography component
          >
            <Typography
              sx={{
                fontSize: '14px',
                color: 'grey',
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
