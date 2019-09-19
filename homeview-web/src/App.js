import React from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  return (
    <div className="App">
      Hello
      <form>
        <input type="textbox" name="Username" className="login-name" />
        <button type="button" className="login-button" name="OK">ok</button>
      </form>
    </div>
  );
}

export default App;
