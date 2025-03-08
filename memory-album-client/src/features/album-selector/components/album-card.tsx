import { AlbumResponse } from '@/types/api';
import { Edit } from '@mui/icons-material';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material';

interface Props {
  album: AlbumResponse;
  setCurrentAlbum: (album: AlbumResponse) => void;
}

export default function AlbumCard(props: Props) {
  return (
    <Card
      sx={{ width: 1 }}
      onClick={() => {
        props.setCurrentAlbum(props.album);
      }}
    >
      <CardMedia sx={{ height: 140 }} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.album.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {props.album.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <Edit />
        </IconButton>
      </CardActions>
    </Card>
  );
}
