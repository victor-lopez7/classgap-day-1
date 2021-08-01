import Enemy from "../entities/enemy";
import Entity from "../entities/entity";
import Hero from "../entities/hero";
import Item from "./item";

export default abstract class Potion extends Item{
    
    abstract getHealedQuantity(entity: Entity): number;

    consumeHero(hero: Hero): void {
        hero.heal( this.getHealedQuantity( hero ) );
    }
    
    consumeEnemy(enemy: Enemy): void { }
    
}