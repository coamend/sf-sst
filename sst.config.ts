import type { SSTConfig } from "sst";
import { Api } from "./stacks/Api";
import { Database } from "./stacks/Database";
import { Generator } from "./stacks/Generator";
import { Web } from "./stacks/Web";
import { Tags } from "aws-cdk-lib";

export default {
  config(input) {
    return {
      name: "sf-sst",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
        runtime: "nodejs16.x",
    });

    Tags.of(app).add("owner", "corey.amend@devfactory.com");

    app
        .stack(Database)
        .stack(Api)
        .stack(Generator)
        .stack(Web)
  },
} satisfies SSTConfig;