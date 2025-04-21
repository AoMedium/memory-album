import { styles } from '@/config/constants';
import { Button, SxProps } from '@mui/material';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  sx?: SxProps;
  onClick: React.MouseEventHandler;
}

export default function HeaderBarButton(props: Props) {
  return (
    <Button
      sx={{
        minWidth: 0,
        padding: '10px 10px',
        borderRadius: styles.border.radius,

        background: (theme) => theme.palette.background.paper,
        boxShadow: (theme) => theme.shadows[styles.boxShadow.height],
        color: (theme) => theme.palette.text.secondary,

        ...props.sx,
      }}
      variant="contained"
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
