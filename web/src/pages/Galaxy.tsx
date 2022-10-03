import { useTypedMutation, useTypedQuery } from "../urql";
import { API as amplify } from "@aws-amplify/api";

interface GalaxyForm {
  galaxyName: string;
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
      <h3>Submit</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          createGalaxy({
            galaxyName: fd.get("galaxyName")!.toString()
          });
          e.currentTarget.reset();
        }}
      >
        <input name="galaxyName" placeholder="Galaxy Name" />
        <button type="submit">Submit</button>
      </form>
      <h3>Latest</h3>
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
