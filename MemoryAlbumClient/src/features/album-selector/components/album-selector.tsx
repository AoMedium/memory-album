import { styles } from '@/config/constants';
import { Close, FolderOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import { getAlbums } from '../api/get-albums';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { AlbumResponse } from '@/types/api';
import { selectAlbum, updateAlbums } from '@/state/album/album-slice';
import { useState } from 'react';

export default function AlbumSelector() {
  const [isModalOpen, setModalOpen] = useState(false);

  const albums = useSelector((state: RootState) => state.album.albums);
  const selectedAlbum = useSelector(
    (state: RootState) => state.album.selectedAlbum,
  );

  const dispatch = useDispatch();

  /**
   * TODO:`
   * - open modal to select albums
   * - call album api
   * - use redux to cache/store selected album details
   */

  async function openAlbums() {
    setModalOpen(true);

    const albums = await getAlbums(); // TODO: check cache instead of calling API
    dispatch(updateAlbums(albums));
  }

  return (
    <>
      <Button
        sx={{
          position: 'absolute',
          top: `${styles.viewport.margin}`,
          left: `${styles.viewport.margin}`,
          padding: '10px 15px',
          borderRadius: '10px',

          background: (theme) => theme.palette.background.paper,
          boxShadow: (theme) => theme.shadows[styles.boxShadow.height],
          color: (theme) => theme.palette.text.secondary,
        }}
        variant="contained"
        onClick={openAlbums}
      >
        <Stack direction="row" spacing="15px">
          <FolderOutlined />
          <Typography sx={{ fontVariantCaps: 'normal' }}>
            {selectedAlbum?.title || 'No album selected'}
          </Typography>
        </Stack>
      </Button>
      {isModalOpen && (
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
            <Close onClick={() => setModalOpen(false)} />
          </IconButton>
          <List>
            {albums.map((album: AlbumResponse) => (
              <ListItem key={album.id}>
                <Button
                  onClick={() => {
                    setModalOpen(false);
                    dispatch(selectAlbum(album));
                  }}
                >
                  {album.title}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </>
  );
}
