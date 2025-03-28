import { styles } from '@/config/constants';
import { FolderOutlined } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { getAlbums } from '../api/get-albums';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { setLoading, updateAlbums } from '@/state/album/album-slice';
import AlbumModal from './album-modal';
import { setSelectionModalOpen } from '@/state/album/album-selection-slice';

export default function AlbumSelector() {
  const currentAlbum = useSelector(
    (state: RootState) => state.album.currentAlbum,
  );

  const dispatch = useDispatch();

  /**
   * TODO:`
   * - open modal to select albums
   * - call album api
   * - use redux to cache/store selected album details
   */

  async function openAlbums() {
    dispatch(setSelectionModalOpen(true));
    dispatch(setLoading(true));

    const albums = await getAlbums(); // TODO: check cache instead of calling API

    dispatch(updateAlbums(albums));
    dispatch(setLoading(false));
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
            {currentAlbum?.title || 'No album selected'}
          </Typography>
        </Stack>
      </Button>
      <AlbumModal />
    </>
  );
}
