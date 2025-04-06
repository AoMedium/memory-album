import ModalContainer, { ModalContainerProps } from './modal-container';
import { Dialog, DialogTitle, Paper, PaperProps } from '@mui/material';
import React, { useRef } from 'react';
import Draggable from 'react-draggable';

export default function CreationModalContainer(props: ModalContainerProps) {
  return (
    <Dialog open={props.open} PaperComponent={PaperComponent} hideBackdrop>
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Create Event
      </DialogTitle>
      <ModalContainer
        open={props.open}
        sx={{
          width: '400px',
        }}
      >
        {props.children}
      </ModalContainer>
    </Dialog>
  );
}

function PaperComponent(props: PaperProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}
