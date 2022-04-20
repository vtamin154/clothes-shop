import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../config/Config';
const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = (e) => {
    e.preventDefault();
      auth.signInWithEmailAndPassword(email, password).then(() => {
          setEmail('');
          setPassword('');
          props.history.push('/');
      }).catch(err => setError(err.message))
  };
  return (
    <div>
      <h2 className="text-center">Login</h2>
      <hr className="w-25 mx-auto" />
      <div className="w-25 justify-content-center align-items-center mx-auto">
        <form action="" onSubmit={login} autoComplete="off">

          <div className="form-outline mb-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input required
              className="form-control form-control-lg"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-outline mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input required
              className="form-control form-control-lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <br />

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success btn-dark py-2 px-4 mb-3">
              Login
            </button>
          </div>

         {error && <p className="text-danger">{error}</p>}

          <p>Don't have an account ? Sign up <Link to="/sign-up">Here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
