import Observable, { ChangeEvent } from "../utils/observable";
import Persistent from "./persistent";

export class ObservablePersistent extends Persistent {
	private onPropChange: Observable<Persistent>;

	notifyAll<T extends ObservablePersistent>( event: ChangeEvent<T> )	{
		this.onPropChange.notifyAll( event );
	}
}