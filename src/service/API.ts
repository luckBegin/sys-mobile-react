const host: string = 'http://api.jpgqs.cn' ;
export const API = {
	shop: {
		list: host + '/system/shop'
	},
	room: {
		type: host + '/room/type' ,
		reverse: host + '/room/reserve'
	},
	wx: {
		config: host + '/wechat/getWxConfig'
	}
};
