// TODO: consider syncing frontend and backend types with OpenAPI generators

export type AlbumResponse = {
  id: string;
  title: string;
  description: string;
  coverPhotoId: string;
  eventIds: string[];
};
