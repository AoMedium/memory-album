import { AlbumGetResponse, EventGetResponse } from '@/types/api';
import { IconLayer } from 'deck.gl';
import { useEffect, useMemo, useState } from 'react';
import { getEventsByIds } from '../api/get-events';
import iconAtlas from '@/assets/icon-atlas.png';
import iconMapping from '@/assets/icon-atlas.json';
// import eventIcon from '@/assets/react.svg';

export function useAlbumEventsLayer(album?: AlbumGetResponse) {
  const eventIds = album?.eventIds;

  const [events, setEvents] = useState<EventGetResponse[]>([]);

  useEffect(() => {
    const update = async () => {
      try {
        if (!eventIds || eventIds.length === 0) {
          // Catch case where album has no events
          setEvents([]);
          return;
        }
        const response = await getEventsByIds(eventIds);
        setEvents(response.data);
      } catch (error) {
        console.log(error);
      }
      // setTimeout(update, 30000);
    };

    update();
  }, [eventIds]); // TODO: depend on trigger refresh variable instead

  // useMemo due to potentially large number of events
  const iconLayer = useMemo(() => {
    if (!album) {
      return null;
    }

    return new IconLayer<EventGetResponse>({
      id: 'eventLocationsLayer',
      data: events,
      getIcon: (d: EventGetResponse) => {
        if (!d.location) {
          return 'none'; // TODO: Need an alternative way to display events without location
        }
        return 'marker';
      }, // ({ url: iconAtlas, width: 24, height: 24 }),
      getPosition: (d: EventGetResponse) => {
        if (!d.location) {
          console.warn('Event location is missing: ' + d.id);
          return [0, 0];
        }
        return [d.location.longitude, d.location.latitude];
      },
      getColor: [83, 153, 251], // TODO: define color in templates. Color.parse(theme.palette.primary.main)?.rgb does not work
      getSize: 40,
      iconAtlas: iconAtlas,
      iconMapping: iconMapping,
    });
  }, [album, events]);

  return iconLayer;
}
