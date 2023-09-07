import { useAuth } from "../../contexts/authContext";
import { Article } from "../../types/app/article.type";
import "./Comments.style.scss";
import http from "../../api/axios";
import { toast } from "react-toastify";
import { apiUrl } from "../../api/apiUrl";
import { useState } from "react";
import { Comment } from "../../types/app/comment.type";
import { differenceInHours, format, parseISO } from "date-fns";
import { dateShowFormat } from "../../utils/core/date.types";
import { Divider } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
interface Props {
  article: Article;
  refetch: () => void;
}

/**
 * Component managing article comments - creating and voting
 *
 * I had problem with calling comments API so i created some temp data just to show how it might look like
 *
 */
export const Comments = ({ article, refetch }: Props) => {
  const { user } = useAuth();
  const [comment, setComment] = useState<string>("");

  /**
   * handles adding comments - submit on enter
   */
  const handleAddComment = async () => {
    try {
      const response = await http.apiPost({
        url: `${apiUrl.COMMENTS}`,
        data: {
          articleId: article?.articleId,
          author: user?.email,
          content: comment,
        },
      });
      if (response?.status === 200) {
        toast.success("Success");
        refetch();
      }
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  /**
   * Handles comment voting
   * @param commentId
   * @param direction
   */
  const handleVote = async (commentId: string, direction: "up" | "down") => {
    try {
      const response = await http.apiPost({
        url: `${apiUrl.COMMENTS}/${commentId}/vote/${direction}`,
      });
      if (response?.status === 200) {
        toast.success("Success");
        refetch();
      }
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  /**
   * Problem with api call - temporary data
   */
  const comments: Comment[] = [
    {
      commentId: "4854fca7-0b5e-4d7a-b237-6d7deec3bd2d",
      articleId: "4854fca7-0b5e-4d7a-b237-6d7deec3bd2d",
      author: "Jan Novak",
      content:
        "This article is good. This article is on point and very inspirational. This article is on point and very inspirational. This article is on point and very inspirational. This article is on point and very inspirational. This article is on point and very inspirational. This article is on point and very inspirational.",
      postedAt: "2023-07-07T14:02:26.459Z",
      score: 42,
    },
    {
      commentId: "4854fca7-0b5e-4d7a-b237-6d7deec3bd2d",
      articleId: "4854fca7-0b5e-4d7a-b237-6d7deec3bd2d",
      author: "Joseph Nonis",
      content:
        "This article is on point and very inspirational. This article is on point and very inspirational. This article is on point and very inspirational. This article is on point and very inspirational. This article is on point and very inspirational. This article is on point and very inspirational.",
      postedAt: "2023-09-07T11:02:26.459Z",
      score: 21,
    },
  ];

  /**
   * Return hour difference if DH < 24 or date
   */
  const getTimeDiff = (time: string) => {
    const parsedTime = parseISO(time);
    const current = new Date();
    const hourDifference = differenceInHours(current, parsedTime);
    if (hourDifference > 24)
      return `added on ${format(parsedTime, dateShowFormat)}`;
    return `${hourDifference} hours ago`;
  };

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
      <div className="other-comments">
        {comments.map((c: Comment, index: number) => {
          return (
            <div className="comment-item" key={index}>
              <div>
                <img
                  className="avatar"
                  src={user?.avatarSrc}
                  alt={"avatar"}
                  title={"avatar"}
                />
              </div>
              <div>
                <div className="comment-content">
                  <div>
                    <div className="comment-heading">
                      <p className="body bold">{c.author}</p>
                      <p className="small comment-created">
                        {getTimeDiff(c.postedAt)}
                      </p>
                    </div>
                    <p className="body">{c.content}</p>
                  </div>
                </div>
                <div className="comment-vote">
                  <span>
                    {c.score > 0 ? `+` : `-`}
                    {c.score}
                  </span>
                  <Divider orientation="vertical" flexItem />
                  <KeyboardArrowDownIcon
                    onClick={() => handleVote(c.commentId, "down")}
                    className="vote-arrow"
                    color="action"
                  />
                  <Divider orientation="vertical" flexItem />
                  <KeyboardArrowUpIcon
                    onClick={() => handleVote(c.commentId, "up")}
                    className="vote-arrow"
                    color="action"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
