import { Navigate, useRoutes } from 'react-router';
import { paths } from '@/config/paths';
import ExplorerRoute from './routes/app/explorer';
import MapRoute from './routes/app/map';

export default function AppRouter() {
  const routes = useRoutes([
    {
      path: paths.app.root.path,
      element: <Navigate to={paths.app.map.path} replace />, // Redirect to /models
    },
    {
      path: paths.app.map.path,
      element: <MapRoute />,
    },
    {
      path: paths.app.explorer.path,
      element: <ExplorerRoute />,
    },
  ]);

  return routes;
}
