import { CSSProperties } from "@mui/material/styles/createMixins";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.style.scss";

interface Props {
  value: string;
  onChange: (t: string) => void;
  toolbarOptionsExt?: any;
  style?: CSSProperties;
}

/**
 * Text editor component - using react-quill library
 */
export const TextEditor = ({
  value,
  onChange,
  toolbarOptionsExt,
  style,
}: Props) => {
  const [inputValue, setInputValue] = useState<string>(value ?? "");

  // toolbar options
  const toolbarOptions = [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ direction: "rtl" }],
    [],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
  ];

  useEffect(() => {
    onChange(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const editorHeight = "100px";

  return (
    <div className="text-editor" style={{ ...style, height: editorHeight }}>
      <ReactQuill
        onChange={setInputValue}
        modules={{
          toolbar: toolbarOptionsExt ?? toolbarOptions,
        }}
        theme="snow"
        value={inputValue}
      />
    </div>
  );
};
