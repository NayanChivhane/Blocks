import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const {loading, blogs } =useBlogs();
  if (loading){
    return <div>
      <div>
      <Appbar/>
      </div>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
      <BlogSkeleton/>
    </div>
  }
  return  <div>
        <Appbar/>
      <div className="flex justify-center">
        <div className="">
          {blogs.map(blog =><BlogCard
            id={blog.id}
            authorName={blog.author.name || "Annoynomous"}
            title={
              blog.title
            }
            content={
              blog.content
            }
            publishedDate={"2nd feb 2024"}
          /> )}
          
          
        </div>
      </div>
    </div>
  
};
