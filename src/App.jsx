import { useState, useEffect } from "react";
import "./index.css";
import Loader from "./Loader";


const App = () => {
  const [advice, setAdvice] = useState("Please click the button to get advice");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  async function getAdvice() {
    setLoading(true);
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((c) => c + 1);
    setLoading(false);
  }

  useEffect(() => {
    getAdvice();
  }, []);



  return (
    <div>
      <h3>{loading ? <Loader /> : advice}</h3>
      <button onClick={getAdvice} disabled={loading}>
        {loading ? "Fetching..." : "Get Advice"}
      </button>
      <p>
        You have read <b>{count}</b> pieces of advice
      </p>
    </div>
  );
};

export default App;
