import {TestPersistent, testPersistentClassname, testPersistentConstructor} from "../test-utils/TestPersitent";
import Persistent, { PersistentProperty, UNREGISTERED_CLASS_FACTORY_MESSAGE } from "./persistent";

describe( 'Persistent', ()=>{

    const testPersistentName = 'Josep';
    const persistentProp: PersistentProperty = { propName: 'name' };
    const registeredPropSet = new Set( [ persistentProp ] );
    const serializedTestPersistent = { 
        __className: testPersistentClassname, 
        name: testPersistentName,
    }
    let testPersistent;

    beforeEach(() => {
        testPersistent = new TestPersistent( testPersistentName );
    });

    afterEach(() => {
        Persistent.clearRegisteredPersistents();
    })

    describe('registerClassFactory', () => {
        it('should register class factory in Persistent', () => {
            const VOID_SET = new Set<PersistentProperty>();

            Persistent.registerClassFactory( testPersistentClassname, testPersistentConstructor );

            expect(Persistent.classFactory[ testPersistentClassname ]).toEqual( testPersistentConstructor );
            expect(Persistent.registeredPersistentProps[ testPersistentClassname ]).toEqual( VOID_SET );
        });
    });

    describe('registerPersistentProp', () => {
        it('should throw UnregisteredClassFactoryError', () => {
            const notRegisteredClassname = 'NotRegistered';
            expect(() => Persistent.registerPersistentProp( notRegisteredClassname, persistentProp )).toThrow( UNREGISTERED_CLASS_FACTORY_MESSAGE );
        });

        it('should add persistentProperty to registeredPersistentProps', () => {
            Persistent.registerClassFactory( testPersistentClassname, testPersistentConstructor );
            Persistent.registerPersistentProp( testPersistentClassname, persistentProp );
            expect(Persistent.registeredPersistentProps[ testPersistentClassname ] ).toEqual( registeredPropSet );
        });
    });

    describe('clearRegisteredPersistents', () => {
        it('should clear registered persistents', () => {
            Persistent.registerClassFactory( testPersistentClassname, testPersistentConstructor );
            Persistent.registerPersistentProp( testPersistentClassname, persistentProp );
        });
    })

    describe('serialize', () => {
        
        it('should serialize not nested persistent', () => {
            Persistent.registerClassFactory( testPersistentClassname, testPersistentConstructor );
            Persistent.registerPersistentProp( testPersistentClassname, persistentProp );
            expect(Persistent.serialize(testPersistent)).toEqual(serializedTestPersistent);
        });

    });

    describe('deserialize', () => {
        it('should deserialize not nested persistent', () => {
            Persistent.registerClassFactory( testPersistentClassname, testPersistentConstructor );
            Persistent.registerPersistentProp( testPersistentClassname, persistentProp );
            expect(Persistent.deserialize(serializedTestPersistent)).toEqual(testPersistent);
        });
    });

}) 