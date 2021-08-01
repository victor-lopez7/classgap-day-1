export type ChangeEvent<T> = {
    [ P in keyof T ]?: T[P] extends Function ? never : T[P]
}

type Callback<T> = ( event: ChangeEvent<T> ) => void

export default abstract class Observable<T> {
    private observers: Callback<T>[];

    constructor(){
        this.observers = [];
    }

    notifyAll( event: ChangeEvent<T> ){
        this.observers.forEach(observer => observer( event ));
    }

    subscribe( callback: ( event: ChangeEvent<T> ) => void ){
        this.observers.push( callback );
        return () => this.unsubscribe( callback );
    }

    unsubscribe( callback: ( event: ChangeEvent<T> ) => void ) {
        this.observers = this.observers.filter( observer => observer !== callback );
    }
}