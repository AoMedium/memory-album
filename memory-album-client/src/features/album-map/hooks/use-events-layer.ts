import { EventGetResponse } from '@/types/api';
import { IconLayer } from 'deck.gl';
import { useEffect, useState } from 'react';
import { getEvents } from '../api/get-events';
import iconAtlas from '@/assets/icon-atlas.png';
import iconMapping from '@/assets/icon-atlas.json';
// import eventIcon from '@/assets/react.svg';

export function useEventsLayer() {
  // const eventIds = useSelector(
  //   (state: RootState) => state.album.currentAlbum?.eventIds,
  // );

  // TODO: get events from current album instead

  const [events, setEvents] = useState<EventGetResponse[]>([]);

  useEffect(() => {
    const update = async () => {
      try {
        const response = await getEvents();
        console.log(response.data);
        setEvents(response.data);
      } catch (error) {
        console.log(error);
      }
      setTimeout(update, 30000);
    };

    update();
  }, []); // TODO: depend on trigger refresh variable instead

  // TODO: use icon cluster layer
  return new IconLayer<EventGetResponse>({
    id: 'eventLocationsLayer',
    data: events,
    getIcon: () => 'marker', // ({ url: iconAtlas, width: 24, height: 24 }),
    getPosition: (d: EventGetResponse) => {
      if (d.location) {
        console.log(d.location);
        return [d.location.latitude, d.location.longitude]; // FIXME: not rendering
      }
      return [0, 0];
    },
    getColor: [83, 153, 251],
    getSize: 40,
    iconAtlas: iconAtlas,
    iconMapping: iconMapping,
  });
}
