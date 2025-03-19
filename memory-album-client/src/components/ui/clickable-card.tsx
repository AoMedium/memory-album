import { styles } from '@/config/constants';
import { Box, SxProps, Theme } from '@mui/material';
import { PropsWithChildren } from 'react';

interface Props {
  sx?: SxProps<Theme> | undefined;
  onClick: React.MouseEventHandler;
}

export default function ClickableCard(props: PropsWithChildren<Props>) {
  return (
    <Box
      sx={{
        borderRadius: '10px',
        boxSizing: 'border-box',
        padding: '16px',

        background: (theme) => theme.palette.background.paper,
        boxShadow: (theme) => theme.shadows[styles.boxShadow.height],
        color: (theme) => theme.palette.text.secondary,

        cursor: 'pointer',

        border: '1px solid transparent',

        '&:hover': {
          border: '1px solid black',
        },

        ...props.sx,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </Box>
  );
}
