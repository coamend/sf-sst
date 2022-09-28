import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    ID: string,
    String: string,
    Float: number,
    Int: number,
    Boolean: boolean,
}

export interface Galaxy {
    galaxyID: Scalars['ID']
    galaxyName: Scalars['String']
    __typename: 'Galaxy'
}

export interface Mutation {
    createGalaxy: Galaxy
    createOre: Ore
    createPlanet: Planet
    createQuadrant: Quadrant
    createSector: Sector
    createStar: Star
    createSubsector: Subsector
    createSystem: System
    updateSystem: System
    __typename: 'Mutation'
}

export interface Ore {
    depth: Scalars['Float']
    oreID: Scalars['ID']
    oreType: Scalars['String']
    parentObjectID: Scalars['String']
    parentObjectType: Scalars['String']
    size: Scalars['Float']
    stripRatio: Scalars['Float']
    systemID: Scalars['String']
    __typename: 'Ore'
}

export interface Planet {
    averageOrbit: Scalars['Float']
    averageTemperature: Scalars['Float']
    axialTilt: Scalars['Float']
    density: Scalars['Float']
    eccentricity: Scalars['Float']
    mass: Scalars['Float']
    parentPlanetID?: Scalars['String']
    planetID: Scalars['ID']
    planetName: Scalars['String']
    radius: Scalars['Float']
    starID?: Scalars['String']
    surfaceArea: Scalars['Float']
    systemID: Scalars['String']
    __typename: 'Planet'
}

export interface Quadrant {
    quadrantName: Scalars['String']
    quadrantX: Scalars['ID']
    quadrantY: Scalars['ID']
    __typename: 'Quadrant'
}

export interface Query {
    galaxies: Galaxy[]
    ores: Ore[]
    oresByQuadrant: Ore[]
    oresBySector: Ore[]
    oresBySubsector: Ore[]
    oresBySystem: Ore[]
    planets: Planet[]
    planetsByQuadrant: Planet[]
    planetsBySector: Planet[]
    planetsByStar: Planet[]
    planetsBySubsector: Planet[]
    planetsBySystem: Planet[]
    quadrants: Quadrant[]
    sectors: Sector[]
    sectorsByQuadrant: Sector[]
    stars: Star[]
    starsByQuadrant: Star[]
    starsBySector: Star[]
    starsBySubsector: Star[]
    starsBySystem: Star[]
    subsectors: Subsector[]
    subsectorsByQuadrant: Subsector[]
    subsectorsBySector: Subsector[]
    systems: System[]
    systemsByQuadrant: System[]
    systemsBySector: System[]
    systemsBySubsector: System[]
    __typename: 'Query'
}

export interface Sector {
    sectorName: Scalars['String']
    sectorX: Scalars['ID']
    sectorY: Scalars['ID']
    __typename: 'Sector'
}

export interface Star {
    diameter: Scalars['Float']
    luminosity: Scalars['Float']
    mass: Scalars['Float']
    spectralClass?: Scalars['String']
    starID: Scalars['ID']
    starName: Scalars['String']
    surfaceTemperature: Scalars['Float']
    systemID: Scalars['String']
    __typename: 'Star'
}

export interface Subsector {
    subsectorName: Scalars['String']
    subsectorX: Scalars['ID']
    subsectorY: Scalars['ID']
    __typename: 'Subsector'
}

export interface System {
    barycenter?: Scalars['Float']
    binaryAverageDistance?: Scalars['Float']
    binaryEccentricity?: Scalars['Float']
    binaryMaximumDistance?: Scalars['Float']
    binaryMinimumDistance?: Scalars['Float']
    forbiddenZoneInner?: Scalars['Float']
    forbiddenZoneOuter?: Scalars['Float']
    frostLine?: Scalars['Float']
    habitableZoneInner?: Scalars['Float']
    habitableZoneOuter?: Scalars['Float']
    innerOrbitLimit?: Scalars['Float']
    outerOrbitLimit?: Scalars['Float']
    parentSystemID?: Scalars['String']
    systemID: Scalars['ID']
    systemName: Scalars['String']
    __typename: 'System'
}

export interface GalaxyRequest{
    galaxyID?: boolean | number
    galaxyName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    createGalaxy?: [{galaxyName: Scalars['String']},GalaxyRequest]
    createOre?: [{depth: Scalars['Float'],galaxyID: Scalars['String'],oreType: Scalars['String'],parentObjectID: Scalars['String'],parentObjectType: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],size: Scalars['Float'],stripRatio: Scalars['Float'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemID: Scalars['String']},OreRequest]
    createPlanet?: [{averageOrbit: Scalars['Float'],averageTemperature: Scalars['Float'],axialTilt: Scalars['Float'],density: Scalars['Float'],eccentricity: Scalars['Float'],galaxyID: Scalars['String'],mass: Scalars['Float'],parentPlanetID?: (Scalars['String'] | null),planetName: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],radius: Scalars['Float'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],starID?: (Scalars['String'] | null),subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],surfaceArea: Scalars['Float'],systemID: Scalars['String']},PlanetRequest]
    createQuadrant?: [{galaxyID: Scalars['String'],quadrantName: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']},QuadrantRequest]
    createSector?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorName: Scalars['String'],sectorX: Scalars['Int'],sectorY: Scalars['Int']},SectorRequest]
    createStar?: [{diameter: Scalars['Float'],galaxyID: Scalars['String'],luminosity: Scalars['Float'],mass: Scalars['Float'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],spectralClass: Scalars['String'],starName: Scalars['String'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],surfaceTemperature: Scalars['Float'],systemID: Scalars['String']},StarRequest]
    createSubsector?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorName: Scalars['String'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int']},SubsectorRequest]
    createSystem?: [{barycenter?: (Scalars['Float'] | null),binaryAverageDistance?: (Scalars['Float'] | null),binaryEccentricity?: (Scalars['Float'] | null),binaryMaximumDistance?: (Scalars['Float'] | null),binaryMinimumDistance?: (Scalars['Float'] | null),forbiddenZoneInner?: (Scalars['Float'] | null),forbiddenZoneOuter?: (Scalars['Float'] | null),frostLine?: (Scalars['Float'] | null),galaxyID: Scalars['String'],habitableZoneInner?: (Scalars['Float'] | null),habitableZoneOuter?: (Scalars['Float'] | null),innerOrbitLimit?: (Scalars['Float'] | null),outerOrbitLimit?: (Scalars['Float'] | null),parentSystemID?: (Scalars['String'] | null),quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemName: Scalars['String']},SystemRequest]
    updateSystem?: [{barycenter?: (Scalars['Float'] | null),binaryAverageDistance?: (Scalars['Float'] | null),binaryEccentricity?: (Scalars['Float'] | null),binaryMaximumDistance?: (Scalars['Float'] | null),binaryMinimumDistance?: (Scalars['Float'] | null),forbiddenZoneInner?: (Scalars['Float'] | null),forbiddenZoneOuter?: (Scalars['Float'] | null),frostLine?: (Scalars['Float'] | null),galaxyID: Scalars['String'],habitableZoneInner?: (Scalars['Float'] | null),habitableZoneOuter?: (Scalars['Float'] | null),innerOrbitLimit?: (Scalars['Float'] | null),outerOrbitLimit?: (Scalars['Float'] | null),systemID: Scalars['String'],systemName: Scalars['String']},SystemRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface OreRequest{
    depth?: boolean | number
    oreID?: boolean | number
    oreType?: boolean | number
    parentObjectID?: boolean | number
    parentObjectType?: boolean | number
    size?: boolean | number
    stripRatio?: boolean | number
    systemID?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PlanetRequest{
    averageOrbit?: boolean | number
    averageTemperature?: boolean | number
    axialTilt?: boolean | number
    density?: boolean | number
    eccentricity?: boolean | number
    mass?: boolean | number
    parentPlanetID?: boolean | number
    planetID?: boolean | number
    planetName?: boolean | number
    radius?: boolean | number
    starID?: boolean | number
    surfaceArea?: boolean | number
    systemID?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QuadrantRequest{
    quadrantName?: boolean | number
    quadrantX?: boolean | number
    quadrantY?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    galaxies?: GalaxyRequest
    ores?: [{galaxyID: Scalars['String']},OreRequest]
    oresByQuadrant?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']},OreRequest]
    oresBySector?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int']},OreRequest]
    oresBySubsector?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int']},OreRequest]
    oresBySystem?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemID: Scalars['String']},OreRequest]
    planets?: [{galaxyID: Scalars['String']},PlanetRequest]
    planetsByQuadrant?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']},PlanetRequest]
    planetsBySector?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int']},PlanetRequest]
    planetsByStar?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],starID: Scalars['String'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemID: Scalars['String']},PlanetRequest]
    planetsBySubsector?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int']},PlanetRequest]
    planetsBySystem?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemID: Scalars['String']},PlanetRequest]
    quadrants?: [{galaxyID: Scalars['String']},QuadrantRequest]
    sectors?: [{galaxyID: Scalars['String']},SectorRequest]
    sectorsByQuadrant?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']},SectorRequest]
    stars?: [{galaxyID: Scalars['String']},StarRequest]
    starsByQuadrant?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']},StarRequest]
    starsBySector?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int']},StarRequest]
    starsBySubsector?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int']},StarRequest]
    starsBySystem?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemID: Scalars['String']},StarRequest]
    subsectors?: [{galaxyID: Scalars['String']},SubsectorRequest]
    subsectorsByQuadrant?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']},SubsectorRequest]
    subsectorsBySector?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int']},SubsectorRequest]
    systems?: [{galaxyID: Scalars['String']},SystemRequest]
    systemsByQuadrant?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']},SystemRequest]
    systemsBySector?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int']},SystemRequest]
    systemsBySubsector?: [{galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int']},SystemRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SectorRequest{
    sectorName?: boolean | number
    sectorX?: boolean | number
    sectorY?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface StarRequest{
    diameter?: boolean | number
    luminosity?: boolean | number
    mass?: boolean | number
    spectralClass?: boolean | number
    starID?: boolean | number
    starName?: boolean | number
    surfaceTemperature?: boolean | number
    systemID?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SubsectorRequest{
    subsectorName?: boolean | number
    subsectorX?: boolean | number
    subsectorY?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface SystemRequest{
    barycenter?: boolean | number
    binaryAverageDistance?: boolean | number
    binaryEccentricity?: boolean | number
    binaryMaximumDistance?: boolean | number
    binaryMinimumDistance?: boolean | number
    forbiddenZoneInner?: boolean | number
    forbiddenZoneOuter?: boolean | number
    frostLine?: boolean | number
    habitableZoneInner?: boolean | number
    habitableZoneOuter?: boolean | number
    innerOrbitLimit?: boolean | number
    outerOrbitLimit?: boolean | number
    parentSystemID?: boolean | number
    systemID?: boolean | number
    systemName?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


const Galaxy_possibleTypes: string[] = ['Galaxy']
export const isGalaxy = (obj?: { __typename?: any } | null): obj is Galaxy => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isGalaxy"')
  return Galaxy_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes: string[] = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Ore_possibleTypes: string[] = ['Ore']
export const isOre = (obj?: { __typename?: any } | null): obj is Ore => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isOre"')
  return Ore_possibleTypes.includes(obj.__typename)
}



const Planet_possibleTypes: string[] = ['Planet']
export const isPlanet = (obj?: { __typename?: any } | null): obj is Planet => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPlanet"')
  return Planet_possibleTypes.includes(obj.__typename)
}



const Quadrant_possibleTypes: string[] = ['Quadrant']
export const isQuadrant = (obj?: { __typename?: any } | null): obj is Quadrant => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuadrant"')
  return Quadrant_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes: string[] = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const Sector_possibleTypes: string[] = ['Sector']
export const isSector = (obj?: { __typename?: any } | null): obj is Sector => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSector"')
  return Sector_possibleTypes.includes(obj.__typename)
}



const Star_possibleTypes: string[] = ['Star']
export const isStar = (obj?: { __typename?: any } | null): obj is Star => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isStar"')
  return Star_possibleTypes.includes(obj.__typename)
}



const Subsector_possibleTypes: string[] = ['Subsector']
export const isSubsector = (obj?: { __typename?: any } | null): obj is Subsector => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSubsector"')
  return Subsector_possibleTypes.includes(obj.__typename)
}



const System_possibleTypes: string[] = ['System']
export const isSystem = (obj?: { __typename?: any } | null): obj is System => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isSystem"')
  return System_possibleTypes.includes(obj.__typename)
}


export interface GalaxyPromiseChain{
    galaxyID: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    galaxyName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface GalaxyObservableChain{
    galaxyID: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    galaxyName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface MutationPromiseChain{
    createGalaxy: ((args: {galaxyName: Scalars['String']}) => GalaxyPromiseChain & {get: <R extends GalaxyRequest>(request: R, defaultValue?: FieldsSelection<Galaxy, R>) => Promise<FieldsSelection<Galaxy, R>>}),
    createOre: ((args: {depth: Scalars['Float'],galaxyID: Scalars['String'],oreType: Scalars['String'],parentObjectID: Scalars['String'],parentObjectType: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],size: Scalars['Float'],stripRatio: Scalars['Float'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemID: Scalars['String']}) => OrePromiseChain & {get: <R extends OreRequest>(request: R, defaultValue?: FieldsSelection<Ore, R>) => Promise<FieldsSelection<Ore, R>>}),
    createPlanet: ((args: {averageOrbit: Scalars['Float'],averageTemperature: Scalars['Float'],axialTilt: Scalars['Float'],density: Scalars['Float'],eccentricity: Scalars['Float'],galaxyID: Scalars['String'],mass: Scalars['Float'],parentPlanetID?: (Scalars['String'] | null),planetName: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],radius: Scalars['Float'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],starID?: (Scalars['String'] | null),subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],surfaceArea: Scalars['Float'],systemID: Scalars['String']}) => PlanetPromiseChain & {get: <R extends PlanetRequest>(request: R, defaultValue?: FieldsSelection<Planet, R>) => Promise<FieldsSelection<Planet, R>>}),
    createQuadrant: ((args: {galaxyID: Scalars['String'],quadrantName: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']}) => QuadrantPromiseChain & {get: <R extends QuadrantRequest>(request: R, defaultValue?: FieldsSelection<Quadrant, R>) => Promise<FieldsSelection<Quadrant, R>>}),
    createSector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorName: Scalars['String'],sectorX: Scalars['Int'],sectorY: Scalars['Int']}) => SectorPromiseChain & {get: <R extends SectorRequest>(request: R, defaultValue?: FieldsSelection<Sector, R>) => Promise<FieldsSelection<Sector, R>>}),
    createStar: ((args: {diameter: Scalars['Float'],galaxyID: Scalars['String'],luminosity: Scalars['Float'],mass: Scalars['Float'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],spectralClass: Scalars['String'],starName: Scalars['String'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],surfaceTemperature: Scalars['Float'],systemID: Scalars['String']}) => StarPromiseChain & {get: <R extends StarRequest>(request: R, defaultValue?: FieldsSelection<Star, R>) => Promise<FieldsSelection<Star, R>>}),
    createSubsector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorName: Scalars['String'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int']}) => SubsectorPromiseChain & {get: <R extends SubsectorRequest>(request: R, defaultValue?: FieldsSelection<Subsector, R>) => Promise<FieldsSelection<Subsector, R>>}),
    createSystem: ((args: {barycenter?: (Scalars['Float'] | null),binaryAverageDistance?: (Scalars['Float'] | null),binaryEccentricity?: (Scalars['Float'] | null),binaryMaximumDistance?: (Scalars['Float'] | null),binaryMinimumDistance?: (Scalars['Float'] | null),forbiddenZoneInner?: (Scalars['Float'] | null),forbiddenZoneOuter?: (Scalars['Float'] | null),frostLine?: (Scalars['Float'] | null),galaxyID: Scalars['String'],habitableZoneInner?: (Scalars['Float'] | null),habitableZoneOuter?: (Scalars['Float'] | null),innerOrbitLimit?: (Scalars['Float'] | null),outerOrbitLimit?: (Scalars['Float'] | null),parentSystemID?: (Scalars['String'] | null),quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemName: Scalars['String']}) => SystemPromiseChain & {get: <R extends SystemRequest>(request: R, defaultValue?: FieldsSelection<System, R>) => Promise<FieldsSelection<System, R>>}),
    updateSystem: ((args: {barycenter?: (Scalars['Float'] | null),binaryAverageDistance?: (Scalars['Float'] | null),binaryEccentricity?: (Scalars['Float'] | null),binaryMaximumDistance?: (Scalars['Float'] | null),binaryMinimumDistance?: (Scalars['Float'] | null),forbiddenZoneInner?: (Scalars['Float'] | null),forbiddenZoneOuter?: (Scalars['Float'] | null),frostLine?: (Scalars['Float'] | null),galaxyID: Scalars['String'],habitableZoneInner?: (Scalars['Float'] | null),habitableZoneOuter?: (Scalars['Float'] | null),innerOrbitLimit?: (Scalars['Float'] | null),outerOrbitLimit?: (Scalars['Float'] | null),systemID: Scalars['String'],systemName: Scalars['String']}) => SystemPromiseChain & {get: <R extends SystemRequest>(request: R, defaultValue?: FieldsSelection<System, R>) => Promise<FieldsSelection<System, R>>})
}

export interface MutationObservableChain{
    createGalaxy: ((args: {galaxyName: Scalars['String']}) => GalaxyObservableChain & {get: <R extends GalaxyRequest>(request: R, defaultValue?: FieldsSelection<Galaxy, R>) => Observable<FieldsSelection<Galaxy, R>>}),
    createOre: ((args: {depth: Scalars['Float'],galaxyID: Scalars['String'],oreType: Scalars['String'],parentObjectID: Scalars['String'],parentObjectType: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],size: Scalars['Float'],stripRatio: Scalars['Float'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemID: Scalars['String']}) => OreObservableChain & {get: <R extends OreRequest>(request: R, defaultValue?: FieldsSelection<Ore, R>) => Observable<FieldsSelection<Ore, R>>}),
    createPlanet: ((args: {averageOrbit: Scalars['Float'],averageTemperature: Scalars['Float'],axialTilt: Scalars['Float'],density: Scalars['Float'],eccentricity: Scalars['Float'],galaxyID: Scalars['String'],mass: Scalars['Float'],parentPlanetID?: (Scalars['String'] | null),planetName: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],radius: Scalars['Float'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],starID?: (Scalars['String'] | null),subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],surfaceArea: Scalars['Float'],systemID: Scalars['String']}) => PlanetObservableChain & {get: <R extends PlanetRequest>(request: R, defaultValue?: FieldsSelection<Planet, R>) => Observable<FieldsSelection<Planet, R>>}),
    createQuadrant: ((args: {galaxyID: Scalars['String'],quadrantName: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']}) => QuadrantObservableChain & {get: <R extends QuadrantRequest>(request: R, defaultValue?: FieldsSelection<Quadrant, R>) => Observable<FieldsSelection<Quadrant, R>>}),
    createSector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorName: Scalars['String'],sectorX: Scalars['Int'],sectorY: Scalars['Int']}) => SectorObservableChain & {get: <R extends SectorRequest>(request: R, defaultValue?: FieldsSelection<Sector, R>) => Observable<FieldsSelection<Sector, R>>}),
    createStar: ((args: {diameter: Scalars['Float'],galaxyID: Scalars['String'],luminosity: Scalars['Float'],mass: Scalars['Float'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],spectralClass: Scalars['String'],starName: Scalars['String'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],surfaceTemperature: Scalars['Float'],systemID: Scalars['String']}) => StarObservableChain & {get: <R extends StarRequest>(request: R, defaultValue?: FieldsSelection<Star, R>) => Observable<FieldsSelection<Star, R>>}),
    createSubsector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorName: Scalars['String'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int']}) => SubsectorObservableChain & {get: <R extends SubsectorRequest>(request: R, defaultValue?: FieldsSelection<Subsector, R>) => Observable<FieldsSelection<Subsector, R>>}),
    createSystem: ((args: {barycenter?: (Scalars['Float'] | null),binaryAverageDistance?: (Scalars['Float'] | null),binaryEccentricity?: (Scalars['Float'] | null),binaryMaximumDistance?: (Scalars['Float'] | null),binaryMinimumDistance?: (Scalars['Float'] | null),forbiddenZoneInner?: (Scalars['Float'] | null),forbiddenZoneOuter?: (Scalars['Float'] | null),frostLine?: (Scalars['Float'] | null),galaxyID: Scalars['String'],habitableZoneInner?: (Scalars['Float'] | null),habitableZoneOuter?: (Scalars['Float'] | null),innerOrbitLimit?: (Scalars['Float'] | null),outerOrbitLimit?: (Scalars['Float'] | null),parentSystemID?: (Scalars['String'] | null),quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemName: Scalars['String']}) => SystemObservableChain & {get: <R extends SystemRequest>(request: R, defaultValue?: FieldsSelection<System, R>) => Observable<FieldsSelection<System, R>>}),
    updateSystem: ((args: {barycenter?: (Scalars['Float'] | null),binaryAverageDistance?: (Scalars['Float'] | null),binaryEccentricity?: (Scalars['Float'] | null),binaryMaximumDistance?: (Scalars['Float'] | null),binaryMinimumDistance?: (Scalars['Float'] | null),forbiddenZoneInner?: (Scalars['Float'] | null),forbiddenZoneOuter?: (Scalars['Float'] | null),frostLine?: (Scalars['Float'] | null),galaxyID: Scalars['String'],habitableZoneInner?: (Scalars['Float'] | null),habitableZoneOuter?: (Scalars['Float'] | null),innerOrbitLimit?: (Scalars['Float'] | null),outerOrbitLimit?: (Scalars['Float'] | null),systemID: Scalars['String'],systemName: Scalars['String']}) => SystemObservableChain & {get: <R extends SystemRequest>(request: R, defaultValue?: FieldsSelection<System, R>) => Observable<FieldsSelection<System, R>>})
}

export interface OrePromiseChain{
    depth: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    oreID: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    oreType: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentObjectID: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    parentObjectType: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    size: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    stripRatio: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    systemID: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface OreObservableChain{
    depth: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    oreID: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    oreType: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentObjectID: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    parentObjectType: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    size: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    stripRatio: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    systemID: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface PlanetPromiseChain{
    averageOrbit: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    averageTemperature: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    axialTilt: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    density: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    eccentricity: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    mass: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    parentPlanetID: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    planetID: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    planetName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    radius: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    starID: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    surfaceArea: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    systemID: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface PlanetObservableChain{
    averageOrbit: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    averageTemperature: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    axialTilt: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    density: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    eccentricity: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    mass: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    parentPlanetID: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    planetID: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    planetName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    radius: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    starID: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    surfaceArea: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    systemID: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface QuadrantPromiseChain{
    quadrantName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    quadrantX: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    quadrantY: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface QuadrantObservableChain{
    quadrantName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    quadrantX: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    quadrantY: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface QueryPromiseChain{
    galaxies: ({get: <R extends GalaxyRequest>(request: R, defaultValue?: FieldsSelection<Galaxy, R>[]) => Promise<FieldsSelection<Galaxy, R>[]>}),
    ores: ((args: {galaxyID: Scalars['String']}) => {get: <R extends OreRequest>(request: R, defaultValue?: FieldsSelection<Ore, R>[]) => Promise<FieldsSelection<Ore, R>[]>}),
    oresByQuadrant: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']}) => {get: <R extends OreRequest>(request: R, defaultValue?: FieldsSelection<Ore, R>[]) => Promise<FieldsSelection<Ore, R>[]>}),
    oresBySector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int']}) => {get: <R extends OreRequest>(request: R, defaultValue?: FieldsSelection<Ore, R>[]) => Promise<FieldsSelection<Ore, R>[]>}),
    oresBySubsector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int']}) => {get: <R extends OreRequest>(request: R, defaultValue?: FieldsSelection<Ore, R>[]) => Promise<FieldsSelection<Ore, R>[]>}),
    oresBySystem: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemID: Scalars['String']}) => {get: <R extends OreRequest>(request: R, defaultValue?: FieldsSelection<Ore, R>[]) => Promise<FieldsSelection<Ore, R>[]>}),
    planets: ((args: {galaxyID: Scalars['String']}) => {get: <R extends PlanetRequest>(request: R, defaultValue?: FieldsSelection<Planet, R>[]) => Promise<FieldsSelection<Planet, R>[]>}),
    planetsByQuadrant: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']}) => {get: <R extends PlanetRequest>(request: R, defaultValue?: FieldsSelection<Planet, R>[]) => Promise<FieldsSelection<Planet, R>[]>}),
    planetsBySector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int']}) => {get: <R extends PlanetRequest>(request: R, defaultValue?: FieldsSelection<Planet, R>[]) => Promise<FieldsSelection<Planet, R>[]>}),
    planetsByStar: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],starID: Scalars['String'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemID: Scalars['String']}) => {get: <R extends PlanetRequest>(request: R, defaultValue?: FieldsSelection<Planet, R>[]) => Promise<FieldsSelection<Planet, R>[]>}),
    planetsBySubsector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int']}) => {get: <R extends PlanetRequest>(request: R, defaultValue?: FieldsSelection<Planet, R>[]) => Promise<FieldsSelection<Planet, R>[]>}),
    planetsBySystem: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemID: Scalars['String']}) => {get: <R extends PlanetRequest>(request: R, defaultValue?: FieldsSelection<Planet, R>[]) => Promise<FieldsSelection<Planet, R>[]>}),
    quadrants: ((args: {galaxyID: Scalars['String']}) => {get: <R extends QuadrantRequest>(request: R, defaultValue?: FieldsSelection<Quadrant, R>[]) => Promise<FieldsSelection<Quadrant, R>[]>}),
    sectors: ((args: {galaxyID: Scalars['String']}) => {get: <R extends SectorRequest>(request: R, defaultValue?: FieldsSelection<Sector, R>[]) => Promise<FieldsSelection<Sector, R>[]>}),
    sectorsByQuadrant: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']}) => {get: <R extends SectorRequest>(request: R, defaultValue?: FieldsSelection<Sector, R>[]) => Promise<FieldsSelection<Sector, R>[]>}),
    stars: ((args: {galaxyID: Scalars['String']}) => {get: <R extends StarRequest>(request: R, defaultValue?: FieldsSelection<Star, R>[]) => Promise<FieldsSelection<Star, R>[]>}),
    starsByQuadrant: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']}) => {get: <R extends StarRequest>(request: R, defaultValue?: FieldsSelection<Star, R>[]) => Promise<FieldsSelection<Star, R>[]>}),
    starsBySector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int']}) => {get: <R extends StarRequest>(request: R, defaultValue?: FieldsSelection<Star, R>[]) => Promise<FieldsSelection<Star, R>[]>}),
    starsBySubsector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int']}) => {get: <R extends StarRequest>(request: R, defaultValue?: FieldsSelection<Star, R>[]) => Promise<FieldsSelection<Star, R>[]>}),
    starsBySystem: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemID: Scalars['String']}) => {get: <R extends StarRequest>(request: R, defaultValue?: FieldsSelection<Star, R>[]) => Promise<FieldsSelection<Star, R>[]>}),
    subsectors: ((args: {galaxyID: Scalars['String']}) => {get: <R extends SubsectorRequest>(request: R, defaultValue?: FieldsSelection<Subsector, R>[]) => Promise<FieldsSelection<Subsector, R>[]>}),
    subsectorsByQuadrant: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']}) => {get: <R extends SubsectorRequest>(request: R, defaultValue?: FieldsSelection<Subsector, R>[]) => Promise<FieldsSelection<Subsector, R>[]>}),
    subsectorsBySector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int']}) => {get: <R extends SubsectorRequest>(request: R, defaultValue?: FieldsSelection<Subsector, R>[]) => Promise<FieldsSelection<Subsector, R>[]>}),
    systems: ((args: {galaxyID: Scalars['String']}) => {get: <R extends SystemRequest>(request: R, defaultValue?: FieldsSelection<System, R>[]) => Promise<FieldsSelection<System, R>[]>}),
    systemsByQuadrant: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']}) => {get: <R extends SystemRequest>(request: R, defaultValue?: FieldsSelection<System, R>[]) => Promise<FieldsSelection<System, R>[]>}),
    systemsBySector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int']}) => {get: <R extends SystemRequest>(request: R, defaultValue?: FieldsSelection<System, R>[]) => Promise<FieldsSelection<System, R>[]>}),
    systemsBySubsector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int']}) => {get: <R extends SystemRequest>(request: R, defaultValue?: FieldsSelection<System, R>[]) => Promise<FieldsSelection<System, R>[]>})
}

export interface QueryObservableChain{
    galaxies: ({get: <R extends GalaxyRequest>(request: R, defaultValue?: FieldsSelection<Galaxy, R>[]) => Observable<FieldsSelection<Galaxy, R>[]>}),
    ores: ((args: {galaxyID: Scalars['String']}) => {get: <R extends OreRequest>(request: R, defaultValue?: FieldsSelection<Ore, R>[]) => Observable<FieldsSelection<Ore, R>[]>}),
    oresByQuadrant: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']}) => {get: <R extends OreRequest>(request: R, defaultValue?: FieldsSelection<Ore, R>[]) => Observable<FieldsSelection<Ore, R>[]>}),
    oresBySector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int']}) => {get: <R extends OreRequest>(request: R, defaultValue?: FieldsSelection<Ore, R>[]) => Observable<FieldsSelection<Ore, R>[]>}),
    oresBySubsector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int']}) => {get: <R extends OreRequest>(request: R, defaultValue?: FieldsSelection<Ore, R>[]) => Observable<FieldsSelection<Ore, R>[]>}),
    oresBySystem: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemID: Scalars['String']}) => {get: <R extends OreRequest>(request: R, defaultValue?: FieldsSelection<Ore, R>[]) => Observable<FieldsSelection<Ore, R>[]>}),
    planets: ((args: {galaxyID: Scalars['String']}) => {get: <R extends PlanetRequest>(request: R, defaultValue?: FieldsSelection<Planet, R>[]) => Observable<FieldsSelection<Planet, R>[]>}),
    planetsByQuadrant: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']}) => {get: <R extends PlanetRequest>(request: R, defaultValue?: FieldsSelection<Planet, R>[]) => Observable<FieldsSelection<Planet, R>[]>}),
    planetsBySector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int']}) => {get: <R extends PlanetRequest>(request: R, defaultValue?: FieldsSelection<Planet, R>[]) => Observable<FieldsSelection<Planet, R>[]>}),
    planetsByStar: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],starID: Scalars['String'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemID: Scalars['String']}) => {get: <R extends PlanetRequest>(request: R, defaultValue?: FieldsSelection<Planet, R>[]) => Observable<FieldsSelection<Planet, R>[]>}),
    planetsBySubsector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int']}) => {get: <R extends PlanetRequest>(request: R, defaultValue?: FieldsSelection<Planet, R>[]) => Observable<FieldsSelection<Planet, R>[]>}),
    planetsBySystem: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemID: Scalars['String']}) => {get: <R extends PlanetRequest>(request: R, defaultValue?: FieldsSelection<Planet, R>[]) => Observable<FieldsSelection<Planet, R>[]>}),
    quadrants: ((args: {galaxyID: Scalars['String']}) => {get: <R extends QuadrantRequest>(request: R, defaultValue?: FieldsSelection<Quadrant, R>[]) => Observable<FieldsSelection<Quadrant, R>[]>}),
    sectors: ((args: {galaxyID: Scalars['String']}) => {get: <R extends SectorRequest>(request: R, defaultValue?: FieldsSelection<Sector, R>[]) => Observable<FieldsSelection<Sector, R>[]>}),
    sectorsByQuadrant: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']}) => {get: <R extends SectorRequest>(request: R, defaultValue?: FieldsSelection<Sector, R>[]) => Observable<FieldsSelection<Sector, R>[]>}),
    stars: ((args: {galaxyID: Scalars['String']}) => {get: <R extends StarRequest>(request: R, defaultValue?: FieldsSelection<Star, R>[]) => Observable<FieldsSelection<Star, R>[]>}),
    starsByQuadrant: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']}) => {get: <R extends StarRequest>(request: R, defaultValue?: FieldsSelection<Star, R>[]) => Observable<FieldsSelection<Star, R>[]>}),
    starsBySector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int']}) => {get: <R extends StarRequest>(request: R, defaultValue?: FieldsSelection<Star, R>[]) => Observable<FieldsSelection<Star, R>[]>}),
    starsBySubsector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int']}) => {get: <R extends StarRequest>(request: R, defaultValue?: FieldsSelection<Star, R>[]) => Observable<FieldsSelection<Star, R>[]>}),
    starsBySystem: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int'],systemID: Scalars['String']}) => {get: <R extends StarRequest>(request: R, defaultValue?: FieldsSelection<Star, R>[]) => Observable<FieldsSelection<Star, R>[]>}),
    subsectors: ((args: {galaxyID: Scalars['String']}) => {get: <R extends SubsectorRequest>(request: R, defaultValue?: FieldsSelection<Subsector, R>[]) => Observable<FieldsSelection<Subsector, R>[]>}),
    subsectorsByQuadrant: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']}) => {get: <R extends SubsectorRequest>(request: R, defaultValue?: FieldsSelection<Subsector, R>[]) => Observable<FieldsSelection<Subsector, R>[]>}),
    subsectorsBySector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int']}) => {get: <R extends SubsectorRequest>(request: R, defaultValue?: FieldsSelection<Subsector, R>[]) => Observable<FieldsSelection<Subsector, R>[]>}),
    systems: ((args: {galaxyID: Scalars['String']}) => {get: <R extends SystemRequest>(request: R, defaultValue?: FieldsSelection<System, R>[]) => Observable<FieldsSelection<System, R>[]>}),
    systemsByQuadrant: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int']}) => {get: <R extends SystemRequest>(request: R, defaultValue?: FieldsSelection<System, R>[]) => Observable<FieldsSelection<System, R>[]>}),
    systemsBySector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int']}) => {get: <R extends SystemRequest>(request: R, defaultValue?: FieldsSelection<System, R>[]) => Observable<FieldsSelection<System, R>[]>}),
    systemsBySubsector: ((args: {galaxyID: Scalars['String'],quadrantX: Scalars['Int'],quadrantY: Scalars['Int'],sectorX: Scalars['Int'],sectorY: Scalars['Int'],subsectorX: Scalars['Int'],subsectorY: Scalars['Int']}) => {get: <R extends SystemRequest>(request: R, defaultValue?: FieldsSelection<System, R>[]) => Observable<FieldsSelection<System, R>[]>})
}

export interface SectorPromiseChain{
    sectorName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    sectorX: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    sectorY: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface SectorObservableChain{
    sectorName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    sectorX: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    sectorY: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface StarPromiseChain{
    diameter: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    luminosity: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    mass: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    spectralClass: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    starID: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    starName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    surfaceTemperature: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    systemID: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface StarObservableChain{
    diameter: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    luminosity: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    mass: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    spectralClass: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    starID: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    starName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    surfaceTemperature: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    systemID: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface SubsectorPromiseChain{
    subsectorName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    subsectorX: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    subsectorY: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>})
}

export interface SubsectorObservableChain{
    subsectorName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    subsectorX: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    subsectorY: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>})
}

export interface SystemPromiseChain{
    barycenter: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)>}),
    binaryAverageDistance: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)>}),
    binaryEccentricity: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)>}),
    binaryMaximumDistance: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)>}),
    binaryMinimumDistance: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)>}),
    forbiddenZoneInner: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)>}),
    forbiddenZoneOuter: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)>}),
    frostLine: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)>}),
    habitableZoneInner: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)>}),
    habitableZoneOuter: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)>}),
    innerOrbitLimit: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)>}),
    outerOrbitLimit: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Promise<(Scalars['Float'] | undefined)>}),
    parentSystemID: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    systemID: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Promise<Scalars['ID']>}),
    systemName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface SystemObservableChain{
    barycenter: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)>}),
    binaryAverageDistance: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)>}),
    binaryEccentricity: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)>}),
    binaryMaximumDistance: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)>}),
    binaryMinimumDistance: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)>}),
    forbiddenZoneInner: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)>}),
    forbiddenZoneOuter: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)>}),
    frostLine: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)>}),
    habitableZoneInner: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)>}),
    habitableZoneOuter: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)>}),
    innerOrbitLimit: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)>}),
    outerOrbitLimit: ({get: (request?: boolean|number, defaultValue?: (Scalars['Float'] | undefined)) => Observable<(Scalars['Float'] | undefined)>}),
    parentSystemID: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    systemID: ({get: (request?: boolean|number, defaultValue?: Scalars['ID']) => Observable<Scalars['ID']>}),
    systemName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}