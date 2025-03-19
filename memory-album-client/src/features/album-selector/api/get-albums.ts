import { api } from '@/lib/api-client';
import { AlbumGetResponse } from '@/types/api/album';

export async function getAlbums(): Promise<AlbumGetResponse[]> {
  const response = await api.get('/albums');
  return response.data;
}

export async function getAlbumById(id: string): Promise<AlbumGetResponse> {
  const response = await api.get(`/albums/${id}`);
  return response.data;
}
