import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import ReactJson from "react-json-view";

function App() {
    const [apiUrl, setApiUrl] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const callApi = async () => {
        try {
            const headers = {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            };
            setLoading(true);
            const response = await axios.get(apiUrl, headers);
            console.log(response);
            setData(response);
            setError(null);
        } catch (error) {
            setLoading(true);
            console.log(error);
            setError(error);
            setData(null);
        }
        setLoading(false);
    };

    return (
        <div className="App">
            <header className="App-header">Api Tester</header>
            <div className="App-body">
                <h1>Enter API URL : GET </h1>
                <input
                    type="text"
                    className="App-input"
                    onChange={(e) => setApiUrl(e.target.value)}
                    value={apiUrl}
                />
            </div>
            <button className="App-button" onClick={callApi}>
                Call API
            </button>
            {loading && (
                <img
                    src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"
                    alt="loading"
                    style={{
                        width: "30px",
                        height: "30px",
                    }}
                />
            )}

            {error && (
                <div className="App-error">
                    <h1>Error</h1>
                    <ReactJson src={error} />
                </div>
            )}

            {data && (
                <div className="App-data">
                    <h1> Data </h1>
                    <ReactJson src={data} />
                </div>
            )}
        </div>
    );
}

export default App;
