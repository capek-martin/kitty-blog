import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

/**
 * Loader component
 */
export const Loader = () => {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress
          color="inherit"
          style={{ height: "100px", width: "100px" }}
        />
      </Backdrop>
    </div>
  );
};
