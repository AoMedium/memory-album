import { selectAlbum } from '@/state/album/album-slice';
import { RootState } from '@/state/store';
import { AlbumResponse } from '@/types/api';
import { NoPhotography } from '@mui/icons-material';
import { List, ListItem, Button, Typography, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

interface Props {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

export default function AlbumList(props: Props) {
  const albums = useSelector((state: RootState) => state.album.albums);
  const dispatch = useDispatch();

  return (
    <>
      {albums.length != 0 ? (
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
      ) : (
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
      )}
    </>
  );
}
