import { Geoposition } from '../common/common';

export type EventCreateRequest = {
  title: string;
  description: string;
  timestamp: number;
  location: Geoposition;
};

export type EventGetResponse = {
  id: string;
  title: string;
  description: string;
  timestamp: number;
  location: Geoposition;
  personIds: string[];
  tagIds: string[];
  photoIds: string[];
  videoIds: string[];
};
