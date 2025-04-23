import {
  Box,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { PropsWithChildren, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import ModalPanel from './modal-panel';
import { Add, Remove } from '@mui/icons-material';

export interface DraggableContainerProps extends PropsWithChildren {
  header: string;
  /**
   * Note: avoid using translate as this may conflict with translate from Draggable
   */
  sx?: SxProps<Theme>;
}

export default function DraggableContainer(props: DraggableContainerProps) {
  const nodeRef = useRef<HTMLDivElement>(null); // Required for Draggable

  const [minimised, setMinimised] = useState(true);

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
            position: 'relative', // Allow children to position absolute, relative to this

            ':hover': {
              cursor: 'move',
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <Typography variant="h3">{props.header}</Typography>
            <Box
              alignItems="center"
              sx={{
                // Override Stack spacing margins
                marginTop: '-10px!important',
                marginBottom: '-10px!important',
                marginRight: '-10px!important',
              }}
            >
              {minimised ? (
                <IconButton onClick={() => setMinimised(false)}>
                  <Add />
                </IconButton>
              ) : (
                <IconButton onClick={() => setMinimised(true)}>
                  <Remove />
                </IconButton>
              )}
            </Box>
          </Stack>
        </ModalPanel>
        {!minimised && props.children}
      </Stack>
    </Draggable>
  );
}
