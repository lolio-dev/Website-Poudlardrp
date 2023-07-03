import { CSSProperties, FunctionComponent, ReactElement } from 'react';
import { createPortal } from 'react-dom';

import style from './modal.module.scss';

interface Props {
  open: boolean;
  children: ReactElement;
  setOpen?: (state: boolean) => void;
  className?: string;
  width?: string | number;
}

const Modal: FunctionComponent<Props> = ({ open, children, setOpen, className = '', width }) => {
  const cutomStyle: CSSProperties = {
    maxWidth: typeof width === 'number' ? `${width}px` : width,
  };

  if (open) {
    return createPortal(
      <div className={style.modalBackdrop} onClick={setOpen ? () => setOpen(false) : undefined}>
        <div
          style={cutomStyle}
          className={`${style.modal} ${className}`}
          onClick={event => event.stopPropagation()}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }

  return null;
};

export { Modal };
