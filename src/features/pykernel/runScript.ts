import type { PyProxy, PyodideInterface } from "pyodide";

// Create a new Text box for the user to enter the script

export async function runScript(
  script: string,
  setOutput: Function,
  pyodide: PyodideInterface,
  locals: PyProxy) {
  // Run the script
  // await pyodide.loadPackage("matplotlib")
  let res = pyodide.runPython(script, { locals });
  setOutput(pyodide.pyimport("builtins").str(res));
}
