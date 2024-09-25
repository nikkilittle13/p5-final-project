import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId, setIsLoggedIn, fetchUsers } from '../redux/slices/userSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { list: users, status } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(user => user.username === username);
  
    if (user) {
      dispatch(setUserId(user.id));
      dispatch(setIsLoggedIn(true));
    } else {
      setError('Username does not exist');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login to Access</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="form-control"
            required
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary mt-3">Login</button>
      </form>
    </div>
  );
};

export default Login;