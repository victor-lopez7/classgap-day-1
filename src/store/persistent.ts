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

interface PersistentProperty {
    propName: string
    onSerialize: ( a: unknown )=>unknown
    onDeserialize: ( a: unknown )=>unknown
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
        const relevantProps = Persistent.registeredPersistentProps[ persistent.__className ];
        
        for( let persistentProperty of relevantProps ){
            const { propName, onDeserialize } = persistentProperty;
            
            if( plainObject[ propName ].__className ){
                persistent[ propName ] = onDeserialize?.( plainObject[ propName ] ) || this.deserialize( plainObject[ propName ] );
            } else {
                persistent[ propName ] = onDeserialize?.( plainObject[ propName ] ) || plainObject[ propName ];
            }
        }

        return persistent;
    }
    
    serialize( persistent: Persistent ): PlainPersistent {
        const { __className } = persistent
        const plainPersistent = { __className };
        const relevantProps = Persistent.registeredPersistentProps[ __className ];
        
        for( let prop in relevantProps ) {
            if( persistent[ prop ].__className ){
                plainPersistent[ prop ] = this.serialize( persistent[ prop ] );
            } else {
                plainPersistent[ prop ] = persistent[ prop ];
            }
        }

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


@registerPersistentClass( 'Person', ()=>new Person() )
class Person extends Persistent {
    pp: string
}