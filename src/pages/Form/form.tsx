import React, { useState } from 'react';
import Card from './card';
import './form.css';

const Form = () => {
  interface Person {
    name: string;
    date: string;
    country: string;
    imgg: string;
    info: boolean;
  }

  const [people, setPeople] = useState<Person[]>([]);
  const [create, setCreate] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [country, setCountry] = useState('');
  const [image, setImage] = useState('');
  const [info, setInfo] = useState(false);

  const addPeople = () => {
    // дописать здесь чтобы была проверка на создание - валидация
    if (create) {
      const newPerson: Person = {
        name: name,
        date: date,
        country: country,
        imgg: image,
        info: info,
      };
      setPeople([...people, newPerson]);
      setName('');
      setCountry('');
      setDate('');
      setImage('');
    }
  };

  const radioHandle = (e: React.MouseEvent<HTMLInputElement>) => {
    if (create === true) {
      setCreate(false);
    } else if (create === false) {
      setCreate(true);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <div className="form">
        {/*поле ИМЯ - (не готово!!!!!!!!!!!!!!!!!!!!!)*/}
        <label>Name:</label>
        <input
          name="name"
          type="text"
          className="form-name"
          placeholder=""
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="form-empty"></div>
        {/*поле дата - (Готово)*/}
        <label>Date of birth:</label>
        <input
          name="date"
          type="date"
          className="form-date"
          placeholder=""
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />
        <div className="form-empty"></div>
        {/*поле страны - (не готово!!!!!!!!!!!!!!!!!!!)*/}
        <label>Country:</label>
        <select
          name="country"
          className="form-select"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Please select country</option>
          <option value="Belarus">Belarus</option>
          <option value="Lithuania">Lithuania</option>
          <option value="Latvia">Latvia</option>
          <option value="Estonia">Estonia</option>
          <option value="Poland">Poland</option>
          <option value="Slovakia">Slovakia</option>
          <option value="Germany">Germany</option>
          <option value="The Netherlands">The Netherlands</option>
          <option value="Belgium">Belgium</option>
          <option value="France">France</option>
        </select>
        <div className="form-empty"></div>
        {/*поле фото - (не готово!!!!!!!!!!!!!!!!!!)*/}
        <label>Select profile image:</label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          className="form-img"
          onChange={handleImageChange}
        ></input>
        <div className="form-empty"></div>
        {/*поле информации - (Готово)*/}
        <div className="form-checkbox">
          <label>I want to receive information about novelties</label>
          <label className="check-switch">
            <input type="checkbox" className="checkButton" />
            <span
              className="slider"
              data-label-on="YES"
              data-label-off="NO"
              onClick={info ? () => setInfo(false) : () => setInfo(true)}
            ></span>
          </label>
        </div>
        <div className="form-empty"></div>
        {/*поле соглашения - (Готово)*/}
        <div>
          <input type="checkbox" className="form-radio" onClick={(e) => radioHandle(e)}></input>
          <label>agree with processing of my personal data</label>
        </div>
        <div className="form-empty"></div>
        <div className="form-empty"></div>
        {/*поле кнопка - (готово)*/}
        <button className={`sub-btn ${create ? 'animaited' : ''}`} onClick={addPeople}>
          Submit
        </button>
      </div>
      {/*поле модельки - (готово)*/}
      <div className="modalsS">
        <div className="modali">
          {people.map((person, index) => (
            <div key={index}>
              <Card
                name={person.name}
                date={person.date}
                country={person.country}
                imgg={person.imgg}
                info={person.info}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Form;
