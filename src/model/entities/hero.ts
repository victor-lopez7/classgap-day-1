import item from "../items/item";
import Entity from "./entity";

export default class Hero extends Entity {
    use(item: item): void {
        item.consumeHero( this );
    }
}