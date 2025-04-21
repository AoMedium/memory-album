import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface Props {
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

export default function CloseModalButton(props: Props) {
  return (
    <IconButton
      sx={{
        zIndex: 1000,
        position: 'absolute',
        top: 0,
        right: 0,
      }}
    >
      <Close onClick={props.onClick} />
    </IconButton>
  );
}
