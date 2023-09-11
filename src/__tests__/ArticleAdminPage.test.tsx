import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import http from "../api/axios";
import { ArticleAdminPage } from "../pages/Article/ArticleAdminPage";
import "@testing-library/jest-dom";
import { paths } from "../utils/core/routes";
import { mockNavigate } from "../__mocks__/router-mock";

const mockArticles = [
  {
    articleId: "1",
    title: "Test Article 1",
    perex: "Test Perex 1",
    author: "Test Author 1",
    comments: 5,
  },
  {
    articleId: "2",
    title: "Test Article 2",
    perex: "Test Perex 2",
    author: "Test Author 2",
    comments: 3,
  },
];

// for MUI Datagrid resizeObserver issue
function ResizeObserverMock(callback: () => void) {
  let timeout: NodeJS.Timeout;
  return {
    disconnect: () => clearTimeout(timeout),
    observe: () => {
      timeout = setTimeout(callback);
    },
    unobserve: () => clearTimeout(timeout),
  };
}

describe("<ArticleAdminPage />", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders grid", async () => {
    const originalObserver = window.ResizeObserver;
    window.ResizeObserver = ResizeObserverMock as any;
    render(<ArticleAdminPage />);
    await screen.findAllByRole("row");
    window.ResizeObserver = originalObserver;
  });

  it("fetches and displays articles on mount", async () => {
    const mockArticles = [
      {
        articleId: "1",
        title: "Article 1",
        perex: "Perex 1",
        author: "Author 1",
        comments: 5,
      },
    ];

    (http.apiGet as jest.Mock).mockResolvedValueOnce({
      data: { items: mockArticles },
    });

    render(<ArticleAdminPage />);
    await waitFor(() =>
      expect(screen.getByText("Article 1")).toBeInTheDocument()
    );
  });

  jest.mock("../api/axios", () => ({
    apiGet: jest.fn().mockResolvedValue({ data: { items: mockArticles } }),
  }));

  it('navigates to create new article page on "Create new article" button click', () => {
    render(<ArticleAdminPage />);
    fireEvent.click(
      screen.getByRole("button", { name: /Create new article/i })
    );
    expect(mockNavigate).toHaveBeenCalledWith(`${paths.ARTICLES}/new`);
  });

  // TODO
  // show only if logged in
  // on edit click redirect to /articles/edit/:id
  // onClick delete btn confirm dialog shows
  // on confirm click show success notification
  // onSubmit send correct data, show notification, redirect
  // on upload image show notification, preview image, show image menu
});
