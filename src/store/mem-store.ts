import Persistent from "./persistent";
import { AbstractStore, SearchField, Store, CompareOperation} from "./store";

export default class MemStore implements AbstractStore{
    
    constructor(private _storage : {[id: string]: Persistent} = {}){}

    write(data: Persistent): Promise<void> {
        this._storage[ data.id ] = Object.assign({} , data);
        return Promise.resolve();
    }

    findById(id: string): Promise<Persistent> {
        const foundPersistent = this._storage[ id ];
        return foundPersistent 
            ? Promise.resolve( foundPersistent ) 
            : Promise.reject( Store.NotFoundPersistent );
    }

    findByFields(fields: SearchField[]): Promise<Persistent[]> {
        const operate: {[ key: string ]: CompareOperation } = {
            '==': ( a, b ) => a === b,
            '!=': ( a, b ) => a !== b,
        }

        const searchFieldEvaluation = (storageItem: Persistent, field: SearchField) => {
            const { operation, fieldName, fieldValue } = field;

            if( typeof operation === 'string' ) {
                return operate[ operation ]( storageItem[ fieldName ], fieldValue )
            } 

            return operation( storageItem[ fieldName ], fieldValue );
        }

        const evaluateSearchFields = (storageItem: Persistent) => fields
            .map(field => searchFieldEvaluation(storageItem, field))
            .reduce((accumulator, currentSearchFieldResult) => accumulator && currentSearchFieldResult);

        const result = Object.values( this._storage ).filter(evaluateSearchFields);

        return Promise.resolve( result )
    }

    delete(id: string): Promise<void> {
        if( this._storage[ id ] ) {
            delete this._storage[ id ];
            return Promise.resolve();
        }
        
        return Promise.reject( Store.NotFoundPersistent );
    }

}