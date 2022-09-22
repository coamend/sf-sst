import { createClient } from "../../graphql/genql";
import { SQSEvent, SQSRecord } from "aws-lambda";


export async function main(event: SQSEvent) {
    const batchItemFailures = new Array;

    await Promise.allSettled(
        event.Records.map(async (record: SQSRecord) => {
        const body = record.body;
        try {
            generateSystem(body);
        }
        catch(e) {
          console.log(`Error while generating system: ${body}`);
          batchItemFailures.push({itemIdentifier: record.messageId});
        }
      })
    );

    console.log('Successfully created ' + event.Records.length.toString() + ' systems');

    return {batchItemFailures};
};

async function generateSystem(message) {
    try{
        let client = createClient({ url: process.env.GRAPHQL_URL });
    }
    catch (e) {
        console.log("Failed to connect to graphQL API: %s, %j", process.env.GRAPHQL_URL, e);
        //mark all messages as failed to process
        throw(e);
    }

    try{
        if(Math.random() <= Number(process.env.MULTI_STAR_SYSTEM_PROBABILITY))
        {
            //Multi-star system
            let primarySystemType: string;
            let secondarySystemType: string;
            let numStars: number = 2;

            if(Math.random() <= Number(process.env.P_TYPE_MULTI_SYSTEM_PROBABILITY))
            {
                primarySystemType = 'P';
            }
            else
            {
                primarySystemType = 'S';
            }

            if(Math.random() <= Number(process.env.MULTI_STAR_SYSTEM_PROBABILITY))
            {
                //Trinary system
                numStars = 3;

                if(Math.random() <= Number(process.env.MULTI_STAR_SYSTEM_PROBABILITY))
                {
                    //Quad system
                    numStars = 4;

                    if(Math.random() <= Number(process.env.P_TYPE_MULTI_SYSTEM_PROBABILITY))
                    {
                        secondarySystemType = 'P';
                    }
                    else
                    {
                        secondarySystemType = 'S';
                    }
                }
            }

            //If 2 systems, create parent system
            //Create system 1
            //Create system 1 stars
            //Create system 2
            //Create system 2 stars
            //Update parent system barycenter, distance
        }
        else
        {
            //Single star system
        }
        //Need to make sure that creation checks to make sure it doesn't already exist
        //Generate planets
        //Generate moons
        //Generate ores
    }
    catch (e) {
        console.log("Failed to generate system: %j", message );
        //mark as failed to process, clean up
        throw(e);
    }
}