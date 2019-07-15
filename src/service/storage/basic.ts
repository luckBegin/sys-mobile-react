export class StorageClass {
	constructor(storageObj: Storage) {
		this.storage = storageObj;
	};
	
	storage: Storage;
	
	private typeCheck: Function = (type: string, obj: any): boolean => {
		return Object.prototype.toString.call(obj) === '[object ' + type + ']';
	};
	
	set(key: string, value: Array<any> | Object | number | string | boolean): StorageClass {
		if (this.typeCheck("String", value)) {
			this.storage.setItem(key, value as string);
		} else {
			this.storage.setItem(key, JSON.stringify(value));
		}
		return this;
	};
	
	get(key: string): any {
		const value = this.storage.getItem(key);
		try {
			return JSON.parse( value as string );
		} catch (e) {
			return value
		}
	};
	
	clear(): StorageClass {
		this.storage.clear() ;
		return this;
	};
	
	remove(list: Array<string>): StorageClass {
		for (let key in list) {
			this.storage.removeItem(list[key]);
		}
		return this;
	};
}
