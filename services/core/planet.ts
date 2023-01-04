export * as Planet from "./planet";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const PlanetEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Planet",
      service: "sf",
    },
    attributes: {
      galaxyID: {
        type: "string",
        label: "g",
        required: true,
        readOnly: true,
      },
      quadrantX: {
        type: "number",
        label: "qx",
        required: true,
        readOnly: true,
      },
      quadrantY: {
        type: "number",
        label: "qy",
        required: true,
        readOnly: true,
      },
      sectorX: {
        type: "number",
        label: "sx",
        required: true,
        readOnly: true,
      },
      sectorY: {
        type: "number",
        label: "sy",
        required: true,
        readOnly: true,
      },
      subsectorX: {
        type: "number",
        label: "ux",
        required: true,
        readOnly: true,
      },
      subsectorY: {
        type: "number",
        label: "uy",
        required: true,
        readOnly: true,
      },
      systemID: {
        type: "string",
        label: "sys",
        required: true,
        readOnly: true,
      },
      planetID: {
        type: "string",
        required: true,
      },
      planetName: {
        type: "string",
        required: true,
      },
      planetType: {
        type: "string",
        required: true,
      },
      parentPlanetID: {
        type: "string",
      },
      averageOrbit: {
        type: "number",
        required: true,
      },
      eccentricity: {
        type: "number",
        required: true,
      },
      mass: {
        type: "number",
        required: true,
      },
      radius: {
        type: "number",
        required: true,
      },
      density: {
        type: "number",
        required: true,
      },
      surfaceArea: {
        type: "number",
        required: true,
      },
      axialTilt: {
        type: "number",
        required: true,
      },
      averageTemperature: {
        type: "number",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["galaxyID", "planetID"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
      galacticObjects: {
        index: "gsi1pk-gsi1sk-index",
        pk: {
          field: "gsi1pk",
          composite: ["galaxyID"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["quadrantX", "quadrantY", "sectorX", "sectorY", "subsectorX", "subsectorY", "systemID"],
        }
      }
    },
  },
  Dynamo.Configuration
);

export type PlanetEntityType = EntityItem<typeof PlanetEntity>;

export function create(
  galaxyID: string, 
  quadrantX: number, 
  quadrantY: number, 
  sectorX: number, 
  sectorY: number, 
  subsectorX: number, 
  subsectorY: number, 
  systemID: string,
  planetName: string, 
  planetType: string,
  averageOrbit: number,
  eccentricity: number,
  mass: number,
  radius: number,
  density: number,
  surfaceArea: number,
  axialTilt: number,
  averageTemperature: number,
  parentPlanetID?: string,
  ) {
  const planetID = ulid();
  if(typeof parentPlanetID == 'undefined'){
    parentPlanetID = planetID;
  }

  return PlanetEntity.create({
    galaxyID,
    quadrantX,
    quadrantY,
    sectorX,
    sectorY,
    subsectorX,
    subsectorY,
    systemID,
    planetID,
    planetName,
    planetType,
    parentPlanetID,
    averageOrbit,
    eccentricity,
    mass,
    radius,
    density,
    surfaceArea,
    axialTilt,
    averageTemperature,
  }).go();
}

export async function list(galaxyID: string) {
  return PlanetEntity.query.galacticObjects({galaxyID}).go();
}

export async function listByQuadrant(galaxyID: string, quadrantX: number, quadrantY: number) {
  return PlanetEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY}).go();
}

export async function listBySector(galaxyID: string, quadrantX: number, quadrantY: number, sectorX: number, sectorY: number) {
  return PlanetEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY, sectorX, sectorY}).go();
}

export async function listBySubsector(galaxyID: string, quadrantX: number, quadrantY: number, sectorX: number, sectorY: number, subsectorX: number, subsectorY: number) {
  return PlanetEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY, sectorX, sectorY, subsectorX, subsectorY}).go();
}

export async function listBySystem(galaxyID: string, quadrantX: number, quadrantY: number, sectorX: number, sectorY: number, subsectorX: number, subsectorY: number, systemID: string) {
  return PlanetEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY, sectorX, sectorY, subsectorX, subsectorY, systemID}).go();
}