import {StorageClass} from './basic' ;

class SessionStorageServiceClass extends StorageClass {
	constructor() {
		super(window.sessionStorage);
	}
}

export const SessionStorageService = new SessionStorageServiceClass();
