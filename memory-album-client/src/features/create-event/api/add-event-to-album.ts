import { api } from '@/lib/api-client';
import { AlbumAddEventsRequest, EntityCreatedResponse } from '@/types/api';
import { AxiosResponse } from 'axios';

export async function addEventToAlbum(
  albumId: string,
  request: AlbumAddEventsRequest,
): Promise<AxiosResponse<EntityCreatedResponse>> {
  const response = await api.patch(`/albums/${albumId}/events`, <
    AlbumAddEventsRequest
  >{
    eventIds: request.eventIds,
  });
  return response;
}
