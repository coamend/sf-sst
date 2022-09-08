import { Galaxy } from "@sf-sst/core/galaxy";
import { builder } from "../builder";

const GalaxyType = builder
  .objectRef<Galaxy.GalaxyEntityType>("Galaxy")
  .implement({
    fields: t => ({
      galaxyID: t.exposeID("galaxyID"),
      galaxyName: t.exposeString("galaxyName")
    })
  });

builder.queryFields(t => ({
  galaxies: t.field({
    type: [GalaxyType],
    resolve: () => Galaxy.list()
  })
}));

builder.mutationFields(t => ({
  createGalaxy: t.field({
    type: GalaxyType,
    args: {
      galaxyName: t.arg.string({ required: true })
    },
    resolve: async (_, args) => Galaxy.create(args.galaxyName)
  })
}));