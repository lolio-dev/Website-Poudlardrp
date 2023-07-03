import { useNavigate } from 'react-router-dom';

import { Errors } from '../types/enums/Errors';
import { ToastOptions } from '../types/logic/ToastOption';

import { useToastify } from './useToastify';

export const useRedirect = () => {
  const { toastSuccess, toastWarning, toastError } = useToastify();
  const navigate = useNavigate();

  const successRedirect = (to = '/', message: string, toastOption?: ToastOptions) => {
    navigate(to);
    toastSuccess(message, toastOption);
  };

  const warningRedirect = (to = '/', message: string, toastOption?: ToastOptions) => {
    navigate(to);
    toastWarning(message, toastOption);
  };

  const errorRedirect = (to = '/', message = Errors.DEFAULT, toastOption?: ToastOptions) => {
    navigate(to);
    toastError(message, toastOption);
  };

  return { successRedirect, warningRedirect, errorRedirect };
};
