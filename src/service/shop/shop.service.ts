import {HttpClient} from '../httpClient/httpClient' ;
import {API} from "@/service/API";
import {Observable} from 'rxjs';
import {GET} from "@/service/httpClient/request.decorator";
import {RESPONSE} from "@/service/httpClient";

class ShopServiceClass {
	constructor(){
		console.log( 'ShopServiceClass init ' );
	}
	private readonly http = HttpClient;
	
	@GET(API.shop.list)
	public shops(): Observable<RESPONSE> | any {
	}
}
export const ShopService = new ShopServiceClass() ;
