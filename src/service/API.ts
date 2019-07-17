const host: string = 'http://192.168.191.1:3002' ;
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
