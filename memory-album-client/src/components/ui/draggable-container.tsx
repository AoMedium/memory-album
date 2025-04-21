import { Stack, SxProps, Typography } from '@mui/material';
import { PropsWithChildren, useRef } from 'react';
import Draggable, { ControlPosition } from 'react-draggable';
import ModalPanel from './modal-panel';

interface Props extends PropsWithChildren {
  header: string;
  initialPosition?: ControlPosition;
  sx?: SxProps;
}

export default function DraggableContainer(props: Props) {
  const nodeRef = useRef<HTMLDivElement>(null); // Required for Draggable

  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
      handle="#draggable"
    >
      <Stack
        ref={nodeRef}
        spacing="10px"
        sx={{
          width: 'fit-content',
          height: 'fit-content',

          ...props.sx,
        }}
      >
        <ModalPanel
          id="draggable"
          sx={{
            ':hover': {
              cursor: 'move',
            },
          }}
        >
          <Typography variant="h3" textAlign="center">
            {props.header}
          </Typography>
        </ModalPanel>
        {props.children}
      </Stack>
    </Draggable>
  );
}
