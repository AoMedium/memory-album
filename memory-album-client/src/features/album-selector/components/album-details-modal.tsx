import ModalContainer from '@/components/ui/modal-container';
import {
  setDetailsModalOpen,
  setSelectionModalOpen,
} from '@/state/album/album-selection-slice';
import { setAlbum } from '@/state/album/album-slice';
import { RootState } from '@/state/store';
import { ImageNotSupported } from '@mui/icons-material';
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
          direction="row"
          spacing={2}
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <ModalContainer>
            {selectedAlbum.coverPhotoId ? (
              <>{/* TODO: display cover photo */}</>
            ) : (
              <>
                <ImageNotSupported />
                <Typography>No cover</Typography>
              </>
            )}
          </ModalContainer>
          <ModalContainer
            sx={{
              display: 'flex',
              padding: 0, // Override as MUI text field label gets cut off
            }}
          >
            <Stack
              sx={{
                overflow: 'scroll',
                padding: 2,
              }}
              spacing={2}
            >
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
              <TextField
                label="Events"
                disabled
                value={selectedAlbum.eventIds.length || 0}
              />
              <Stack spacing={1}>
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
          </ModalContainer>
        </Stack>
      ) : (
        <Typography>Select an album</Typography>
      )}
    </>
  );
}
