import { api } from '@/lib/api-client';
import { EventGetResponse } from '@/types/api/event';
import { AxiosResponse } from 'axios';

export async function getEvents(): Promise<AxiosResponse<EventGetResponse[]>> {
  const response = await api.get('/events');
  return response;
}

export async function getEventsByIds(
  ids: string[],
): Promise<AxiosResponse<EventGetResponse[]>> {
  /**
   * TODO: test why retrieving all events, might be because ids are not read
   * http://localhost:5226/api/events?ids[]=44f19e59-e9fc-4bbc-8482-fba314953f10&ids[]=aa63fe0f-5551-4cc2-b078-65a3297f0fac
   */
  const response = await api.get('/events', {
    params: { ids },
    paramsSerializer: { indexes: true }, // Necessary to serialise for backend
  });
  return response;
}
