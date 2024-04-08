// CommentContext.js
import React, { createContext, useState } from "react";
import { DATA } from "../data";

export const CommentContext = createContext();

const INITIAL_COMMENTS = [...DATA[0].comments];

export default function CommentProvider({ children }) {
  const [comments, setComments] = useState(INITIAL_COMMENTS);

  //   const addComment = (parentId, newComment) => {
  //     const updatedComments = comments.map((comment) => {
  //       if (comment.id === parentId) {
  //         return {
  //           ...comment,
  //           comments: [...comment.comments, newComment],
  //         };
  //       }
  //       return comment;
  //     });
  //     setComments(updatedComments);
  //   };

  return <CommentContext.Provider value={{ comments }}>{children}</CommentContext.Provider>;
}
