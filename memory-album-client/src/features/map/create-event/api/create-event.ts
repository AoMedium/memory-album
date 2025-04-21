import { api } from '@/lib/api-client';
import { EntityCreatedResponse } from '@/types/api/common';
import { EventCreateRequest } from '@/types/api/event';
import { AxiosResponse } from 'axios';

export async function createEvent(
  event: EventCreateRequest,
): Promise<AxiosResponse<EntityCreatedResponse>> {
  const response = await api.post('/events', <EventCreateRequest>{
    ...event,
  });
  return response;
}
