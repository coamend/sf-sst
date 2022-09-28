export * as Ore from "./ore";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const OreEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Ore",
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
      oreID: {
        type: "string",
        required: true,
      },
      parentObjectID: {
        type: "string",
        required: true,
      },
      oreType: {
        type: "string",
        required: true,
      },
      depth: {
        type: "number",
        required: true,
      },
      size: {
        type: "number",
        required: true,
      },
      stripRatio: {
        type: "number",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["galaxyID", "oreID"],
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

export type OreEntityType = EntityItem<typeof OreEntity>;

export function create(
  galaxyID: string, 
  quadrantX: number, 
  quadrantY: number, 
  sectorX: number, 
  sectorY: number, 
  subsectorX: number, 
  subsectorY: number, 
  systemID: string,
  parentObjectID: string,
  oreType: string,
  depth: number,
  size: number,
  stripRatio: number,
  ) {
  const oreID = ulid();

  return OreEntity.create({
    galaxyID,
    quadrantX,
    quadrantY,
    sectorX,
    sectorY,
    subsectorX,
    subsectorY,
    systemID,
    oreID,
    parentObjectID,
    oreType,
    depth,
    size,
    stripRatio,
  }).go();
}

export async function list(galaxyID: string) {
  return OreEntity.query.galacticObjects({galaxyID}).go();
}

export async function listByQuadrant(galaxyID: string, quadrantX: number, quadrantY: number) {
  return OreEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY}).go();
}

export async function listBySector(galaxyID: string, quadrantX: number, quadrantY: number, sectorX: number, sectorY: number) {
  return OreEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY, sectorX, sectorY}).go();
}

export async function listBySubsector(galaxyID: string, quadrantX: number, quadrantY: number, sectorX: number, sectorY: number, subsectorX: number, subsectorY: number) {
  return OreEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY, sectorX, sectorY, subsectorX, subsectorY}).go();
}

export async function listBySystem(galaxyID: string, quadrantX: number, quadrantY: number, sectorX: number, sectorY: number, subsectorX: number, subsectorY: number, systemID: string) {
  return OreEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY, sectorX, sectorY, subsectorX, subsectorY, systemID}).go();
}

