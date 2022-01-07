import Persistent, { persistent, registerPersistentClass } from "../store/persistent";

export const testPersistentConstructor = () => new TestPersistent();

@registerPersistentClass( 'TestPersistent', ()=>new TestPersistent() )
export class TestPersistent extends Persistent {
    
    @persistent
    public readonly name: string;

    constructor(name?: string){
        super();
        this.name = name;
    }
}

@registerPersistentClass( 'ComposedTestPersistent', ()=>new ComposedTestPersistent() )
export class ComposedTestPersistent extends Persistent {

    @persistent
    public readonly test: TestPersistent
    
    constructor(test?: TestPersistent){
        super();
        this.test = test;
    }
}
