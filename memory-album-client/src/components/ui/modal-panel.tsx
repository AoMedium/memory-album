import { styles } from '@/config/constants';
import { SxProps, Theme, Box } from '@mui/material';
import { PropsWithChildren, HTMLAttributes } from 'react';

export interface ModalPanelProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  sx?: SxProps<Theme>;
}

export default function ModalPanel({ open = true, ...props }: ModalPanelProps) {
  return (
    <Box
      id={props.id}
      sx={{
        display: open ? 'inherit' : 'none',

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
