import React from 'react';

interface Props extends React.PropsWithChildren {
  show: boolean;
  title: React.ReactNode;
  onClose: React.MouseEventHandler;
}

const Modal: React.FC<Props> = ({show, title, children, onClose}) => {
  return (
    <>
      <div
        className="modal-backdrop show"
        style={{display: show ? 'block' : 'none'}}
      />
      <div
        className="modal show"
        style={{display: show ? 'block' : 'none'}}
        onClick={onClose}
      >
        <div
          className="modal-dialog"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title fs-5">{title}</div>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
