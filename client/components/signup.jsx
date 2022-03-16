import React, { useState } from 'react';
import * as actions from '../actions/actions.js';
import { connect } from 'react-redux';

const displayMessage = [];

const mapStateToProps = (state) => ({
  username: state.textField.username,
  password: state.textField.password,
  validUser: state.textField.validUser,
});

const mapDispatchToProps = (dispatch) => ({
  toProfilePageAction: () => dispatch(actions.toLandingPageAction(e)),
  createAccountAction: () => dispatch(actions.createAccountAction(e)),

});

  const Signup = (props) => {

    // username = label of the variable
    // setUsername is the function that changes the username state
    // the value passed in to useState is the initialized value for username 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (payload, res) => {
      e.preventDefault();

      if(props.validUser) props.toLandingPageAction();
      else props.createAccountAction();

      const url = `http://localhost:3000/api/user/register`;
      const options = {
        method: 'POST',
        headers: { 'Access-Control-Allow-Origin': ' * ', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: props.state.username,
          password: props.state.password,
        }),
      };
      fetch(url, options)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.valid) props.toLandingPageAction();
          else props.createAccountAction();
        });
    }
    

    return (
      <body>
      <div className ="signup">
      <header>
          <h1>Application Helper</h1>
          <p>Create an account and get started today!</p>
        </header>

          <form onSubmit = {(e) => props.handleSignup(e)}>
              <label htmlFor = "user"></label><br/>
              <input className = "input-box" 
              type = "text" 
              id = "user" 
              name = "user" 
              placeholder = "Create username"
              value={props.username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              />
              <input 
                className="input-box"
                type="text"
                id="password"
                name="password"
                placeholder="Create password"
                value={props.password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
             <input type="submit" value="Create Account" />
          </form>
      </div>
  </body>
    )
  }


export default connect(mapStateToProps, mapDispatchToProps)(Signup)