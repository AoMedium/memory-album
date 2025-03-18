import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { MS_TO_S } from '@/config/constants';

interface Props {
  timestamp: number;
  setTimestamp: (value: React.SetStateAction<number>) => void;
}

export default function TimestampPicker(props: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label="Timestamp"
        value={dayjs.unix(props.timestamp * MS_TO_S)}
        onChange={(value) =>
          value ? props.setTimestamp(value.unix()) : Date.now() * MS_TO_S
        }
      />
    </LocalizationProvider>
  );
}
