import { selectAlbum } from '@/state/album/album-slice';
import { RootState } from '@/state/store';
import { AlbumResponse } from '@/types/api';
import { NoPhotography } from '@mui/icons-material';
import {
  List,
  ListItem,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

interface Props {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

export default function AlbumList(props: Props) {
  // Better to explicitly use selectors for each to avoid unnecessary re-renders
  const albums = useSelector((state: RootState) => state.album.albums);
  const isLoading = useSelector((state: RootState) => state.album.isLoading);

  const dispatch = useDispatch();

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
    <List>
      {albums.map((album: AlbumResponse) => (
        <ListItem key={album.id}>
          {/* Implement using Card API */}
          <Button
            onClick={() => {
              props.setModalOpen(false);
              dispatch(selectAlbum(album));
            }}
          >
            {album.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
}
