import React from 'react';
import './card.css';

type TPerson = {
  name: string;
  date: string;
  country: string;
  imgg: string;
  info: boolean;
};

const Card = (person: TPerson) => {
  return (
    <div className="cardD">
      <div className="wefFEWw">
        <img className="card-imgG" src={person.imgg} alt="No loading your photo" />
        <div className="card-infoO">
          <h4>
            <b>{person.name}</b>
          </h4>
          <p>
            <b>Birth:</b> {person.date}
          </p>
          <p>
            <b>Country:</b> {person.country}
          </p>
        </div>
      </div>
      <div className="card_novetiels">
        <label>Info about novelties</label>
        <label className="">{person.info ? 'Yes' : 'No'}</label>
      </div>
    </div>
  );
};

export default Card;
