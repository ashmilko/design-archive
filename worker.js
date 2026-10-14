export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (!response.ok) {
      return response;
    }
    const url = new URL(request.url);
    if (url.pathname.match(/\.(jpg|jpeg|png|webp|gif|svg|avif|css|js|woff2|woff|ttf)$/i)) {
      const headers = new Headers(response.headers);
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }
    return response;
  },
};
