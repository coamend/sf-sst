import { Star } from "@sf-sst/core/star";
import { builder } from "../builder";

const StarType = builder
  .objectRef<Star.StarEntityType>("Star")
  .implement({
    fields: t => ({
      systemID: t.exposeString("systemID"),
      starID: t.exposeID("starID"),
      starName: t.exposeString("starName"),
      luminosity: t.exposeFloat("luminosity"),
      mass: t.exposeFloat("mass"),
      diameter: t.exposeFloat("diameter"),
      surfaceTemperature: t.exposeFloat("surfaceTemperature"),
      spectralClass: t.exposeString("spectralClass", { nullable: true }),
      minimumDistance: t.exposeFloat("minimumDistance", { nullable: true }),
      averageDistance: t.exposeFloat("averageDistance", { nullable: true }),
      maximumDistance: t.exposeFloat("maximumDistance", { nullable: true }),
      eccentricity: t.exposeFloat("eccentricity", { nullable: true })
    })
  });

builder.queryFields(t => ({
  stars: t.field({
    type: [StarType],
    args: {
      galaxyID: t.arg.string({ required: true })
    },
    resolve: (_, args) => Star.list(args.galaxyID)
  })
}));

builder.queryFields(t => ({
  stars: t.field({
    type: [StarType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true })
    },
    resolve: (_, args) => Star.listByQuadrant(args.galaxyID, args.quadrantX, args.quadrantY)
  })
}));

builder.queryFields(t => ({
  stars: t.field({
    type: [StarType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
    },
    resolve: (_, args) => Star.listBySector(args.galaxyID, args.quadrantX, args.quadrantY, args.sectorX, args.sectorY)
  })
}));

builder.queryFields(t => ({
  stars: t.field({
    type: [StarType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
      subsectorX: t.arg.int({ required: true }),
      subsectorY: t.arg.int({ required: true }),
    },
    resolve: (_, args) => Star.listBySubsector(args.galaxyID, args.quadrantX, args.quadrantY, args.sectorX, args.sectorY, args.subsectorX, args.subsectorY)
  })
}));

builder.queryFields(t => ({
  stars: t.field({
    type: [StarType],
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
    resolve: (_, args) => Star.listBySystem(args.galaxyID, args.quadrantX, args.quadrantY, args.sectorX, args.sectorY, args.subsectorX, args.subsectorY, args.systemID)
  })
}));

builder.mutationFields(t => ({
  createStar: t.field({
    type: StarType,
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
      subsectorX: t.arg.int({ required: true }),
      subsectorY: t.arg.int({ required: true }),
      systemID: t.arg.string({ required: true }),
      starName: t.arg.string({ required: true }),
      luminosity: t.arg.float({ required: true }),
      mass: t.arg.float({ required: true }),
      diameter: t.arg.float({ required: true }),
      surfaceTemperature: t.arg.float({ required: true }),
      spectralClass: t.arg.string({ required: true }),
      minimumDistance: t.arg.float(),
      averageDistance: t.arg.float(),
      maximumDistance: t.arg.float(),
      eccentricity: t.arg.float()
    },
    resolve: async (_, args) => Star.create(
      args.galaxyID, 
      args.quadrantX, 
      args.quadrantY, 
      args.sectorX, 
      args.sectorY, 
      args.subsectorX, 
      args.subsectorY, 
      args.systemID,
      args.starName,
      args.luminosity,
      args.mass,
      args.diameter,
      args.surfaceTemperature,
      args.spectralClass,
      args.minimumDistance??undefined,
      args.averageDistance??undefined,
      args.maximumDistance??undefined,
      args.eccentricity??undefined
      )
  })
}));