export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const range = request.headers.get("range");

    // Fetch the asset from the static asset store
    const response = await env.ASSETS.fetch(request);

    // If request failed or not ok, return it
    if (!response.ok) {
      return response;
    }

    const isVideo = url.pathname.match(/\.(mp4|mov|webm)$/i);
    const isStatic = url.pathname.match(/\.(mp4|mov|webm|jpg|jpeg|png|webp|gif|svg|avif|css|js|woff2|woff|ttf)$/i);

    // If not a video or no range requested, add long-lived edge/browser cache and return
    if (!isVideo || !range) {
      if (isStatic) {
        const newHeaders = new Headers(response.headers);
        newHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
        newHeaders.set("Accept-Ranges", "bytes");
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        });
      }
      return response;
    }

    // If asset store already returned 206 Partial Content, preserve it
    if (response.status === 206) {
      const newHeaders = new Headers(response.headers);
      newHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
      newHeaders.set("Accept-Ranges", "bytes");
      return new Response(response.body, {
        status: 206,
        statusText: "Partial Content",
        headers: newHeaders,
      });
    }

    // Custom HTTP 206 Partial Content handler for video streaming
    const arrayBuffer = await response.arrayBuffer();
    const totalSize = arrayBuffer.byteLength;

    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10) || 0;
    const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

    if (start >= totalSize || end >= totalSize || start > end) {
      return new Response("Requested Range Not Satisfiable", {
        status: 416,
        headers: {
          "Content-Range": `bytes */${totalSize}`,
        },
      });
    }

    const chunk = arrayBuffer.slice(start, end + 1);

    const headers = new Headers(response.headers);
    headers.set("Content-Range", `bytes ${start}-${end}/${totalSize}`);
    headers.set("Content-Length", chunk.byteLength.toString());
    headers.set("Accept-Ranges", "bytes");
    headers.set("Content-Type", response.headers.get("content-type") || "video/mp4");
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new Response(chunk, {
      status: 206,
      statusText: "Partial Content",
      headers,
    });
  },
};
