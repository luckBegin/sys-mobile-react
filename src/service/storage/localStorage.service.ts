import { StorageClass } from './basic' ;
class LocalStorageServiceClass extends StorageClass{
    constructor(){
        super(window.localStorage) ;
    }
}
export const LocalStorageService = new LocalStorageServiceClass ;
