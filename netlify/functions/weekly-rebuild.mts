import type { Config } from "@netlify/functions";

export default async function handler() {
  const buildHookUrl = process.env.NETLIFY_BUILD_HOOK_URL;

  if (!buildHookUrl) {
    console.error("Missing NETLIFY_BUILD_HOOK_URL env variable.");
    return new Response("Missing NETLIFY_BUILD_HOOK_URL", { status: 500 });
  }

  const response = await fetch(buildHookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      reason: "Scheduled weekly wiki mirror rebuild"
    })
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("Failed to trigger Netlify build hook", {
      status: response.status,
      body
    });

    return new Response(`Failed to trigger build: ${body}`, { status: 500 });
  }

  console.log("Netlify build hook triggered successfully.");
  return new Response("Build triggered successfully", { status: 200 });
}

export const config: Config = {
  schedule: "@weekly"
};
