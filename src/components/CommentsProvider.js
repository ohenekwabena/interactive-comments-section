// CommentContext.js
import React, { createContext, useState } from "react";
import { DATA } from "../data";

export const CommentContext = createContext();

const INITIAL_COMMENTS = [...DATA[0].comments];

function CommentsProvider({ children }) {
  const [comments, setComments] = useState(INITIAL_COMMENTS);

  function addComment(newComment, parentId, username) {
    const currentComment = {
      id: Math.floor(Math.random() * 1000),
      content: newComment,
      createdAt: new Date().toString(),
      score: 0,
      user: DATA[0].currentUser,
      replies: [],
      replyingTo: username,
    };

    if (parentId === null) {
      setComments([...comments, currentComment]); //When adding a new comment
    } else {
      const updatedComments = comments.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, currentComment],
          };
        }
        return comment;
      });
      setComments(updatedComments);
    }
  }

  function deleteComment(id) {
    const newComments = [...comments];

    for (const element of newComments) {
      if (element.id === id) {
        newComments.splice(newComments.indexOf(element), 1);
        break;
      }
      if (element.replies.length > 0) {
        for (const reply of element.replies) {
          if (reply.id === id) {
            element.replies.splice(element.replies.indexOf(reply), 1);
            break;
          }
        }
      }
    }
    setComments(newComments);
  }

  function editComment(id, newContent) {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          content: newContent,
        };
      }

      if (comment.replies.length > 0) {
        if (comment.replies.length > 0) {
          const replyIndex = comment.replies.findIndex((reply) => reply.id === id);
          if (replyIndex !== -1) {
            return {
              ...comment,
              replies: [
                ...comment.replies.slice(0, replyIndex),
                { ...comment.replies[replyIndex], content: newContent },
                ...comment.replies.slice(replyIndex + 1),
              ],
            };
          }
        }
      }
      return comment;
    });
    setComments(updatedComments);
  }

  function changeScore(id, direction) {
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        if (direction === "up") {
          return {
            ...comment,
            score: comment.score + 1,
          };
        } else if (direction === "down") {
          return {
            ...comment,
            score: Math.max(0, comment.score - 1),
          };
        }
      }
      if (comment.replies.length > 0) {
        return {
          ...comment,
          replies: comment.replies.map((innerReply) =>
            innerReply.id === id
              ? { ...innerReply, score: Math.max(0, innerReply.score + (direction === "up" ? 1 : -1)) }
              : innerReply
          ),
        };
      }

      return comment;
    });

    setComments(updatedComments);
  }

  function updateTimeSincePosted(date) {
    const now = new Date();

    const then = new Date(date);
    const delta = now - then;

    const seconds = Math.floor(delta / 1000) % 60;
    const minutes = Math.floor(delta / (1000 * 60)) % 60;
    const hours = Math.floor(delta / (1000 * 60 * 60)) % 24;
    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(delta / (1000 * 60 * 60 * 24 * 7));
    const months = Math.floor(delta / (1000 * 60 * 60 * 24 * 30));
    const years = Math.floor(delta / (1000 * 60 * 60 * 24 * 365));

    let timeSincePosted;
    switch (true) {
      case years > 0:
        timeSincePosted = `${years} year${years > 1 ? "s ago" : " ago"}`;
        break;
      case months > 0:
        timeSincePosted = `${months} month${months > 1 ? "s ago" : " ago"}`;
        break;
      case weeks > 0:
        timeSincePosted = `${weeks} week${weeks > 1 ? "s ago" : " ago"}`;
        break;
      case days > 0:
        timeSincePosted = `${days} day${days > 1 ? "s ago" : " ago"}`;
        break;
      case hours > 0:
        timeSincePosted = `${hours} hour${hours > 1 ? "s ago" : " ago"}`;
        break;
      case minutes > 0:
        timeSincePosted = `${minutes} minute${minutes > 1 ? "s ago" : " ago"}`;
        break;
      default:
        timeSincePosted = seconds < 10 ? "just now" : `${seconds} second${seconds > 1 ? "s ago" : " ago"}`;
    }

    return timeSincePosted;
  }

  return (
    <CommentContext.Provider
      value={{ comments, addComment, deleteComment, editComment, changeScore, updateTimeSincePosted }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export default CommentsProvider;
