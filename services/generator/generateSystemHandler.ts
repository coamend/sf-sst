import { SQSEvent, SQSRecord } from "aws-lambda";
import { Client, createClient, System, Star, Planet } from "../../graphql/genql";
import { generateSystem, saveStar, saveSystem } from "./generateSystem";
import { generateStar } from "./generateStar";
import { generateName } from "./generateName";
import { generatePlanets, savePlanet } from "./generatePlanets";
import { generateMoons } from "./generateMoons";

export async function main(event: SQSEvent) {
    const batchItemFailures = new Array;

    await Promise.allSettled(
        event.Records.map(async (record: SQSRecord) => {
        const body = record.body;
        try {
            processMessage(body);
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

async function processMessage(message) {
    let client: Client;

    try{
        client = createClient({ url: process.env.GRAPHQL_URL });
    }
    catch (e) {
        console.log("Failed to connect to graphQL API: %s, %j", process.env.GRAPHQL_URL, e);
        //mark all messages as failed to process
        throw(e);
    }

    let systems = new Array<System>;
    let stars = new Array<Star>;
    let planets = new Array<Planet>;
    let moons = new Array<Planet>;
    let systemName = generateName();
    
    try{
        if(Math.random() <= Number(process.env.MULTI_STAR_SYSTEM_PROBABILITY))
        {
            //Multi-star system
            let numStars: number = 2;

            if(Math.random() <= Number(process.env.MULTI_STAR_SYSTEM_PROBABILITY))
            {
                //Trinary system
                numStars = 3;            

                if(Math.random() <= Number(process.env.MULTI_STAR_SYSTEM_PROBABILITY))
                {
                    //Quad system
                    numStars = 4;
                }
            }

            if(numStars == 2){
                let star1 = await generateStar(systemName + ' A');
                let star2 = await generateStar(systemName + ' B');

                let parentSystem = await generateSystem(systemName + ' AB', star1, star2);
                systems.push(parentSystem);

                let system1 = await generateSystem(systemName + ' A', star1, undefined, undefined, undefined, parentSystem.systemID);
                systems.push(system1);
                star1.systemID = system1.systemID;

                let system2 = await generateSystem(systemName + ' B', star2, undefined, undefined, undefined, parentSystem.systemID);
                systems.push(system2);
                star2.systemID = system2.systemID;

                stars.push(star1);
                stars.push(star2);
            }
            else if (numStars == 3){
                let star1 = await generateStar(systemName + ' A');
                let star2 = await generateStar(systemName + ' B');
                let star3 = await generateStar(systemName + ' C');

                let multiParentSystem = await generateSystem(systemName + ' ABC', star1, star2, star3);
                systems.push(multiParentSystem);
                
                let parentSystem = await generateSystem(systemName + ' AB', star1, star2, undefined, undefined, multiParentSystem.systemID);
                systems.push(parentSystem);

                let system1 = await generateSystem(systemName + ' A', star1, undefined, undefined, undefined, parentSystem.systemID);
                systems.push(system1);                
                star1.systemID = system1.systemID;

                let system2 = await generateSystem(systemName + ' B', star2, undefined, undefined, undefined, parentSystem.systemID);
                systems.push(system2);
                star2.systemID = system2.systemID;
                
                let system3 = await generateSystem(systemName + ' C', star3, undefined, undefined, undefined, multiParentSystem.systemID);
                systems.push(system3);                
                star3.systemID = system3.systemID;

                stars.push(star1);
                stars.push(star2);
                stars.push(star3);
            }
            else if (numStars == 4){
                let star1 = await generateStar(systemName + ' A');
                let star2 = await generateStar(systemName + ' B');
                let star3 = await generateStar(systemName + ' C');
                let star4 = await generateStar(systemName + ' D');

                let multiParentSystem = await generateSystem(systemName + ' ABCD', star1, star2, star3, star4);
                systems.push(multiParentSystem);
                
                let parentSystem = await generateSystem(systemName + ' AB', star1, star2, undefined, undefined, multiParentSystem.systemID);
                systems.push(parentSystem);

                let system1 = await generateSystem(systemName + ' A', star1, undefined, undefined, undefined, parentSystem.systemID);
                systems.push(system1);                
                star1.systemID = system1.systemID;

                let system2 = await generateSystem(systemName + ' B', star2, undefined, undefined, undefined, parentSystem.systemID);
                systems.push(system2);
                star2.systemID = system2.systemID;

                let secondParentSystem = await generateSystem(systemName + ' CD', star3, star4, undefined, undefined, multiParentSystem.systemID);
                systems.push(secondParentSystem);

                let system3 = await generateSystem(systemName + ' C', star3, undefined, undefined, undefined, parentSystem.systemID);
                systems.push(system3);                
                star3.systemID = system3.systemID;

                let system4 = await generateSystem(systemName + ' D', star4, undefined, undefined, undefined, parentSystem.systemID);
                systems.push(system4);                
                star4.systemID = system4.systemID;

                stars.push(star1);
                stars.push(star2);
                stars.push(star3);
                stars.push(star4);
            }
        }
        else{
            //Create the system
            let star = await generateStar(systemName);
            systems.push(await generateSystem(systemName, star));
        }

        for(let system of systems) {
            //TODO: Need to make sure that creation checks to make sure it doesn't already exist
            await saveSystem(client, message, system);
            let newPlanets = await generatePlanets(system);

            for(let planet of newPlanets) {
                planets = planets.concat(await generateMoons(system, planet));
            }

            planets = planets.concat(newPlanets);
            
            //Generate ores 
        }

        for(let star of stars) {
            await saveStar(client, message, star);
        }

        for(let planet of planets) {
            await savePlanet(client, message, planet);
        }
    }
    catch (e) {
        console.log("Failed to generate system: %j", message );
        //mark as failed to process, clean up
        throw(e);
    }
}