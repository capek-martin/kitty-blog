import { useEffect, useState } from "react";
import { apiUrl } from "../../api/apiUrl";
import http from "../../api/axios";
import { useParams } from "react-router-dom";
import { dateShowFormat } from "../../utils/core/date.types";
import { format } from "date-fns";
import { Comments } from "../Comments/Comments";
import { fetchImage, placeholderImg } from "../../utils/core/file.functions";
import "./Article.style.scss";

export const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any | null>();
  const [imgSrc, setImgSrc] = useState(placeholderImg);

  const fetchArticle = async () => {
    if (!id) return;
    const response = await http.apiGet({
      url: `${apiUrl.ARTICLES}/${id}`,
    });
    if (response?.data) setArticle(response.data);
  };

  useEffect(() => {
    if (!id) return;
    fetchArticle();
  }, [id]);

  useEffect(() => {
    if (!article || !article.imageId) return;
    fetchImage(article.imageId).then((url) => {
      setImgSrc(url);
    });
  }, [article]);

  return (
    <div className="detail-container">
      <div className="article-container">
        <h1>{article?.title}</h1>
        {article?.createdAt && (
          <p>{format(new Date(article.createdAt), dateShowFormat)}</p>
        )}
        <div className="detail-image">
          <img src={imgSrc} alt="placeholder" />
        </div>
        <span
          dangerouslySetInnerHTML={{
            __html: article?.content,
          }}
        />
        {/* Comments */}
        <Comments article={article} refetch={fetchArticle} />
      </div>
      <aside>
        <h4>Related articles</h4>
      </aside>
    </div>
  );
};
