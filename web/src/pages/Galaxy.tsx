import { useTypedQuery } from "../urql";
import { API as amplify } from "@aws-amplify/api";
import { useNavigate } from "react-router-dom";

interface GalaxyForm {
  galaxyName: string;
  quadrantSizeX?: number;
  quadrantSizeY?: number;
  sectorSizeX?: number;
  sectorSizeY?: number;
  subsectorSizeX?: number;
  subsectorSizeY?: number;
  systemFrequency?: number;
}

function createGalaxy(opts: GalaxyForm) {
  return amplify.post("galaxyGenerator", "", {
    body: opts
  });
}

export function ListGalaxies() {
  const [galaxies] = useTypedQuery({
    query: {
      galaxies: {
        galaxyID: true,
        galaxyName: true
      }
    }
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Galaxies</h2>
      <h3>Generate</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const galaxyID = createGalaxy({
            galaxyName: fd.get("galaxyName")!.toString(),
            quadrantSizeX: Number(fd.get("quadrantSizeX")),
            quadrantSizeY: Number(fd.get("quadrantSizeX")),
            sectorSizeX: Number(fd.get("sectorSizeX")),
            sectorSizeY: Number(fd.get("sectorSizeY")),
            subsectorSizeX: Number(fd.get("subsectorSizeX")),
            subsectorSizeY: Number(fd.get("subsectorSizeY")),
            systemFrequency: Number(fd.get("systemFrequency")),
          });
          e.currentTarget.reset();
          const navigate = useNavigate();
          return navigate("galaxyGeneration/" + galaxyID);
        }}
      >
        <input name="galaxyName" placeholder="Galaxy Name" />
        <input name="quadrantSizeX" placeholder="Quadrant X Size"/>
        <input name="quadrantSizeY" placeholder="Quadrant Y Size"/>
        <input name="sectorSizeX" placeholder="Sector X Size"/>
        <input name="sectorSizeY" placeholder="Sector Y Size"/>
        <input name="subsectorSizeX" placeholder="Subsector X Size"/>
        <input name="subsectorSizeY" placeholder="Subsector Y Size"/>
        <input name="systemFrequency" placeholder="System Frequency"/>
        <button type="submit">Submit</button>
      </form>
      <h3>All Galaxies</h3>
      <ol>
        {galaxies.data?.galaxies.map(galaxy => (
          <li>
            <div>
              <div>
                <a href={galaxy.galaxyID}>{galaxy.galaxyName} - {galaxy.galaxyID}</a>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
