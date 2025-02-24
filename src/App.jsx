import { useState } from 'react'
import './App.css'
import { ApplicationViews } from './views/ApplicationViews.jsx'
import { NavBar } from './components/nav/NavBar.jsx';

const App = () => {
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'));

  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken);
    setTokenState(newToken);
  };

  return (
    <>
      <NavBar token={token} setToken={setToken} />
      <ApplicationViews token={token} setToken={setToken} />
    </>
  );
};

export default App;