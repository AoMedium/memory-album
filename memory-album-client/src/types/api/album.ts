export type AlbumAddEventsRequest = {
  eventIds: string[];
};

export type AlbumGetResponse = {
  id: string;
  title: string;
  description: string;
  coverPhotoId: string;
  eventIds: string[];
};
