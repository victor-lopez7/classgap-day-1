import React from "react";
import Entity from "../model/entities/entity";
import { ChangeEvent } from "../utils/observable";

type StatsState = { health: number };
type StatsProps = { entity:  Entity };

export default class Stats extends React.Component<StatsProps, StatsState> {

    private _entityObserverUnsubscribe;
    
    constructor(props: StatsProps){
        super(props);
        
        const { health } = this.props.entity;
        this.state = { health };
        
        this._entityObserverUnsubscribe = this.props.entity.subscribe( event => this.update( event ) );
    }

    get statRepr(){
        return {
            health: {
                display: '💚',
                value: this.state.health,
            }
        }
    }

    componentWillUnmount(){
        this._entityObserverUnsubscribe();
    }

    update(entityObservable:  ChangeEvent<Entity>) {
        const { health } = entityObservable;
        if( health ) this.setState( { health } );
    }

    render(){
        return (
            <div className="Stats">
                {
                    Object.entries(this.statRepr).map(
                        ([statName, statItem]) => 
                            <div className="stat" key={statName}>
                                {statItem.display} {statItem.value}
                            </div>
                    )
                }
            </div>
        )
    }
    
}