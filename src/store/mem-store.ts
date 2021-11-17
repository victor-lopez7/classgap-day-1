import Persistent from "./persistent";
import { AbstractStore, SearchField, SearchOperation, Store, CompareOperation} from "./store";

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

        const evaluateSearchFields = (storageItem: Persistent) => fields.map(field => {
            const { operation, fieldName, fieldValue } = field;

            if( typeof operation === 'string' ) {
                return operate[ operation ]( storageItem[ fieldName ], fieldValue )
            } 

            return operation( storageItem[ fieldName ], fieldValue );
        }).reduce((accumulator, currentSearchFieldResult) => accumulator && currentSearchFieldResult);

        const result = Object.values( this._storage )
            .filter(evaluateSearchFields);

        return Promise.resolve( result )
    }

    delete(id: string): Promise<void> {
        const persistentToBeDeleted = this._storage[ id ];

        if( this._storage[ id ] ) {
            delete this._storage[ id ];
            return Promise.resolve();
        }
        
        return Promise.reject( Store.NotFoundPersistent );
    }

}