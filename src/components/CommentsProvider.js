// CommentContext.js
import React, { createContext, useState } from "react";
import { DATA } from "../data";

export const CommentContext = createContext();

const INITIAL_COMMENTS = [...DATA[0].comments];

function CommentsProvider({ children }) {
  const [comments, setComments] = useState(INITIAL_COMMENTS);

  function addComment(newComment, parentId, username) {
    const currentComment = {
      id: crypto.randomUUID(),
      content: newComment,
      createdAt: "now",
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
    const updatedComments = comments.filter((comment) => comment.id !== id);
    setComments(updatedComments);
  }

  function editComment(id, newContent) {
    console.log(newContent);
    const updatedComments = comments.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          content: newContent,
        };
      }
      return comment;
    });
    setComments(updatedComments);
  }

  return (
    <CommentContext.Provider value={{ comments, addComment, deleteComment, editComment }}>
      {children}
    </CommentContext.Provider>
  );
}

export default CommentsProvider;
