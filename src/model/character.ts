import { Entity } from "./entity";
import Observable from "../utils/observable";

const MIN_HEALTH = 0;

export default class Character extends Observable<Entity> implements Entity {
    
    private _health: number;
    private _maxHealth: number;

    constructor(maxHealth: number){
        super();
        this._health = maxHealth;
        this._maxHealth = maxHealth;
    }

    get health() { 
        return this._health; 
    }

    get state(): Character {
        return this;
    }

    set health(newHealth){
        if(newHealth < MIN_HEALTH)
            this._health = MIN_HEALTH;
        else if(newHealth > this.maxHealth)
            this._health = this.maxHealth;
        else this._health = newHealth;
    }
    
    get maxHealth() { 
        return this._maxHealth; 
    }

    dealDamage(damage: number){
        this.health -= damage;
        this.notifyAll();
    }

    heal(lifeHealed: number){
        this.health += lifeHealed;
        this.notifyAll();
    }

}