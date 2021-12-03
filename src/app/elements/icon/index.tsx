
import {
  BiSave,
  BiTrash,
  BiAlarm,
  BiCalendar,
  BiPencil,
} from 'react-icons/bi';
import {
  GrSend,
  GrTwitter
} from 'react-icons/gr';
import {
  GiCancel
} from 'react-icons/gi';

export const getIcon = (iconName: string): JSX.Element => {
  return {
    trash: <BiTrash />,
    save: <BiSave />,
    clock: <BiAlarm />,
    calendar: <BiCalendar />,
    send: <GrSend />,
    twitter: <GrTwitter />,
    pencil: <BiPencil />,
    cancel: <GiCancel />
  }[iconName] || <GrTwitter />;
}