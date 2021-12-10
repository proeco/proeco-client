import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

export const formatDistanceToNowHandler = (date: Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ja });
};
