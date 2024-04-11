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
    console.log(newComments);
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
        for (const reply of comment.replies) {
          if (reply.id === id) {
            comment.replies.splice(comment.replies.indexOf(reply), 1);
            return {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  ...reply,
                  content: newContent,
                },
              ],
            };
          }
        }
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
