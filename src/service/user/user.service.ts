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
	}
	private readonly http = HttpClient;
	
	@GET(API.user.staff.info)
	public staffInfo( para: {uid: number}): Observable<RESPONSE> | any {
	}
	
	@GET(API.user.wxLogin)
	public wxLogin( para: {uid: number}): Observable<RESPONSE> | any {}
	
	private permissionPath: string[] | undefined ;
	public permission(path:string): boolean {
		if( this.permissionPath ) {
			return !!~this.permissionPath.indexOf( path ) ;
		} else {
			const data = SesssionStorageService.get('userInfo') ;
			const arr:string[] =[] ;
			
			if( data.staffInfo ) {
				const permission = data.menuInfo[2] ;
				recursive( permission.children , arr ) ;
			}
			
			this.permissionPath = arr ;
			return !!~this.permissionPath.indexOf( path ) ;
		}
	}
	
	@GET(API.user.usrInfo)
	public vipInfo( para: {uid: number}): Observable<RESPONSE> | any {
	}
}
export const UserService = new UserServiceClass() ;
