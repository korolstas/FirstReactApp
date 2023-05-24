import React, { useState } from 'react';
import Card from './card';
import Validation from './Validation';
import './form.css';
// import { isVisible } from '@testing-library/user-event/dist/utils';

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
  const [info, setInfo] = useState(true);
  const [animation, setAnimation] = useState(false);

  const addPeople = () => {
    if (
      create &&
      nameDirty &&
      dateDirty &&
      countryDirty &&
      imageDirty &&
      !nameError &&
      !dateError &&
      !countryError &&
      !imageError
    ) {
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
      setNameDirty(false);
      setDateDirty(false);
      setCountryDirty(false);
      setImageDirty(false);
      setNameError('This field is required');
      setImageError('This field is required');
      setCountryError('This field is required');
      setDateError('This field is required');
      setAnimation(true);
      animationHandle();
    } else if (create) {
      setNameDirty(true);
      setDateDirty(true);
      setCountryDirty(true);
      setImageDirty(true);
    }
    setCreate(false);
    setIsChecked(false);
  };

  const [nameError, setNameError] = useState('This field is required');
  const [dateError, setDateError] = useState('This field is required');
  const [countryError, setCountryError] = useState('This field is required');
  const [imageError, setImageError] = useState('This field is required');
  const [nameDirty, setNameDirty] = useState(false);
  const [dateDirty, setDateDirty] = useState(false);
  const [countryDirty, setCountryDirty] = useState(false);
  const [imageDirty, setImageDirty] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const radioHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isChecked && e.target) {
      setCreate(true);
    } else {
      setCreate(false);
    }
  };
  const blurHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'date':
        setDateDirty(true);
        break;
      case 'image':
        setImageDirty(true);
        break;
    }
  };
  const blurHandleCountry = (e: React.FocusEvent<HTMLSelectElement, Element>) => {
    switch (e.target.name) {
      case 'country':
        setCountryDirty(true);
        break;
    }
  };
  const nameHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setName(newValue);
    const re = /[A-Za-z]{3}/;
    if (String(newValue) === '') {
      setNameError('This field is required');
    } else if (!re.test(String(newValue).toLowerCase())) {
      setNameError('Should be more than 3 symbols');
    } else {
      setNameError('');
    }
  };
  const dateHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDate(newValue);
    if (newValue === '') {
      setDateError('This field is required');
    } else if (new Date(newValue) > new Date()) {
      setDateError('Selected date should not be in the future');
    } else {
      setDateError('');
    }
  };
  const countryHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setCountry(newValue);
    if (newValue === '') {
      setCountryError('This field is required');
    } else {
      setCountryError('');
    }
  };
  const imageHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target ? e.target.result : null;
        if (result) {
          setImage(result as string);
        }
      };
      reader.readAsDataURL(file);
      setImageError('');
    } else {
      setImageError('This field is required');
    }
  };
  const animationHandle = () => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 3000); // 3000 миллисекунд = 3 секунды
  };

  return (
    <div>
      {animation && (
        <div className="modal-window">
          <label className="window">Card successfully added</label>
        </div>
      )}
      <div className="container">
        <div className="form">
          <label>Name:</label>
          <input
            name="name"
            type="text"
            className="form-name"
            placeholder=""
            onBlur={(e) => blurHandle(e)}
            value={name}
            onChange={(e) => nameHandle(e)}
          />
          <Validation changeError={nameError} changeDirty={nameDirty} />
          <label>Date of birth:</label>
          <input
            name="date"
            type="date"
            className="form-date"
            placeholder=""
            onBlur={(e) => blurHandle(e)}
            value={date}
            onChange={(e) => dateHandle(e)}
            max={new Date().toISOString().split('T')[0]}
          />
          <Validation changeError={dateError} changeDirty={dateDirty} />
          <label>Country:</label>
          <select
            name="country"
            className="form-select"
            value={country}
            onBlur={(e) => blurHandleCountry(e)}
            onChange={(e) => countryHandle(e)}
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
          <Validation changeError={countryError} changeDirty={countryDirty} />
          <label>Select profile image:</label>
          <input
            name="image"
            type="file"
            accept=".png, .jpg, .jpeg"
            className="form-img"
            onBlur={(e) => blurHandle(e)}
            onChange={(e) => imageHandle(e)}
          ></input>
          <Validation changeError={imageError} changeDirty={imageDirty} />
          <div className="form-checkbox">
            <label>I want to receive information about novelties</label>
            <label className="check-switch">
              <input type="checkbox" className="checkButton" />
              <span
                className="slider"
                data-label-on="YES"
                data-label-off="NO"
                onClick={!info ? () => setInfo(true) : () => setInfo(false)}
              ></span>
            </label>
          </div>
          <div className="form-empty"></div>
          <label>
            <input
              type="checkbox"
              onChange={(e) => radioHandle(e)}
              checked={isChecked}
              onClick={!isChecked ? () => setIsChecked(true) : () => setIsChecked(false)}
            />
            agree with processing of my personal data
          </label>
          <div className="form-empty"></div>
          <div className="form-empty"></div>
          <button className={`sub-btn ${create ? 'animaited' : ''}`} onClick={addPeople}>
            Submit
          </button>
        </div>
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
    </div>
  );
};

export default Form;
