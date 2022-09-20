import { Planet } from "@sf-sst/core/planet";
import { builder } from "../builder";

const PlanetType = builder
  .objectRef<Planet.PlanetEntityType>("Planet")
  .implement({
    fields: t => ({
      systemID: t.exposeString("systemID"),
      planetID: t.exposeID("planetID"),
      planetName: t.exposeString("planetName"),
      averageOrbit: t.exposeFloat("averageOrbit"),
      eccentricity: t.exposeFloat("eccentricity"),      
      mass: t.exposeFloat("mass"),
      radius: t.exposeFloat("radius"),
      density: t.exposeFloat("density"),
      surfaceArea: t.exposeFloat("surfaceArea"),
      axialTilt: t.exposeFloat("axialTilt"),
      averageTemperature: t.exposeFloat("averageTemperature"),
      parentPlanetID: t.exposeString("parentPlanetID", { nullable: true }),      
    })
  });

builder.queryFields(t => ({
  planets: t.field({
    type: [PlanetType],
    args: {
      galaxyID: t.arg.string({ required: true })
    },
    resolve: (_, args) => Planet.list(args.galaxyID)
  })
}));

builder.queryFields(t => ({
  planetsByQuadrant: t.field({
    type: [PlanetType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true })
    },
    resolve: (_, args) => Planet.listByQuadrant(args.galaxyID, args.quadrantX, args.quadrantY)
  })
}));

builder.queryFields(t => ({
  planetsBySector: t.field({
    type: [PlanetType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
    },
    resolve: (_, args) => Planet.listBySector(args.galaxyID, args.quadrantX, args.quadrantY, args.sectorX, args.sectorY)
  })
}));

builder.queryFields(t => ({
  planetsBySubsector: t.field({
    type: [PlanetType],
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
      subsectorX: t.arg.int({ required: true }),
      subsectorY: t.arg.int({ required: true }),
    },
    resolve: (_, args) => Planet.listBySubsector(args.galaxyID, args.quadrantX, args.quadrantY, args.sectorX, args.sectorY, args.subsectorX, args.subsectorY)
  })
}));

builder.queryFields(t => ({
  planetsBySystem: t.field({
    type: [PlanetType],
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
    resolve: (_, args) => Planet.listBySystem(args.galaxyID, args.quadrantX, args.quadrantY, args.sectorX, args.sectorY, args.subsectorX, args.subsectorY, args.systemID)
  })
}));

builder.mutationFields(t => ({
  createPlanet: t.field({
    type: PlanetType,
    args: {
      galaxyID: t.arg.string({ required: true }),
      quadrantX: t.arg.int({ required: true }),
      quadrantY: t.arg.int({ required: true }),
      sectorX: t.arg.int({ required: true }),
      sectorY: t.arg.int({ required: true }),
      subsectorX: t.arg.int({ required: true }),
      subsectorY: t.arg.int({ required: true }),
      systemID: t.arg.string({ required: true }),
      planetName: t.arg.string({ required: true }),
      averageOrbit: t.arg.float({ required: true }),
      eccentricity: t.arg.float({ required: true }),
      mass: t.arg.float({ required: true }),
      radius: t.arg.float({ required: true }),
      density: t.arg.float({ required: true }),
      surfaceArea: t.arg.float({ required: true }),
      axialTilt: t.arg.float({ required: true }),
      averageTemperature: t.arg.float({ required: true }),
      parentPlanetID: t.arg.string()
    },
    resolve: async (_, args) => Planet.create(
      args.galaxyID, 
      args.quadrantX, 
      args.quadrantY, 
      args.sectorX, 
      args.sectorY, 
      args.subsectorX, 
      args.subsectorY, 
      args.systemID,
      args.planetName,
      args.averageOrbit,
      args.eccentricity,
      args.mass,
      args.radius,
      args.density,
      args.surfaceArea,
      args.axialTilt,
      args.averageTemperature,
      args.parentPlanetID??undefined,
      )
  })
}));