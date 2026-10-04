import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:8080/api";
const OPS = { "+": "add", "-": "subtract", "×": "multiply", "÷": "divide" };
const SYMBOL = { add: "+", subtract: "-", multiply: "×", divide: "÷" };
const KEYS = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "0", ".", "=", "+"];

export default function App() {
  const [display, setDisplay] = useState("0");
  const [first, setFirst] = useState(null);
  const [op, setOp] = useState(null);
  const [fresh, setFresh] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const loadHistory = async () => {
    try {
      const res = await axios.get(`${API}/history`);
      setHistory(res.data);
    } catch {
      setError("Backend-ku connect aagala. Spring Boot run aagudha paarunga.");
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const pressDigit = (d) => {
    setError("");
    if (fresh || display === "0") {
      setDisplay(d === "." ? "0." : d);
      setFresh(false);
    } else if (d === "." && display.includes(".")) {
      return;
    } else {
      setDisplay(display + d);
    }
  };

  const pressOp = (symbol) => {
    setError("");
    setFirst(parseFloat(display));
    setOp(symbol);
    setFresh(true);
  };

  const calculate = async () => {
    if (op === null || first === null) return;
    try {
      const res = await axios.post(`${API}/calculate`, {
        num1: first,
        num2: parseFloat(display),
        operation: OPS[op],
      });
      setDisplay(String(res.data.result));
      setFirst(null);
      setOp(null);
      setFresh(true);
      loadHistory();
    } catch (e) {
      setError(e.response?.data?.error || "Server error");
    }
  };

  const clearAll = () => {
    setDisplay("0");
    setFirst(null);
    setOp(null);
    setFresh(false);
    setError("");
  };

  const handleKey = (k) => {
    if (k === "=") calculate();
    else if (k in OPS) pressOp(k);
    else pressDigit(k);
  };

  return (
    <div className="app">
      <div className="calculator">
        <div className="expression">
          {first !== null ? `${first} ${op}` : "\u00A0"}
        </div>
        <div className="display">{display}</div>
        {error && <div className="error">{error}</div>}

        <div className="keys">
          <button className="clear" onClick={clearAll}>C</button>
          {KEYS.map((k) => (
            <button
              key={k}
              className={k === "=" ? "equals" : k in OPS ? "op" : ""}
              onClick={() => handleKey(k)}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="history">
        <h3>History</h3>
        {history.length === 0 && <p className="empty">Innum calculations illa</p>}
        <ul>
          {history.map((h) => (
            <li key={h.id}>
              {h.num1} {SYMBOL[h.operation]} {h.num2} = <b>{h.result}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}