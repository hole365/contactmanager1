import React, { Component } from 'react';
import { Consumer } from '../../Context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';



class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  onSubmit = (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Check For Errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'phone is required' } });
      return;
    }

    const newContact = {
      name,
      email,
      phone
    };

    axios.post('https://jsonplaceholder.typicode.com/users', newContact)
      .then(res => dispatch({ type: 'ADD_CONTACT', payload: res.data }));



    //clear state
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });
    this.props.history.push('/')

  };

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    value={name}
                    placeholder=" Enter name"
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="email"
                    name="email"
                    value={email}
                    placeholder="Enter email"
                    type={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="phone"
                    name="phone"
                    value={phone}
                    placeholder=" Enter phone"
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block" />
                </form>
              </div>
            </div>
          )
        }}


      </Consumer>
    )
  }
}

export default AddContact;