import {ComposedTestPersistent, TestPersistent, testPersistentConstructor} from "../test-utils/TestPersitent";
import Persistent, { PersistentProperty, UNREGISTERED_CLASS_FACTORY_MESSAGE } from "./persistent";

new TestPersistent()
describe( 'Persistent', ()=>{

    const testPersistentName = 'Josep';
    const persistentProp: PersistentProperty = { propName: 'name' };
    const defaultProps = [{ propName: '__id' }, { propName: '__className' }];
    const registeredPropSet = new Set( [ ...defaultProps, persistentProp ] );

    let serializedTestPersistent;
    let testPersistent;

    let nestedPersistent;
    let serializedNestedPersistent;

    beforeEach(() => {
        testPersistent = new TestPersistent( testPersistentName );
        serializedTestPersistent = { 
            __id: testPersistent.__id,
            __className: testPersistent.__className, 
            name: testPersistentName,
        }
        
        nestedPersistent = new ComposedTestPersistent(testPersistent);
        serializedNestedPersistent = {
            __className: nestedPersistent.__className,
            __id: nestedPersistent.__id,
            test: serializedTestPersistent
        }
    });

    describe('registerClassFactory', () => {
        it('should register class factory in Persistent', () => {
            const SET = new Set<PersistentProperty>( defaultProps.concat(persistentProp) );
            
            expect(Persistent.classFactory[ testPersistent.__className ]).toBeDefined();
            expect(Persistent.registeredPersistentProps[ testPersistent.className ]).toEqual( SET );
        });
    });

    describe('registerPersistentProp', () => {
        it('should throw UnregisteredClassFactoryError', () => {
            const notRegisteredClassname = 'NotRegistered';
            expect(() => Persistent.registerPersistentProp( notRegisteredClassname, persistentProp )).toThrow( UNREGISTERED_CLASS_FACTORY_MESSAGE );
        });

        it('should add persistentProperty to registeredPersistentProps', () => {
            Persistent.registerClassFactory( testPersistent.classname, testPersistentConstructor );
            Persistent.registerPersistentProp( testPersistent.classname, persistentProp );
            expect(Persistent.registeredPersistentProps[ testPersistent.classname ] ).toEqual( registeredPropSet );
        });
    });

    describe('serialize', () => {

        it('should serialize not nested persistent', () => {
            expect(Persistent.serialize(testPersistent)).toEqual(serializedTestPersistent);
        });
        
        it('should serialize nested persistent', () => {
            expect(Persistent.serialize(nestedPersistent)).toEqual(serializedNestedPersistent);
        });

    });

    describe('deserialize', () => {
        it('should deserialize not nested persistent', () => {
            expect(Persistent.deserialize(serializedTestPersistent)).toEqual(testPersistent);
        });
        
        it('should deserialize nested persistent', () => {
            expect(Persistent.deserialize(serializedNestedPersistent)).toEqual(nestedPersistent);
        });
    });

}) 