import Persistent from "./persistent";

export type SearchOperation = '==' | '!='

export type CompareOperation = (a: unknown,b: unknown) => boolean

export interface SearchField {
    fieldName: string,
    fieldValue: unknown,
    operation: SearchOperation | CompareOperation,
}

export interface AbstractStore {
    write( data: Persistent ): Promise<void>;
    findById( id: string ): Promise<Persistent>;
    findByFields( fields: SearchField[] ): Promise<Persistent[]>;
    delete( id: string ): Promise<void>;
}

export class Store {

    static NotFoundPersistent = new Error("Persistent Not Found in storage");

    static useConcreteStore( store: AbstractStore ) {
        Store._store = store;
    }

    static write( data: Persistent ) {
        return Store._store.write( data )
    }

    static findById( id: string ): Promise<Persistent> {
        return Store._store.findById( id )
    }

    static findByFields( fields: SearchField[] ): Promise<Persistent[]> {
        return Store._store.findByFields( fields )
    }
    
    static delete( id: string ): Promise<void> {
        return Store._store.delete( id );
    }

    private static _store: AbstractStore;
}
