import { format } from "date-fns";
import { Article } from "../../types/app/article.type";
import "./ArticleCard.scss";
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
        <div>{article?.title}</div>
        <div>{article?.perex}</div>
        <div>{format(new Date(article.createdAt), dateShowFormat)}</div>
        <div>
          <Button style={{ marginRight: 10 }} onClick={handleDetailRedirect}>
            Read whole article
          </Button>
          <span>{article?.comments?.length ?? `0`} comments</span>
        </div>
      </div>
    </div>
  );
};
