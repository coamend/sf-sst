export * as Sector from "./sector";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const SectorEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Sector",
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
      sectorName: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["galaxyID", "quadrantX", "quadrantY", "sectorX", "sectorY"],
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
          composite: ["quadrantX", "quadrantY", "sectorX", "sectorY"],
        }
      }
    },
  },
  Dynamo.Configuration
);

export type SectorEntityType = EntityItem<typeof SectorEntity>;

export function create(galaxyID: string, quadrantX: number, quadrantY: number, sectorX: number, sectorY: number, sectorName: string) {
  return SectorEntity.create({
    galaxyID,
    quadrantX,
    quadrantY,
    sectorX,
    sectorY,
    sectorName
  }).go();
}

export async function list(galaxyID: string) {
  return SectorEntity.query.galacticObjects({galaxyID}).go();
}

export async function listByQuadrant(galaxyID: string, quadrantX: number, quadrantY: number) {
  return SectorEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY}).go();
}

