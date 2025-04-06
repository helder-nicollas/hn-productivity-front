import { env } from '@/env';

export async function fetcher<T>(
    url?: string,
    config?: RequestInit & { token?: string },
) {
    const fullUrl = `${env.NEXT_PUBLIC_API_URL}${url}`;

    if (config && config?.token) {
        config.headers = {
            ...config?.headers,
            authorization: `Bearer ${config.token}`,
        };
        delete config.token;
    }

    const response = await fetch(fullUrl, config);

    const data: T = await response.json();

    return {
        response,
        data,
    };
}
