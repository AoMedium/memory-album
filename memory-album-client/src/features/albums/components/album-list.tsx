import { RootState } from '@/state/store';
import { Close, ImageNotSupported } from '@mui/icons-material';
import {
  Typography,
  CircularProgress,
  IconButton,
  Button,
  Stack,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AlbumCard from './album-card';
import ModalContainer from '@/components/ui/modal-container';
import { setSelectionModalOpen } from '@/state/album/album-selection-slice';
import { AlbumGetResponse } from '@/types/api/album';

export default function AlbumList() {
  // Better to explicitly use selectors for each to avoid unnecessary re-renders
  const albums = useSelector((state: RootState) => state.album.albums);
  const isLoading = useSelector((state: RootState) => state.album.isLoading);

  if (isLoading) {
    return (
      <ModalContainer
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
        <CloseModalButton />
        <CircularProgress />
        <Typography marginTop={2}>Loading albums...</Typography>
      </ModalContainer>
    );
  }

  if (albums.length == 0) {
    return (
      <ModalContainer
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',

          textAlign: 'center',
          padding: '100px 50px',
        }}
      >
        <CloseModalButton />
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
      </ModalContainer>
    );
  }

  return (
    <ModalContainer
      sx={{
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    >
      <CloseModalButton />
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
    </ModalContainer>
  );
}

function CloseModalButton() {
  const dispatch = useDispatch();

  return (
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
  );
}
