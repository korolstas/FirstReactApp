import React, { useState } from 'react';
import Modal from './Modal/Modal';
import { PERSONS_DATA } from './Modal/constants';
import './home.css';

type TPerson = {
  name: string | undefined;
  gender: string | undefined;
  status: string | undefined;
  location: string | undefined;
  img: string | undefined;
  species: string | undefined;
};

const Home = () => {
  const [filteredPersons, setFilteredPersons] = useState(PERSONS_DATA);
  const [isVisibility, setIsVisibility] = useState(false);
  const [searchInfo, setSearchInfo] = useState('');
  const [person, setPerson] = useState<TPerson>({
    name: undefined,
    gender: undefined,
    species: undefined,
    status: undefined,
    location: undefined,
    img: undefined,
  });

  const openModal = (personInfo: TPerson) => {
    setIsVisibility(!isVisibility);
    setPerson({
      name: personInfo.name,
      gender: personInfo.gender,
      species: personInfo.species,
      status: personInfo.status,
      location: personInfo.location,
      img: personInfo.img,
    });
  };
  const modalBox = (personInfo: TPerson) => (
    <div onClick={() => openModal(personInfo)} className="card">
      <h3>{personInfo.name}</h3>
      <div className="personImg">
        <img className="img" src={personInfo.img} alt="" />
      </div>
    </div>
  );
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setFilteredPersons(
        PERSONS_DATA.filter((personInfo) =>
          personInfo.name.toLowerCase().includes(searchInfo.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="container">
      <div className="search-box">
        <input
          onKeyDown={(e) => handleKeyDown(e)}
          type="text"
          placeholder="Search character ..."
          className="search___input"
          value={searchInfo}
          onChange={(e) => setSearchInfo(e.target.value)}
        />
      </div>
      <div className={`open ${isVisibility ? 'animaited' : ''}`}>
        <Modal setActive={() => openModal(person)} hero={person} />
      </div>
      <div className="modals">
        {filteredPersons.map((hero) => (
          <div key={hero.id}>{modalBox(hero)}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
