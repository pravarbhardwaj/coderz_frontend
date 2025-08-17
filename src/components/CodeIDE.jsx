import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

export default function CodeIDE() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState();
  const [output, setOutput] = useState("");
  const [pyodide, setPyodide] = useState(null);

  // Load Pyodide (Python runtime in browser)
  useEffect(() => {
    const loadPy = async () => {
      if (window.loadPyodide) {
        const py = await window.loadPyodide();

        // Redirect Python stdout/stderr to JS
        py.setStdout({
          batched: (msg) => setOutput((prev) => prev + msg),
        });
        py.setStderr({
          batched: (msg) => setOutput((prev) => prev + "Error: " + msg),
        });

        setPyodide(py);
      }
    };
    loadPy();
  }, []);

  // Run code depending on language
  const runCode = async () => {
    setOutput(""); // clear old output
    try {
      if (language === "javascript") {
        // Capture console.log
        const originalLog = console.log;
        let buffer = "";
        console.log = (...args) => {
          buffer += args.join(" ") + "\n";
          setOutput((prev) => prev + args.join(" ") + "\n");
        };

        try {
          const result = eval(code);
          if (result !== undefined) {
            setOutput((prev) => prev + String(result) + "\n");
          }
        } finally {
          console.log = originalLog; // restore console.log
        }
      } else if (language === "python") {
        if (!pyodide) {
          setOutput("Loading Python runtime...");
          return;
        }
        await pyodide.runPythonAsync(code); // print() goes to setStdout
      } else if (language === "html") {
        setOutput(code);
      } else if (language === "css") {
        const styleTag = `<style>${code}</style><div>CSS Applied!</div>`;
        setOutput(styleTag);
      }
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* Language Selector */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="p-2 border rounded w-40"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
      </select>

      {/* Monaco Editor */}
      <Editor
        height="400px"
        theme="vs-dark"
        language={language === "python" ? "python" : language}
        value={code}
        onChange={(value) => setCode(value)}
      />

      {/* Run Button */}
      <button
        onClick={runCode}
        className="p-2 bg-blue-500 text-white rounded w-32"
      >
        Run Code
      </button>

      {/* Output Section */}
      <div className="font-semibold">Output: </div>
      <div className="p-2 border rounded min-h-[120px] bg-gray-100 overflow-auto">
        {language === "html" || language === "css" ? (
          <iframe
            title="output"
            className="w-full h-64 border"
            srcDoc={output}
          />
        ) : (
          <pre>{output}</pre>
        )}
      </div>
    </div>
  );
}
