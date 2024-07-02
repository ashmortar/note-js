import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { ErrorPage } from "./pages/error";
import { Notebook } from "./pages/notebook";
import { isValidAutomergeUrl, Repo } from "@automerge/automerge-repo";
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { BroadcastChannelNetworkAdapter } from "@automerge/automerge-repo-network-broadcastchannel";
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb";
import { RepoContext } from "@automerge/automerge-repo-react-hooks";

const repo = new Repo({
  network: [
    new BrowserWebSocketClientAdapter("wss://sync.automerge.org"),
    new BroadcastChannelNetworkAdapter(),
  ],
  storage: new IndexedDBStorageAdapter("automerge"),
});

const rootDocUrl = `${document.location.hash.substring(1)}`;
let handle;
if (isValidAutomergeUrl(rootDocUrl)) {
  handle = repo.find(rootDocUrl);
} else {
  handle = repo.create({ text: "hello world" });
}
const docUrl = (document.location.hash = handle.url);
// @ts-expect-error -- we put the handle and the repo on window so you can experiment with them from the dev tools
window.handle = handle; // we'll use this later for experimentation
// @ts-expect-error -- we put the handle and the repo on window so you can experiment with them from the dev tools
window.repo = repo;

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/notebook",
        element: <Notebook docUrl={docUrl} />,
      },
      {
        path: "/:automergeUrl",
        element: <Notebook docUrl={docUrl} />,
      },
    ],
  },
]);

createRoot(document.body).render(
  <StrictMode>
    <RepoContext.Provider value={repo}>
      <RouterProvider router={router} />
    </RepoContext.Provider>
  </StrictMode>
);
