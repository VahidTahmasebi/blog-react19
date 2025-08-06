"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createPost, updatePost } from "@/actions/post-actions";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(255, "Title must be at most 255 characters long"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long")
    .max(255, "Description must be at most 255 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
});

interface PostFormProps {
  isEditing?: boolean;
  post?: {
    id: number;
    title: string;
    description: string;
    content: string;
    slug: string;
  };
}

type PostFormValues = z.infer<typeof postSchema>;

function PostForm({ isEditing, post }: PostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues:
      (isEditing ?? post)
        ? {
            title: post?.title,
            description: post?.description,
            content: post?.content,
          }
        : {
            title: "",
            description: "",
            content: "",
          },
  });

  const onFromSubmit = async (data: PostFormValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("content", data.content);

        let res;

        if (isEditing && post) {
          res = await updatePost(post.id, formData);
        } else {
          res = await createPost(formData);
        }

        if (res.success) {
          toast(
            isEditing
              ? "Post edited successfully"
              : "Post created successfully",
          );
          router.refresh();
          router.push("/");
        } else {
          toast.error(res.message || "Failed to create post");
        }
      } catch (e) {
        toast("Failed to created post");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onFromSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title">Title</label>
        <Input
          {...register("title")}
          id="title"
          placeholder="Enter post title"
          disabled={isPending}
        />
        {errors.title && (
          <p className="text-sm text-red-700">{errors.title.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <label htmlFor="description">Description</label>
        <Textarea
          {...register("description")}
          id="description"
          placeholder="Enter a short post description"
          disabled={isPending}
        />
        {errors.description && (
          <p className="text-sm text-red-700">{errors.description.message}</p>
        )}
      </div>
      <div className="space-y-20">
        <label htmlFor="content">Content</label>
        <Textarea
          {...register("content")}
          id="content"
          placeholder="Enter post content"
          className="min-h-[250px] resize-none"
          disabled={isPending}
        />
        {errors.content && (
          <p className="text-sm text-red-700">{errors.content.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full mt-5">
        {isPending
          ? "Saving Post..."
          : isEditing
            ? "Update Post"
            : "Create Post"}
      </Button>
    </form>
  );
}

export default PostForm;
