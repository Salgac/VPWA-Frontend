export default class HttpRequest {

	private static apiUrl = "http://localhost:3333";

	static async get(path: string = "") {
		const response = await fetch(this.apiUrl + '/' + path, {
			method: 'GET',
			mode: 'cors',
		});
		return response.json();
	}

	static async post(path: string, content: object) {
		const response = await fetch(this.apiUrl + '/' + path, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(content),
		});
		return response.json();
	}

}