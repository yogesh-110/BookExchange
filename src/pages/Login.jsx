import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import logo from '../assets/img/logo.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Hourglass } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        toast.success('User signed in');
        setIsLoading(false);
        navigate('/');
      });
    } catch (err) {
      setIsLoading(false);
      console.log(err.code);
      toast.error(err.code);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="loader-container">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#c4c3e1', '#a5a4c4', '#8685a6', '#696780', '#4f4d5b']}
          />
        </div>
      )}
      <div className="formContainer">
        <div className="formWrapper">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <h2 className="title">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email" required />
            <div className="passwordWrapper">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordVisible ? (
                <FaEye className="eyeIcon" onClick={togglePasswordVisibility} />
              ) : (
                <FaEyeSlash
                  className="eyeIcon"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            <button>Sign In</button>
          </form>
          <p>
            Don't have an account ? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
