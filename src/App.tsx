import React from 'react';
import './App.css';
import EntityUI from './game-components/entity-ui';
import Stats from './game-components/stats';
import Enemy from './model/entities/enemy';
import Hero from './model/entities/hero';
import FixedHealthPotion from './model/items/fixed-health-potion';
import PercentualHealthPotion from './model/items/percentual-health-potion';
import { ENEMY, ITEM_INFO, MAIN_CHARACTER } from './utils/game-constants';

// Nota 1: Recordar no aclopar la lógica de negocio a los componentes (UI)
// Nota 2: No usar estado global -> Observer

// TODO: Facade para guardar el estado y los cambios (CRUD operations)

function App() {

  const mainCharacter = new Hero(MAIN_CHARACTER.maxHealth, MAIN_CHARACTER.attack);
  const mainCharacterItems = [ 
    new FixedHealthPotion(ITEM_INFO.fixedPotion.healing),
    new PercentualHealthPotion(ITEM_INFO.percentualPotion.healing)
  ]; 

  const enemy = new Enemy(ENEMY.maxHealth, ENEMY.attack);
  const enemyItems = [
    new FixedHealthPotion(ITEM_INFO.fixedPotion.healing),
  ]
  
  return (
    <div className="App">
      <div className="entity-action">
        <EntityUI entity={ mainCharacter } items={mainCharacterItems} representation={ MAIN_CHARACTER.display }/>
        <button onClick={() => mainCharacter.attack(enemy)}>
          {ITEM_INFO.enemy.display}
        </button>
      </div>

      <div className="entity-action">
        <EntityUI entity={ enemy } items={ enemyItems } representation={ ENEMY.display }/>
        <button onClick={() => enemy.attack(mainCharacter)}>
          {ITEM_INFO.enemy.display}
        </button>
      </div>
      

      <Stats entity={mainCharacter}/>

    </div>
  );
}

export default App;
