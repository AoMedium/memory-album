import { SxProps, Theme } from '@mui/material';
import { PropsWithChildren } from 'react';
import ModalPanel from './modal-panel';

interface Props {
  open: boolean;
  sx?: SxProps<Theme> | undefined;
}

export default function ModalContainer(props: PropsWithChildren<Props>) {
  return (
    <ModalPanel
      sx={{
        visibility: props.open ? 'visible' : 'hidden', // Toggle modal visibility

        ...props.sx,
      }}
    >
      {props.children}
    </ModalPanel>
  );
}
