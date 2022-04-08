import React, { useState } from 'react';
import { auth, db } from '../config/Config';
const SignUp = (props) => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');

  const signUp = (e) => {
    e.preventDefault();
    if (password !== '' && password === rePassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          db.collection('UserAccount')
            .doc(cred.user.uid)
            .set({
              // UserID: cred.user.uid,
              Name: name,
              UserName: userName,
              Email: email,
              Password: password,
              Role: 'user',
            })
            .then(() => {
              db.collection('Cart').add({
                UserID: cred.user.uid,
              });
            })
            .then(() => {
              setName('');
              setUserName('');
              setEmail('');
              setPassword('');
              props.history.push('/');
            })
            .catch((err) => setError(err.message));
        })
        .catch((err) => setError(err.message));
    }
  };
  return (
    <div className="sign-up">
      <h2 className="text-center">Sign up</h2>
      <hr className="w-25 mx-auto" />
      <div className=" w-50 justify-content-center align-items-center mx-auto">
        <form
          className="mx-auto"
          action=""
          onSubmit={signUp}
          autoComplete="off"
        >
          <div className="form-outline mb-4">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              required
              className="form-control form-control-lg"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-outline mb-4">
            <label htmlFor="username" className="form-label">
              User name
            </label>
            <input
              required
              className="form-control form-control-lg"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="form-outline mb-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              required
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
            <input
              required
              className="form-control form-control-lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-outline mb-4">
            <label htmlFor="repeat_password" className="form-label">
              Repeat password
            </label>
            <input
              required
              className="form-control form-control-lg"
              type="password"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>

          <br />
          {error && <p className="text-danger">{error}</p>}

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success btn-dark">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
