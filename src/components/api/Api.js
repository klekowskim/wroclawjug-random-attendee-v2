import axios from "axios";
import queryString from "query-string";

const BASE_URL = "https://api.meetup.com/WroclawJUG";

export default class Api {

	constructor(token, tokenType) {
		if (tokenType !== "bearer") {
			throw new Error(`Token type ${tokenType} not supported`);
		}

		this.axios = axios.create({
			baseURL: BASE_URL,
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	}

	getEvents() {
		const query = queryString.stringify({ scroll: "recent_past" });
		return this.axios.get(`/events?${query}`)
			.then(response => response.data);
	}

	getAttendees(event) {
		const query = queryString.stringify({});
		return this.axios.get(`/events/${event.id}/attendance?${query}`)
			.then(response => response.data
				.filter(attendee => attendee.rsvp.response === "yes"));
	}
}
