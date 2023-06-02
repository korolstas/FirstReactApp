import React, { useEffect, useState } from 'react';
import Modal from './Modal/Modal';
import './home.css';
import Loader from './Loader/Loader';
import localforage from 'localforage';

type TPerson = {
  id: number | undefined;
  name: string;
  gender: string | undefined;
  status: string | undefined;
  location: {
    name: string | undefined;
  };
  image: string | undefined;
  species: string | undefined;
};

const Home = () => {
  const [isVisibility, setIsVisibility] = useState(false);
  const [searchInfo, setSearchInfo] = useState('');
  const [person, setPerson] = useState<TPerson>({
    id: undefined,
    name: '',
    gender: undefined,
    species: undefined,
    status: undefined,
    location: {
      name: undefined,
    },
    image: undefined,
  });
  const [personUpdater, setPersonUpdate] = useState<TPerson[]>([]);
  const [filteredPersons, setFilteredPersons] = useState<TPerson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Выполните асинхронный запрос для получения данных
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const jsonData = await response.json();
        const extractedCharacters = jsonData.results.map((personUpdate: TPerson) => ({
          id: personUpdate.id,
          name: personUpdate.name,
          gender: personUpdate.gender,
          species: personUpdate.species,
          status: personUpdate.status,
          location: {
            name: personUpdate.location.name,
          },
          image: personUpdate.image,
        }));
        setPersonUpdate(extractedCharacters);
        setFilteredPersons(extractedCharacters);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    // Восстановление значения из локального хранилища при загрузке компонента
    localforage.getItem<string>('searchInfo').then((value: string | null) => {
      if (value) {
        setSearchInfo(value);
        const filteredHero = personUpdater.filter((hero: TPerson) =>
          hero.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPersons(filteredHero);
      }
    });
  }, [personUpdater]);

  const openModal = (personInfo: TPerson) => {
    setIsVisibility(!isVisibility);
    setPerson({
      id: personInfo.id,
      name: personInfo.name,
      gender: personInfo.gender,
      species: personInfo.species,
      status: personInfo.status,
      location: personInfo.location,
      image: personInfo.image,
    });
  };
  const modalBox = (personInfo: TPerson) => (
    <div onClick={() => openModal(personInfo)} className="card">
      <h3>{personInfo.name}</h3>
      <div className="personImg">
        <img className="img" src={personInfo.image} alt="" />
      </div>
    </div>
  );
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const filteredHero = personUpdater.filter((hero: TPerson) =>
        hero.name.toLowerCase().includes(searchInfo.toLowerCase())
      );
      localforage.setItem('searchInfo', searchInfo);
      setIsLoading(true);
      setFilteredPersons(filteredHero);
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
        {isLoading ? (
          <Loader />
        ) : filteredPersons.length !== 0 ? (
          filteredPersons.map((hero) => <div key={hero.id}>{modalBox(hero)}</div>)
        ) : (
          <h3 className="nothing">NOTHING</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
