import { Observer } from "./observer";

export default abstract class Observable<T> {
    private observers: Observer<T>[];

    constructor(){
        this.observers = [];
    }

    abstract get state(): T;

    notifyAll(){
        this.observers.forEach(observer => observer.update(this));
    }

    subscribe(observer: Observer<T>){
        this.observers.push(observer);
    }
}