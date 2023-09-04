import { CSSProperties } from "@mui/material/styles/createMixins";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.style.scss";

interface Props {
  value: string;
  onChange?: (t: string) => void;
  toolbarOptionsExt?: any;
  style?: CSSProperties;
  readOnly?: boolean;
}

/**
 * Text editor component - using react-quill library
 */
export const TextEditor = ({
  value,
  onChange,
  toolbarOptionsExt,
  style,
  readOnly,
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
    onChange && onChange(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div className="text-editor" style={{ ...style }}>
      <ReactQuill
        onChange={setInputValue}
        modules={{
          toolbar: toolbarOptionsExt ?? toolbarOptions,
        }}
        theme="snow"
        value={inputValue}
        readOnly={readOnly}
      />
    </div>
  );
};
