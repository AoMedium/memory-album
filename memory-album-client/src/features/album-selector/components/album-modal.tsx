import { styles } from '@/config/constants';
import { Close } from '@mui/icons-material';
import { Box, IconButton, Modal } from '@mui/material';
import AlbumList from './album-list';

interface Props {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

export default function AlbumModal(props: Props) {
  return (
    <Modal open={props.isModalOpen}>
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '30%',
          minHeight: '20%',
          padding: '10px 15px',
          borderRadius: '10px',

          background: (theme) => theme.palette.background.paper,
          boxShadow: (theme) => theme.shadows[styles.boxShadow.height],
          color: (theme) => theme.palette.text.secondary,
        }}
      >
        <IconButton
          sx={{
            zIndex: 1000,
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <Close onClick={() => props.setModalOpen(false)} />
        </IconButton>
        <AlbumList
          isModalOpen={props.isModalOpen}
          setModalOpen={props.setModalOpen}
        />
      </Box>
    </Modal>
  );
}
