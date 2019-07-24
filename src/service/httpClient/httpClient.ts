import { Observable } from 'rxjs' ;
import {RESPONSE , AxiosResponse } from "@/service/httpClient/response";
import {SesssionStorageService} from "@/service/storage";
declare var axios: any ;

axios.interceptors.request.use(
	(config:any) => {
		const data = SesssionStorageService.get('userInfo') ;
		
		if( data ){
			config.headers['jwt-user-id'] = data.vipInfo.id ;
			const shopId = data.vipInfo.shopIds.split(",") ;
			config.headers['jwt-shop'] = shopId[0] ;
		}
		return config;
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
