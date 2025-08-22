import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

export default function CodeIDE() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [pyodide, setPyodide] = useState(null);
  const [orientation, setOrientation] = useState("horizontal"); // horizontal | vertical

  // Load Pyodide (Python runtime in browser)
  useEffect(() => {
    const loadPy = async () => {
      if (window.loadPyodide) {
        const py = await window.loadPyodide();

        // Redirect stdout/stderr to JS
        py.setStdout({
          batched: (msg) => setOutput((prev) => prev + msg),
        });
        py.setStderr({
          batched: (msg) => setOutput((prev) => prev + "Error: " + msg),
        });

        // Override Python input() → JS prompt
        await py.runPythonAsync(`
import js
def input(prompt=""):
    return js.window.prompt(prompt)
        `);

        setPyodide(py);
      }
    };
    loadPy();
  }, []);

  // Run code
  const runCode = async () => {
    setOutput(""); // clear old output
    try {
      if (language === "python") {
        if (!pyodide) {
          setOutput("Loading Python runtime...");
          return;
        }
        await pyodide.runPythonAsync(code);
      } else if (language === "html") {
        setOutput(code);
      }
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 space-y-4">
      {/* Top bar */}
      <div className="flex items-center">
        {/* Language Selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border rounded w-auto"
        >
          <option value="python">Python</option>
          <option value="html">HTML, CSS and Javascript</option>
        </select>
        <div className="ml-auto flex gap-2">
          {/* Orientation Toggle */}
          <button
            onClick={() =>
              setOrientation((prev) =>
                prev === "horizontal" ? "vertical" : "horizontal"
              )
            }
            className="p-2 bg-gray-700 text-white rounded"
          >
            {orientation === "horizontal" ? "↕ Vertical" : "↔ Horizontal"}
          </button>
          {/* Run Button */}
          <div className="flex justify-end">
            <button
              onClick={runCode}
              className="p-2 bg-blue-500 text-white rounded w-32"
            >
              Run Code
            </button>
          </div>
        </div>
      </div>

      {/* Editor + Output */}
      <div
        className={`flex flex-1 gap-4 ${
          orientation === "horizontal" ? "flex-row" : "flex-col"
        }`}
      >
        {/* Monaco Editor */}
        <div className="flex-1 border rounded overflow-hidden">
          <Editor
            height="100%"
            theme="vs-dark"
            language={language === "python" ? "python" : language}
            value={code}
            onChange={(value) => setCode(value)}
          />
        </div>

        {/* Output Section */}
        <div className="flex-1 flex flex-col border rounded overflow-hidden bg-gray-100">
          <div className="p-2 font-semibold bg-gray-200 border-b">Output</div>
          <div className="flex-1 p-2 overflow-auto">
            {language === "html" || language === "css" ? (
              <iframe
                title="output"
                className="w-full h-full border"
                srcDoc={output}
              />
            ) : (
              <pre>{output}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
