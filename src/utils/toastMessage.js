import { toast } from 'react-toastify';

export const messageDisplay = (msg) => {
  const msgVal = msg.toLowerCase();
  if (
    msgVal.includes(
      'success' || 'successfully' || 'updated' || 'succes' || 'created',
      'congratulations'
    )
  ) {
    return toast.success(msgVal.toString());
  } else {
    return toast.error(msgVal);
  }
};
