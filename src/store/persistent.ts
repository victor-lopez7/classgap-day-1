import { v4 as uuidv4 } from 'uuid';

<<<<<<< HEAD
type PlainObject = { __className: string, [prop: string]: any };

export default class Persistent {
    readonly id: string = uuidv4()
    static classFactory: { [className: string]: () => Persistent } = {};

	static registerClassFactory( className: string, factory: () => Persistent ) {
		Persistent.classFactory[ className ] = factory;
	}
    
    // __id: string;
    __className: string;
    fromPlainObject: ( plainObject: PlainObject) => Persistent
    toPlainObject: ( persistent: Persistent ) => PlainObject
=======
// TODO: Tests serialize/deserialize

type PlainPersistent = { __className: string, [prop: string]: any };

const UNREGISTERED_CLASS_FACTORY_MESSAGE = 'Class factory is not registered for this classname'; 
class UnregisteredClassFactoryError extends Error {
  constructor() {
    super( UNREGISTERED_CLASS_FACTORY_MESSAGE );
    this.name = 'UnregisteredClassFactoryError';
  }
}

type Serializer = ( a: unknown )=>unknown;
type Deserializer = ( a: unknown )=>unknown;

interface PersistentProperty {
    propName: string
    onSerialize?: Serializer
    onDeserialize?: Deserializer
}

export default class Persistent {
    readonly __id: string = uuidv4()
    private __className: string
    static classFactory: { [className: string]: () => Persistent } = {};
    static registeredPersistentProps: { [className: string]: Set<PersistentProperty> }

	static registerClassFactory( className: string, factory: () => Persistent ) {
		Persistent.classFactory[ className ] = factory;
        Persistent.registeredPersistentProps[ className ] = new Set<PersistentProperty>();
	}

    static registerPersistentProp( className: string, persistentProperty: PersistentProperty ){
        if( !Persistent.classFactory[ className ] )
            throw new UnregisteredClassFactoryError();

        Persistent.registeredPersistentProps[ className ].add( persistentProperty );
    }
    
    get className() {
        return this.__className;
    }

    deserialize( plainObject: PlainPersistent ): Persistent {
        const persistent = Persistent.classFactory[ plainObject.__className ]();
        const relevantProps = Persistent.registeredPersistentProps[ plainObject.__className ];
        
        relevantProps.forEach( persistentProperty => {
            const { propName, onDeserialize } = persistentProperty;
            
            if( plainObject[ propName ].__className ){
                persistent[ propName ] = onDeserialize?.( plainObject[ propName ] ) || this.deserialize( plainObject[ propName ] );
            } else {
                persistent[ propName ] = onDeserialize?.( plainObject[ propName ] ) || plainObject[ propName ];
            }
        });

        return persistent;
    }
    
    serialize( persistent: Persistent ): PlainPersistent {
        const { __className } = persistent
        const plainPersistent = { __className };
        const relevantProps = Persistent.registeredPersistentProps[ __className ];

        relevantProps.forEach( persistentProperty => {
            const { propName } = persistentProperty;
            if( persistent[ propName ].__className ){
                plainPersistent[ propName ] = this.serialize( persistent[ propName ] );
            } else {
                plainPersistent[ propName ] = persistent[ propName ];
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
>>>>>>> 94927a1052188c59ded0da74e0cdadf669140c80
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