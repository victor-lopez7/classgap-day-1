import Persistent from "../../store/persistent";
import Item from "../items/item";
import Entity from "./entity";

Persistent.registerClassFactory( 'Hero', ()=> new Hero() )

export default class Hero extends Entity {
    private _items: Item[] = []

    use(item: Item): void {
        item.consumeHero( this );
    }

    addItem( item: Item ) {
        this._items.push( item )
        this.notifyAll<Hero>({ items: this.items });
    }
    
    removeItem( removedItem: Item ) {
        this.notifyAll<Hero>({ items: this.items });
        this._items.filter( item => item !== removedItem );
    }

    get items(): Readonly<Item[]> {
        return this._items;
    }
 }