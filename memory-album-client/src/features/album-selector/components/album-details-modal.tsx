import { styles } from '@/config/constants';
import {
  setDetailsModalOpen,
  setSelectionModalOpen,
} from '@/state/album/album-selection-slice';
import { setAlbum } from '@/state/album/album-slice';
import { RootState } from '@/state/store';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

export default function AlbumDetailsModal() {
  const selectedAlbum = useSelector(
    (state: RootState) => state.albumSelection.selectedAlbum,
  );

  const dispatch = useDispatch();

  return (
    <>
      {selectedAlbum ? (
        <Stack
          spacing={2}
          sx={{
            display: 'flex',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',

            overflow: 'scroll',
            padding: 2,
            borderRadius: '10px',
            boxSizing: 'border-box',

            background: (theme) => theme.palette.background.paper,
            boxShadow: (theme) => theme.shadows[styles.boxShadow.height],
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <Stack spacing={2}>
            <TextField
              label="Title"
              disabled
              value={selectedAlbum.title || 'No title'}
            />
            <TextField
              label="Description"
              multiline
              maxRows={2}
              disabled
              value={selectedAlbum.description || 'No description'}
            />
          </Stack>

          <Stack
            spacing={1}
            sx={{
              flexGrow: 1,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                if (!selectedAlbum) {
                  throw new Error(
                    'currentAlbum should not be undefined at this point.',
                  );
                }
                dispatch(setAlbum(selectedAlbum));
                dispatch(setDetailsModalOpen(false));
                dispatch(setSelectionModalOpen(false));
              }}
            >
              Select
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(setDetailsModalOpen(false));
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Typography>Select an album</Typography>
      )}
    </>
  );
}
