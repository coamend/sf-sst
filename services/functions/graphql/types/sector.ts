import { Sector } from "@sf-sst/core/sector";
import { builder } from "../builder";

const SectorType = builder
  .objectRef<Sector.SectorEntityType>("Sector")
  .implement({
    fields: t => ({
      sectorName: t.exposeString("sectorName"),
      sectorX: t.exposeID("sectorX"),
      sectorY: t.exposeID("sectorY")
    })
  });

builder.queryFields(t => ({
  sectors: t.field({
    type: [SectorType],
    args: {
      galaxyID: t.arg.string({ required: true })
    },
    resolve: (_, args) => Sector.list(args.galaxyID)
  })
}));

builder.queryFields(t => ({
  sectors: t.field({
    type: [SectorType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true })
    },
    resolve: (_, args) => Sector.listByQuadrant(args.galaxyID, args.quadrantX, args.quadrantY)
  })
}));

builder.mutationFields(t => ({
  createSector: t.field({
    type: SectorType,
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
      sectorName: t.arg.string({ required: true })
    },
    resolve: async (_, args) => Sector.create(args.galaxyID, args.quadrantX, args.quadrantY, args.sectorX, args.sectorY, args.sectorName)
  })
}));