import { useTranslation } from 'react-multi-lang';
import { toast, ToastPosition, TypeOptions } from 'react-toastify';

import { Errors } from '../types/enums/Errors';
import { ToastOptions } from '../types/logic/ToastOption';

const useToastify = () => {
  const t = useTranslation();

  const customToast = (message: string, type: TypeOptions, options?: ToastOptions) => {
    message = t(message, { ...options?.messageOptions });

    toast(message, {
      type,
      position: options?.position || toast.POSITION.BOTTOM_LEFT,
      delay: options?.delay || 0,
      onClose: options?.onClose,
      onClick: options?.onClick,
    });
  };

  const toastWarning = (message: string, options?: ToastOptions) => {
    customToast(message, toast.TYPE.WARNING, options);
  };
  const toastError = (
    message: string = Errors.DEFAULT,
    options?: {
      messageOptions?: Record<string, any>;
      position?: ToastPosition;
      delay?: number;
      onClose?: () => void;
    }
  ) => {
    customToast(message, toast.TYPE.ERROR, options);
  };

  const toastSuccess = (message: string, options?: ToastOptions) => {
    customToast(message, toast.TYPE.SUCCESS, options);
  };

  return { toastError, toastWarning, toastSuccess };
};

export { useToastify };
