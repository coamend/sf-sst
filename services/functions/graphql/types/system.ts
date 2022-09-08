import { System } from "@sf-sst/core/system";
import { builder } from "../builder";

const SystemType = builder
  .objectRef<System.SystemEntityType>("System")
  .implement({
    fields: t => ({
      systemID: t.exposeID("systemID"),
      systemName: t.exposeString("systemName"),
      parentSystemID: t.exposeString("parentSystemID"),
      binaryAverageDistance: t.exposeFloat("binaryAverageDistance", { nullable: true }),
      barycenter: t.exposeFloat("barycenter", { nullable: true }),
      innerOrbitLimit: t.exposeFloat("innerOrbitLimit", { nullable: true }),
      outerOrbitLimit: t.exposeFloat("outerOrbitLimit", { nullable: true }),
      frostLine: t.exposeFloat("frostLine", { nullable: true }),
      habitableZoneInner: t.exposeFloat("habitableZoneInner", { nullable: true }),
      habitableZoneOuter: t.exposeFloat("habitableZoneOuter", { nullable: true }),
      forbiddenZoneInner: t.exposeFloat("forbiddenZoneInner", { nullable: true }),
      forbiddenZoneOuter: t.exposeFloat("forbiddenZoneOuter", { nullable: true })
    })
  });

builder.queryFields(t => ({
  systems: t.field({
    type: [SystemType],
    args: {
      galaxyID: t.arg.string({ required: true })
    },
    resolve: (_, args) => System.list(args.galaxyID)
  })
}));

builder.queryFields(t => ({
  systems: t.field({
    type: [SystemType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true })
    },
    resolve: (_, args) => System.listByQuadrant(args.galaxyID, args.quadrantX, args.quadrantY)
  })
}));

builder.queryFields(t => ({
  systems: t.field({
    type: [SystemType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
    },
    resolve: (_, args) => System.listBySector(args.galaxyID, args.quadrantX, args.quadrantY, args.sectorX, args.sectorY)
  })
}));

builder.queryFields(t => ({
  systems: t.field({
    type: [SystemType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
      subsectorX: t.arg.int({ required: true }),
      subsectorY: t.arg.int({ required: true }),
    },
    resolve: (_, args) => System.listBySubsector(args.galaxyID, args.quadrantX, args.quadrantY, args.sectorX, args.sectorY, args.subsectorX, args.subsectorY)
  })
}));

builder.mutationFields(t => ({
  createSystem: t.field({
    type: SystemType,
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
      subsectorX: t.arg.int({ required: true }),
      subsectorY: t.arg.int({ required: true }),
      systemName: t.arg.string({ required: true }),
      parentSystemID: t.arg.string(),
      binaryAverageDistance: t.arg.float(),
      barycenter: t.arg.float(),
      innerOrbitLimit: t.arg.float(),
      outerOrbitLimit: t.arg.float(),
      frostLine: t.arg.float(),
      habitableZoneInner: t.arg.float(),
      habitableZoneOuter: t.arg.float(),
      forbiddenZoneInner: t.arg.float(),
      forbiddenZoneOuter: t.arg.float()
    },
    resolve: async (_, args) => System.create(
      args.galaxyID, 
      args.quadrantX, 
      args.quadrantY, 
      args.sectorX, 
      args.sectorY, 
      args.subsectorX, 
      args.subsectorY, 
      args.systemName,
      args.parentSystemID??undefined,
      args.binaryAverageDistance??undefined,
      args.barycenter??undefined,
      args.innerOrbitLimit??undefined,
      args.outerOrbitLimit??undefined,
      args.frostLine??undefined,
      args.habitableZoneInner??undefined,
      args.habitableZoneOuter??undefined,
      args.forbiddenZoneInner??undefined,
      args.forbiddenZoneOuter??undefined
      )
  })
}));