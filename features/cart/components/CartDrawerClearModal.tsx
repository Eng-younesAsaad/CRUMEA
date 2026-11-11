import React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export interface CartDrawerClearModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalCount: number;
}

export function CartDrawerClearModal({
  isOpen,
  onClose,
  onConfirm,
  totalCount,
}: CartDrawerClearModalProps): React.ReactElement {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Clear your basket?"
      description="Are you sure you want to remove all freshly baked treats from your cart? This action cannot be undone."
      size="sm"
      footer={
        <div className="flex items-center gap-2 w-full justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Keep Items
          </Button>
          <Button variant="destructive" size="sm" onClick={onConfirm}>
            Clear Cart
          </Button>
        </div>
      }
    >
      <div className="text-xs text-muted-foreground py-1">
        Items in your basket: <strong>{totalCount} treats</strong>.
      </div>
    </Modal>
  );
}
