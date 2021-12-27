import Persistent from "../store/persistent";

export const testPersistentClassname = 'TestPersistent';

export const testPersistentConstructor = () => new TestPersistent();

export class TestPersistent extends Persistent {
    constructor(public readonly name?: string){
        super(testPersistentClassname);
    }
}

// export class ComposedTestPersistent extends Persistent {
//     constructor(public readonly test?: TestPersistent, public readonly){
//         super();
//     }
// }
