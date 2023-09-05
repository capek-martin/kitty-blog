import Button from "@mui/material/Button";
import { MarkdownEditor } from "../../components/MarkdownEditor/MarkdownEditor";
import { useEffect, useState } from "react";
import { ArticleInputs } from "../../types/app/article.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImageUpload } from "./ImageUpload";
import { apiUrl } from "../../api/apiUrl";

interface Props {
  onSubmit: SubmitHandler<ArticleInputs>;
  defaultValues?: ArticleInputs;
}

export const ArticleForm = ({ onSubmit, defaultValues }: Props) => {
  const [contentValue, setContentValue] = useState<string>(
    defaultValues?.content ?? ""
  );
  const [imageId, setImageId] = useState<string | null>(
    defaultValues?.imageId ?? null
  );
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
    onSubmit({ ...data, content: contentValue, imageId: imageId ?? undefined });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div
        style={{
          display: "inline-flex",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <h1>{defaultValues ? "Edit article" : "Create article"}</h1>
        <Button
          type="submit"
          variant="contained"
          style={{ marginLeft: "2rem" }}
        >
          Publish article
        </Button>
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
        <label htmlFor="title">Perex</label>
        <input
          id="perex"
          type="text"
          placeholder="Perex"
          {...register("perex")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Featured image</label>
        <ImageUpload
          apiPostFilesUrl={`${apiUrl.IMAGES}`}
          imageId={imageId}
          setImageId={setImageId}
        />
      </div>
      <div className="form-group">
        <label htmlFor="title">Content</label>
        <div className="text-editor">
          <MarkdownEditor
            value={contentValue ?? ""}
            onChange={setContentValue}
          />
        </div>
      </div>
    </form>
  );
};
