// home page for the app, users should be able to see recent notes and create new notes

import { Link } from "react-router-dom";

/**
 * Home page for the application. Users should be able to see recent notes and create new notes.
 * @returns {React.ReactNode}
 */
export function Home() {
  return (
    <>
      <Header />
      <NoteList />
    </>
  );
}

function Header() {
  return (
    <header>
      <h1>Home</h1>
      <button>open</button>
      <button>+ new notebook</button>
    </header>
  );
}

function NoteList() {
  return (
    <section>
      <h2>Recent Notes</h2>
      <ul>
        <li>
          <Link to="/notebook">Notebook 1</Link>
        </li>
        <li>
          <Link to="/notebook">Notebook 2</Link>
        </li>
        <li>
          <Link to="/notebook">Notebook 3</Link>
        </li>
      </ul>
    </section>
  );
}
