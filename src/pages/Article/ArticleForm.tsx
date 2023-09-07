import Button from "@mui/material/Button";
import { MarkdownEditor } from "../../components/MarkdownEditor/MarkdownEditor";
import { useEffect, useState } from "react";
import { ArticleInputs } from "../../types/app/article.type";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArticleImageUpload } from "./ArticleImageUpload";
import { apiUrl } from "../../api/apiUrl";
import { TextInput } from "../../components/TextInput/TextInput";

interface Props {
  onSubmit: SubmitHandler<ArticleInputs>;
  defaultValues?: ArticleInputs;
}

/**
 * Article form component
 */
export const ArticleForm = ({ onSubmit, defaultValues }: Props) => {
  const [contentValue, setContentValue] = useState<string>(
    defaultValues?.content ?? ""
  );
  const [imageId, setImageId] = useState<string | null>(
    defaultValues?.imageId ?? null
  );
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitted },
  } = useForm<ArticleInputs>();

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
        className="page-header"
        style={{
          display: "flex",
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
      <TextInput
        name="title"
        label="Article title*"
        control={control}
        rules={{ required: "Title is required" }}
        errors={errors?.title}
        placeholder="My first article"
      />
      <TextInput
        name="perex"
        label="Perex*"
        control={control}
        rules={{ required: "Perex is required" }}
        errors={errors.perex}
        placeholder="Perex"
      />
      <div className="form-group">
        <label htmlFor="title">Featured image</label>
        <ArticleImageUpload
          apiPostFilesUrl={`${apiUrl.IMAGES}`}
          imageId={imageId}
          setImageId={setImageId}
        />
      </div>
      <div className="form-group">
        <label>Content*</label>
        {isSubmitted && contentValue === "" && (
          <span className="error">Content is required</span>
        )}
        <MarkdownEditor value={contentValue ?? ""} onChange={setContentValue} />
      </div>
    </form>
  );
};
