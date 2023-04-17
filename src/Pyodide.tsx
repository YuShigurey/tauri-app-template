import { useEffect, useState } from "react";
import "./App.css";
import { PyProxy, PyodideInterface} from "pyodide";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { runScript } from "./features/pykernel/runScript";
import { selectKernel, setKernel } from "./features/pykernel/selectorSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { createPyodide } from "./features/pykernel/kernelUtils";
import { setFiles } from "./features/pesudoFileSystem/pesudoFileSlice";

export function SubScriptBox(
  script: string,
  setScript: Function,
  setOutput: Function,
  pyodide: PyodideInterface,
  locals: PyProxy
) {
  return (
    <div style={{ width: "80%", position: "relative", left: "10%" }}>
      <CodeEditor
        value={script}
        language="python"
        placeholder="Please enter Python code."
        onChange={(evn: any) => setScript(evn.target.value)}
        padding={15}
        rows={20}
        cols={80}
        style={{
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />

      {/* <textarea
        id="script-input"
        onChange={(e) => setScript(e.currentTarget.value)}
        placeholder="Enter a script..."
        cols={80}
        rows={10}
      /> */}
      <li style={{ listStyleType: "none" }}/>
      <button
        type="button"
        onClick={() => runScript(script, setOutput, pyodide, locals)}
      >
        Run
      </button>
    </div>
  );
}

export function ScriptBox() {
  const [script, setScript] = useState("");
  const [output, setOutput] = useState("");
  const [pystdout, setPyStdout] = useState("");
  const [pystderr, setPyStderr] = useState("");
  
  const pyodide = useAppSelector(selectKernel)
  const dispatch = useAppDispatch()

  const locals = pyodide?.runPython("dict()");
  useEffect(() => {

  }, [output]);

  const onKernelSelected = async () => {
    const kernel = await createPyodide(setPyStdout, setPyStderr);
    dispatch(setKernel(kernel));
  }

  const onScriptExecuted = (output: string) => {
    // Update files
    setOutput(output);
    dispatch(setFiles(pyodide?.FS.readdir(".") || []))
  }

  return (
    <div>
      {!pyodide && (
        <button type="button" onClick={onKernelSelected}>
          Create Pyodide
        </button>
      )}
      <div>
        {pyodide && SubScriptBox(script, setScript, onScriptExecuted, pyodide, locals)}
      </div>
      <p>{output}</p>
      {/* {pyodide &&
        files
          .filter((file) => !file.startsWith("."))
          .map((file, e) => {
            // Download the file
            console.log("Down ", file);
            const fileData = new Uint8Array(pyodide.FS.readFile(file));
            const fileBlob = new Blob([fileData], {
              type: "application/octet-stream",
            });
            return (
              <a href={URL.createObjectURL(fileBlob)} download={file}>
                <li>Download {file}</li>
              </a>
            );
          })} */}
      <textarea readOnly cols={80} rows={10} value={pystdout} />
      {pystderr && <textarea readOnly cols={80} rows={10} value={pystderr} />}
    </div>
  );
}
