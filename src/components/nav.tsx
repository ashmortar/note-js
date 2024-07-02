import { Link } from "react-router-dom";

export function Nav() {
  return (
    <nav>
      <div className="nav-title">
        <img width={50} height={50} src="/src/assets/temp.webp" alt="temp" />
        <p>NoteJS</p>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/notebook">Notebook</Link>
        </li>
      </ul>
    </nav>
  );
}
