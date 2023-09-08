import { LoginPage } from "../../pages/Login/LoginPage";
import { AboutPage } from "../../pages/About/About";
import { ArticleDetail } from "../../pages/Article/ArticleDetail";
import { ArticleCreate } from "../../pages/Article/ArticleCreate";
import { ArticleAdminPage } from "../../pages/Article/ArticleAdminPage";
import { ArticleEdit } from "../../pages/Article/ArticleEdit";
import { ArticlesPage } from "../../pages/Article/ArticlePage";

export interface AppRoute {
  path: string;
  component: React.ComponentType;
  isRestricted: boolean;
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
    isRestricted: false,
  },
  {
    path: `${paths.MY_ARTICLES}`,
    component: ArticleAdminPage,
    isRestricted: true,
  },
  {
    path: `${paths.ARTICLES}/new`,
    component: ArticleCreate,
    isRestricted: true,
  },
  {
    path: `${paths.ARTICLES}/edit/:id`,
    component: ArticleEdit,
    isRestricted: true,
  },
  {
    path: `${paths.ARTICLES}/:id`,
    component: ArticleDetail,
    isRestricted: false,
  },
  {
    path: paths.ABOUT,
    component: AboutPage,
    isRestricted: false,
  },
  {
    path: paths.LOGIN,
    component: LoginPage,
    isRestricted: false,
  },
];
