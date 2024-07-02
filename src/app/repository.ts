import { Repo } from "@automerge/automerge-repo";
// import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket";
import { NodeFSStorageAdapter } from "@automerge/automerge-repo-storage-nodefs";

const repo = new Repo({
  storage: new NodeFSStorageAdapter("./db"),
  //   network: [new BrowserWebSocketClientAdapter("wss://sync.automerge.org")],
});

export { repo };
