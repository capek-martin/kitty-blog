import { ReactElement } from "react";
import { LoginPage } from "../../pages/Login/LoginPage";
import { AboutPage } from "../../pages/About/About";
import { ArticleDetail } from "../../pages/Article/ArticleDetail";
import { ArticleCreate } from "../../pages/Article/ArticleCreate";
import { ArticleAdminPage } from "../../pages/Article/ArticleAdminPage";
import { ArticleEdit } from "../../pages/Article/ArticleEdit";
import { ArticlesPage } from "../../pages/Article/ArticlePage";

interface AppRoute {
  path: string;
  component: React.FC;
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
    component: ArticlesPage,
  },
  {
    path: `${paths.MY_ARTICLES}`,
    component: ArticleAdminPage,
  },
  {
    path: `${paths.ARTICLES}/new`,
    component: ArticleCreate,
  },
  {
    path: `${paths.ARTICLES}/edit/:id`,
    component: ArticleEdit,
  },
  {
    path: `${paths.ARTICLES}/:id`,
    component: ArticleDetail,
  },
  {
    path: paths.ABOUT,
    component: AboutPage,
  },
  {
    path: paths.LOGIN,
    component: LoginPage,
  },
];
