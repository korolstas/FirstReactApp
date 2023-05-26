import React from 'react';
import './Modal.css';
import Props from './interfaceModal';

const Modal: React.FC<Props> = ({ setActive, PERSONS_DATA }) => {
  return (
    <div className="modal">
      <div className="box-modal">
        <button onClick={setActive} className="cancel-btn">
          x
        </button>
        <p className="name-modal">{PERSONS_DATA.name}</p>
        <div className="box-info">
          <img src={PERSONS_DATA.img} alt="" />
          <div className="info-modal">
            <p>
              <b>Gender: </b>
              {PERSONS_DATA.gender}
            </p>
            <p>
              <b>Species: </b>
              {PERSONS_DATA.species}
            </p>
            <p>
              <b>Status: </b>
              {PERSONS_DATA.status}
            </p>
            <p>
              <b>Location: </b>
              {PERSONS_DATA.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
