"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { and, eq, ne } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";

export async function createPost(formData: FormData) {
  try {
    // get the current user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session?.user) {
      return {
        success: false,
        message: "You must be logged in to create a post.",
      };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;

    // implements a extra validation check
    if (!title || !description || !content) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    // create the slug from post title
    const slug = slugify(title);

    // check if the slug already exists
    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (existingPost) {
      return {
        success: false,
        message:
          "A post with the same title already exists. Please try a different title.",
      };
    }

    const [newPost] = await db
      .insert(posts)
      .values({
        title,
        description,
        content,
        slug,
        authorId: session.user.id,
      })
      .returning();

    // revalidate the homepage to get the latest posts
    revalidatePath("/");
    revalidatePath(`/posts/${newPost.slug}`);
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post created successfully.",
      slug,
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while creating the post.",
    };
  }
}

export async function updatePost(postId: number, formData: FormData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You Must logged in to edit a post!",
      };
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;

    if (!title || !description || !content) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    const slug = slugify(title);
    const existingPost = await db.query.posts.findFirst({
      where: and(eq(posts.slug, slug), ne(posts.id, postId)),
    });

    if (existingPost) {
      return {
        success: false,
        message: "A post with this title already exists",
      };
    }

    const post = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
    });

    if (post?.authorId !== session.user.id) {
      return {
        success: false,
        message: "You can only edit your own posts!",
      };
    }

    await db
      .update(posts)
      .set({
        title,
        description,
        content,
        slug,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, postId));

    revalidatePath("/");
    revalidatePath(`/post/${slug}`);
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post edited successfully",
      slug,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Failed to create new post",
    };
  }
}

export async function deletePost(postId: number) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        message: "You must logged in to delete post",
      };
    }

    const postToDelete = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
    });

    if (!postToDelete) {
      return {
        success: false,
        message: "Post not found",
      };
    }

    if (postToDelete?.authorId !== session.user.id) {
      return {
        success: false,
        message: "You can only delete your own posts!",
      };
    }

    await db.delete(posts).where(eq(posts.id, postId));

    revalidatePath("/");
    revalidatePath("/profile");

    return {
      success: true,
      message: "Post deleted successfully",
    };
  } catch (e) {
    return {
      success: false,
      message: "Failed to create new post",
    };
  }
}
