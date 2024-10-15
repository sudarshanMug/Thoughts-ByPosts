import { Link } from "react-router-dom";

export default function Post(props) {
  const post = props.post;
  const date = new Date(post.createdDate);
  const dateFormatted = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;

  return (
    <Link
      onClick={props.onClick}
      to={`/post/${post._id}`}
      className="list-group-item list-group-item-action"
    >
      <img className="avatar-tiny" src={post.author.avatar} alt="avatar" />{" "}
      <strong>{post.title}</strong>{" "}
      <span className="text-muted small">
        {" "}
        {!post.noAuthor && <>by {post.author.username}</>} on {dateFormatted}{" "}
      </span>
    </Link>
  );
}
