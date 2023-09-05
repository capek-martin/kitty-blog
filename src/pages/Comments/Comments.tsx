import { useAuth } from "../../contexts/authContext";
import { Article } from "../../types/app/article.type";
import "./Comments.style.scss";
import http from "../../api/axios";
import { toast } from "react-toastify";
import { apiUrl } from "../../api/apiUrl";
import { useState } from "react";

interface Props {
  article: Article;
  refetch: () => void;
}

/**
 * Component managing article comments - creating and voting
 */
export const Comments = ({ article, refetch }: Props) => {
  const { user } = useAuth();
  const [comment, setComment] = useState<string>("");

  // submit on enter
  const handleAddComment = async () => {
    try {
      const response = await http.apiPost({
        url: `${apiUrl.COMMENTS}`,
        data: {
          articleId: article?.articleId,
          author: user?.email,
          content: comment,
        },
        /* data: {
          articleId: "7eacff24-8a08-4985-a449-f2b8e46b780d",
          title: "Lorem Ipsum",
          perex:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          imageId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          content:
            "# Lorem Ipsum\n**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.\n",
        }, */
      });
      if (response?.status === 200) {
        toast.success("Success");
        refetch();
      }
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  const handleUpVote = () => {};
  const handleDownVote = () => {};

  return (
    <div className="comments-container">
      <h2>Comments {`(${article?.comments.length})`}</h2>
      {/* avatar + input */}
      <div className="add-comment">
        <img
          className="avatar"
          src={user?.avatarSrc}
          alt={"avatar"}
          title={"avatar"}
          style={{ marginRight: 20 }}
        />
        <input
          id="title"
          type="text"
          placeholder="Join the discussion"
          style={{ width: "100%" }}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddComment();
          }}
        />
      </div>
      {/* other comments + votes */}
    </div>
  );
};
