const getApiUrl = () => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    if (!url) return "http://localhost:4004"; // Fallback
    return url.endsWith("/") ? url.slice(0, -1) : url;
};

export const API_URL = getApiUrl();
