import DraggableContainer, {
  DraggableContainerProps,
} from './draggable-container';
import ModalPanel, { ModalPanelProps } from './modal-panel';

interface Props extends DraggableContainerProps, ModalPanelProps {
  header: string;
}

export default function CreationModalContainer(props: Props) {
  return (
    <DraggableContainer
      header={props.header}
      sx={{
        display: props.open ? 'inherit' : 'none',

        ...props.sx,
      }}
    >
      <ModalPanel
        open={props.open}
        sx={{
          width: '400px',
        }}
      >
        {props.children}
      </ModalPanel>
    </DraggableContainer>
  );
}
