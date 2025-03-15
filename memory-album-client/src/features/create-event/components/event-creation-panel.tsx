import ModalContainer from '@/components/ui/modal-container';
import { styles } from '@/config/constants';
import {
  clearEvent,
  setCreationPanelOpen,
} from '@/state/event/event-creation-slice';
import { RootState } from '@/state/store';
import { Stack, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function EventCreationPanel() {
  const isCreationPanelOpen = useSelector(
    (state: RootState) => state.eventCreation.isCreationPanelOpen,
  );

  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <ModalContainer
      sx={{
        visibility: isCreationPanelOpen ? 'visible' : 'hidden',

        position: 'absolute',
        top: '50%',
        right: styles.viewport.margin,
        transform: 'translateY(-50%)',
      }}
    >
      <Stack spacing={2}>
        <TextField
          label="Title"
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(event.target.value)
          }
        />
        <TextField
          label="Description"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(event.target.value)
          }
          multiline
          maxRows={2}
        />
        <Stack spacing={1}>
          <Button
            variant="contained"
            onClick={() => {
              // TODO: post event
            }}
          >
            Create
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              if (confirm('Discard your changes?')) {
                dispatch(clearEvent());
                dispatch(setCreationPanelOpen(false));
              }
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </ModalContainer>
  );
}
