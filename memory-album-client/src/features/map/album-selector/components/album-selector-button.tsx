import { getAlbums } from '@/api/get-albums';
import { styles } from '@/config/constants';
import useNotification from '@/hooks/use-notification';
import { setSelectionModalOpen } from '@/state/album/album-selection-slice';
import { setLoading, updateAlbums } from '@/state/album/album-slice';
import { RootState } from '@/state/store';
import { FolderOutlined } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

export default function AlbumSelectorButton() {
  const currentAlbum = useSelector(
    (state: RootState) => state.album.currentAlbum,
  );

  const dispatch = useDispatch();
  const { reportSuccess, throwError } = useNotification();

  /**
   * TODO:`
   * - open modal to select albums
   * - call album api
   * - use redux to cache/store selected album details
   */

  async function openAlbums() {
    dispatch(setSelectionModalOpen(true));
    dispatch(setLoading(true));

    try {
      const response = await getAlbums(); // TODO: check cache instead of calling API

      dispatch(updateAlbums(response.data));
      reportSuccess('Retrieved albums');
    } catch (error) {
      console.error(error);
      throwError('Could not load albums');
    }

    dispatch(setLoading(false));
  }

  return (
    <Button
      sx={{
        padding: '10px 15px',
        borderRadius: styles.border.radius,

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
  );
}
