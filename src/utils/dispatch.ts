export function dispatchJSON<T>(obj: T, code = 200) {
	return new Response(JSON.stringify(obj), {
		status: code,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

type Compact<F> = {
	success: boolean;
	data?: F;
};

export default function dispatch<F, T, R = Compact<F>>(
	path: string,
	/**
	 * deal with post processing like weird behaviour in original api/search?
	 */
	post = (data: T): F => data as unknown as F,
) {
	// ewwww, we all know promise is sucks, a lot, like this is a patch for this kind of logic, gonna end
	return new Promise<R>((ok, _) => {
		fetch(new URL(`${import.meta.env.DB_ENDPOINT}/${path}`))
			.then((r) => r.json())
			.then((d) => ok({ success: true, data: post(d) } as R))
			.catch((e) => ok({ success: false } as R));
	});
}

export function wrap<T>(dispatched: Compact<T>) {
	return dispatchJSON(dispatched, dispatched.success ? 200 : 400);
}
