import { api } from '@/lib/api-client';
import { AlbumGetResponse } from '@/types/api/album';
import { AxiosResponse } from 'axios';

export async function getAlbums(): Promise<AxiosResponse<AlbumGetResponse[]>> {
  return await api.get('/albums');
}

export async function getAlbumById(
  id: string,
): Promise<AxiosResponse<AlbumGetResponse>> {
  return await api.get(`/albums/${id}`);
}
