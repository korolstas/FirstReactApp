import React from 'react';
import './modal.css';

interface Props {
  setActive: () => void;
  Person: {
    name: string;
    gender: string;
    status: string;
    location: string;
    img: string;
    species: string;
  };
}

const Modal: React.FC<Props> = ({ setActive, Person }) => {
  return (
    <div className="modal">
      <div className="box-modal">
        <button onClick={setActive} className="cancel-btn">
          x
        </button>
        <p className="name-modal">{Person.name}</p>
        <div className="box-info">
          <img src={Person.img} alt="" />
          <div className="info-modal">
            <p>
              <b>Gender: </b>
              {Person.gender}
            </p>
            <p>
              <b>Species: </b>
              {Person.species}
            </p>
            <p>
              <b>Status: </b>
              {Person.status}
            </p>
            <p>
              <b>Location: </b>
              {Person.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
