import dispatch from "../utils/dispatch";

export type GET = {
	cover: string;
	url: string;
	title: string;
}[];

export async function invoke(id: string) {
	return await dispatch<GET, any>(
		`/search?query=${encodeURIComponent(id)}`,
		(data) => Object.values(data)[0] as GET,
	);
}
