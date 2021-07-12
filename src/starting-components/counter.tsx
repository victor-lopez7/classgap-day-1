import React from "react";

// Usar tipos para los props y los state por minúsculos que sean
export default class Counter extends React.Component<{}, {count: number}>{

    constructor(props: {}){
        super(props);
        this.state = {count: 0};
    }

    increase(){
        // this.setState(({count}) => ({count: count + 1}));
        this.setState( prevState => ({count: prevState.count + 1}));
    }

    render(){
        return (
            <div className="counter">
                {/* Preferir arrows sobre bind */}
                <button onClick={()=>this.increase()}>
                    Increase
                </button>
                <span>{this.state.count}</span>
            </div>
        )
    }
}