import React, { Component } from 'react';
import Modal from './Modal/Modal';
import { Persons } from './Modal/persons';
import './style.css';

export default class Header extends Component {
  state = {
    visibility: false,
    value: '',
    filteredPersons: Persons,
    person: {
      name: 'none',
      gender: 'none',
      species: 'none',
      status: 'none',
      location: 'none',
      img: 'none',
    },
  };
  openModal = (Person: {
    name: string;
    gender: string;
    status: string;
    location: string;
    img: string;
    species: string;
  }) => {
    this.setState({
      visibility: !this.state.visibility,
      person: {
        name: Person.name,
        gender: Person.gender,
        species: Person.species,
        status: Person.status,
        location: Person.location,
        img: Person.img,
      },
    });
  };
  modalBox = (Person: {
    name: string;
    gender: string;
    status: string;
    location: string;
    img: string;
    species: string;
  }) => (
    <div onClick={() => this.openModal(Person)} className="card">
      <h3>{Person.name}</h3>
      <div className="personImg">
        <img className="img" src={Person.img} alt="" />
      </div>
    </div>
  );
  setValue = (e: string) => {
    this.setState({ value: e });
  };
  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.setState({
        filteredPersons: Persons.filter((Person) =>
          Person.name.toLowerCase().includes(this.state.value.toLowerCase())
        ),
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="search-box">
          <input
            onKeyDown={this.handleKeyDown}
            type="text"
            placeholder="Search character ..."
            className="search___input"
            onChange={(element) => this.setValue(element.target.value)}
          />
        </div>
        <div className={`open ${this.state.visibility ? 'animaited' : ''}`}>
          <Modal setActive={() => this.openModal(this.state.person)} Person={this.state.person} />
        </div>
        <div className="modals">
          {this.state.filteredPersons.map((article, index) => (
            <div key={index}>{this.modalBox(article)}</div>
          ))}
        </div>
      </div>
    );
  }
}
