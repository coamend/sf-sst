import { useTypedQuery } from "../urql";
import { API as amplify } from "@aws-amplify/api";
import { useParams } from "react-router-dom";

export function ShowGalaxyGenerationProgress() {
    let galaxyID = useParams().galaxyID;
    let galaxy = {
        //Get subscription to galaxy being generated
    }

    return (
        <div style={{ padding: "1rem" }}>
        </div>
    );
}