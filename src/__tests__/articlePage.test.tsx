jest.mock("../components/ArticleCard/ArticleCard.style.scss", () => ({}));
jest.mock("../pages/Login/LoginPage.style.scss", () => ({}));
jest.mock("../pages/Comments/Comments.style.scss", () => ({}));
jest.mock("../pages/Article/Article.style.scss", () => ({}));
jest.mock("easymde/dist/easymde.min.css", () => ({}));

import { render } from "@testing-library/react";
import { ArticlesPage } from "../pages/Article/ArticlePage";
import "@testing-library/jest-dom";

test("renders the component", () => {
  const { getByText } = render(<ArticlesPage />);
  const textElement = getByText(/Recent article/i);
  expect(textElement).toBeInTheDocument();
});
