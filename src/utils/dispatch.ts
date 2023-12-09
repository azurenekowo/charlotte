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

async function dispatchConsumer<T>(origin: URL, dispatched: Compact<T>) {
  import.meta.env.DEV &&
    !import.meta.env.SILENCE &&
    console.debug({
      origin: origin.toString(),
      dispatched,
    });
}
export default function dispatch<F, T>(
  path: string,
  /**
   * deal with post processing like weird behaviour in original api/search?
   */
  post = (data: T): F => data as unknown as F
) {
  // ewwww, we all know promise is sucks, a lot, like this is a patch for this kind of logic, gonna end
  const origin = new URL(`${import.meta.env.DB_ENDPOINT}/${path}`);
  return new Promise<Compact<F>>((ok, _) => {
    function dispatch(success: boolean, d?: F | Error) {
      const c: Compact<F> = {
        success: success || d instanceof Error,
        data: success && !(d instanceof Error) ? d : undefined,
      };
      ok(c);
      dispatchConsumer(origin, c);
    }
    fetch(origin)
      .then((r) => r.json())
      .then((d) => dispatch(true, post(d)))
      .catch((e) => dispatch(false, e));
  });
}

export function wrap<T>(dispatched: Compact<T>) {
  return dispatchJSON(dispatched, dispatched.success ? 200 : 400);
}
