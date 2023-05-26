import React, { Component } from 'react';
import Modal from './Modal/Modal';
import { PERSONS_DATA } from './Modal/constants';
import './home.css';

type TPerson = {
  name: string;
  gender: string;
  status: string;
  location: string;
  img: string;
  species: string;
};

export default class Header extends Component {
  state = {
    isVisibility: false,
    value: '',
    filteredPersons: PERSONS_DATA,
    person: {
      name: 'none',
      gender: 'none',
      species: 'none',
      status: 'none',
      location: 'none',
      img: 'none',
    },
  };
  openModal = (Person: TPerson) => {
    this.setState({
      isVisibility: !this.state.isVisibility,
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
  modalBox = (Person: TPerson) => (
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
        filteredPersons: PERSONS_DATA.filter((Person) =>
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
        <div className={`open ${this.state.isVisibility ? 'animaited' : ''}`}>
          <Modal
            setActive={() => this.openModal(this.state.person)}
            PERSONS_DATA={this.state.person}
          />
        </div>
        <div className="modals">
          {this.state.filteredPersons.map((article) => (
            <div key={article.name}>{this.modalBox(article)}</div>
          ))}
        </div>
      </div>
    );
  }
}
