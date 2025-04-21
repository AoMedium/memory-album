import { RootState } from '@/state/store';
import { ImageNotSupported } from '@mui/icons-material';
import {
  Typography,
  CircularProgress,
  Button,
  Stack,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AlbumCard from './album-card';
import { setSelectionModalOpen } from '@/state/album/album-selection-slice';
import { AlbumGetResponse } from '@/types/api/album';
import ModalPanel from '@/components/ui/modal-panel';
import CloseModalButton from '@/components/ui/close-modal-button';

export default function AlbumList() {
  // Better to explicitly use selectors for each to avoid unnecessary re-renders
  const albums = useSelector((state: RootState) => state.album.albums);
  const isLoading = useSelector((state: RootState) => state.album.isLoading);

  const dispatch = useDispatch();

  function handleCloseModal() {
    dispatch(setSelectionModalOpen(false));
  }

  if (isLoading) {
    return (
      <ModalPanel
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',

          textAlign: 'center',
          minWidth: '300px',
          padding: '100px 0',
        }}
      >
        <CloseModalButton onClick={handleCloseModal} />
        <CircularProgress />
        <Typography marginTop={2}>Loading albums...</Typography>
      </ModalPanel>
    );
  }

  if (albums.length == 0) {
    return (
      <ModalPanel
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',

          textAlign: 'center',
          padding: '100px 50px',
        }}
      >
        <CloseModalButton onClick={handleCloseModal} />
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            minWidth: '200px',
          }}
          spacing={2}
          direction="column"
        >
          <ImageNotSupported fontSize="large" />
          <Typography>No albums</Typography>
          <Button
            variant="contained"
            onClick={() => {
              // TODO: implement
              throw 'Not implemented';
            }}
          >
            Create new album
          </Button>
        </Stack>
      </ModalPanel>
    );
  }

  return (
    <ModalPanel
      sx={{
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    >
      <CloseModalButton onClick={handleCloseModal} />
      <Box
        sx={{
          display: 'flex',
          maxHeight: '80vh',
          overflow: 'scroll',

          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
        }}
      >
        {/* TODO: filter and search bar */}
        {albums.map((album: AlbumGetResponse) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </Box>
    </ModalPanel>
  );
}
