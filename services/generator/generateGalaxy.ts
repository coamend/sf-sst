import { createClient } from "../../graphql/genql";
import { intToRomanNumeral } from "./intToRomanNumeral";
import { generateName, generateGreekPlusNumber } from "./generateName";
import { publishStatusMessage } from './publishStatusMessage';
import { galaxyGenerationStatusMessage } from "./galaxyGenerationStatusMessage";
import { SQS } from "aws-sdk";

export interface galaxyGenerationOpts {
    galaxyName: string, 
    quadrantSizeX?: number,
    quadrantSizeY?: number,
    sectorSizeX?: number,
    sectorSizeY?: number,
    subsectorSizeX?: number,
    subsectorSizeY?: number,
    systemFrequency?: number,
}
   
export async function main(
    params: galaxyGenerationOpts
) {
    params.quadrantSizeX = params.quadrantSizeX ?? 2;
    params.quadrantSizeY = params.quadrantSizeY ?? 2;
    params.sectorSizeX = params.sectorSizeX ?? 2;
    params.sectorSizeY = params.sectorSizeY ?? 2;
    params.subsectorSizeX = params.subsectorSizeX ?? 2;
    params.subsectorSizeY = params.subsectorSizeY ?? 2;
    params.systemFrequency = params.systemFrequency ?? 0.08;

    let client = createClient({ url: process.env.GRAPHQL_URL });
    let galaxyID = (await client.mutation({createGalaxy: [{ galaxyName: params.galaxyName }, { galaxyID: true }]})).createGalaxy.galaxyID;
    let systemCount = 0;

    for(let quadrantY = 1;quadrantY <= params.quadrantSizeY; quadrantY++){
        for(let quadrantX = 1;quadrantX <= params.quadrantSizeX; quadrantX++){
            let quadrantName: string = intToRomanNumeral(quadrantX + (quadrantY * params.quadrantSizeX));

            client.mutation({createQuadrant: [{ galaxyID, quadrantName, quadrantX, quadrantY },{}]});
            
            for(let sectorY = 1;sectorY <= params.sectorSizeY; sectorY++){
                for(let sectorX = 1;sectorX <= params.sectorSizeX; sectorX++){
                    let sectorName: string = generateGreekPlusNumber(sectorX, sectorY);

                    client.mutation({createSector: [{ galaxyID, quadrantX, quadrantY, sectorName, sectorX, sectorY}, {}]});

                    for(let subsectorY = 1;subsectorY <= params.subsectorSizeY; subsectorY++){
                        for(let subsectorX = 1;subsectorX <= params.subsectorSizeX; subsectorX++){
                            let subsectorName: string = generateName();

                            client.mutation({createSubsector: [{ galaxyID, quadrantX, quadrantY, sectorX, sectorY, subsectorName, subsectorX, subsectorY}, {}]});

                            if((1 - Math.random()) <= params.systemFrequency)
                            {
                                var que = new SQS({ apiVersion: '2012-11-05' });
                                que.sendMessage({
                                    DelaySeconds: 10,
                                    MessageAttributes: { },
                                    MessageBody: JSON.stringify({ 
                                        'galaxyID': galaxyID,
                                        'quadrantX': quadrantX,
                                        'quadrantY': quadrantY,
                                        'sectorX': sectorX,
                                        'sectorY': sectorY,
                                        'subsectorX': subsectorX,
                                        'subsectorY': subsectorY,
                                        'galaxyName': params.galaxyName,
                                        'quadrantName': quadrantName,
                                        'sectorName': sectorName,
                                        'subsectorName': subsectorName,
                                    }),
                                    QueueUrl: process.env.SYSTEM_GENERATION_QUEUE!,
                                }, function(err, data) {
                                    if (err) {
                                        console.log("Error while attempting to queue system generation message", err);
                                    } else {
                                        console.log("Queue System Generation Message Success", data.MessageId);
                                        systemCount++;
                                    }
                                });
                            }
                        }
                    }
                }
            }
        }
    }  
    
    let message:galaxyGenerationStatusMessage = {
        msgType: "GalaxyGeneration",
        body: {
            galaxyID: galaxyID,
            generatedSystemCount: systemCount
        }
    }
    publishStatusMessage(message);

    return galaxyID;
};