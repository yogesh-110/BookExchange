import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Register from './pages/Register';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Layout from './components/Layout';
import { AuthContext } from './contexts/AuthContext';
import BookDetails from './components/BookDetails';
import EditBook from './components/EditBook';
import ChooseOption from './components/ChooseOption';

const App = () => {
  const { currentUser } = useContext(AuthContext);

  console.log(currentUser);

  const PrivateRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="book/:id" element={<BookDetails />} />
          <Route path="edit-book/:id" element={<EditBook />} />
          <Route path="/choose-option/:id" element={<ChooseOption />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="messages"
            element={
              <PrivateRoute>
                <Messages />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
