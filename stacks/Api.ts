import {
  StackContext,
  use,
  Api as ApiGateway,
} from "sst/constructs";
import { Database } from "./Database";

export function Api({ stack }: StackContext) {
  const db = use(Database);

  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        bind: [db],
        environment: {
          TABLE_NAME: db.tableName,
          GALAXY_GENERATION_TOPIC: "galaxyGeneration/*"
        },
      },
    }, 
    routes: {
      "POST /graphql": {
        type: "graphql",
        function: {
          handler: "services/functions/graphql/graphql.handler",
        },
        pothos: {
          schema: "services/functions/graphql/schema.ts",
          output: "graphql/schema.graphql",
          commands: [
            "npx genql --output ./graphql/genql --schema ./graphql/schema.graphql --esm",
          ],
        },
      },
      "POST /getCredentials": {
        function: {
          handler: "services/generator/getCredentials.handler",
          permissions: ["iot", "sts:AssumeRole"]
        },
      },
    },
  });

  stack.addOutputs({
    API_URL: api.url,
  });

  return api;
}
