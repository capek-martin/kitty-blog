import { useEffect, useState } from "react";
import { apiUrl } from "../../api/apiUrl";
import http from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { dateShowFormat } from "../../utils/core/date.types";
import { format } from "date-fns";
import { Comments } from "../Comments/Comments";
import { fetchImage, placeholderImg } from "../../utils/core/file.functions";
import "./Article.style.scss";
import ReactMarkdown from "react-markdown";
import { Article } from "../../types/app/article.type";
import { Loader } from "../../components/Loader/Loader";
import { paths } from "../../utils/core/routes";

/**
 * Detail view of article
 */
export const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>();
  const [relatedArticles, setRelatedArticles] = useState<Article[] | null>();
  const [imgSrc, setImgSrc] = useState(placeholderImg);

  /**
   * Selected article
   */
  const fetchArticle = async () => {
    if (!id) return;
    const response = await http.apiGet({
      url: `${apiUrl.ARTICLES}/${id}`,
    });
    if (response?.data) setArticle(response.data);
  };

  /**
   * For related articles panel
   * api missing
   */
  const fetchRelatedArticles = async () => {
    if (!id) return;
    const response = await http.apiGet({
      url: `${apiUrl.ARTICLES}`,
    });
    if (response?.data)
      setRelatedArticles(
        response.data.items.filter((x: Article) => x.articleId !== id)
      );
  };

  useEffect(() => {
    if (!id) return;
    fetchArticle();
    fetchRelatedArticles();
  }, [id]);

  useEffect(() => {
    if (!article || !article.imageId) return;
    fetchImage(article.imageId).then((url) => {
      setImgSrc(url);
    });
  }, [article]);

  if (!article) return <Loader />;
  return (
    <>
      <div className="page-header">
        <h1>{article?.title}</h1>
      </div>
      <div className="detail-container">
        <div className="article-container">
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Author missing in /articles/get */}
            <p className="small">Anonym</p>
            <div className="circle"></div>
            <p className="small" style={{ listStyleType: "" }}>
              {format(new Date(article.createdAt), dateShowFormat)}
            </p>
          </div>
          <div className="detail-image">
            <img src={imgSrc} alt="placeholder" />
          </div>
          <div>
            <ReactMarkdown>{article?.content ?? ""}</ReactMarkdown>
          </div>
          {/* Comments */}
          <Comments article={article} refetch={fetchArticle} />
        </div>
        <aside>
          <h4>Related articles</h4>
          <div className="related-articles">
            {relatedArticles?.map((x: Article, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => navigate(`${paths.ARTICLES}/${x.articleId}`)}
                >
                  <h6>{x.title}</h6>
                  <p className="small" style={{ color: "#212529" }}>
                    {x.perex}
                  </p>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </>
  );
};
