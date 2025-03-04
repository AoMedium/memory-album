import { api } from '@/lib/api-client';
import { AlbumResponse } from '@/types/api';

export function getAlbums(): Promise<AlbumResponse[]> {
  return api.get('/albums').then((response) => response.data);
}

export function getAlbumById({ id = '' }: { id: string }) {
  return api.get(`/albums/${id}`);
}
