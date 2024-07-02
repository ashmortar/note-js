export function Notebook() {
  return (
    <>
      <header>
        <h1>Notebook</h1>
        <button>save</button>
        <button>delete</button>
        <button>{"<- home"}</button>
      </header>
      <div id="editor"></div>
    </>
  );
}
