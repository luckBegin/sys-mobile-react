import { Subject } from 'rxjs' ;

interface RouterGuardServiceI {
	register: ( ) => void ;
	
}
export class RouterGuardService implements  RouterGuardServiceI {
	routerBefore$: Subject< any > = new Subject() ;
}
