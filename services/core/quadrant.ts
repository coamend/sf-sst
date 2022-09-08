export * as Quadrant from "./quadrant";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const QuadrantEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Quadrant",
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
      quadrantName: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["galaxyID", "quadrantX", "quadrantY"],
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
          composite: ["quadrantX", "quadrantY"],
        }
      }
    },
  },
  Dynamo.Configuration
);

export type QuadrantEntityType = EntityItem<typeof QuadrantEntity>;

export function create(galaxyID: string, quadrantX: number, quadrantY: number, quadrantName: string) {
  return QuadrantEntity.create({
    galaxyID,
    quadrantX,
    quadrantY,
    quadrantName
  }).go();
}

export async function list(galaxyID: string) {
  return QuadrantEntity.query.galacticObjects({galaxyID}).go();
}

