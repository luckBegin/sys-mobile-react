export const ObjToQueryString = function (obj: { [key: string]: any }): string {
	let str = '';
	for (let keys in obj) {
		if (
			obj.keys !== null &&
			obj.keys !== 'null' &&
			obj.keys !== 'undefined' &&
			obj.keys !== undefined &&
			obj.keys !== ""
		)
			str += keys + "=" + obj.keys + "&";
	}
	return str;
}
