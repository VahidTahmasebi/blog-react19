// get all posts

import { desc } from "drizzle-orm";
import { db } from ".";
import { posts } from "./schema";

export async function getAllPosts() {
  try {
    const getAllPosts = await db.query.posts.findMany({
      orderBy: [desc(posts.createdAt)],
      with: {
        author: true,
      },
    });

    return getAllPosts;
  } catch (e) {
    console.log(e);
    return [];
  }
}
