import { StackContext, use, StaticSite } from "sst/constructs";
import { Api } from "./Api";

export function Web({ stack, app }: StackContext) {
  const api = use(Api);

  const site = new StaticSite(stack, "site", {
    path: "web",
    buildCommand: "npm run build",
    buildOutput: "dist",
    environment: {
      VITE_GRAPHQL_URL: api.url + "/graphql",
      VITE_GENERATE_URL: api.url + "/generateGalaxy",
      VITE_GENERATE_REGION: app.region
    },
  });

  stack.addOutputs({
    SITE_URL: site.url?? '',
  });

  return api;
}
