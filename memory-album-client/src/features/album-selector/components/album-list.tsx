import { RootState } from '@/state/store';
import { AlbumResponse } from '@/types/api';
import { NoPhotography } from '@mui/icons-material';
import {
  List,
  ListItem,
  Typography,
  Box,
  CircularProgress,
  Grid2,
} from '@mui/material';
import { useSelector } from 'react-redux';
import AlbumListCard from './album-list-card';
import { useState } from 'react';
import AlbumDetails from './album-details';

interface Props {
  setModalOpen: (open: boolean) => void;
}

export default function AlbumList(props: Props) {
  // Better to explicitly use selectors for each to avoid unnecessary re-renders
  const albums = useSelector((state: RootState) => state.album.albums);
  const isLoading = useSelector((state: RootState) => state.album.isLoading);

  const [currentAlbum, setCurrentAlbum] = useState<AlbumResponse | undefined>(
    undefined,
  );

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
    <Grid2
      container
      spacing={2}
      sx={{
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Grid2
        size={8}
        sx={{
          height: '100%', // Set height 100% here to ensure list fills entire container as well
          overflow: 'scroll',
        }}
      >
        <List
          sx={{
            // Do not apply scroll here as it does not take the container height into account for overflow
            border: 'black 2px solid',
          }}
        >
          {albums.map((album: AlbumResponse) => (
            <ListItem
              key={album.id}
              sx={{
                padding: 0,
              }}
            >
              <AlbumListCard album={album} setCurrentAlbum={setCurrentAlbum} />
            </ListItem>
          ))}
        </List>
      </Grid2>
      <Grid2 size={4}>
        <AlbumDetails
          setModalOpen={props.setModalOpen}
          currentAlbum={currentAlbum}
        />
      </Grid2>
    </Grid2>
  );
}
