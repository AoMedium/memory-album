import { styles } from '@/config/constants';
import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export default function HeaderBar(props: PropsWithChildren) {
  return (
    <Stack
      direction="row"
      spacing="10px"
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
