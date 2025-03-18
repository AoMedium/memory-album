import { api } from '@/lib/api-client';
import { EntityCreatedResponse, EventCreateRequest } from '@/types/api';
import { AxiosResponse } from 'axios';

export async function createEvent(
  event: EventCreateRequest,
): Promise<AxiosResponse<EntityCreatedResponse>> {
  const response = await api.post('/events', {
    title: event.title,
    description: event.description,
    timestamp: event.timestamp,
    location: event.location,
  });
  return response;
}
