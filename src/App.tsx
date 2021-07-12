import React from 'react';
import './App.css';
import EntityUI from './game-components/entity-ui';
import Stats from './game-components/stats';
import Character from './model/character';
import { ITEM_INFO, MAIN_CHARACTER } from './utils/game-constants';

// Nota 1: Recordar no aclopar la lógica de negocio a los componentes (UI)
// Nota 2: No usar estado global -> Observer

function App() {

  const mainCharacter = new Character(MAIN_CHARACTER.maxHealth);

  return (
    <div className="App">
      <EntityUI entityObservable={mainCharacter}/>
      <Stats entityObservable={mainCharacter}/>

      <button onClick={() => mainCharacter.heal(ITEM_INFO.potion.healing)}>
        {ITEM_INFO.potion.display}
      </button>

      <button onClick={() => mainCharacter.dealDamage(ITEM_INFO.enemy.damage)}>
        {ITEM_INFO.enemy.display}
      </button>
    </div>
  );
}

export default App;
