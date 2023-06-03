import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Person from './interfaceForm';
import './uform.css';
import Card from './Сard';

export default function FormUpdate() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Person>();

  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isEqual, setIsEqual] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [image, setImage] = useState<string>('');
  const [isAnimation, setIsAnimation] = useState<boolean>(false);

  const selectItems = [
    {
      id: 0,
      value: '',
      label: 'Please select country',
    },
    {
      id: 1,
      value: 'Belarus',
      label: 'Belarus',
    },
    {
      id: 2,
      value: 'Lithuania',
      label: 'Lithuania',
    },
    {
      id: 3,
      value: 'Latvia',
      label: 'Latvia',
    },
    {
      id: 4,
      value: 'Estonia',
      label: 'Estonia',
    },
    {
      id: 5,
      value: 'Poland',
      label: 'Poland',
    },
    {
      id: 6,
      value: 'Slovakia',
      label: 'Slovakia',
    },
    {
      id: 7,
      value: 'Germany',
      label: 'Germany',
    },
    {
      id: 8,
      value: 'The Netherlands',
      label: 'The Netherlands',
    },
    {
      id: 9,
      value: 'Belgium',
      label: 'Belgium',
    },
    {
      id: 10,
      value: 'France',
      label: 'France',
    },
  ];

  const imageHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target ? e.target.result : null;
      if (!result) return;
      setImage(result as string);
    };
    reader.readAsDataURL(file);
  };
  const onSubmit: SubmitHandler<Person> = (data: Person) => {
    if (!isCreate) return console.log(data);
    function animationHandle() {
      setIsAnimation(true);
      setTimeout(() => {
        setIsAnimation(false);
      }, 3000); // 3000 миллисекунд = 3 секунды
    }
    function resetForm() {
      setValue('name', '');
      setValue('imgg', '');
      setValue('country', '');
      setValue('date', '');
      setValue('info', false);
      setIsChecked(false);
      setIsCreate(false);
    }
    const newPerson: Person = {
      name: data.name,
      date: data.date,
      country: data.country,
      imgg: image,
      info: data.info,
    };
    setPeople([...people, newPerson]);
    animationHandle();
    resetForm();
  };

  return (
    <div>
      {isAnimation && (
        <div className="modal-window">
          <label className="window">Card successfully added</label>
        </div>
      )}
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name:</label>
          <input
            type="text"
            className="form-name"
            {...register('name', {
              required: 'This is required',
              minLength: { value: 3, message: 'Should be more than 3 symbols' },
            })}
          />
          <div className="form-empty">{errors.name && errors.name.message}</div>
          <label>Date of birth:</label>
          <input
            type="date"
            className="form-date"
            max={new Date().toISOString().split('T')[0]}
            {...register('date', {
              required: 'This is required',
            })}
          />
          <div className="form-empty">{errors.date && errors.date.message}</div>
          <label>Country:</label>
          <select
            className="form-select"
            {...register('country', { required: 'This is required' })}
          >
            {selectItems.map(({ id, value, label }) => (
              <option key={id} value={value}>
                {label}
              </option>
            ))}
          </select>
          <div className="form-empty">{errors.country && errors.country.message}</div>
          <label>Select profile image:</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            className="form-img"
            {...register('imgg', {
              required: 'This is required',
              onChange: (e) => imageHandle(e),
            })}
          ></input>
          <div className="form-empty">{errors.imgg && errors.imgg.message}</div>
          <div className="form-checkbox">
            <label>I want to receive information about novelties</label>
            <label className="check-switch">
              <input
                type="checkbox"
                className="checkButton"
                onClick={() => setIsEqual(isEqual ? true : false)}
                {...register('info', { value: isEqual })}
              />
              <span className="slider" data-label-on="YES" data-label-off="NO"></span>
            </label>
          </div>
          <div className="form-empty"></div>
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(isChecked ? false : true)}
              onClick={() => setIsCreate(isChecked ? false : true)}
            />
            agree with processing of my personal data
          </label>
          <div className="form-empty"></div>
          <div className="form-empty"></div>
          <input
            type="submit"
            className={`sub-btn ${isCreate ? 'animaited' : ''}`}
            value="Submit"
          />
        </form>
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
}
