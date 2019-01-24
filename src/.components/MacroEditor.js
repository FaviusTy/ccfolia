import React from "react";

const TableMacroEditor = () => {
  return (
    <div className="MacroEditor">
      <div>
        <h2>CLEAR</h2>
        clear: <input type="checkbox" />
        <h2>BG</h2>
        <label>url:</label> <input type="text" defaultValue="background[url]" />
        <h2>FIELD</h2>
        <label>url:</label> <input type="text" defaultValue="field[url]" />
        <label>size:</label> <input type="text" defaultValue="field[col]" />{" "}
        <input type="text" defaultValue="field[row]" />
        <label>url:</label> <input type="text" defaultValue="field[row]" />
        <h2>MEDIA</h2>
        <label>url:</label> <input type="text" defaultValue="media[url]" />
        <label>loop:</label> <input type="text" defaultValue="media[loop]" />
        <label>volume:</label>{" "}
        <input type="text" defaultValue="media[volume]" />
        <h2>OBJECTS</h2>
        <label>id:</label> <input type="text" defaultValue="id" />
        <label>url:</label> <input type="text" defaultValue="url" />
        <label>size:</label> <input type="text" defaultValue="w" />{" "}
        <input type="text" defaultValue="h" />
        <label>position:</label> <input type="text" defaultValue="x" />{" "}
        <input type="text" defaultValue="y" />
        <h2>MARKER</h2>
      </div>
    </div>
  );
};

const CharacterMacroEditor = () => {
  return (
    <div className="MacroEditor">
      <div>
        <h2>OBJECTS</h2>
        <label>id:</label> <input type="text" defaultValue="id" />
        <label>url:</label> <input type="text" defaultValue="url" />
        <label>text:</label> <input type="text" defaultValue="text" />
        <label>size:</label> <input type="text" defaultValue="x" />{" "}
        <input type="text" defaultValue="y" />
        <label>position:</label> <input type="text" defaultValue="w" />{" "}
        <input type="text" defaultValue="h" />
      </div>
    </div>
  );
};

const MacroEditor = () => {
  return <TableMacroEditor />;
};

export default MacroEditor;
