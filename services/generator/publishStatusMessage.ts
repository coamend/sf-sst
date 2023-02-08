import { CargoplaneCloud } from "@cargoplane/cloud";

const cargoplane = new CargoplaneCloud();
const roleName = process.env.PUB_SUB_ROLE_NAME!;
const topicName = process.env.GALAXY_GENERATION_TOPIC!; 
cargoplane.createCredentials({
    roleName: roleName,
    pubTopics: [
        topicName,
    ],
    subTopics: [
        
    ]
});

export const publishStatusMessage = (message: any) => {
    cargoplane.publish(topicName, message);
}