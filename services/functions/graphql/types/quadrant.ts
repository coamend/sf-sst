import { Quadrant } from "@sf-sst/core/quadrant";
import { builder } from "../builder";

const QuadrantType = builder
  .objectRef<Quadrant.QuadrantEntityType>("Quadrant")
  .implement({
    fields: t => ({
      quadrantName: t.exposeString("quadrantName"),
      quadrantX: t.exposeID("quadrantX"),
      quadrantY: t.exposeID("quadrantY")
    })
  });

builder.queryFields(t => ({
  quadrants: t.field({
    type: [QuadrantType],
    args: {
      galaxyID: t.arg.string({ required: true })
    },
    resolve: (_, args) => Quadrant.list(args.galaxyID)
  })
}));

builder.mutationFields(t => ({
  createQuadrant: t.field({
    type: QuadrantType,
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      quadrantName: t.arg.string({ required: true })
    },
    resolve: async (_, args) => Quadrant.create(args.galaxyID, args.quadrantX, args.quadrantY, args.quadrantName)
  })
}));