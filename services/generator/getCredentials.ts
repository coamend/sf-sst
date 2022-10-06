import {CargoplaneCloud, CargoplaneCredentialRequest} from '@cargoplane/cloud';
import AWS from "aws-sdk";

export async function handler() {
    let sts = new AWS.STS();
    let roleName;

    await sts.getCallerIdentity({}, function(err, data) {
        if(err) console.log(err);
        else { console.log(data); roleName = JSON.stringify(data).split("/")[1]; }
    }).promise();

    let credConfig: CargoplaneCredentialRequest = {
        roleName: roleName,
        pubTopics: [
            
        ],
        subTopics: [
            process.env.GALAXY_GENERATION_TOPIC!,
        ]
    };

    const carogplane = new CargoplaneCloud();
    
    let responseBody = await carogplane.createCredentials(credConfig);

    let response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(responseBody)
    };

    console.log("response: " + JSON.stringify(response));
    return response;
};