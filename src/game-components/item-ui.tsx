import React from "react";
import Entity from "../model/entities/entity";
import FixedHealthPotion from "../model/items/fixed-health-potion";
import Item from "../model/items/item";
import PercentualHealthPotion from "../model/items/percentual-health-potion";
import { ITEM_INFO } from "../utils/game-constants";

type ItemUIProps = { owner: Entity, item: Item }
type ItemUIState = {  }

export default class ItemUI extends React.Component<ItemUIProps, ItemUIState>{

    private _handleClick(){
        this.props.owner.use( this.props.item );
    }

    renderItem(){
        const item = this.props.item;
        if(item instanceof FixedHealthPotion){
            return ITEM_INFO.fixedPotion.display
        } else if(item instanceof PercentualHealthPotion){
            return ITEM_INFO.percentualPotion.display
        }
    }

    render(){
        this.renderItem();
        return (
            <div className="ItemUI" >
                <button onClick={() => this._handleClick()}>
                    { this.renderItem() }
                </button>
            </div>
        )
    }
}