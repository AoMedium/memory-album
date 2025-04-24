import ClickableCard from '@/components/ui/clickable-card';
import { setCurrentEvent } from '@/state/event/event-slice';
import { RootState } from '@/state/store';
import { Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

export default function EventList() {
  const events = useSelector((state: RootState) => state.event.events);

  const dispatch = useDispatch();

  return (
    <Stack
      spacing={2}
      sx={{
        height: '100%',
        overflow: 'scroll',
      }}
    >
      {/* Replace with more efficient list view */}
      {events.map((event, index) => (
        <ClickableCard
          key={index}
          onClick={() => dispatch(setCurrentEvent(event))}
        >
          <Stack direction="row">
            <Typography>{event.id}</Typography>
            <Typography>{event.title}</Typography>
            <Typography>{event.description}</Typography>
          </Stack>
        </ClickableCard>
      ))}
    </Stack>
  );
}
