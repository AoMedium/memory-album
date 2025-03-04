import { styles } from '@/config/constants';
import { Close } from '@mui/icons-material';
import { Box, Button, IconButton, List, ListItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { AlbumResponse } from '@/types/api';
import { selectAlbum } from '@/state/album/album-slice';

interface Props {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

export default function AlbumModal(props: Props) {
  const albums = useSelector((state: RootState) => state.album.albums);

  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: `calc(3 * ${styles.viewport.margin})`,
        left: `${styles.viewport.margin}`,
        padding: '10px 15px',
        borderRadius: '10px',

        background: (theme) => theme.palette.background.paper,
        boxShadow: (theme) => theme.shadows[styles.boxShadow.height],
        color: (theme) => theme.palette.text.secondary,
      }}
    >
      <IconButton>
        <Close onClick={() => props.setModalOpen(false)} />
      </IconButton>
      <List>
        {albums.map((album: AlbumResponse) => (
          <ListItem key={album.id}>
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
    </Box>
  );
}
