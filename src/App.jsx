import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Chart from "./components/Chart";
import DataTable from "./components/DataTable";
import './styles.css';

export default function App() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [xKey, setXKey] = useState("");
  const [yKey, setYKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/data/data.csv")
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const rows = results.data.map((r, i) => ({ ...r, __rowIndex: i }));
            setData(rows);
            setHeaders(results.meta.fields || Object.keys(rows[0] || {}));
            setLoading(false);
            setSelected(null); // clear selection on load
          },
        });
      });
  }, []);

  // pick numeric columns for dropdowns
  const numericHeaders = headers.filter((h) =>
    data.some((r) => typeof r[h] === "number")
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Interactive Scatter + Table</h1>
        <p>Choose X and Y axes (demonstrates props, context, and Zustand).</p>
      </header>

      <section className="controls">
        <label>
          X axis:
          <select value={xKey} onChange={(e) => setXKey(e.target.value)}>
            {numericHeaders.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </label>

        <label>
          Y axis:
          <select value={yKey} onChange={(e) => setYKey(e.target.value)}>
            {numericHeaders.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </label>
      </section>

      {loading ? (
        <div className="loading">Loading data... ⏳</div>
      ) : (
        <div className="main-grid">
          <Chart data={data} xKey={xKey} yKey={yKey} />
          <DataTable data={data} headers={headers} />
        </div>
      )}

      <footer className="footer">
        <small>
          Props pattern: App → Chart/DataTable via props. Context + Zustand show
          alternative state-sharing.
        </small>
      </footer>
    </div>
  );
}
