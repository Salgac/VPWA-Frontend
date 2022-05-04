export default class HttpRequest {

	//private static apiUrl = "http://localhost:3333";
	private static apiUrl = "http://192.168.1.237:3333";

	static async get(path: string = "", token: string) {
		const response = await fetch(this.apiUrl + '/' + path, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Authorization': `Bearer ${token}`,
			},
		});
		return response.json();
	}

	static async post(path: string, content: object, token: string = "") {
		const response = await fetch(this.apiUrl + '/' + path, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`,
			},
			body: JSON.stringify(content),
		});
		return response.json();
	}

}