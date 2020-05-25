import React from 'react';
import '../app.css';

export default function Chat(): JSX.Element {
  return (
    <form action="index" className="login-form">
    <div className="form-header">
      <h2>DenoChat</h2>
    </div>
    <div className="form-content">
      <div className="input-group">
        <input type="text" placeholder="Enter your name" name="name" />
      </div>
      <label>Choose a group to join</label>
      <label className="category-item">
        <input id="cooking" type="radio" name="group" value="Javascript" /> Javascript
      </label>
      <label className="category-item">
        <input id="node" type="radio" name="group" value="Node.js" /> NodeJS
      </label>
      <label className="category-item">
        <input id="deno" type="radio" name="group" value="Deno" /> Deno
      </label>
      <label className="category-item">
        <input id="php" type="radio" name="group" value="PHP" /> PHP
      </label>
    </div>
    <div className="form-footer">
      <button id="joinChatBtn">Login</button>
    </div>
  </form>)
}