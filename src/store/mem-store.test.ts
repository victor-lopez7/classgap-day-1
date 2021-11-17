import MemStore from "./mem-store";
import Persistent from "./persistent"
import { SearchField, SearchOperation, Store } from "./store"

class TestPersistent extends Persistent {
    constructor(public readonly name: string){
        super();
    }
}

// TODO: MemStoreImpl + test

describe( 'Memory Storage Implementation', ()=>{
    let storeData: {[id: string]: any};
    const testName = 'fulanito';
    const t = new TestPersistent(testName)

    beforeEach(()=>{
        storeData = { };
        Store.useConcreteStore( new MemStore( storeData ) )
        Store.write( t );
    })

    it('should write persistent object in the storage', ()=>{
        
        expect( storeData[ t.id ] ).not.toBe( t )           
        expect( storeData[ t.id ].id ).toEqual( t.id )     
        expect( storeData[ t.id ].name ).toEqual( testName )     
    })   

    it('should find a persistent object by id in the storage', async () => {
        
        const foundPersistent = await Store.findById( t.id );

        expect( foundPersistent ).not.toBe( t )           
        expect( foundPersistent ).toEqual( t )
    })

    describe('findByFields', () => {
        
        const t1 = new TestPersistent(testName);
        const testName2 = `${testName}2`;
        const t2 = new TestPersistent(testName2);

        beforeEach(async () => {
            await Store.write( t1 );
            await Store.write( t2 );
        })

        describe('SearchOperation', () => {
            describe('equal operator', () => {
                it('should find no results', async () => {
                    const searchFields: SearchField[] = [{fieldName: 'name', fieldValue: '', operation: '=='}];
                    const found = await Store.findByFields(searchFields);
                    expect( found ).toEqual( [] );
                })
    
                it('should find only one result', async () => {
                    const searchFields: SearchField[] = [{fieldName: 'name', fieldValue: testName2, operation: '=='}];
                    const found = await Store.findByFields(searchFields);
                    expect( found ).toEqual( [ t2 ] );
                })
    
                it('should find multiple results', async () => {
                    const searchFields: SearchField[] = [{fieldName: 'name', fieldValue: testName, operation: '=='}];
                    const found = await Store.findByFields(searchFields);
                    expect( found ).toEqual( [ t, t1 ] );
                })
            })
    
            describe('not equal operator', () => {
                it('should find no results', async () => {
                    const searchFields: SearchField[] = [
                        {fieldName: 'name', fieldValue: testName, operation: '!='},
                        {fieldName: 'name', fieldValue: testName2, operation: '!='},
                    ];
                    const found = await Store.findByFields(searchFields);
                    expect( found ).toEqual( [] );
                })
    
                it('should find only one result', async () => {
                    const searchFields: SearchField[] = [{fieldName: 'name', fieldValue: testName, operation: '!='}];
                    const found = await Store.findByFields(searchFields);
                    expect( found ).toEqual( [ t2 ] );
                })
    
                it('should find multiple results', async () => {
                    const searchFields: SearchField[] = [{fieldName: 'name', fieldValue: testName2, operation: '!='}];
                    const found = await Store.findByFields(searchFields);
                    expect( found ).toEqual( [ t, t1 ] );
                })
            })
            
        })


        describe('CompareOperation', () => {

            const compareLength = (fieldValue: string, length: number) => fieldValue.length === length;

            it('should find no results', async () => {
                const searchFields = [{fieldName: 'name', fieldValue: '', operation: compareLength}];
                const found = await Store.findByFields(searchFields);
                expect( found ).toEqual( [ ] );
            })

            it('should find only one result', async () => {
                const searchFields = [{fieldName: 'name', fieldValue: testName2.length, operation: compareLength}];
                const found = await Store.findByFields(searchFields);
                expect( found ).toEqual( [ t2 ] );
            })

            it('should find multiple results', async () => {
                const searchFields = [{fieldName: 'name', fieldValue: testName.length, operation: compareLength}];
                const found = await Store.findByFields(searchFields);
                expect( found ).toEqual( [ t, t1 ] );
            })
        })

        

    })
    
    it('should delete a persistent object from storage', async () => {
        
        await Store.delete( t.id );

        expect( storeData[ t.id ] ).toBeUndefined();

    })
})