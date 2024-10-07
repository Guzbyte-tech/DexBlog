import { useParams } from "react-router-dom";
import post_image from "../../assets/post_1.jpg";
import image_2 from "../../assets/CkTMjoBO9.webp";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "How Monero Users Get Traced (RUN YOUR OWN NODE!",
    img: post_image,
    likes: 23,
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita quasi similique rerum, ab officia, quaerat ea autem eius perferendis temporibus odit possimus voluptas consequuntur adipisci officiis! Cupiditate accusamus quo blanditiis!"
  },
  {
    id: 2,
    title: "How Monero Users Get Traced (RUN YOUR OWN NODE!",
    img: image_2,
    likes: 23,
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita quasi similique rerum, ab officia, quaerat ea autem eius perferendis temporibus odit possimus voluptas consequuntur adipisci officiis! Cupiditate accusamus quo blanditiis!"
  },
  {
    id: 3,
    title: "How Monero Users Get Traced (RUN YOUR OWN NODE!",
    img: post_image,
    likes: 23,
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita quasi similique rerum, ab officia, quaerat ea autem eius perferendis temporibus odit possimus voluptas consequuntur adipisci officiis! Cupiditate accusamus quo blanditiis!"
  },
  {
    id: 4,
    title: "How Monero Users Get Traced (RUN YOUR OWN NODE!",
    img: post_image,
    likes: 23,
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita quasi similique rerum, ab officia, quaerat ea autem eius perferendis temporibus odit possimus voluptas consequuntur adipisci officiis! Cupiditate accusamus quo blanditiis!"
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  console.log("Blog ID", id);
  const post = blogPosts.find((post) => post.id == id);

  if (!post) {
    return <h2>Blog post not found</h2>;
  }
  return (
    <>
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 mx-auto mt-5">
        <h1 className="text-2xl font-bold text-center my-4">{post.title}</h1>
        <img src={post.img} alt="" className="" />
        <div className="mt-4">
            <p className="text-left">{post.text}</p>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
