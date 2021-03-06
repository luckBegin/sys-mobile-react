import {HttpClient} from '../httpClient/httpClient' ;
import {API} from "@/service/API";
import {Observable} from 'rxjs';
import {GET} from "@/service/httpClient/request.decorator";
import {RESPONSE} from "@/service/httpClient";

class WxServiceClass {
	constructor(){
		console.log( 'ShopServiceClass init ' );
	}
	private readonly http = HttpClient;
	
	@GET(API.wx.config)
	public config( data?: any ): Observable<RESPONSE> | any {
	}
}
export const WxService = new WxServiceClass() ;
