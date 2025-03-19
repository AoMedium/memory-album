import ClickableCard from '@/components/ui/clickable-card';
import {
  selectAlbum,
  setDetailsModalOpen,
} from '@/state/album/album-selection-slice';
import { AlbumGetResponse } from '@/types/api';
import { ImageNotSupported } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';

interface Props {
  album: AlbumGetResponse;
}

export default function AlbumCard(props: Props) {
  const dispatch = useDispatch();

  return (
    <ClickableCard
      sx={{
        width: '200px',
        height: '200px',
        margin: 1,
      }}
      onClick={() => {
        dispatch(selectAlbum(props.album));
        dispatch(setDetailsModalOpen(true));
      }}
    >
      <Box sx={{ width: '100px', height: '100px' }}>
        {props.album.coverPhotoId ? <></> : <ImageNotSupported />}
      </Box>
      <Typography
        sx={{ position: 'relative', bottom: 0 }}
        variant="h5"
        component="div"
      >
        {props.album.title}
      </Typography>
    </ClickableCard>
  );
}
