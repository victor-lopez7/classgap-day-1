import entity from "../entities/entity";
import Potion from "./potion";

export default class PercentualHealthPotion extends Potion {
    
    constructor(private healedPercentage: number){
        super();
    }

    getHealedQuantity(entity: entity): number {
        return this.healedPercentage * entity.maxHealth;
    }
}