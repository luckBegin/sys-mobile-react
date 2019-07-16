export interface RESPONSE {
	success: boolean;
	data: any
	message: string;
	code: number;
	page: Page;
	timeStamp: number;
}

interface Page {
	pageSize: number
	totalNumber: number
	totalPage: number;
}

export interface AxiosResponse {
	config: { [key: string]: any } ;
	data: RESPONSE ;
	headers: { [key: string]: any } ;
	request: { [key: string]: any } ;
	status: number ;
	statusText: string;
}
