import HeaderBarButton from '@/components/ui/header-bar-button';
import { paths } from '@/config/paths';
import { FolderOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router';

export default function OpenExplorerButton() {
  const navigate = useNavigate();

  return (
    <HeaderBarButton onClick={() => navigate(paths.app.explorer.path)}>
      <FolderOutlined />
    </HeaderBarButton>
  );
}
