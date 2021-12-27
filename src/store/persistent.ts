import { v4 as uuidv4 } from 'uuid';

// TODO: Tests serialize/deserialize

type PlainPersistent = { __className: string, [prop: string]: any };

export const UNREGISTERED_CLASS_FACTORY_MESSAGE = 'Class factory is not registered for this classname'; 
export class UnregisteredClassFactoryError extends Error {
  constructor() {
    super( UNREGISTERED_CLASS_FACTORY_MESSAGE );
    this.name = 'UnregisteredClassFactoryError';
  }
}

type Serializer = ( a: unknown )=>unknown;
type Deserializer = ( a: unknown )=>unknown;

export interface PersistentProperty {
    propName: string
    onSerialize?: Serializer
    onDeserialize?: Deserializer
}

export default class Persistent {
    readonly __id: string = uuidv4()
    private __className: string
    static classFactory: { [className: string]: () => Persistent } = {};
    static registeredPersistentProps: { [className: string]: Set<PersistentProperty> } = {};

	static registerClassFactory( className: string, factory: () => Persistent ) {
        const defaultProps = [{ propName: '__id' }, { propName: '__className' }];
		Persistent.classFactory[ className ] = factory;
        Persistent.registeredPersistentProps[ className ] = new Set<PersistentProperty>( defaultProps );
	}

    static registerPersistentProp( className: string, persistentProperty: PersistentProperty ){
        if( !Persistent.classFactory[ className ] )
            throw new UnregisteredClassFactoryError();

        Persistent.registeredPersistentProps[ className ].add( persistentProperty );
    }

    static clearRegisteredPersistents(){
        Persistent.classFactory = {};
        Persistent.registeredPersistentProps = {};
    }

    constructor( className: string ) {
        this.__className = className;
    } 
    
    get className() {
        return this.__className;
    }

    static deserialize( plainObject: PlainPersistent ): Persistent {
        const persistent = Persistent.classFactory[ plainObject.__className ]();
        const relevantProps = Persistent.registeredPersistentProps[ plainObject.__className ];
        
        relevantProps.forEach( persistentProperty => {
            const { propName, onDeserialize } = persistentProperty;
            
            if( plainObject[ propName ].__className ){
                persistent[ propName ] = Persistent.deserialize( plainObject[ propName ] );
            } else {
                persistent[ propName ] = onDeserialize?.( plainObject[ propName ] ) || plainObject[ propName ];
            }
        });

        return persistent;
    }
    
    static serialize( persistent: Persistent ): PlainPersistent {
        const { __className } = persistent
        const plainPersistent = { __className };
        const relevantProps = Persistent.registeredPersistentProps[ __className ];

        relevantProps.forEach( persistentProperty => {
            const { propName, onSerialize } = persistentProperty;
            if( persistent[ propName ].__className ){
                plainPersistent[ propName ] = Persistent.serialize( persistent[ propName ] );
            } else {
                plainPersistent[ propName ] = onSerialize?.( persistent[ propName ] ) || persistent[ propName ];
            }
        });

        return plainPersistent;
    }
}

type PersistentConstructor = new () => Persistent;

export function registerPersistentClass( className: string, factory: ()=>Persistent ) {
    return ( constructor: PersistentConstructor ) => {
        Persistent.registerClassFactory( className, factory );
        constructor.prototype.__className = className;
    }
}

export function persistent() {
    return function( target: Persistent, propName: string ) {
        Persistent.registerPersistentProp( target.className, { propName });
    }
}

export function serializer( serializer: Serializer )  {
    return function ( target: Persistent, propName: string ) {
        
    }
}

export function deserializer( deserializer: Deserializer )  {
    return function ( target: Persistent, propName: string ) {
        
    }
}

// @persistent @serializer() @deserializer() private name: string