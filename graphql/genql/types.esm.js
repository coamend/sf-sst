export default {
    "scalars": [
        1,
        2,
        4,
        5,
        14
    ],
    "types": {
        "Galaxy": {
            "galaxyID": [
                1
            ],
            "galaxyName": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ID": {},
        "String": {},
        "Mutation": {
            "createGalaxy": [
                0,
                {
                    "galaxyName": [
                        2,
                        "String!"
                    ]
                }
            ],
            "createOre": [
                6,
                {
                    "depth": [
                        4,
                        "Float!"
                    ],
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "oreType": [
                        2,
                        "String!"
                    ],
                    "parentObjectID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ],
                    "size": [
                        4,
                        "Float!"
                    ],
                    "stripRatio": [
                        4,
                        "Float!"
                    ],
                    "subsectorX": [
                        5,
                        "Int!"
                    ],
                    "subsectorY": [
                        5,
                        "Int!"
                    ],
                    "systemID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "createPlanet": [
                7,
                {
                    "averageOrbit": [
                        4,
                        "Float!"
                    ],
                    "averageTemperature": [
                        4,
                        "Float!"
                    ],
                    "axialTilt": [
                        4,
                        "Float!"
                    ],
                    "density": [
                        4,
                        "Float!"
                    ],
                    "eccentricity": [
                        4,
                        "Float!"
                    ],
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "mass": [
                        4,
                        "Float!"
                    ],
                    "parentPlanetID": [
                        2
                    ],
                    "planetName": [
                        2,
                        "String!"
                    ],
                    "planetType": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "radius": [
                        4,
                        "Float!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ],
                    "subsectorX": [
                        5,
                        "Int!"
                    ],
                    "subsectorY": [
                        5,
                        "Int!"
                    ],
                    "surfaceArea": [
                        4,
                        "Float!"
                    ],
                    "systemID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "createQuadrant": [
                8,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantName": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "createSector": [
                10,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorName": [
                        2,
                        "String!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "createStar": [
                11,
                {
                    "diameter": [
                        4,
                        "Float!"
                    ],
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "luminosity": [
                        4,
                        "Float!"
                    ],
                    "mass": [
                        4,
                        "Float!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ],
                    "spectralClass": [
                        2,
                        "String!"
                    ],
                    "starName": [
                        2,
                        "String!"
                    ],
                    "subsectorX": [
                        5,
                        "Int!"
                    ],
                    "subsectorY": [
                        5,
                        "Int!"
                    ],
                    "surfaceTemperature": [
                        4,
                        "Float!"
                    ],
                    "systemID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "createSubsector": [
                12,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ],
                    "subsectorName": [
                        2,
                        "String!"
                    ],
                    "subsectorX": [
                        5,
                        "Int!"
                    ],
                    "subsectorY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "createSystem": [
                13,
                {
                    "barycenter": [
                        4
                    ],
                    "binaryAverageDistance": [
                        4
                    ],
                    "binaryEccentricity": [
                        4
                    ],
                    "binaryMaximumDistance": [
                        4
                    ],
                    "binaryMinimumDistance": [
                        4
                    ],
                    "forbiddenZoneInner": [
                        4
                    ],
                    "forbiddenZoneOuter": [
                        4
                    ],
                    "frostLine": [
                        4
                    ],
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "habitableZoneInner": [
                        4
                    ],
                    "habitableZoneOuter": [
                        4
                    ],
                    "innerOrbitLimit": [
                        4
                    ],
                    "outerOrbitLimit": [
                        4
                    ],
                    "parentSystemID": [
                        2
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ],
                    "solarRadiusAverage": [
                        4,
                        "Float!"
                    ],
                    "solarTemperatureTotal": [
                        4,
                        "Float!"
                    ],
                    "subsectorX": [
                        5,
                        "Int!"
                    ],
                    "subsectorY": [
                        5,
                        "Int!"
                    ],
                    "systemID": [
                        2
                    ],
                    "systemName": [
                        2,
                        "String!"
                    ],
                    "systemSolarMass": [
                        4,
                        "Float!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "Float": {},
        "Int": {},
        "Ore": {
            "depth": [
                4
            ],
            "oreID": [
                1
            ],
            "oreType": [
                2
            ],
            "parentObjectID": [
                2
            ],
            "size": [
                4
            ],
            "stripRatio": [
                4
            ],
            "systemID": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Planet": {
            "averageOrbit": [
                4
            ],
            "averageTemperature": [
                4
            ],
            "axialTilt": [
                4
            ],
            "density": [
                4
            ],
            "eccentricity": [
                4
            ],
            "mass": [
                4
            ],
            "parentPlanetID": [
                2
            ],
            "planetID": [
                1
            ],
            "planetName": [
                2
            ],
            "planetType": [
                2
            ],
            "radius": [
                4
            ],
            "surfaceArea": [
                4
            ],
            "systemID": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Quadrant": {
            "quadrantName": [
                2
            ],
            "quadrantX": [
                1
            ],
            "quadrantY": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "Query": {
            "galaxies": [
                0
            ],
            "ores": [
                6,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "oresByQuadrant": [
                6,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "oresBySector": [
                6,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "oresBySubsector": [
                6,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ],
                    "subsectorX": [
                        5,
                        "Int!"
                    ],
                    "subsectorY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "oresBySystem": [
                6,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ],
                    "subsectorX": [
                        5,
                        "Int!"
                    ],
                    "subsectorY": [
                        5,
                        "Int!"
                    ],
                    "systemID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "planets": [
                7,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "planetsByQuadrant": [
                7,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "planetsBySector": [
                7,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "planetsBySubsector": [
                7,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ],
                    "subsectorX": [
                        5,
                        "Int!"
                    ],
                    "subsectorY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "planetsBySystem": [
                7,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ],
                    "subsectorX": [
                        5,
                        "Int!"
                    ],
                    "subsectorY": [
                        5,
                        "Int!"
                    ],
                    "systemID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "quadrants": [
                8,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "sectors": [
                10,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "sectorsByQuadrant": [
                10,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "stars": [
                11,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "starsByQuadrant": [
                11,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "starsBySector": [
                11,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "starsBySubsector": [
                11,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ],
                    "subsectorX": [
                        5,
                        "Int!"
                    ],
                    "subsectorY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "starsBySystem": [
                11,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ],
                    "subsectorX": [
                        5,
                        "Int!"
                    ],
                    "subsectorY": [
                        5,
                        "Int!"
                    ],
                    "systemID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "subsectors": [
                12,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "subsectorsByQuadrant": [
                12,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "subsectorsBySector": [
                12,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "systems": [
                13,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ]
                }
            ],
            "systemsByQuadrant": [
                13,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "systemsBySector": [
                13,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "systemsBySubsector": [
                13,
                {
                    "galaxyID": [
                        2,
                        "String!"
                    ],
                    "quadrantX": [
                        5,
                        "Int!"
                    ],
                    "quadrantY": [
                        5,
                        "Int!"
                    ],
                    "sectorX": [
                        5,
                        "Int!"
                    ],
                    "sectorY": [
                        5,
                        "Int!"
                    ],
                    "subsectorX": [
                        5,
                        "Int!"
                    ],
                    "subsectorY": [
                        5,
                        "Int!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "Sector": {
            "sectorName": [
                2
            ],
            "sectorX": [
                1
            ],
            "sectorY": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "Star": {
            "diameter": [
                4
            ],
            "luminosity": [
                4
            ],
            "mass": [
                4
            ],
            "spectralClass": [
                2
            ],
            "starID": [
                1
            ],
            "starName": [
                2
            ],
            "surfaceTemperature": [
                4
            ],
            "systemID": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Subsector": {
            "subsectorName": [
                2
            ],
            "subsectorX": [
                1
            ],
            "subsectorY": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "System": {
            "barycenter": [
                4
            ],
            "binaryAverageDistance": [
                4
            ],
            "binaryEccentricity": [
                4
            ],
            "binaryMaximumDistance": [
                4
            ],
            "binaryMinimumDistance": [
                4
            ],
            "forbiddenZoneInner": [
                4
            ],
            "forbiddenZoneOuter": [
                4
            ],
            "frostLine": [
                4
            ],
            "habitableZoneInner": [
                4
            ],
            "habitableZoneOuter": [
                4
            ],
            "innerOrbitLimit": [
                4
            ],
            "outerOrbitLimit": [
                4
            ],
            "parentSystemID": [
                2
            ],
            "solarRadiusAverage": [
                4
            ],
            "solarTemperatureTotal": [
                4
            ],
            "systemID": [
                1
            ],
            "systemName": [
                2
            ],
            "systemSolarMass": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "Boolean": {}
    }
}