export * as Galaxy from "./galaxy";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const GalaxyEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Galaxy",
      service: "sf",
    },
    attributes: {
      galaxyID: {
        type: "string",
        label: "g",
        required: true,
        readOnly: true,
      },
      galaxyName: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["galaxyID"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
    },
  },
  Dynamo.Configuration
);

export type GalaxyEntityType = EntityItem<typeof GalaxyEntity>;

export function create(galaxyName: string) {
  const galaxyID = ulid();
  return GalaxyEntity.create({
    galaxyID,
    galaxyName,
  }).go();
}

export async function list() {
  return GalaxyEntity.scan.go();
}

