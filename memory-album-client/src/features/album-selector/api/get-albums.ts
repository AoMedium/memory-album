import { api } from '@/lib/api-client';
import { AlbumGetResponse } from '@/types/api';

export async function getAlbums(): Promise<AlbumGetResponse[]> {
  const response = await api.get('/albums');
  return response.data;
}

export function getAlbumById({ id = '' }: { id: string }) {
  return api.get(`/albums/${id}`);
}
