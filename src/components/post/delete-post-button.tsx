"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DeletePostButtonProps } from "@/lib/types";
import { deletePost } from "@/actions/post-actions";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

function DeletePostButton({ postId }: DeletePostButtonProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState<boolean>();

  const handleDelete = async () => {
    setIsDeleting(false);

    try {
      const res = await deletePost(postId);

      if (res.success) {
        toast(res.message);

        router.push("/");
        router.refresh();
      } else {
        toast(res.message);
      }
    } catch (e) {
      toast("An error occurred while deleting the post! Please try again");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        disabled={isDeleting}
        onClick={handleDelete}
      >
        <Trash2 className="size-4 mr-2" />
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </>
  );
}

export default DeletePostButton;
