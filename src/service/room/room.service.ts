import {HttpClient} from '../httpClient/httpClient' ;
import {API} from "@/service/API";
import {Observable} from 'rxjs';
import {GET, POST} from "@/service/httpClient/request.decorator";
import {RESPONSE} from "@/service/httpClient";

class RoomServiceClass {
	private readonly http = HttpClient;
	
	@GET(API.room.type + '/all')
	public types(): Observable<RESPONSE> | any {} ;
	
	@POST(API.room.reserve)
	public makeReserve( data?: any): Observable< RESPONSE> | any {};
	
	@GET(API.room.reserve + '/all')
	public reserveList( data?: any): Observable< RESPONSE> | any {};
}
export const RoomService = new RoomServiceClass() ;
