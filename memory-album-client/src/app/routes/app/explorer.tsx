import DraggableContainer from '@/components/ui/draggable-container';
import ModalPanel from '@/components/ui/modal-panel';
import { styles } from '@/config/constants';
import { Input } from '@mui/material';

export default function ExplorerRoute() {
  return (
    <>
      <DraggableContainer
        header="Drag test"
        sx={{
          position: 'absolute',
          top: '50%',
          right: styles.viewport.margin,
          transform: 'translateY(-50%)',
        }}
      >
        <ModalPanel
          sx={{
            width: '200px',
          }}
        >
          <Input></Input>
        </ModalPanel>
      </DraggableContainer>
    </>
  );
}
