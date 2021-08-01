import React from "react";
import Entity from "../model/entities/entity";
import Item from "../model/items/item";
import { ChangeEvent } from "../utils/observable";
import ItemUI from "./item-ui";

type EntityUIState = { health: number, maxHealth: number };
type EntityUIProps = { entity: Entity, items: Item[] , representation: JSX.Element };

export default class EntityUI extends React.Component<EntityUIProps, EntityUIState>{
    
    private _entityObserverUnsubscribe;

    constructor(props: EntityUIProps){
        super(props);

        const { maxHealth, health } = this.props.entity;
        this.state = { maxHealth, health };
        
        const updateEntity = ( event: ChangeEvent<Entity> ) => this.update( event )
        this._entityObserverUnsubscribe = this.props.entity.subscribe( updateEntity );
    }

    renderItems(){
        return this.props.items.map( (item, i) => <ItemUI item={ item } owner={ this.props.entity } key={ i } /> )
    }

    componentWillUnmount() {
        this._entityObserverUnsubscribe();
    }
    
    update(event: ChangeEvent<Entity>){
        this.setState( event as EntityUIState )
    }
    
    _barWidthStyle(width: number){
        return { width: `${width}px` }
    }

    render(){
        
        return (
            <div className="Entity">
                
                { this.props.representation }
                
                <div className="health-display">
                    HP: {this.state.health}
                    <div className="max-health"
                        style={this._barWidthStyle(this.state.maxHealth)}
                    >
                        <div className="health" 
                            style={this._barWidthStyle(this.state.health)}
                        ></div>
                    </div>
                </div>

                <div className="items">
                    { this.renderItems() }
                </div>
            </div>
        )
    }
}