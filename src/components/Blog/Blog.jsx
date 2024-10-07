import post_image from "../../assets/post_1.jpg";
import image_2 from "../../assets/CkTMjoBO9.webp";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "How Monero Users Get Traced (RUN YOUR OWN NODE!",
      img: post_image,
      likes: 23,
    },
    {
      id: 2,
      title: "How Monero Users Get Traced (RUN YOUR OWN NODE!",
      img: image_2,
      likes: 23,
    },
    {
      id: 3,
      title: "How Monero Users Get Traced (RUN YOUR OWN NODE!",
      img: post_image,
      likes: 23,
    },
    {
      id: 4,
      title: "How Monero Users Get Traced (RUN YOUR OWN NODE!",
      img: post_image,
      likes: 23,
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 text-dark">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white-500 rounded-lg shadow-md p-4">
            <img
              src={blog.img}
              alt="Card 1 image"
              className="rounded-t-lg object-cover w-full h-50"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">
                <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
              </h3>
              <p className="text-sm text-gray-700 mb-4">Likes 35</p>
              <p className="text-sm text-gray-500">Today • 11m ago</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blog;
