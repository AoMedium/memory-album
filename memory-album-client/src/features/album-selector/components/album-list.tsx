import { selectAlbum } from '@/state/album/album-slice';
import { RootState } from '@/state/store';
import { AlbumResponse } from '@/types/api';
import { List, ListItem, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

interface Props {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

export default function AlbumList(props: Props) {
  const albums = useSelector((state: RootState) => state.album.albums);
  const dispatch = useDispatch();

  return (
    <List>
      {albums.map((album: AlbumResponse) => (
        <ListItem key={album.id}>
          <Button
            onClick={() => {
              props.setModalOpen(false);
              dispatch(selectAlbum(album));
            }}
          >
            {album.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
}
