import { styles } from '@/config/constants';
import { setCreationPanelOpen } from '@/state/event/event-creation-slice';
import { RootState } from '@/state/store';
import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateEventButton() {
  const isCreationPanelOpen = useSelector(
    (state: RootState) => state.eventCreation.isCreationPanelOpen,
  );

  const dispatch = useDispatch();

  return (
    <>
      {!isCreationPanelOpen && (
        <IconButton
          sx={{
            position: 'absolute',
            bottom: `calc(2 * ${styles.viewport.margin})`,
            right: `calc(2 * ${styles.viewport.margin})`,

            background: (theme) => theme.palette.background.paper,
            boxShadow: (theme) => theme.shadows[styles.boxShadow.height],

            color: (theme) => theme.palette.text.primary,

            ':hover': {
              background: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText,
            },
          }}
          onClick={() => {
            dispatch(setCreationPanelOpen(true));
          }}
        >
          <Add sx={{ fontSize: '35px' }} />
        </IconButton>
      )}
    </>
  );
}
