export * as Star from "./star";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const StarEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Star",
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
      starID: {
        type: "string",
        required: true,
      },
      starName: {
        type: "string",
        required: true,
      },
      minimumDistance: {
        type: "number",
        field: "minDist",
        required: false,
      },
      averageDistance: {
        type: "number",
        field: "avgDist",
        required: false,
      },
      maximumDistance: {
        type: "number",
        field: "maxDist",
        required: false,
      },
      eccentricity: {
        type: "number",
        field: "ecc",
        required: false,
      },
      luminosity: {
        type: "number",
        field: "lux",
        required: true,
      },
      mass: {
        type: "number",
        required: true,
      },
      diameter: {
        type: "number",
        field: "dia",
        required: true,
      },
      surfaceTemperature: {
        type: "number",
        field: "surfTemp",
        required: true,
      },
      spectralClass: {
        type: "string",
        field: "class",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["galaxyID", "starID"],
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
          composite: ["quadrantX", "quadrantY", "sectorX", "sectorY", "subsectorX, subsectorY", "systemID"],
        }
      }
    },
  },
  Dynamo.Configuration
);

export type StarEntityType = EntityItem<typeof StarEntity>;

export function create(
  galaxyID: string, 
  quadrantX: number, 
  quadrantY: number, 
  sectorX: number, 
  sectorY: number, 
  subsectorX: number, 
  subsectorY: number, 
  systemID: string,
  starName: string, 
  luminosity: number,
  mass: number,
  diameter: number,
  surfaceTemperature: number,
  spectralClass: string,
  minimumDistance?: number,
  averageDistance?: number,
  maximumDistance?: number,
  eccentricity?: number,
  ) {
  const starID = ulid();

  return StarEntity.create({
    galaxyID,
    quadrantX,
    quadrantY,
    sectorX,
    sectorY,
    subsectorX,
    subsectorY,
    systemID,
    starID,
    starName,
    luminosity,
    mass,
    diameter,
    surfaceTemperature,
    spectralClass,
    minimumDistance,
    averageDistance,
    maximumDistance,
    eccentricity,
  }).go();
}

export async function list(galaxyID: string) {
  return StarEntity.query.galacticObjects({galaxyID}).go();
}

export async function listByQuadrant(galaxyID: string, quadrantX: number, quadrantY: number) {
  return StarEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY}).go();
}

export async function listBySector(galaxyID: string, quadrantX: number, quadrantY: number, sectorX: number, sectorY: number) {
  return StarEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY, sectorX, sectorY}).go();
}

export async function listBySubsector(galaxyID: string, quadrantX: number, quadrantY: number, sectorX: number, sectorY: number, subsectorX: number, subsectorY: number) {
  return StarEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY, sectorX, sectorY, subsectorX, subsectorY}).go();
}

export async function listBySystem(galaxyID: string, quadrantX: number, quadrantY: number, sectorX: number, sectorY: number, subsectorX: number, subsectorY: number, systemID: string) {
  return StarEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY, sectorX, sectorY, subsectorX, subsectorY, systemID}).go();
}

