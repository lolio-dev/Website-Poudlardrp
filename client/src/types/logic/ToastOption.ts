import { ToastPosition } from 'react-toastify';

export interface ToastOptions {
  messageOptions?: Record<string, any>;
  position?: ToastPosition;
  delay?: number;
  onClose?: () => void;
  onClick?: () => void;
}
