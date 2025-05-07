import './App.css';
import UserList from './pages/UserList';
import UserRegistration from './pages/UserRegistration';
import HomePage from './pages/HomePage';
import UserDetail from './pages/UserDetail';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import BoardRegistration from './pages/BoardRegistration';
import BoardDetail from './pages/BoardDetail';

import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Router>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/boardregister/:id" element={<BoardRegistration />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
