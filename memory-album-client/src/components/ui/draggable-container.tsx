import { Box, Stack, Typography } from '@mui/material';
import { PropsWithChildren, useRef, useState } from 'react';
import Draggable, {
  ControlPosition,
  DraggableData,
  DraggableEvent,
  DraggableEventHandler,
} from 'react-draggable';

interface Props extends PropsWithChildren {
  header: string;
  initialPosition?: ControlPosition;
}

export default function DraggableContainer(props: Props) {
  const nodeRef = useRef<HTMLDivElement>(null); // Required for Draggable

  const [position, setPosition] = useState<ControlPosition>(
    props.initialPosition || { x: 0, y: 0 },
  );

  function handleDrag(e: DraggableEvent, data: DraggableData) {
    setPosition({ x: data.x, y: data.y });
  }

  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
      handle="#draggable"
      position={position}
      onDrag={handleDrag}
    >
      <Stack ref={nodeRef} id="draggable">
        <Box>
          <Typography>{props.header}</Typography>
        </Box>
        {props.children}
      </Stack>
    </Draggable>
  );
}
