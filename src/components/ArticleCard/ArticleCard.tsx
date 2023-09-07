import { format } from "date-fns";
import { Article } from "../../types/app/article.type";
import "./ArticleCard.style.scss";
import { dateShowFormat } from "../../utils/core/date.types";
import { useNavigate } from "react-router-dom";
import { paths } from "../../utils/core/routes";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchImage, placeholderImg } from "../../utils/core/file.functions";
interface Props {
  article: Article;
}

/**
 * Article component
 */
export const ArticleCard = ({ article }: Props) => {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(placeholderImg);

  /* Redirect to article detail page */
  const handleDetailRedirect = () => {
    navigate(`${paths.ARTICLES}/${article.articleId}`);
  };

  useEffect(() => {
    if (!article || !article.imageId) return;
    fetchImage(article.imageId).then((url) => {
      setImgSrc(url);
    });
  }, [article]);

  return (
    <div className="card">
      <div className="image-container">
        <img src={imgSrc} alt="placeholder" />
      </div>
      <div className="content">
        <h4>{article?.title}</h4>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Author missing in /articles/get */}
          <p className="small">Anonym</p>
          <div className="circle"></div>
          <p className="small" style={{ listStyleType: "" }}>
            {format(new Date(article.createdAt), dateShowFormat)}
          </p>
        </div>
        <p className="normal">{article?.perex}</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button style={{ marginRight: 10 }} onClick={handleDetailRedirect}>
            Read whole article
          </Button>
          {/* ------------------------------------ */}
          {/* Arr Comments or any ref missing in /articles/get */}
          {/* ------------------------------------ */}
          <p className="small">{article?.comments?.length ?? `0`} comments</p>
        </div>
      </div>
    </div>
  );
};
