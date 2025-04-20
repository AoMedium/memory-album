/**
 * TODO:
 * - https://github.com/alan2207/bulletproof-react/blob/master/apps/react-vite/src/config/paths.ts
 *
 * "/" - map
 *      "/:id" - album id
 *      "/:id/events/:id" - event id
 */

export const paths = {
  app: {
    root: {
      path: '/',
    },
    map: {
      path: '/map',
      getHref: () => '/map',
    },
    album: {
      path: '/map/:albumId',
      getHref: (albumId: string) => `/map/${albumId}`,
    },
    events: {
      path: '/map/:albumId/events',
      getHref: (albumId: string) => `/map/${albumId}/events`,
    },
    event: {
      path: '/map/:albumId/events/:eventId',
      getHref: (albumId: string, eventId: string) =>
        `/map/${albumId}/events/${eventId}`,
    },

    explorer: {
      path: '/explorer',
      getHref: () => '/explorer',
    },
  },
};
