import {
  StackContext,
  use,
  Api as ApiGateway,
} from "@serverless-stack/resources";
import { Database } from "./Database";

export function Api({ stack }: StackContext) {
  const db = use(Database);

  const api = new ApiGateway(stack, "api", {
    defaults: {
      function: {
        permissions: [db],
        environment: {
          TABLE_NAME: db.tableName,
          GALAXY_GENERATION_TOPIC: "galaxyGeneration/*"
        },
      },
    }, 
    routes: {
      "POST /graphql": {
        type: "pothos",
        function: {
          handler: "functions/graphql/graphql.handler",
        },
        schema: "services/functions/graphql/schema.ts",
        output: "graphql/schema.graphql",
        commands: [
          "npx genql --output ./graphql/genql --schema ./graphql/schema.graphql --esm",
        ],
      },
      "POST /getCredentials": {
        function: {
          handler: "generator/getCredentials.handler",
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
