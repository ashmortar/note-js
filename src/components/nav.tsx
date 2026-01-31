import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { NavLink } from "./ui/nav-link";

export function Nav() {
  return (
    <>
      <div className="flex flex-row">
        <img width={50} height={50} src="/src/assets/temp.webp" alt="temp" />
        <p>NoteJS</p>
      </div>
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <NavigationMenu.Item>
            <NavLink to="/">Home</NavLink>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavLink to="/notebook">Notebook</NavLink>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </>
  );
}
