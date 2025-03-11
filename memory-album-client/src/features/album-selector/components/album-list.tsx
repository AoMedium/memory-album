import { RootState } from '@/state/store';
import { AlbumResponse } from '@/types/api';
import { Close, NoPhotography } from '@mui/icons-material';
import { Typography, CircularProgress, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AlbumCard from './album-card';
import ModalContainer from '@/components/ui/modal-container';
import { setSelectionModalOpen } from '@/state/album/album-selection-slice';

export default function AlbumList() {
  // Better to explicitly use selectors for each to avoid unnecessary re-renders
  const albums = useSelector((state: RootState) => state.album.albums);
  const isLoading = useSelector((state: RootState) => state.album.isLoading);

  const dispatch = useDispatch();

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
        }}
      >
        <NoPhotography />
        <Typography marginTop={2}>No albums</Typography>
      </ModalContainer>
    );
  }

  return (
    <ModalContainer
      sx={{
        display: 'flex',
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        maxHeight: '100%',

        overflow: 'scroll',

        flexWrap: 'wrap',
        gap: 1,
        justifyContent: 'center',
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
      {albums.map((album: AlbumResponse) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </ModalContainer>
  );
}
