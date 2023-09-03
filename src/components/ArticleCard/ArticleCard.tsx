import { format } from "date-fns";
import { Article } from "../../types/app/article.type";
import "./Article.scss";
import { dateShowFormat } from "../../utils/core/date.types";
import { useNavigate } from "react-router-dom";
import { paths } from "../../utils/core/routes";
import { Button } from "@mui/material";

interface Props {
  article: Article;
}

/**
 * Article component
 */
export const ArticleCard = ({ article }: Props) => {
  const navigate = useNavigate();

  /* Redirect to article detail page */
  const handleDetailRedirect = () => {
    navigate(`${paths.ARTICLES}/${article.articleId}`);
  };

  return (
    <div className="card">
      <div className="image">
        <img src={"/gato-placeholder.png"} alt="placeholder" />
      </div>
      <div className="content">
        <div>{article.title}</div>
        <div>{article.perex}</div>
        <div>{format(new Date(article.createdAt), dateShowFormat)}</div>
        <div>
          <Button style={{ marginRight: 10 }} onClick={handleDetailRedirect}>
            Read whole article
          </Button>
          <span>x comments</span>
        </div>
      </div>
    </div>
  );
};
