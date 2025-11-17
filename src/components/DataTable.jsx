import React, { useRef, useEffect } from "react";
import { useSelectedStore } from "../store/useStore";

export default function DataTable({
  data,
  headers,
  selected,
  setSelected,
  zustandSelected,
}) {
  const setZustandSelected = useSelectedStore((state) => state.setSelected);
  const tableRef = useRef(null);

  // scroll event from Chart
  useEffect(() => {
    const onScroll = (e) => {
      const { rowIndex } = e.detail;
      const row = document.querySelector(`[data-row-index="${rowIndex}"]`);

      if (row && tableRef.current) {
        row.scrollIntoView({ behavior: "smooth", block: "center" });

        setSelected(rowIndex);
        setZustandSelected(rowIndex);
      }
    };

    window.addEventListener("scrollToRow", onScroll);
    return () => window.removeEventListener("scrollToRow", onScroll);
  }, [setSelected, setZustandSelected]);

  const handleRowClick = (rowIndex) => {
    setSelected(rowIndex);
    setZustandSelected(rowIndex);
  };

  return (
    <div className="table-wrapper">
      <h2>Data Table</h2>
      <div className="table-scroll" ref={tableRef}>
        <table className="data-table">
          <thead>
            <tr>
              {headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row) => {
              const isSelected =
                selected === row.__rowIndex ||
                zustandSelected === row.__rowIndex;

              return (
                <tr
                  key={row.__rowIndex}
                  data-row-index={row.__rowIndex}
                  className={isSelected ? "selected" : ""}
                  onClick={() => handleRowClick(row.__rowIndex)}
                >
                  {headers.map((h) => (
                    <td key={h}>{String(row[h])}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
