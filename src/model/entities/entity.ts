import { ObservablePersistent } from "../../store/observable-persistent";
import Item from "../items/item";

const MIN_HEALTH = 0;

export default abstract class Entity extends ObservablePersistent {
    
    private _health: number;
    private _maxHealth: number;
    private _attack: number;

    constructor(maxHealth: number, attack: number){
        super();
        this._health = maxHealth;
        this._maxHealth = maxHealth;
        this._attack = attack;
    }

    get health() { 
        return this._health; 
    }

    get state(): Entity {
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

    abstract use(item: Item): void;

    dealDamage(damage: number){
        this.health -= damage;
        this.notifyAll<Entity>({ health: this.health });
    }

    heal(lifeHealed: number){
        this.health += lifeHealed;
        this.notifyAll<Entity>({health: this.health});
    }

    attack(entity: Entity){
        if(this.health > 0) 
            entity.dealDamage(this._attack);
    }

}