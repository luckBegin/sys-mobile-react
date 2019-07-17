import { Observable } from 'rxjs' ;
import {RESPONSE , AxiosResponse } from "@/service/httpClient/response";
import {SesssionStorageService} from "@/service/storage";
declare var axios: any ;

axios.interceptors.request.use(
	(config:any) => {
		const usrInfo = SesssionStorageService.get('userInfo') ;
		
		if( usrInfo ){
			config.headers['jwt-user-id'] = usrInfo.userInfo.id ;
			config.headers['jwt-shop'] = usrInfo.shopInfo[0].id;
		}
		
		return config
	}
);

class HttpClientClass {
	private readonly http = axios ;
	get(url: string , params?: { [key: string] : string | number } ): Observable< RESPONSE >{
		return new Observable( obsr => {
			this.http.get( url , { params } )
				.then( (res: AxiosResponse) => {
					const data = res.data ;
					obsr.next( data ) ;
				});
		});
	}
	
	post(url: string , params?: { [key: string] : string | number } ): Observable< RESPONSE >{
		return new Observable( obsr => {
			this.http.post( url , params )
			.then( (res: AxiosResponse) => {
				const data = res.data ;
				obsr.next( data ) ;
			});
		});
	}
}
export const HttpClient = new HttpClientClass() ;
