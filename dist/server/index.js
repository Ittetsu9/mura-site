const headers = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "public, max-age=300",
};

export default {
  async fetch(request, env) {
    if (env?.ASSETS) return env.ASSETS.fetch(request);
    return new Response("むら旅＠きたあいき", { headers });
  },
};
