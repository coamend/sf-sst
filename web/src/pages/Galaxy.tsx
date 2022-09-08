import { useTypedMutation, useTypedQuery } from "../urql";

interface GalaxyForm {
  galaxyName: string;
}

export function List() {
  const [galaxies] = useTypedQuery({
    query: {
      galaxies: {
        galaxyID: true,
        galaxyName: true
      }
    }
  });

  const [, createGalaxy] = useTypedMutation((opts: GalaxyForm) => ({
    createGalaxy: [
      opts,
      {
        galaxyName: true
      }
    ]
  }));

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
                {galaxy.title} - <a href={galaxy.url}>{galaxy.url}</a>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
