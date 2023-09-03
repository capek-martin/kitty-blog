import Button from "@mui/material/Button";
import { TextEditor } from "../../components/TextEditor/TextEditor";
import { useEffect, useState } from "react";
import { ArticleInputs } from "../../types/app/article.type";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  onSubmit: SubmitHandler<ArticleInputs>;
  defaultValues?: ArticleInputs;
}

export const ArticleForm = ({ onSubmit, defaultValues }: Props) => {
  const [contentValue, setContentValue] = useState<string>();
  const { register, handleSubmit, reset } = useForm<ArticleInputs>();

  useEffect(() => {
    reset({ ...defaultValues });
  }, [defaultValues, reset]);

  /**
   * Submit data, then reset form
   * @param data
   */
  const handleFormSubmit: SubmitHandler<ArticleInputs> = (data) => {
    if (!contentValue) return;
    onSubmit({ ...data, content: contentValue });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div style={{ display: "flex" }}>
        <h1>Create article</h1>
        <Button variant="contained">Publish article</Button>
      </div>
      <div className="form-group">
        <label htmlFor="title">Article title</label>
        <input
          id="title"
          type="text"
          placeholder="My first article"
          {...register("title")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Featured image</label>
        <Button>Upload</Button>
      </div>
      <div className="form-group">
        <label htmlFor="title">Content</label>
        <div className="text-editor">
          <TextEditor value={contentValue ?? ""} onChange={setContentValue} />
        </div>
      </div>
    </form>
  );
};
