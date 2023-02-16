import search from "./search";
import header from "./header";
import product from "./product";
import { MongoClient } from 'mongodb'

export async function handleRequest(request) {
  /* Handle the incoming request */
  const headers = header(request.headers);
  const path = new URL(request.url).pathname; /* Get the pathname */

  if (request.method === "GET") {
    /* Respond for GET request method */
    if (path.startsWith("/search/")) {
      /* Search */
      return new Response(
        await search(path.replace("/search/", ""), request.headers.get("host")),
        {
          status: 200,
          headers,
        }
      );
    } else if (path.startsWith("/product/")) {
      /* Product Page */
      return new Response(await product(path.replace("/product/", "")), {
        status: 200,
        headers,
      });
    } else {
      return new Response(
        JSON.stringify(
          {
            /* Extra curricular activities */ alive: true,
            repository_name: "amazon-scraper",
            repository_description:
              "Serverless Amazon Product Scraper, made with Cloudflare worker",
            api_endpoints:
              "https://amazon-scraper.jallisonfl.workers.dev/product/{path}",
          },
          null,
          2
        ),
        {
          status: 200,
          headers,
        }
      );
    }
  } else if (request.method === "OPTIONS") {
    /* Respond for OPTIONS request method */
    return new Response("🤝", {
      status: 200,
      headers,
    });
  } else {
    /* Respond for other request methods */
    //return Response.redirect("https://github.com/tuhinpal/amazon-scraper", 301);
  }
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

