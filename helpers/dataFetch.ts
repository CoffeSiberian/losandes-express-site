const dataFetch = async (
    body: string | null = null,
    method: string,
    headers: HeadersInit,
    url: URL
): Promise<Response> => {
    let optiosFetch = {
        method: method,
        headers: headers,
        body: body,
    };

    try {
        return await fetch(url, optiosFetch);
    } catch (err: any) {
        return new Response(JSON.stringify({ error: "API response error" }), {
            status: 404,
        });
    }
};

const getFetch = async (
    body: string | null = null,
    headers: HeadersInit,
    url: URL
): Promise<Response> => {
    return await dataFetch(body, "GET", headers, url);
};

export { getFetch };
