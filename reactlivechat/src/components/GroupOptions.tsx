import React, {useEffect} from 'react';
import {setGroup} from '../models/redux/actions/chatActions';

export default function GroupOptions():JSX.Element {

    return(<div>
        <label>Choose a group to join</label>
        <div>
        <label  className="category-item">
          <input id="cooking" type="radio" onChange={({target}) => setGroup(target.value)} name="group" value="Javascript"/> Javascript
        </label>
        <label  className="category-item">
          <input id="node" type="radio" onChange={({target}) => setGroup(target.value)} name="group" value="Node.js" /> Node.js
        </label>
        <label  className="category-item">
          <input id="deno" type="radio" onChange={({target}) => setGroup(target.value)} name="group" value="Deno" /> Deno
        </label>
        <label className="category-item">
          <input id="php" type="radio" onChange={({target}) => setGroup(target.value)} name="group" value="PHP"/> PHP
        </label>
        </div>
      </div>);
}