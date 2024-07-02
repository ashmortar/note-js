import { Outlet } from "react-router-dom";
import { Nav } from "@/components/nav";

/**
 * Primary application layout which renders into the <body> element of the page and
 * that wraps all other pages.  Contains the left hand dynamic navigation menu and
 * the right hand content area.
 * @returns {React.ReactNode}
 */
export function Layout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
    </>
  );
}
