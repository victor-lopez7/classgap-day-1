import Observable from "./observable";

export interface Observer<T> {
    update: (subject: Observable<T>) => void,
}