import { Close } from '@mui/icons-material';
import { Box, IconButton, Modal } from '@mui/material';
import AlbumList from './album-list';
import AlbumDetailsModal from './album-details-modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setSelectionModalOpen } from '@/state/album/album-selection-slice';

export default function AlbumModal() {
  const isSelectionModalOpen = useSelector(
    (state: RootState) => state.albumSelection.isSelectionModalOpen,
  );

  const isDetailsModalOpen = useSelector(
    (state: RootState) => state.albumSelection.isDetailsModalOpen,
  );

  const dispatch = useDispatch();

  return (
    <Modal open={isSelectionModalOpen}>
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '80%',
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
          <Close onClick={() => dispatch(setSelectionModalOpen(false))} />
        </IconButton>
        <AlbumList />
        <Modal open={isDetailsModalOpen}>
          <AlbumDetailsModal />
        </Modal>
      </Box>
    </Modal>
  );
}
