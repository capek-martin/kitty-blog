import "esm";
import "jest-extended";
import "jest-chain";
import "./src/__mocks__/router-mock";

// Mock hooks and external libraries
jest.mock("./src/components/ArticleCard/ArticleCard.style.scss", () => ({}));
jest.mock("./src/pages/Login/LoginPage.style.scss", () => ({}));
jest.mock("./src/pages/Comments/Comments.style.scss", () => ({}));
jest.mock("./src/pages/Article/Article.style.scss", () => ({}));
jest.mock("easymde/dist/easymde.min.css", () => ({}));
jest.mock("./src/api/axios");
jest.mock("react-toastify");

jest.mock("./src/api/axios", () => ({
  apiGet: jest.fn(),
  apiDelete: jest.fn(),
  apiPost: jest.fn(),
  apiPatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("./src/contexts/authContext", () => ({
  useAuth: jest.fn(),
}));
