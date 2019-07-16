import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {AxiosResponse, RESPONSE} from './response';

export function GET(url: string, msg: string = '获取数据失败,原因: '): MethodDecorator {
	return (target: Object, propertyKey: string | symbol, descriptor: any) => {
		const raw = descriptor.value;
		descriptor.value = function (...arg: any[]): Observable<RESPONSE> {
			return new Observable(obsr => {
				const data = arg[0];
				this.http.get(url, data)
					.pipe(filter((res: RESPONSE): boolean => {
						if( !res.success ){
							obsr.error( res.message ) ;
						}
						return res.success ;
					}))
					.subscribe((res: RESPONSE) => {
						obsr.next( res ) ;
					})
			});
		}
	};
}


export function POST( url: string , msg: string = '获取数据失败,原因:'): MethodDecorator {
	return (target: Object, propertyKey: string | symbol, descriptor: any) => {
		const raw = descriptor.value;
		descriptor.value = function (...arg: any[]): Observable<RESPONSE> {
			return new Observable(obsr => {
				const data = arg[0];
				this.http.post(url, data)
				.pipe(filter((res: RESPONSE): boolean => {
					if( !res.success ){
						obsr.error( res.message ) ;
					}
					return res.success ;
				}))
				.subscribe((res: RESPONSE) => {
					obsr.next( res ) ;
				})
			});
		}
	};
}
