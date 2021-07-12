import React from "react";
import { Entity } from "../model/entity";
import Observable from "../utils/observable";
import { Observer } from "../utils/observer";

type StatsState = { health: number };
type StatsProps = { entityObservable:  Observable<Entity> };

export default class Stats extends React.Component<StatsProps, StatsState> implements Observer<Entity>{
    
    constructor(props: StatsProps){
        super(props);
        
        const {health} = this.props.entityObservable.state;
        this.state = { health };
        
        this.props.entityObservable.subscribe(this);
    }

    update(entityObservable:  Observable<Entity>) {
        const {health} = entityObservable.state;
        this.setState({health});
    }

    get statRepr(){
        return {
            health: {
                display: '💚',
                value: this.state.health,
            }
        }
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