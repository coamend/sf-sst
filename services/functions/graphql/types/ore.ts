import { Ore } from "@sf-sst/core/ore";
import { builder } from "../builder";

const OreType = builder
  .objectRef<Ore.OreEntityType>("Ore")
  .implement({
    fields: t => ({
      oreID: t.exposeID("oreID"),
      systemID: t.exposeString("systemID"),
      parentObjectType: t.exposeString("parentObjectType"),
      parentObjectID: t.exposeString("parentObjectID"),
      oreType: t.exposeString("oreType"),
      depth: t.exposeFloat("depth"),
      size: t.exposeFloat("size"),
      stripRatio: t.exposeFloat("stripRatio"),      
    })
  });

builder.queryFields(t => ({
  ores: t.field({
    type: [OreType],
    args: {
      galaxyID: t.arg.string({ required: true })
    },
    resolve: (_, args) => Ore.list(args.galaxyID)
  })
}));

builder.queryFields(t => ({
  ores: t.field({
    type: [OreType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true })
    },
    resolve: (_, args) => Ore.listByQuadrant(args.galaxyID, args.quadrantX, args.quadrantY)
  })
}));

builder.queryFields(t => ({
  ores: t.field({
    type: [OreType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
    },
    resolve: (_, args) => Ore.listBySector(args.galaxyID, args.quadrantX, args.quadrantY, args.sectorX, args.sectorY)
  })
}));

builder.queryFields(t => ({
  ores: t.field({
    type: [OreType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
      subsectorX: t.arg.int({ required: true }),
      subsectorY: t.arg.int({ required: true }),
    },
    resolve: (_, args) => Ore.listBySubsector(args.galaxyID, args.quadrantX, args.quadrantY, args.sectorX, args.sectorY, args.subsectorX, args.subsectorY)
  })
}));

builder.queryFields(t => ({
  ores: t.field({
    type: [OreType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
      subsectorX: t.arg.int({ required: true }),
      subsectorY: t.arg.int({ required: true }),
      systemID: t.arg.string({ required: true })
    },
    resolve: (_, args) => Ore.listBySystem(args.galaxyID, args.quadrantX, args.quadrantY, args.sectorX, args.sectorY, args.subsectorX, args.subsectorY, args.systemID)
  })
}));

builder.mutationFields(t => ({
  createOre: t.field({
    type: OreType,
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
      subsectorX: t.arg.int({ required: true }),
      subsectorY: t.arg.int({ required: true }),
      systemID: t.arg.string({ required: true }),
      parentObjectType: t.arg.string({ required: true }),
      parentObjectID: t.arg.string({ required: true }),
      oreType: t.arg.string({ required: true }),
      depth: t.arg.float({ required: true }),
      size: t.arg.float({ required: true }),
      stripRatio: t.arg.float({ required: true }),
    },
    resolve: async (_, args) => Ore.create(
      args.galaxyID, 
      args.quadrantX, 
      args.quadrantY, 
      args.sectorX, 
      args.sectorY, 
      args.subsectorX, 
      args.subsectorY, 
      args.systemID,
      args.parentObjectType,
      args.parentObjectID,
      args.oreType,
      args.depth,
      args.size,
      args.stripRatio,
      )
  })
}));