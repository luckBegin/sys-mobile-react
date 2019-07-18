// const host: string = 'http://api.jpgqs.cn' ;
const host: string = 'http://192.168.191.1:3002' ;
export const API = {
	shop: {
		list: host + '/system/shop'
	},
	room: {
		type: host + '/room/type' ,
		reserve: host + '/room/reserve'
	},
	wx: {
		config: host + '/wechat/getWxConfig'
	},
	user:{
		staff:{
			info: host + '/system/staff/byUid'
		}
	}
};
