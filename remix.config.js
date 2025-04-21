/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "esm",
  serverPlatform: "node",
  tailwind: true,
  postcss: true,
  watchPaths: ["./tailwind.config.ts"],
  serverDependenciesToBundle: [
    "nanoid",
    /^@ai-sdk.*/,
    "ai",
    "openai",
    "eventsource-parser",
    "ollama-ai-provider",
    "@anthropic-ai/sdk",
  ]
}; 