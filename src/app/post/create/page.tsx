import PostForm from "@/components/post/post-form";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CreatePostPage() {
  return (
    <main className="py-10">
      <div className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">Create New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <PostForm />
        </CardContent>
      </div>
    </main>
  );
}

export default CreatePostPage;
