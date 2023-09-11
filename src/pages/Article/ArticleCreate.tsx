import http from "../../api/axios";
import { apiUrl } from "../../api/apiUrl";
import { ArticleInputs } from "../../types/app/article.type";
import { ArticleForm } from "./ArticleForm";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { paths } from "../../utils/core/routes";
import { useNavigate } from "react-router-dom";

/**
 * Page for creating article
 */
export const ArticleCreate = () => {
  const navigate = useNavigate();

  const handleOnSubmit: SubmitHandler<ArticleInputs> = async (
    values: ArticleInputs
  ) => {
    try {
      const response = await http.apiPost({
        url: `${apiUrl.ARTICLES}`,
        data: values,
      });
      if (response?.status === 200) {
        toast.success("Success");
        navigate(`${paths.HOME}`);
      }
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  return <ArticleForm onSubmit={handleOnSubmit} />;
};
