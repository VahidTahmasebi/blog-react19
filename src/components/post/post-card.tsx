import Link from "next/link";
import { PostCardProps } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <Link href={`/post/${post.slug}`} className="hover:underline">
          <CardTitle className="text-2xl">{post.title}</CardTitle>
        </Link>
        <CardDescription>
          By {post.author.name} - {formatDate(post.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        {post.description}
      </CardContent>
    </Card>
  );
}

export default PostCard;
