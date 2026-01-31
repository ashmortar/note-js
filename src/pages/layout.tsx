import { Outlet } from "react-router-dom";
import { Nav } from "@/components/nav";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

/**
 * Primary application layout which renders into the <body> element of the page and
 * that wraps all other pages.  Contains the left hand dynamic navigation menu and
 * the right hand content area.
 * @returns {React.ReactNode}
 */
export function Layout() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={5} defaultSize={18} maxSize={35}>
        <Nav />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <Outlet />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
