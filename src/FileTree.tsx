import { TreeItem, TreeView } from "@mui/lab";
import { useAppSelector } from "./app/hooks";
import { selectFiles } from "./features/pesudoFileSystem/pesudoFileSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { selectKernel } from "./features/pykernel/selectorSlice";

export function FileTree() {
  const files = useAppSelector(selectFiles);
  const pyodide = useAppSelector(selectKernel);
  const fileTree = files.map((file) => {
    console.log(file)
    if (pyodide === null || file.startsWith('.')){
        return <></>;
    }
    const fileData = new Uint8Array(pyodide?.FS.readFile(file));
    const fileBlob = new Blob([fileData], {
        type: "application/octet-stream",
    })
    return <TreeItem nodeId={file} label={file}>
        <a href={URL.createObjectURL(fileBlob)} download={file}>Download {file}</a>
    </TreeItem>;
  });

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {fileTree}
    </TreeView>
  );
}
