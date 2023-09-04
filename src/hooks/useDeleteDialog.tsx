import { useState } from "react";

/**
 * Hook for confirmation of actions (delete etc.)
 */
export function useDeleteDialog() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<any | null>(null);

  const handleDeleteAttempt = (id: any) => {
    setIdToDelete(id);
    setOpen(true);
  };

  const handleCancelDeleteAttempt = () => {
    setIdToDelete(null);
    setOpen(false);
  };

  const handleConfirmDeleteAttempt = () => {
    setIdToDelete(null);
    setOpen(false);
  };

  return {
    isOpen,
    idToDelete,
    setDeleteAttempt: handleDeleteAttempt,
    cancelDeleteAttempt: handleCancelDeleteAttempt,
    confirmDeleteAttempt: handleConfirmDeleteAttempt,
  };
}
