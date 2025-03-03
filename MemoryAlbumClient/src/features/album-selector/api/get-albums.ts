import { api } from "@/lib/api-client";

export function getAlbums() {
  return api.get("/albums");
}

export function getAlbumById({ id = "" }: { id: string }) {
  return api.get(`/albums/${id}`);
}
