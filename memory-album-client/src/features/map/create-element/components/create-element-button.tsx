import { styles } from '@/config/constants';
import { setCreationPanelOpen } from '@/state/event/event-creation-slice';
import { RootState } from '@/state/store';
import { Event, Room } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateElementButton() {
  const isCreationPanelOpen = useSelector(
    (state: RootState) => state.eventCreation.isCreationPanelOpen,
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: `calc(1.5 * ${styles.viewport.margin})`,
        right: `calc(1.5 * ${styles.viewport.margin})`,
        height: 330,

        transform: 'translateZ(0px)',
        flexGrow: 1,
      }}
    >
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="Create element"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {createAction({
          icon: <Event />,
          title: 'Event',
          onClick: () => {
            handleClose();
            dispatch(setCreationPanelOpen(true));
          },
          disabled: isCreationPanelOpen,
        })}
        {createAction({
          icon: <Room />,
          title: 'Location',
          onClick: () => {
            handleClose();
            dispatch(setCreationPanelOpen(true));
          },
          disabled: isCreationPanelOpen,
        })}
      </SpeedDial>
    </Box>
  );
}

interface ActionProps {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  disabled?: boolean;
}
/**
 * SpeedDial does not recognise SpeedDialActions if
 * they are a child of a custom component.
 *
 * @returns SpeedDialAction element
 */
function createAction(props: ActionProps) {
  return (
    <SpeedDialAction
      icon={props.icon}
      tooltipTitle={props.title}
      tooltipOpen
      onClick={() => {
        if (!props.disabled) {
          props.onClick();
        }
      }}
      sx={{
        opacity: props.disabled ? 0.3 : 1,
      }}
    />
  );
}
