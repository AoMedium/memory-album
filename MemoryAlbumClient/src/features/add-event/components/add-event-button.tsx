import { styles } from '@/config/constants';
import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default function AddEventButton() {
  return (
    <IconButton
      sx={{
        position: 'absolute',
        bottom: `calc(2 * ${styles.viewport.margin})`,
        right: `calc(2 * ${styles.viewport.margin})`,

        background: (theme) => theme.palette.background.paper,
        boxShadow: (theme) => theme.shadows[styles.boxShadow.height],

        color: (theme) => theme.palette.text.primary,

        ':hover': {
          background: (theme) => theme.palette.primary.main,
          color: (theme) => theme.palette.primary.contrastText,
        },
      }}
    >
      <Add sx={{ fontSize: '35px' }} />
    </IconButton>
  );
}
