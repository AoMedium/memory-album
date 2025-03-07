import { selectAlbum } from '@/state/album/album-slice';
import { AlbumResponse } from '@/types/api';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

interface Props {
  setModalOpen: (isModalOpen: boolean) => void;
  currentAlbum: AlbumResponse | undefined;
}

export default function AlbumDetails(props: Props) {
  const dispatch = useDispatch();

  return (
    <>
      {props.currentAlbum ? (
        <Stack spacing={2} padding={2}>
          <TextField
            label="Title"
            disabled
            value={props.currentAlbum.title || 'No title'}
          />
          <TextField
            label="Description"
            multiline
            maxRows={2}
            disabled
            value={props.currentAlbum.description || 'No description'}
          />
          <Button
            variant="contained"
            onClick={() => {
              if (!props.currentAlbum) {
                throw new Error(
                  'currentAlbum should not be undefined at this point.',
                );
              }
              dispatch(selectAlbum(props.currentAlbum));
              props.setModalOpen(false);
            }}
          >
            Select
          </Button>
        </Stack>
      ) : (
        <Typography>Select an album</Typography>
      )}
    </>
  );
}
