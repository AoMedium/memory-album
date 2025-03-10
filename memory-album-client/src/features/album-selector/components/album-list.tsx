import { RootState } from '@/state/store';
import { AlbumResponse } from '@/types/api';
import { NoPhotography } from '@mui/icons-material';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import AlbumCard from './album-card';
import { styles } from '@/config/constants';

export default function AlbumList() {
  // Better to explicitly use selectors for each to avoid unnecessary re-renders
  const albums = useSelector((state: RootState) => state.album.albums);
  const isLoading = useSelector((state: RootState) => state.album.isLoading);

  if (isLoading) {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',

          textAlign: 'center',
        }}
      >
        <CircularProgress />
        <Typography marginTop={'16px'}>Loading albums...</Typography>
      </Box>
    );
  }

  if (albums.length == 0) {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography>No albums</Typography>
        <NoPhotography />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        marginTop: 'auto',
        marginBottom: 'auto',
        maxHeight: '100%',
        overflow: 'scroll',
        flexWrap: 'wrap',
        gap: 1,

        padding: '16px',
        borderRadius: '10px',
        boxSizing: 'border-box',
        justifyContent: 'center',

        background: (theme) => theme.palette.background.paper,
        boxShadow: (theme) => theme.shadows[styles.boxShadow.height],
        color: (theme) => theme.palette.text.secondary,
      }}
    >
      {albums.map((album: AlbumResponse) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </Box>
  );
}
