import { styles } from '@/config/constants';
import { SxProps, Theme, Box } from '@mui/material';
import { PropsWithChildren } from 'react';

interface ModalPanelProps extends PropsWithChildren {
  sx?: SxProps<Theme> | undefined;
}

export default function ModalPanel(props: ModalPanelProps) {
  return (
    <Box
      sx={{
        borderRadius: '10px',
        boxSizing: 'border-box',
        padding: '16px',

        background: (theme) => theme.palette.background.paper,
        boxShadow: (theme) => theme.shadows[styles.boxShadow.height],
        color: (theme) => theme.palette.text.secondary,

        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
}
