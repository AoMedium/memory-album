import ModalContainer, { ModalContainerProps } from './modal-container';
import DraggableContainer from './draggable-container';

interface Props extends ModalContainerProps {
  header: string;
}

export default function CreationModalContainer(props: Props) {
  return (
    <DraggableContainer
      header={props.header}
      sx={{
        display: props.open ? 'inherit' : 'none',
      }}
    >
      <ModalContainer
        open={props.open}
        sx={{
          width: '400px',
        }}
      >
        {props.children}
      </ModalContainer>
    </DraggableContainer>
  );
}
