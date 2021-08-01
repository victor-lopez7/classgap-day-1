import entity from "../entities/entity";
import Potion from "./potion";

export default class FixedHealthPotion extends Potion {
    
    constructor( private healedQuantity: number ){
        super();
    }

    getHealedQuantity(entity: entity): number {
        return this.healedQuantity;
    }
}