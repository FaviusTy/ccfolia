import React, { memo } from "react";

const _DataSheet = ({ rows, i }) => (
  <div className="DataSheet">
    <div className="row">
      <div className="col">
        <div className="name">
          <span>{("0" + (i + 1)).slice(-2)}</span>
        </div>
        <div className="bar">
          <span>9</span>
        </div>
        <div className="bar">
          <span>10</span>
        </div>
        <div className="bar">
          <span>22</span>
        </div>
      </div>
    </div>
  </div>
);

const DataSheet = memo(_DataSheet);

const DataSheets = ({ datasheets }) => {
  return (
    <div className="DataSheets">
      {datasheets.map(({ id, rows }, i) => {
        return <DataSheet key={i} i={i} rows={rows} />;
      })}
    </div>
  );
};

export default memo(DataSheets);
