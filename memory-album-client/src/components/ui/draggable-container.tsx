import { Stack, SxProps, Theme, Typography } from '@mui/material';
import { PropsWithChildren, useRef } from 'react';
import Draggable from 'react-draggable';
import ModalPanel from './modal-panel';

export interface DraggableContainerProps extends PropsWithChildren {
  header: string;
  /**
   * Note: avoid using translate as this may conflict with translate from Draggable
   */
  sx?: SxProps<Theme>;
}

export default function DraggableContainer(props: DraggableContainerProps) {
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
