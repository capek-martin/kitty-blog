import { ReactElement } from "react";
import { ArticlesPage } from "../../pages/Article/ArticlePage";
import { LoginPage } from "../../pages/Login/LoginPage";
import { AboutPage } from "../../pages/About/About";
import { ArticleDetail } from "../../pages/Article/ArticleDetail";
import { ArticleCreate } from "../../pages/Article/ArticleCreate";

interface AppRoute {
  path: string;
  component: ReactElement;
}

export const paths = {
  HOME: "/",
  ARTICLES: "/articles",
  MY_ARTICLES: "/my-articles",

  ABOUT: "/about",
  LOGIN: "/login",
};

export const routes: AppRoute[] = [
  {
    path: paths.HOME,
    component: <ArticlesPage />,
  },
  {
    path: `${paths.ARTICLES}/new`,
    component: <ArticleCreate />,
  },
  {
    path: `${paths.ARTICLES}/:id`,
    component: <ArticleDetail />,
  },
  {
    path: paths.ABOUT,
    component: <AboutPage />,
  },
  {
    path: paths.LOGIN,
    component: <LoginPage />,
  },
];
