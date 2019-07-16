import { Observable } from 'rxjs' ;
import {RESPONSE , AxiosResponse } from "@/service/httpClient/response";
declare var axios: any ;

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
