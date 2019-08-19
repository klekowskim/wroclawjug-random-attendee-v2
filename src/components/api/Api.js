// @flow
import axios from "axios";
import queryString from "query-string";

const BASE_URL = "https://api.meetup.com";

export type User = {
	id: number,
	email: string,
	name: string,
	country: string,
	city: string,
	photo: Object
}

export type Event = {
	created: number,
	description: string,
	duration: number,
	group: Object,
	id: string,
	link: string,
	local_date: string,
	local_time: string,
	name: string,
	status: string,
	time: number,
	updated: number,
	utc_offset: number,
	visibility: string,
	waitlist_count: number,
	yes_rsvp_count: number,
}

export type Attendee = {
	"member": {
		"id": number,
		"name": string,
		"photo": {
			"id": number,
			"highres_link": string,
			"photo_link": string,
			"thumb_link": string,
			"type": string,
			"base_url": string
		},
		"event_context": {
			"host": boolean
		}
	},
	"rsvp": {
		"id": number,
		"response": string,
		"guests": number,
		"updated": number
	}
}

export default class Api {

	axios: Object;

	constructor(token: string, tokenType: string) {
		if (tokenType !== "bearer") {
			throw new Error(`Token type ${tokenType} not supported`);
		}

		this.axios = axios.create({
			baseURL: BASE_URL,
			params: {
				// cannot pass token by header, because it is not send with OPTIONS request,
				// and without it CORS will block all requests
				access_token: token
			}
		});
	}

	getLoggedUserProfile(): Promise<User> {
		return this.axios.get("/members/self")
			.then(response => response.data);
	}

	getEvents(): Promise<Array<Event>> {
		const query = queryString.stringify({ scroll: "recent_past" });
		return this.axios.get(`/WroclawJUG/events?${query}`)
			.then(response => response.data);
	}

	getAttendees(event: Object) {
		const query = queryString.stringify({});
		return this.axios.get(`/WroclawJUG/events/${event.id}/attendance?${query}`)
			.then(response => response.data
				.filter(attendee => attendee.rsvp.response === "yes"));
	}
}
