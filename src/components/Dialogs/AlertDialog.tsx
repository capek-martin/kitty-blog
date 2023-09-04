import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export interface DialogProps {
  open: boolean;
  title: string;
  content: string;
  handleClose: () => void;
  handleConfirm: () => void;
  hideButtons?: boolean;
}

/**
 * Alert dialog for (confirm delete etc.)
 */
export function AlertDialog({
  open,
  title,
  content,
  handleClose,
  handleConfirm,
  hideButtons,
}: DialogProps) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"xs"} fullWidth>
      <Box px={2} py={1}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box py={1}>{content}</Box>
        </DialogContent>
        {!hideButtons && (
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant={"outlined"}>
              Close
            </Button>
            <Button
              onClick={handleConfirm}
              color="primary"
              variant={"contained"}
            >
              Confirm
            </Button>
          </DialogActions>
        )}
      </Box>
    </Dialog>
  );
}
