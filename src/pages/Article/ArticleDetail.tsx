import { useEffect, useState } from "react";
import { apiUrl } from "../../api/apiUrl";
import http from "../../api/axios";
import { useParams } from "react-router-dom";
import { dateShowFormat } from "../../utils/core/date.types";
import { format } from "date-fns";

export const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any | null>();

  useEffect(() => {
    if (!id) return;
    // createTenant();
    // getArticles();
    // createArticle();
    const fetchArticle = async () => {
      if (!id) return;
      const response = await http.apiGet({
        url: `${apiUrl.ARTICLES}/${id}`,
      });
      if (response?.data) setArticle(response.data);
    };

    fetchArticle();
  }, [id]);

  return (
    <>
      <div className="detail-container">
        <h1>{article?.title}</h1>
        {article?.createdAt && (
          <p>{format(new Date(article.createdAt), dateShowFormat)}</p>
        )}
        <div className="image">
          <img src={"/gato-placeholder.png"} alt="placeholder" />
        </div>
        <div className="content">{article?.content}</div>
      </div>
    </>
  );
};
