export default {
  async fetch(request, env) {
    let response = await env.ASSETS.fetch(request);

    // If initial fetch 404s, attempt Unicode NFC/NFD normalization fallback
    if (!response.ok && response.status === 404) {
      try {
        const url = new URL(request.url);
        const decoded = decodeURIComponent(url.pathname);
        const nfd = decoded.normalize("NFD");
        const nfc = decoded.normalize("NFC");

        let alternatePath = null;
        if (decoded !== nfd) {
          alternatePath = nfd;
        } else if (decoded !== nfc) {
          alternatePath = nfc;
        }

        if (alternatePath) {
          const altUrl = new URL(request.url);
          altUrl.pathname = alternatePath.split("/").map(encodeURIComponent).join("/");
          const altRequest = new Request(altUrl.toString(), request);
          const altResponse = await env.ASSETS.fetch(altRequest);
          if (altResponse.ok) {
            response = altResponse;
          }
        }
      } catch (e) {
        // Fallback to original response on any decoding error
      }
    }

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
