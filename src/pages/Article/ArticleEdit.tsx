import { useEffect, useState } from "react";
import { apiUrl } from "../../api/apiUrl";
import http from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArticleForm } from "./ArticleForm";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Article, ArticleInputs } from "../../types/app/article.type";
import { paths } from "../../utils/core/routes";
import { Loader } from "../../components/Loader/Loader";

/**
 * Page for editing selected article
 */
export const ArticleEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>();

  useEffect(() => {
    if (!id) return;
    /**
     * Fetch selected article
     */
    const fetchArticle = async () => {
      if (!id) return;
      const response = await http.apiGet({
        url: `${apiUrl.ARTICLES}/${id}`,
      });
      if (response?.data) setArticle(response.data);
    };

    fetchArticle();
  }, [id]);

  /**
   * Handles update of article
   */
  const handleOnSubmit: SubmitHandler<ArticleInputs> = async (
    values: ArticleInputs
  ) => {
    try {
      const response = await http.apiPatch({
        url: `${apiUrl.ARTICLES}/${id}`,
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

  if (!article) return <Loader />;
  return (
    <ArticleForm
      onSubmit={handleOnSubmit}
      defaultValues={article as ArticleInputs}
    />
  );
};
