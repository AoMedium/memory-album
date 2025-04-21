import { styles } from '@/config/constants';
import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function HeaderBar(props: PropsWithChildren) {
  return (
    <Stack
      sx={{
        position: 'absolute',
        top: styles.viewport.margin,
        left: styles.viewport.margin,
      }}
    >
      {props.children}
    </Stack>
  );
}
