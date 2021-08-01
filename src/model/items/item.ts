import Enemy from "../entities/enemy";
import Hero from "../entities/hero";

export default abstract class Item {
    abstract consumeHero(hero: Hero): void
    abstract consumeEnemy(enemy: Enemy): void
}