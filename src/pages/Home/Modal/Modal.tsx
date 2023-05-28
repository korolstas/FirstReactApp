import React from 'react';
import './Modal.css';
import Props from './interfaceModal';

const Modal: React.FC<Props> = ({ setActive, hero }) => {
  const modalsInfo = [
    {
      label: 'Gender: ',
      value: hero.gender,
    },
    {
      label: 'Species: ',
      value: hero.species,
    },
    {
      label: 'Status: ',
      value: hero.status,
    },
    {
      label: 'Location: ',
      value: hero.location,
    },
  ];

  return (
    <div className="modal">
      <div className="box-modal">
        <button onClick={setActive} className="cancel-btn">
          x
        </button>
        <p className="name-modal">{hero.name}</p>
        <div className="box-info">
          <img src={hero.img} alt="" />
          <div className="info-modal">
            {modalsInfo.map((modalInfo) => (
              <p key={modalInfo.label}>
                <b>{modalInfo.label}</b>
                {modalInfo.value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
