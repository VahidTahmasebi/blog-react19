"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
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
