import { useEffect, useState } from "react";
import http from "../../api/axios";
import { apiUrl } from "../../api/apiUrl";
import { Article } from "../../types/app/article.type";
import { ArticleCard } from "../../components/ArticleCard/ArticleCard";

/**
 * Main view of articles
 */
export const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>();

  const getArticles = async () => {
    const response = await http.apiGet({
      url: `${apiUrl.ARTICLES}`,
    });
    if (response?.data && response?.data.items) {
      // sord desc by date of creation
      const sortedArr = response?.data.items.sort((a: Article, b: Article) => {
        const dateA = new Date(a.createdAt) as any;
        const dateB = new Date(b.createdAt) as any;
        return dateB - dateA;
      });

      setArticles(sortedArr);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      <div className="page-header">
        <h1>Recent articles</h1>
      </div>
      <>
        {articles &&
          articles?.map((article: Article, index: number) => (
            <div key={index} style={{ marginBottom: "1.5rem" }}>
              <ArticleCard article={article} />
            </div>
          ))}
      </>
    </>
  );
};
