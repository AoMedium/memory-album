import {
  selectAlbum,
  setDetailsModalOpen,
} from '@/state/album/album-selection-slice';
import { AlbumResponse } from '@/types/api';
import { ImageNotSupported } from '@mui/icons-material';
import { Card, CardMedia, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';

interface Props {
  album: AlbumResponse;
}

export default function AlbumCard(props: Props) {
  const dispatch = useDispatch();

  return (
    <Card
      sx={{ width: '200px', height: '200px', margin: 1 }}
      onClick={() => {
        dispatch(selectAlbum(props.album));
        dispatch(setDetailsModalOpen(true));
      }}
    >
      <Box sx={{ width: '100px', height: '100px' }}>
        {props.album.coverPhotoId ? (
          <CardMedia sx={{ height: 140 }} />
        ) : (
          <ImageNotSupported />
        )}
      </Box>
      <Typography gutterBottom variant="h5" component="div">
        {props.album.title}
      </Typography>
    </Card>
  );
}
