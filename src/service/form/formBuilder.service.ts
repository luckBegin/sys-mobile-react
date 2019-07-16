import {Validator} from "@/service/form/validators";


type TriggerI = 'blur' | 'change';
type FormControlI = [ string | number | boolean | null  , Array< Validator | ( ()=> void ) >? ] ;

interface ruleI {
	validator: Validator ;
	trigger: TriggerI ;
	required: boolean
}

export interface FormGroupI {
	data:  { [key: string] : any } ;
	rules: { [key: string] : Array<ruleI>  }
	value: { [key: string] : any } ;
	valid: boolean ;
	patchVal: (  data:{ [key: string] : any } ) => void ;
	reset: ( data:{ [key: string] : any } ) => void ;
}

class FormGroup implements FormGroupI{
	public data:{ [key: string] : any }  = {} ;
	public rules:{ [key: string] : Array<ruleI> } = {} ;
	
	constructor( formControl: { [key: string]: FormControlI } ){
		Object.keys( formControl ).forEach( key => {
			const control:FormControlI = formControl[key] ;
			this.data[key] = control[0] ;
			const validators: Array<ruleI> = [] ;
			if( control[1] )
				control[1].forEach( (item: any) => {
					validators.push({
						validator: item.name ? item() : item ,
						trigger: 'blur' ,
						required: item.name === 'required'
					})
				});
			
			this.rules[key] = validators ;
		});
	}
	
	get value(): { [key: string] : any }{
		return this.data ;
	}
	
	public patchVal( data:{ [key: string] : any } ): void {
		Object.keys( data ).forEach( key => {
			this.data[key] = data[key] ;
		});
	}
	
	get valid(): boolean {
		let valid: boolean = true ;
		Object.keys( this.data ).every( key => {
			const rule = this.rules[key];
			const val = this.data[key] ;
			 return rule.every( item => {
				return  valid = item.validator('' , val ) as boolean ;
			});
		});
		return valid ;
	}
	
	public reset( data: { [key: string]: any }): void{
		Object.keys( this.data).forEach( key => {
			if( data[key] )
				this.data[key] =data[key] ;
			else
				this.data[key] = null ;
		});
	}
}

class FormBuilderServiceClass {
	group( formControl: { [key: string]: FormControlI } ): FormGroupI {
		return new FormGroup(formControl) ;
	};
}

export const FormBuilder = new FormBuilderServiceClass() ;
