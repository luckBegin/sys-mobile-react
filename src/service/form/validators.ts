export type Validator = ( rule: any , value: any , callBack?: ( Error?: Error ) => void ) => void | boolean ;
export class Validators{
	static required( msg: string = '该选项必填'): Validator {
		return ( rule , value , callBack ): void | boolean => {
			if( value ) {
				if( callBack)
					callBack() ;
				else
					return true ;
			} else {
				if( callBack )
					callBack( new Error( msg )) ;
				else
					return false ;
			}
		}
	}
}
