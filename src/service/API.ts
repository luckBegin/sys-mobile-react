const host: string = 'http://localhost:3002' ;
export const API = {
	shop: {
		list: host + '/system/shop'
	},
	room: {
		type: host + '/room/type' ,
		reverse: host + '/room/reserve'
	}
};
