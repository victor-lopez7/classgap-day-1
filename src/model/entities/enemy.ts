import Item from "../items/item";
import Entity from "./entity";

export default class Enemy extends Entity {
    use(item: Item): void {
        item.consumeEnemy( this );
    }   
}