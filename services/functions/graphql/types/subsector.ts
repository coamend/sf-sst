import { Subsector } from "@sf-sst/core/subsector";
import { builder } from "../builder";

const SubsectorType = builder
  .objectRef<Subsector.SubsectorEntityType>("Subsector")
  .implement({
    fields: t => ({
      subsectorName: t.exposeString("subsectorName"),
      subsectorX: t.exposeID("subsectorX"),
      subsectorY: t.exposeID("subsectorY")
    })
  });

builder.queryFields(t => ({
  subsectors: t.field({
    type: [SubsectorType],
    args: {
      galaxyID: t.arg.string({ required: true })
    },
    resolve: (_, args) => Subsector.list(args.galaxyID)
  })
}));

builder.queryFields(t => ({
  subsectorsByQuadrant: t.field({
    type: [SubsectorType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true })
    },
    resolve: (_, args) => Subsector.listByQuadrant(args.galaxyID, args.quadrantX, args.quadrantY)
  })
}));

builder.queryFields(t => ({
  subsectorsBySector: t.field({
    type: [SubsectorType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
    },
    resolve: (_, args) => Subsector.listBySector(args.galaxyID, args.quadrantX, args.quadrantY, args.sectorX, args.sectorY)
  })
}));

builder.mutationFields(t => ({
  createSubsector: t.field({
    type: SubsectorType,
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
      subsectorX: t.arg.int({ required: true }),
      subsectorY: t.arg.int({ required: true }),
      subsectorName: t.arg.string({ required: true })
    },
    resolve: async (_, args) => Subsector.create(args.galaxyID, args.quadrantX, args.quadrantY, args.sectorX, args.sectorY, args.subsectorX, args.subsectorY, args.subsectorName)
  })
}));