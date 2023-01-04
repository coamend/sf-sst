export * as Subsector from "./subsector";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const SubsectorEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Subsector",
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
      subsectorName: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["galaxyID", "quadrantX", "quadrantY", "sectorX", "sectorY", "subsectorX", "subsectorY"],
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
          composite: ["quadrantX", "quadrantY", "sectorX", "sectorY", "subsectorX", "subsectorY"],
        }
      }
    },
  },
  Dynamo.Configuration
);

export type SubsectorEntityType = EntityItem<typeof SubsectorEntity>;

export function create(galaxyID: string, quadrantX: number, quadrantY: number, sectorX: number, sectorY: number, subsectorX: number, subsectorY: number, subsectorName: string) {
  return SubsectorEntity.create({
    galaxyID,
    quadrantX,
    quadrantY,
    sectorX,
    sectorY,
    subsectorX,
    subsectorY,
    subsectorName
  }).go();
}

export async function list(galaxyID: string) {
  return SubsectorEntity.query.galacticObjects({galaxyID}).go();
}

export async function listByQuadrant(galaxyID: string, quadrantX: number, quadrantY: number) {
  return SubsectorEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY}).go();
}

export async function listBySector(galaxyID: string, quadrantX: number, quadrantY: number, sectorX: number, sectorY: number) {
  return SubsectorEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY, sectorX, sectorY}).go();
}

