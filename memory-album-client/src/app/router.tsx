import { Navigate, useRoutes } from 'react-router';
import { paths } from '@/config/paths';
import MapLayout from '@/components/layouts/map-layout';

export default function AppRouter() {
  const routes = useRoutes([
    {
      path: paths.app.root.path,
      element: <Navigate to={paths.app.map.path} replace />, // Redirect to /models
    },
    {
      path: paths.app.map.path,
      element: <MapLayout />,
    },
  ]);

  return routes;
}
