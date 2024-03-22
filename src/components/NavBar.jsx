import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import default_img from '../assets/img/default_profile.png';
import { AuthContext } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Menu } from '@headlessui/react';
import { FaRegMessage, FaRegUser } from 'react-icons/fa6';
import { IoSettingsOutline } from 'react-icons/io5';
import { TbHelpSquare } from 'react-icons/tb';
import { BiLogOut } from 'react-icons/bi';
import { toast } from 'react-toastify';

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    signOut(auth).then(() => {
      toast.success('User signed out');
      navigate('/login');
    });
  }
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <ul>
        {currentUser ? (
          <div className="userInfo">
            <span className="user-name">
              Welcome, {currentUser.displayName}
            </span>
            <Menu>
              <Menu.Button className="menu-button">
                <img
                  src={currentUser.photoURL}
                  alt="user"
                  className="user-img"
                  onProgress={(e) => {
                    e.target.onerror = null;
                    e.target.src = default_img;
                  }}
                />
              </Menu.Button>
              <Menu.Items className="custom-menu-items">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={`menu-link ${
                        active ? 'bg-blue-500 text-white' : 'text-black'
                      }`}
                    >
                      <span className="box">
                        <FaRegUser />
                        Profile
                      </span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/messages"
                      className={`menu-link ${
                        active ? 'bg-blue-500 text-white' : 'text-black'
                      }`}
                    >
                      <span className="box">
                        <FaRegMessage size={16} />
                        Messages
                      </span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/settings"
                      className={`menu-link ${
                        active ? 'bg-blue-500 text-white' : 'text-black'
                      }`}
                    >
                      <span className="box">
                        <IoSettingsOutline />
                        Settings
                      </span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/help"
                      className={`menu-link ${
                        active ? 'bg-blue-500 text-white' : 'text-black'
                      }`}
                    >
                      <span className="box">
                        <TbHelpSquare />
                        Help
                      </span>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      className={`menu-link ${
                        active ? 'bg-blue-500 text-white' : 'text-black'
                      }`}
                      onClick={handleLogout}
                    >
                      <span className="box">
                        <BiLogOut />
                        Logout
                      </span>
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
