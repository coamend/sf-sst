import {
    StackContext,
    use,
    Queue,
  } from "@serverless-stack/resources";
import { Api } from "./Api";
  
export function Generator({ stack }: StackContext) {
  const api = use(Api);

  const systemGenerationQueue = new Queue(stack, "systemGenerationQueue", {
    consumer: {
        function: {
            handler: "services/generator/generateSystem.main",
            timeout: 20,
            environment: {
              GRAPHQL_URL: api.url + "/graphql",
              MULTI_STAR_SYSYEM_PROBABILITY: '0.08',
              P_TYPE_MULTI_SYSTEM_PROBABILITY: '0.5',
            }
        }
    }
  });
  
  api.addRoutes(stack, {
        "POST /generateGalaxy": {
          function: {
              handler: "services/generator/generateGalaxy.main",
              timeout: 60,
              environment: {
                SYSTEM_GENERATION_QUEUE: systemGenerationQueue.queueUrl,
                GRAPHQL_URL: api.url + "/graphql"
              }
          }
      }
    },
  );

  stack.addOutputs({
      SYSTEM_GENERATION_QUEUE: systemGenerationQueue.queueUrl,
  });

  return api;
}
  