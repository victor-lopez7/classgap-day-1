import React from "react";
import { Entity } from "../model/entity";
import Observable from "../utils/observable";
import { Observer } from "../utils/observer";

type EntityUIState = { health: number, maxHealth: number };
type EntityUIProps = { entityObservable: Observable<Entity> };

export default class EntityUI extends React.Component<EntityUIProps, EntityUIState> implements Observer<Entity>{

    constructor(props: EntityUIProps){
        super(props);

        const { maxHealth, health } = this.props.entityObservable.state;
        this.state = { maxHealth, health };
        
        this.props.entityObservable.subscribe(this);
    }

    setState(newState: EntityUIState){
        super.setState(newState);
    }
    
    update(entityObservable: Observable<Entity>){
        const { maxHealth, health } = entityObservable.state;
        this.setState({ maxHealth, health });
    }
    
    _barWidthStyle(width: number){
        return { width: `${width}px` }
    }

    render(){
        
        return (
            <div className="Entity">
                HP: {this.state.health}
                <div className="max-health"
                    style={this._barWidthStyle(this.state.maxHealth)}
                >
                    <div className="health" 
                        style={this._barWidthStyle(this.state.health)}
                    ></div>
                </div>
            </div>
        )
    }
}