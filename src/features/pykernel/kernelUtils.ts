import { PyProxy, PyodideInterface, loadPyodide } from "pyodide";


export async function createPyodide(setPyStdout: (stdout: string)=> void, setPyStderr: (stderr: string)=> void): Promise<PyodideInterface>{
  const pyodide = await loadPyodide({
    indexURL: "./pyodide/",
    stdout: (x) => (x ? setPyStdout(x) : setPyStdout(" ")),
    stderr: (x) => (x ? setPyStderr(x) : setPyStderr("")),
    //   indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.0/full/",
    // stdin: stdin_func, stdout: stdout_func, stderr: stderr_func
  });
  await loadPackages(pyodide);
  return pyodide;
}


export async function loadPackages(pyodide: PyodideInterface) {
    // await pyodide.loadPackage("matplotlib")
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    micropip.install("numpy");
    micropip.install("gdspy");
    //   await pyodide.loadPackage(
    //     "gdspy-1.6.12-cp311-cp311-emscripten_3_1_32_wasm32.whl"
    //   );
  }
  