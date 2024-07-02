// home page for the app, users should be able to see recent notes and create new notes

import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="notebook">Notebook</Link>
    </div>
  );
}
