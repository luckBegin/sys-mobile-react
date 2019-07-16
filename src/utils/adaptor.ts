import {ENUM} from "@/service/models/ENUMS.model";

const checkType = function (target: any, type: string): boolean {
	return Object.prototype.toString.call(target) === `[object ${type}]`;
};

export const AdaptorUtils = {
	reflect(target: object[], map: { [key: string]: any } ): ENUM[] {
		if (checkType(target, 'Array')) {
			const _arr: any[] = [];
			(target as any[]).forEach(item => {
				const _obj:{ [key: string]: any } = {};
				Object.keys(map).forEach(keys => {
					if (item[keys]) {
						_obj[map[keys]] = item[keys];
					}
				});
				_arr.push(_obj);
			});
			return _arr;
		}
		return target as ENUM[];
	},
};
