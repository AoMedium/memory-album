import { styles } from '@/config/constants';
import ModalContainer, { ModalContainerProps } from './modal-container';
export default function CreationModalContainer(props: ModalContainerProps) {
  return (
    <ModalContainer
      open={props.open}
      sx={{
        position: 'absolute',
        top: '50%',
        right: styles.viewport.margin,
        transform: 'translateY(-50%)',

        width: '400px',
      }}
    >
      {props.children}
    </ModalContainer>
  );
}
