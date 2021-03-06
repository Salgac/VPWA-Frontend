export default class HttpRequest {

	private static apiUrl = process.env.API_HOST;

	static async get(path: string = "", token: string, extra = {}) {
		const query = new URLSearchParams(extra);
		const response = await fetch(`${this.apiUrl}/${path}?${query}`, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Authorization': `Bearer ${token}`,
			},
		});
		return response.json();
	}

	static async post(path: string, content: object, token: string = "") {
		const response = await fetch(`${this.apiUrl}/${path}`, {
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

	static async delete(path: string, content: object, token: string = "") {
		const response = await fetch(`${this.apiUrl}/${path}`, {
			method: 'DELETE',
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