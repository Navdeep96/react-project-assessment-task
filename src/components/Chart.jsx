import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelectedStore } from "../store/useStore";
import { useSelectedContext } from "../context/SelectedContext";

export default function Chart({ data, xKey, yKey }) {
  const selectedId = useSelectedStore((state) => state.selected);
  const setSelected = useSelectedStore((state) => state.setSelected);

  const { selected: ctxSelected, setSelected: setCtxSelected } =
    useSelectedContext();

  // When a point is clicked, update both Zustand and Context so both patterns are demonstrated
  const handlePointClick = (entry) => {
    const id = entry.__rowIndex;
    setSelected(id);
    setCtxSelected(id);

    // scroll to table row using custom event
    const event = new CustomEvent("scrollToRow", { detail: { rowIndex: id } });
    window.dispatchEvent(event);
  };

  return (
    <div className="chart-wrapper">
      <h2>Scatter Plot</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis type="number" dataKey={xKey} name={xKey} />
          <YAxis type="number" dataKey={yKey} name={yKey} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />

          <Scatter
            data={data}
            fill="#8884d8"
            onClick={(d) => handlePointClick(d)}
            shape="circle"
          >
            {/* We cannot directly change style of individual points via child render in recharts easily here,
so we rely on the active prop to control size/color by setting point size through payload.
However, recharts allows customizing via shape function if we wanted to.
*/}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <div className="legend">
        <small>
          Selected (Zustand): {selectedId !== null ? selectedId : "None"}.
          (Context): {ctxSelected !== null ? ctxSelected : "None"}
        </small>
      </div>
    </div>
  );
}
