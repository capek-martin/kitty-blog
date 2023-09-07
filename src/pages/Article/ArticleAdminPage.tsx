import { useEffect, useState } from "react";
import http from "../../api/axios";
import { apiUrl } from "../../api/apiUrl";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Loader } from "../../components/Loader/Loader";
import { Button } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import { paths } from "../../utils/core/routes";
import { toast } from "react-toastify";
import { AlertDialog } from "../../components/Dialogs/AlertDialog";
import { useDeleteDialog } from "../../hooks/useDeleteDialog";

/**
 * Admin view and CRUD of articles
 */
export const ArticleAdminPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<any>();

  const {
    isOpen: isDeleteDialogOpen,
    idToDelete,
    setDeleteAttempt,
    cancelDeleteAttempt,
    confirmDeleteAttempt,
  } = useDeleteDialog();

  const getArticles = async () => {
    const response = await http.apiGet({
      url: `${apiUrl.ARTICLES}`,
    });
    if (response?.data && response?.data.items)
      setArticles(response.data.items);
  };

  useEffect(() => {
    getArticles();
  }, []);

  /**
   * Redirect to create article page
   */
  const handleCreate = () => {
    navigate(`${paths.ARTICLES}/new`);
  };

  /**
   * Redirect to edit article page
   */
  const handleEdit = (id: string) => {
    navigate(`${paths.ARTICLES}/edit/${id}`);
  };

  /**
   * Confirmed --> Delete selected article
   */
  const handleRemoveItem = async () => {
    if (!idToDelete) return;
    try {
      const response = await http.apiDelete({
        url: `${apiUrl.ARTICLES}/${idToDelete}`,
      });
      if (response?.status === 204) {
        toast.success("Success!");
        confirmDeleteAttempt();
        getArticles();
      }
    } catch (err) {
      toast.error("error");
    }
  };

  /**
   * Launch confirmation dialog for delete
   */
  const handleOnDelete = (id: number) => setDeleteAttempt(id);

  const columns: GridColDef[] = [
    { field: "title", headerName: "Article title", flex: 1 },
    { field: "perex", headerName: "Perex", flex: 1 },
    { field: "author", headerName: "Author", flex: 1 },
    {
      field: "comments",
      headerName: "# of comments",
      flex: 1,
    },
    {
      field: " ",
      headerName: "Actions",
      sortable: false,
      disableColumnMenu: true,
      minWidth: 120,
      renderCell: (p: any) => {
        const iconStyle = { minWidth: 30, color: "#000" };
        return (
          <>
            <Button onClick={() => handleEdit(p.id)} style={iconStyle}>
              <EditOutlinedIcon />
            </Button>
            <Button onClick={() => handleOnDelete(p.id)} style={iconStyle}>
              <DeleteOutlineIcon />
            </Button>
          </>
        );
      },
    },
  ];

  if (!articles) return <Loader />;
  return (
    <>
      <div
        className="page-header"
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <h1>My articles</h1>
        <Button
          onClick={handleCreate}
          variant="contained"
          style={{ marginLeft: "2rem" }}
        >
          Create new article
        </Button>
      </div>

      <div style={{ height: "70vh", width: "100%" }}>
        <DataGrid
          rows={articles}
          columns={columns}
          getRowId={(row) => row?.articleId}
          sx={{ "&": { border: "none" } }}
          hideFooter
          checkboxSelection
        />
      </div>
      <AlertDialog
        open={isDeleteDialogOpen}
        title={"Delete"}
        content={"Are you sure, you want to delete this article?"}
        handleClose={cancelDeleteAttempt}
        handleConfirm={handleRemoveItem}
      />
    </>
  );
};
