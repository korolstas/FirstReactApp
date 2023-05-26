import React from 'react';
import './card.css';

type TPerson = {
  name: string;
  date: string;
  country: string;
  imgg: string;
  info: boolean;
};

const Card = (Person: TPerson) => {
  return (
    <div className="cardD">
      <div className="wefFEWw">
        <img className="card-imgG" src={Person.imgg} alt="No loading your photo" />
        <div className="card-infoO">
          <h4>
            <b>{Person.name}</b>
          </h4>
          <p>
            <b>Birth:</b> {Person.date}
          </p>
          <p>
            <b>Country:</b> {Person.country}
          </p>
        </div>
      </div>
      <div className="card_novetiels">
        <label>Info about novelties</label>
        <label className="">{!Person.info ? 'Yes' : 'No'}</label>
      </div>
    </div>
  );
};

export default Card;
