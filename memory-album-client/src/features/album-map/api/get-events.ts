import { api } from '@/lib/api-client';
import { EventGetResponse } from '@/types/api';
import { AxiosResponse } from 'axios';

export async function getEvents(): Promise<AxiosResponse<EventGetResponse[]>> {
  const response = await api.get('/events');
  return response;
}

export async function getEventsByIds(
  ids: string[],
): Promise<AxiosResponse<EventGetResponse[]>> {
  const response = await api.get('/events', { params: { ids } });
  return response;
}
