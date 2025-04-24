import { ChevronRight } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface Props {
  open: boolean;
  handleSidebarOpen: () => void;
}

export default function OpenSidebarButton(props: Props) {
  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={props.handleSidebarOpen}
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
        props.open && { display: 'none' },
      ]}
    >
      <ChevronRight />
    </IconButton>
  );
}
