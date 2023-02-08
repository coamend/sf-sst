import {CargoplaneCloud, CargoplaneCredentialRequest} from '@cargoplane/cloud';

export async function handler() {
    let roleName = process.env.PUB_SUB_ROLE_NAME!;

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