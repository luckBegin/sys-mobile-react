import {HttpClient} from '../httpClient/httpClient' ;
import {API} from "@/service/API";
import {Observable} from 'rxjs';
import {GET} from "@/service/httpClient/request.decorator";
import {RESPONSE} from "@/service/httpClient";
import {SesssionStorageService} from "@/service/storage";

const recursive = function( parent: any[] , arr: string[] ) : void{
	parent.forEach( item => {
		arr.push( item.path ) ;
		
		if( item.children.length > 0) {
			recursive( item.children , arr ) ;
		}
	});
};
class UserServiceClass {
	constructor(){
		console.log( 'ShopServiceClass init ' );
	}
	private readonly http = HttpClient;
	
	@GET(API.user.staff.info)
	public staffInfo( para: {uid: number}): Observable<RESPONSE> | any {
	}
	
	private permissionPath: string[] = [] ;
	public permission(path:string): boolean {
		const data = SesssionStorageService.get('userInfo').menuInfo[2];
		const arr:string[] =[] ;
		recursive( data.children , arr ) ;
		this.permissionPath = arr ;
		console.log( arr ) ;
		return true ;
	}
}
export const UserService = new UserServiceClass() ;
