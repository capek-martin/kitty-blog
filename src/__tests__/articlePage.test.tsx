import { ArticlesPage } from "../pages/Article/ArticlePage";
import http from "../api/axios";
import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";

const mockArticles = [
  {
    title: "Article 1",
    content: "Content 1",
    createdAt: "2021-09-01",
  },
  {
    title: "Article 2",
    content: "Content 2",
    createdAt: "2021-09-02",
  },
];

describe("ArticlesPage", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(<ArticlesPage />);
    expect(getByText(/Recent articles/i)).toBeInTheDocument();
  });

  it("fetches and displays articles", async () => {
    // Mock the resolved value of apiGet
    (http.apiGet as jest.Mock).mockResolvedValue({
      data: {
        items: mockArticles,
      },
    });

    let container: any;
    await act(async () => {
      container = render(<ArticlesPage />);
    });

    // Check if articles are in the document
    expect(container.getByText("Article 1")).toBeInTheDocument();
    expect(container.getByText("Article 2")).toBeInTheDocument();
  });

  // TODO
  // onclick "Read whole article" redirect to /articles/:id
});
