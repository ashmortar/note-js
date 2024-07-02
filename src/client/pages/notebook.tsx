import {
  AutomergeUrl,
  DocHandleChangePayload,
} from "@automerge/automerge-repo";
import { useHandle } from "@automerge/automerge-repo-react-hooks";
import { useEffect, useRef, useState } from "react";
import { EditorState, Transaction } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { exampleSetup } from "prosemirror-example-setup";
import { AutoMirror } from "@automerge/prosemirror";

export function Notebook({ docUrl }: { docUrl: AutomergeUrl }) {
  const editorRoot = useRef<HTMLDivElement>(null);
  const handle = useHandle<{ text: string }>(docUrl);
  const [loaded, setLoaded] = useState(handle && handle.docSync() != null);
  useEffect(() => {
    if (handle != null) {
      handle.whenReady().then(() => {
        if (handle.docSync() != null) {
          setLoaded(true);
        }
      });
    }
  }, [handle]);

  const [view, setView] = useState<EditorView | null>(null);
  useEffect(() => {
    // We're not using this for anything yet, but this `AutoMirror` object is
    // where we will integrate prosemirror with automerge
    const mirror = new AutoMirror(["text"]);
    let view: EditorView; // We need a forward reference to use next
    // This is a callback which will update the prosemirror view whenever the document changes
    const onPatch: (args: DocHandleChangePayload<unknown>) => void = ({
      doc,
      patches,
      patchInfo,
    }) => {
      const newState = mirror.reconcilePatch(
        patchInfo.before,
        doc,
        patches,
        view!.state
      );
      view!.updateState(newState);
    };
    if (editorRoot.current != null && loaded) {
      view = new EditorView(editorRoot.current, {
        state: EditorState.create({
          schema: mirror.schema, // It's important that we use the schema from the mirror
          plugins: exampleSetup({ schema: mirror.schema }),
          doc: mirror.initialize(handle!, ["text"]),
        }),
        // Here we're intercepting the prosemirror transaction and feeding it through the AutoMirror
        dispatchTransaction: (tx: Transaction) => {
          const newState = mirror.intercept(handle!, tx, view!.state);
          view!.updateState(newState);
        },
      });
      setView(view);
      handle!.on("change", onPatch);
    }
    return () => {
      // we have to remove the listener when tearing down
      if (handle != null) {
        handle.off("change", onPatch);
      }
      setView(null);
      if (view != null) {
        view.destroy();
      }
    };
  }, [editorRoot, loaded]);

  return <div id="editor" ref={editorRoot}></div>;
}
