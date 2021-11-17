import { v4 as uuidv4 } from 'uuid';

export default class Persistent {
    readonly id: string = uuidv4()
    // static classFactory: { [className: string]: () => Persistent } = {};

	// static registerClassFactory( className: string, factory: () => Persistent ) {
	// 	Persistent.classFactory[ className ] = factory;
	// }
    
    // __id: string;
    // __className: string;
    // fromPlainObject: ( plainObject: { __className: string, [prop: string]: any }) => Persistent
    // toPlainObject: ( persistent: Persistent ) => any
}

// const persistentsMap: {[className: string]: () => Persistent}  = {
//     Hero: () => new Hero(),
// }

// Object.entries(persistentsMap)
//     .map(([ className, factory ]) => Persistent.registerClassFactory( className, factory ));