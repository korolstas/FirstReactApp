import React, { useState } from 'react';
import Card from './Сard';
import Validation from './Validation';
import './form.css';
import Person from './interfaceForm';

const Form = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [create, setCreate] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [country, setCountry] = useState('');
  const [image, setImage] = useState('');
  const [isEqual, setIsEqual] = useState(true);
  const [isAnimation, setIsAnimation] = useState(false);

  const [nameError, setNameError] = useState('This field is required');
  const [dateError, setDateError] = useState('This field is required');
  const [countryError, setCountryError] = useState('This field is required');
  const [imageError, setImageError] = useState('This field is required');
  const [isNameDirty, setIsNameDirty] = useState(false);
  const [isDateDirty, setIsDateDirty] = useState(false);
  const [isCountryDirty, setIsCountryDirty] = useState(false);
  const [isImageDirty, setIsImageDirty] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const selectItems = [
    {
      value: '',
      label: 'Please select country',
    },
    {
      value: 'Belarus',
      label: 'Belarus',
    },
    {
      value: 'Lithuania',
      label: 'Lithuania',
    },
    {
      value: 'Latvia',
      label: 'Latvia',
    },
    {
      value: 'Estonia',
      label: 'Estonia',
    },
    {
      value: 'Poland',
      label: 'Poland',
    },
    {
      value: 'Slovakia',
      label: 'Slovakia',
    },
    {
      value: 'Germany',
      label: 'Germany',
    },
    {
      value: 'The Netherlands',
      label: 'The Netherlands',
    },
    {
      value: 'Belgium',
      label: 'Belgium',
    },
    {
      value: 'France',
      label: 'France',
    },
  ];

  const addPeople = () => {
    const isNoError = !nameError && !dateError && !countryError && !imageError;
    const isDirty = isNameDirty && isDateDirty && isCountryDirty && isImageDirty;
    const resetFrom = () => {
      setName('');
      setCountry('');
      setDate('');
      setImage('');
      setIsNameDirty(false);
      setIsDateDirty(false);
      setIsCountryDirty(false);
      setIsImageDirty(false);
      setNameError('This field is required');
      setImageError('This field is required');
      setCountryError('This field is required');
      setDateError('This field is required');
    };

    if (create && isDirty && isNoError) {
      const newPerson: Person = {
        name: name,
        date: date,
        country: country,
        imgg: image,
        info: isEqual,
      };
      setPeople([...people, newPerson]);
      resetFrom();
      setIsAnimation(true);
      animationHandle();
    } else if (create) {
      setIsNameDirty(true);
      setIsDateDirty(true);
      setIsCountryDirty(true);
      setIsImageDirty(true);
    }
    setCreate(false);
    setIsChecked(false);
  };
  const blurHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'name':
        setIsNameDirty(true);
        break;
      case 'date':
        setIsDateDirty(true);
        break;
      case 'image':
        setIsImageDirty(true);
        break;
    }
  };
  const blurHandleCountry = (e: React.FocusEvent<HTMLSelectElement, Element>) => {
    switch (e.target.name) {
      case 'country':
        setIsCountryDirty(true);
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
    setIsAnimation(true);
    setTimeout(() => {
      setIsAnimation(false);
    }, 3000); // 3000 миллисекунд = 3 секунды
  };

  return (
    <div>
      {isAnimation && (
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
          <Validation changeError={nameError} changeDirty={isNameDirty} />
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
          <Validation changeError={dateError} changeDirty={isDateDirty} />
          <label>Country:</label>
          <select
            name="country"
            className="form-select"
            value={country}
            onBlur={(e) => blurHandleCountry(e)}
            onChange={(e) => countryHandle(e)}
          >
            {selectItems.map((selectItem) => (
              <option key={selectItem.value} value={selectItem.value}>
                {selectItem.label}
              </option>
            ))}
          </select>
          <Validation changeError={countryError} changeDirty={isCountryDirty} />
          <label>Select profile image:</label>
          <input
            name="image"
            type="file"
            accept=".png, .jpg, .jpeg"
            className="form-img"
            onBlur={(e) => blurHandle(e)}
            onChange={(e) => imageHandle(e)}
          ></input>
          <Validation changeError={imageError} changeDirty={isImageDirty} />
          <div className="form-checkbox">
            <label>I want to receive information about novelties</label>
            <label className="check-switch">
              <input type="checkbox" className="checkButton" />
              <span
                className="slider"
                data-label-on="YES"
                data-label-off="NO"
                onClick={!isEqual ? () => setIsEqual(true) : () => setIsEqual(false)}
              ></span>
            </label>
          </div>
          <div className="form-empty"></div>
          <label>
            <input
              type="checkbox"
              onChange={(event) => setCreate(event.target.checked)}
              checked={isChecked}
              onClick={() => setIsChecked(!isChecked ? true : false)}
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
            {people.map((person) => (
              <div key={person.name && person.date}>
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
