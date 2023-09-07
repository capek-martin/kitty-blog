import { CSSProperties } from "@mui/material/styles/createMixins";
import { useEffect } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

interface Props {
  value: string;
  onChange?: (t: string) => void;
  style?: CSSProperties;
}

/**
 * Markdown editor component - using react-simplemde-editor library
 */
export const MarkdownEditor = ({ value, onChange, style }: Props) => {
  useEffect(() => {
    onChange && onChange(value);
  }, [value, onChange]);

  return (
    <div className="markdown-editor" style={style}>
      <SimpleMDE value={value} onChange={onChange} />
    </div>
  );
};
