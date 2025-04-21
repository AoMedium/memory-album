import { Box, Modal } from '@mui/material';
import AlbumList from './album-list';
import AlbumDetailsModal from './album-details-modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

export default function AlbumSelectorModal() {
  const isSelectionModalOpen = useSelector(
    (state: RootState) => state.albumSelection.isSelectionModalOpen,
  );

  const isDetailsModalOpen = useSelector(
    (state: RootState) => state.albumSelection.isDetailsModalOpen,
  );

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
        <AlbumList />
        <Modal open={isDetailsModalOpen}>
          <AlbumDetailsModal />
        </Modal>
      </Box>
    </Modal>
  );
}
