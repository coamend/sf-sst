export * as System from "./system";
import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const SystemEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "System",
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
      systemName: {
        type: "string",
        required: true,
      },
      parentSystemID: {
        type: "string",
        label: "parentsys",
        readOnly: true,
      },
      binaryMinimumDistance: {
        type: "number",
        field: "minDist",
      },
      binaryAverageDistance: {
        type: "number",
        field: "avgDist",
      },
      binaryMaximumDistance: {
        type: "number",
        field: "maxDist",
      },
      binaryEccentricity: {
        type: "number",
        field: "ecc",
      },
      barycenter: {
        type: "number",
      },
      innerOrbitLimit: {
        type: "number",
        field: "innerLim",
      },
      outerOrbitLimit: {
        type: "number",
        field: "outerLim",
      },
      frostLine: {
        type: "number",
      },
      habitableZoneInner: {
        type: "number",
        field: "habInner",
      },
      habitableZoneOuter: {
        type: "number",
        field: "habOuter",
      },
      forbiddenZoneInner: {
        type: "number",
        field: "forbidInner",
      },
      forbiddenZoneOuter: {
        type: "number",
        field: "forbidOuter",
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["galaxyID", "systemID"],
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
          composite: ["quadrantX", "quadrantY", "sectorX", "sectorY", "subsectorX, subsectorY", "parentSystemID"],
        }
      }
    },
  },
  Dynamo.Configuration
);

export type SystemEntityType = EntityItem<typeof SystemEntity>;

export function create(
  galaxyID: string, 
  quadrantX: number, 
  quadrantY: number, 
  sectorX: number, 
  sectorY: number, 
  subsectorX: number, 
  subsectorY: number, 
  systemName: string, 
  systemID?: string,
  parentSystemID?: string,
  binaryMinimumDistance?: number,
  binaryAverageDistance?: number,
  binaryMaximumDistance?: number,
  binaryEccentricity?: number,
  barycenter?: number,
  innerOrbitLimit?: number,
  outerOrbitLimit?: number,
  frostLine?: number,
  habitableZoneInner?: number,
  habitableZoneOuter?: number,
  forbiddenZoneInner?: number,
  forbiddenZoneOuter?: number
  ) {
  
  if(typeof systemID == 'undefined'){
    systemID = ulid();
  }
  
  if(typeof parentSystemID == 'undefined'){
    parentSystemID = systemID;
  }

  return SystemEntity.create({
    galaxyID,
    quadrantX,
    quadrantY,
    sectorX,
    sectorY,
    subsectorX,
    subsectorY,
    systemID,
    systemName,
    parentSystemID,
    binaryMinimumDistance,
    binaryAverageDistance,
    binaryMaximumDistance,
    binaryEccentricity,
    barycenter,
    innerOrbitLimit,
    outerOrbitLimit,
    frostLine,
    habitableZoneInner,
    habitableZoneOuter,
    forbiddenZoneInner,
    forbiddenZoneOuter
  }).go();
}

export async function list(galaxyID: string) {
  return SystemEntity.query.galacticObjects({galaxyID}).go();
}

export async function listByQuadrant(galaxyID: string, quadrantX: number, quadrantY: number) {
  return SystemEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY}).go();
}

export async function listBySector(galaxyID: string, quadrantX: number, quadrantY: number, sectorX: number, sectorY: number) {
  return SystemEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY, sectorX, sectorY}).go();
}

export async function listBySubsector(galaxyID: string, quadrantX: number, quadrantY: number, sectorX: number, sectorY: number, subsectorX: number, subsectorY: number) {
  return SystemEntity.query.galacticObjects({galaxyID, quadrantX, quadrantY, sectorX, sectorY, subsectorX, subsectorY}).go();
}

