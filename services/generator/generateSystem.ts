import { createClient } from "../../graphql/genql";
import { SQSEvent } from "aws-lambda";

export async function main(event: SQSEvent) {
    try{
        let client = createClient({ url: process.env.GRAPHQL_URL });
    }
    catch (e) {
        console.log("Failed to connect to graphQL API: %s, %j", process.env.GRAPHQL_URL, e);
        //mark all messages as failed to process
        throw(e);
    }

    for(const { messageId, body } of event.Records)
    {
        try{
            //Need to make sure that creation checks to make sure it doesn't already exist
            //Determine whether system is multi-star s type
            //Determine whether (sub)system is multi-star p type
            //Generate star(s)
            //Generate planets
            //Generate moons
            //Generate ores
        }
        catch (e) {
            console.log("Failed to generate system: %s %j", messageId, body )
            //mark as failed to process, clean up
            throw(e);
        }
    }
    
    return 'Successfully created ' + event.Records.length.toString() + ' systems';
};