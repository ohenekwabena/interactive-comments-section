var $ltMAx$reactjsxruntime = require("react/jsx-runtime");
var $ltMAx$reactdomclient = require("react-dom/client");
var $ltMAx$styledcomponents = require("styled-components");
var $ltMAx$react = require("react");
var $ltMAx$radixuireactdialog = require("@radix-ui/react-dialog");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}







// CommentContext.js












const $43ca0aa998cdd2c5$export$15a2497367026b23 = [
    {
        currentUser: {
            image: {
                png: {},
                webp: {}
            },
            username: "juliusomo"
        },
        comments: [
            {
                id: 1,
                content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
                createdAt: "Monday March 11, 2024",
                score: 12,
                user: {
                    image: {
                        png: {},
                        webp: {}
                    },
                    username: "amyrobson"
                },
                replies: []
            },
            {
                id: 2,
                content: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
                createdAt: "Thursday March 28, 2024",
                score: 5,
                user: {
                    image: {
                        png: {},
                        webp: {}
                    },
                    username: "maxblagun"
                },
                replies: [
                    {
                        id: 3,
                        content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                        createdAt: "Thursday April 04, 2024",
                        score: 4,
                        replyingTo: "maxblagun",
                        user: {
                            image: {
                                png: {},
                                webp: {}
                            },
                            username: "ramsesmiron"
                        }
                    },
                    {
                        id: 4,
                        content: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                        createdAt: "Tuesday April 09, 2024",
                        score: 2,
                        replyingTo: "ramsesmiron",
                        user: {
                            image: {
                                png: {},
                                webp: {}
                            },
                            username: "juliusomo"
                        }
                    }
                ]
            }
        ]
    }
];


const $4989780cd05c3303$export$f70cbd0dcaa225fc = /*#__PURE__*/ (0, $ltMAx$react.createContext)();
const $4989780cd05c3303$var$INITIAL_COMMENTS = [
    ...(0, $43ca0aa998cdd2c5$export$15a2497367026b23)[0].comments
];
function $4989780cd05c3303$var$getInitialState() {
    const comments = localStorage.getItem("comments");
    return comments ? JSON.parse(comments) : $4989780cd05c3303$var$INITIAL_COMMENTS;
}
function $4989780cd05c3303$var$CommentsProvider({ children: children }) {
    const [comments, setComments] = (0, $ltMAx$react.useState)($4989780cd05c3303$var$getInitialState);
    (0, $ltMAx$react.useEffect)(()=>{
        localStorage.setItem("comments", JSON.stringify(comments));
    }, [
        comments
    ]);
    function addComment(newComment, parentId, username) {
        const currentComment = {
            id: Math.floor(Math.random() * 1000),
            content: newComment,
            createdAt: new Date().toString(),
            score: 0,
            user: (0, $43ca0aa998cdd2c5$export$15a2497367026b23)[0].currentUser,
            replies: [],
            replyingTo: username
        };
        if (parentId === null) setComments([
            ...comments,
            currentComment
        ]); //When adding a new comment
        else {
            const updatedComments = comments.map((comment)=>{
                if (comment.id === parentId) return {
                    ...comment,
                    replies: [
                        ...comment.replies,
                        currentComment
                    ]
                };
                return comment;
            });
            setComments(updatedComments);
        }
    }
    function deleteComment(id) {
        const newComments = [
            ...comments
        ];
        for (const element of newComments){
            if (element.id === id) {
                newComments.splice(newComments.indexOf(element), 1);
                break;
            }
            if (element.replies.length > 0) {
                for (const reply of element.replies)if (reply.id === id) {
                    element.replies.splice(element.replies.indexOf(reply), 1);
                    break;
                }
            }
        }
        setComments(newComments);
    }
    function editComment(id, newContent) {
        const updatedComments = comments.map((comment)=>{
            if (comment.id === id) return {
                ...comment,
                content: newContent
            };
            if (comment.replies.length > 0) {
                if (comment.replies.length > 0) {
                    const replyIndex = comment.replies.findIndex((reply)=>reply.id === id);
                    if (replyIndex !== -1) return {
                        ...comment,
                        replies: [
                            ...comment.replies.slice(0, replyIndex),
                            {
                                ...comment.replies[replyIndex],
                                content: newContent
                            },
                            ...comment.replies.slice(replyIndex + 1)
                        ]
                    };
                }
            }
            return comment;
        });
        setComments(updatedComments);
    }
    function changeScore(id, direction) {
        const updatedComments = comments.map((comment)=>{
            if (comment.id === id) {
                if (direction === "up") return {
                    ...comment,
                    score: comment.score + 1
                };
                else if (direction === "down") return {
                    ...comment,
                    score: Math.max(0, comment.score - 1)
                };
            }
            if (comment.replies.length > 0) return {
                ...comment,
                replies: comment.replies.map((innerReply)=>innerReply.id === id ? {
                        ...innerReply,
                        score: Math.max(0, innerReply.score + (direction === "up" ? 1 : -1))
                    } : innerReply)
            };
            return comment;
        });
        setComments(updatedComments);
    }
    function updateTimeSincePosted(date) {
        const now = new Date();
        const then = new Date(date);
        const delta = now - then;
        const seconds = Math.floor(delta / 1000) % 60;
        const minutes = Math.floor(delta / 60000) % 60;
        const hours = Math.floor(delta / 3600000) % 24;
        const days = Math.floor(delta / 86400000);
        const weeks = Math.floor(delta / 604800000);
        const months = Math.floor(delta / 2592000000);
        const years = Math.floor(delta / 31536000000);
        let timeSincePosted;
        switch(true){
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
    return /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($4989780cd05c3303$export$f70cbd0dcaa225fc.Provider, {
        value: {
            comments: comments,
            addComment: addComment,
            deleteComment: deleteComment,
            editComment: editComment,
            changeScore: changeScore,
            updateTimeSincePosted: updateTimeSincePosted
        },
        children: children
    });
}
var $4989780cd05c3303$export$2e2bcd8739ae039 = $4989780cd05c3303$var$CommentsProvider;






var $e773f055c23aee79$exports = {};
$e773f055c23aee79$exports = new URL("icon-plus.a3857269.svg", "file:" + __filename).toString();


var $f1881934e53cfa89$exports = {};
$f1881934e53cfa89$exports = new URL("icon-minus.708e3f60.svg", "file:" + __filename).toString();


var $2153c706e8b7b2b7$exports = {};
$2153c706e8b7b2b7$exports = new URL("icon-reply.eea955d0.svg", "file:" + __filename).toString();


var $354cf25a3a2d11a7$exports = {};
$354cf25a3a2d11a7$exports = new URL("icon-edit.324a8a79.svg", "file:" + __filename).toString();


var $54facc535acf928a$exports = {};
$54facc535acf928a$exports = new URL("icon-delete.847c326f.svg", "file:" + __filename).toString();




function $1fb5b12740d48b11$export$2e2bcd8739ae039({ children: children }) {
    return /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($1fb5b12740d48b11$var$Wrapper, {
        children: children
    });
}
const $1fb5b12740d48b11$var$Wrapper = (0, $ltMAx$styledcomponents.styled).section`
  padding-left: clamp(1rem, 1.7vw + 0.5rem, 2rem);
  border-left: 2px solid var(--light-gray);
  margin-left: clamp(0rem, 3.3vw - 1rem, 2rem);
`;







var $cb5b8057e7005340$export$2e2bcd8739ae039 = (0, ($parcel$interopDefault($ltMAx$styledcomponents))).button`
  display: ${(props)=>props.display || "block"};
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;

  &:focus {
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;




function $7223cd352ab12b38$var$AddComment({ username: username, isReplying: isReplying, parentId: parentId, replying: replying }) {
    const { addComment: addComment } = (0, $ltMAx$react.useContext)((0, $4989780cd05c3303$export$f70cbd0dcaa225fc));
    const [userComment, setUserComment] = (0, $ltMAx$react.useState)("");
    function postComment() {
        if (userComment === "") {
            if (replying) isReplying(false);
            return;
        }
        if (replying) {
            addComment(userComment, parentId, username);
            isReplying(false);
            setUserComment(" ");
            return;
        }
        addComment(userComment, null, username);
        setUserComment(" ");
    }
    return /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)($7223cd352ab12b38$var$Wrapper, {
        children: [
            /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($7223cd352ab12b38$var$ReplyAvatar, {
                src: (0, $43ca0aa998cdd2c5$export$15a2497367026b23)[0].currentUser.image.png,
                alt: ""
            }),
            /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($7223cd352ab12b38$export$ff12dac22e82373d, {
                placeholder: "Add a comment...",
                onChange: (e)=>setUserComment(e.target.value),
                value: userComment
            }),
            /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($7223cd352ab12b38$var$Button, {
                onClick: postComment,
                children: "Send"
            })
        ]
    });
}
const $7223cd352ab12b38$var$Wrapper = (0, $ltMAx$styledcomponents.styled).section`
  display: grid;
  align-items: center;
  grid-template: auto auto / auto 1fr auto;
  gap: 1rem;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  background-color: var(--white);
  border-radius: 0.6rem;

  @media (min-width: 29.688rem) {
    grid-template: auto 1fr / auto 1fr auto;
    align-items: end;
  }
`;
const $7223cd352ab12b38$export$ff12dac22e82373d = (0, $ltMAx$styledcomponents.styled).textarea`
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  min-height: 100px;
  resize: none;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--light-gray);
  font-family: "Rubik";
  font-size: 1rem;
  color: var(--grayish-blue);

  &::placeholder {
    font-size: 1rem;
  }

  &:focus {
    outline: none;
    border: 1.5px solid var(--moderate-blue);
  }

  @media (min-width: 29.688rem) {
    grid-column: 2 / 3;
    grid-row: 1 / 3;
  }
`;
const $7223cd352ab12b38$var$ReplyAvatar = (0, $ltMAx$styledcomponents.styled)((0, $99628b6027f3560d$export$e2255cf6045e8d47))`
  grid-column: 1 / 2;
  grid-row: 2 / 3;

  @media (min-width: 29.688rem) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
`;
const $7223cd352ab12b38$var$Button = (0, $ltMAx$styledcomponents.styled)((0, $cb5b8057e7005340$export$2e2bcd8739ae039))`
  grid-column: 3 / 4;
  grid-row: 2 / 3;
  background: var(--moderate-blue);
  color: var(--white);
  padding: 0.5rem 1.4rem;
  border-radius: 0.5rem;
  font-family: "Rubik";
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background: var(--light-grayish-blue);
  }

  @media (min-width: 29.688rem) {
    grid-column: 3 / 4;
    grid-row: 1 /2;
    transform: translateY(2px);
  }
`;
var $7223cd352ab12b38$export$2e2bcd8739ae039 = $7223cd352ab12b38$var$AddComment;









function $44edc83e43ddb4d3$var$EditComment({ id: id, replyingTo: replyingTo, setIsEditing: setIsEditing }) {
    const { comments: comments, editComment: editComment } = (0, $ltMAx$react.useContext)((0, $4989780cd05c3303$export$f70cbd0dcaa225fc));
    let selectedComment;
    for (const element of comments){
        if (element.id === id) {
            selectedComment = element;
            break;
        }
        if (element.replies.length > 0) {
            for (const reply of element.replies)if (reply.id === id) {
                selectedComment = reply;
                break;
            }
        }
    }
    const INITIAL_COMMENT = selectedComment.content;
    const [editedComment, setEditedComment] = (0, $ltMAx$react.useState)(INITIAL_COMMENT);
    function updatedComment() {
        if (editedComment === "") {
            editComment(id, INITIAL_COMMENT);
            setIsEditing(false);
            return;
        }
        editComment(id, editedComment);
        setEditedComment("");
        setIsEditing(false);
    }
    return /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)($44edc83e43ddb4d3$var$Wrapper, {
        children: [
            /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)((0, $7223cd352ab12b38$export$ff12dac22e82373d), {
                value: editedComment,
                onChange: (e)=>setEditedComment(e.target.value)
            }),
            /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($44edc83e43ddb4d3$var$Button, {
                onClick: updatedComment,
                children: "Update"
            })
        ]
    });
}
const $44edc83e43ddb4d3$var$Wrapper = (0, $ltMAx$styledcomponents.styled).div`
  display: grid;
  grid-template: 1fr auto/ 1fr auto;
  gap: 1rem;

  & ${(0, $7223cd352ab12b38$export$ff12dac22e82373d)} {
    grid-column: 1 / -1;
    grid-row: 1 / 2;
    min-height: 150px;
  }
`;
const $44edc83e43ddb4d3$var$Button = (0, $ltMAx$styledcomponents.styled)((0, $cb5b8057e7005340$export$2e2bcd8739ae039))`
  background: var(--moderate-blue);
  color: var(--white);
  padding: 0.5rem 1.4rem;
  border-radius: 0.5rem;
  font-family: "Rubik";
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background: var(--light-grayish-blue);
  }

  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;
var $44edc83e43ddb4d3$export$2e2bcd8739ae039 = $44edc83e43ddb4d3$var$EditComment;








function $06de7fa1f7e4d835$var$DeleteComment({ id: id, setConfirmDelete: setConfirmDelete, confirmDelete: confirmDelete }) {
    const { deleteComment: deleteComment } = (0, $ltMAx$react.useContext)((0, $4989780cd05c3303$export$f70cbd0dcaa225fc));
    function cancelDelete() {
        setConfirmDelete(false);
    }
    function handleDeleteComment(id) {
        deleteComment(id);
        setConfirmDelete(false);
    }
    return /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)((0, $ltMAx$radixuireactdialog.Root), {
        open: confirmDelete,
        onOpenChange: cancelDelete,
        children: /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)((0, $ltMAx$radixuireactdialog.Portal), {
            children: /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($06de7fa1f7e4d835$var$ModalWrapper, {
                children: /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)($06de7fa1f7e4d835$var$ModalContent, {
                    children: [
                        /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)("h2", {
                            children: "Delete comment"
                        }),
                        /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)("p", {
                            children: "Are you sure you want to delete this comment? This will remove the comment and can't be undone."
                        }),
                        /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)($06de7fa1f7e4d835$var$Actions, {
                            children: [
                                /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($06de7fa1f7e4d835$var$CancelButton, {
                                    onClick: cancelDelete,
                                    children: "No, cancel"
                                }),
                                /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($06de7fa1f7e4d835$var$DeleteButton, {
                                    onClick: ()=>handleDeleteComment(id),
                                    children: "Yes, delete"
                                })
                            ]
                        })
                    ]
                })
            })
        })
    });
}
const $06de7fa1f7e4d835$var$ModalWrapper = (0, $ltMAx$styledcomponents.styled)((0, $ltMAx$radixuireactdialog.Overlay))`
  background: rgba(0 0 0 / 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  padding: 1rem;
`;
const $06de7fa1f7e4d835$var$ModalContent = (0, $ltMAx$styledcomponents.styled)((0, $ltMAx$radixuireactdialog.Content))`
  max-width: 380px;
  background: white;
  padding: 30px;
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & h2 {
    font-size: clamp(1.2rem, 0.9vw + 0.9rem, 1.5rem);
    color: var(--dark-blue);
    font-weight: 500;
  }

  & p {
    color: var(--grayish-blue);
  }
`;
const $06de7fa1f7e4d835$var$Actions = (0, $ltMAx$styledcomponents.styled).div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const $06de7fa1f7e4d835$var$Button = (0, $ltMAx$styledcomponents.styled)((0, $cb5b8057e7005340$export$2e2bcd8739ae039))`
  color: var(--white);
  padding: clamp(0.5rem, 0.8vw + 0.3rem, 0.75rem) clamp(1rem, 2.6vw + 0.2rem, 1.875rem);
  border-radius: 0.5rem;
  font-size: clamp(0.75rem, 0.8vw + 0.5rem, 1rem);
  font-family: "Rubik";
  text-transform: uppercase;
  cursor: pointer;
`;
const $06de7fa1f7e4d835$var$DeleteButton = (0, $ltMAx$styledcomponents.styled)($06de7fa1f7e4d835$var$Button)`
  background: var(--soft-red);
`;
const $06de7fa1f7e4d835$var$CancelButton = (0, $ltMAx$styledcomponents.styled)($06de7fa1f7e4d835$var$Button)`
  background: var(--grayish-blue);
`;
var $06de7fa1f7e4d835$export$2e2bcd8739ae039 = $06de7fa1f7e4d835$var$DeleteComment;



function $99628b6027f3560d$var$Comment({ actualId: actualId, parentId: parentId, content: content, createdAt: createdAt, score: score, user: user, replies: replies, replyingTo: replyingTo }) {
    const [replying, setReplying] = (0, $ltMAx$react.useState)(false);
    const [isEditing, setIsEditing] = (0, $ltMAx$react.useState)(false);
    const [confirmDelete, setConfirmDelete] = (0, $ltMAx$react.useState)(false);
    const forwardedParentId = parentId === null ? actualId : parentId;
    const currentUsername = (0, $43ca0aa998cdd2c5$export$15a2497367026b23)[0].currentUser.username;
    const { changeScore: changeScore, updateTimeSincePosted: updateTimeSincePosted } = (0, $ltMAx$react.useContext)((0, $4989780cd05c3303$export$f70cbd0dcaa225fc));
    const timeSincePosted = updateTimeSincePosted(createdAt);
    return /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)((0, $ltMAx$reactjsxruntime.Fragment), {
        children: [
            /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)($99628b6027f3560d$var$Wrapper, {
                        children: [
                            /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)($99628b6027f3560d$var$Head, {
                                children: [
                                    /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($99628b6027f3560d$export$e2255cf6045e8d47, {
                                        src: user?.image.png,
                                        alt: ""
                                    }),
                                    /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($99628b6027f3560d$var$Name, {
                                        children: user?.username
                                    }),
                                    currentUsername === user.username && /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($99628b6027f3560d$var$Verified, {
                                        children: "you"
                                    }),
                                    /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($99628b6027f3560d$var$Duration, {
                                        children: timeSincePosted
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($99628b6027f3560d$var$Content, {
                                children: isEditing ? /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)((0, $44edc83e43ddb4d3$export$2e2bcd8739ae039), {
                                    id: actualId,
                                    replyingTo: replyingTo,
                                    setIsEditing: setIsEditing
                                }) : /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)("p", {
                                    children: [
                                        replyingTo && /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)($99628b6027f3560d$var$ReplyingTo, {
                                            children: [
                                                "@",
                                                replyingTo
                                            ]
                                        }),
                                        " ",
                                        content
                                    ]
                                })
                            }),
                            /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)($99628b6027f3560d$var$Rating, {
                                children: [
                                    /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)((0, $cb5b8057e7005340$export$2e2bcd8739ae039), {
                                        onClick: ()=>changeScore(actualId, "up"),
                                        children: /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)("img", {
                                            src: (0, (/*@__PURE__*/$parcel$interopDefault($e773f055c23aee79$exports))),
                                            alt: ""
                                        })
                                    }),
                                    /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)("p", {
                                        children: score
                                    }),
                                    /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)((0, $cb5b8057e7005340$export$2e2bcd8739ae039), {
                                        onClick: ()=>changeScore(actualId, "down"),
                                        children: /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)("img", {
                                            src: (0, (/*@__PURE__*/$parcel$interopDefault($f1881934e53cfa89$exports))),
                                            alt: ""
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($99628b6027f3560d$var$CurrentUserActions, {
                                children: user.username === currentUsername ? /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)((0, $ltMAx$reactjsxruntime.Fragment), {
                                    children: [
                                        /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)($99628b6027f3560d$var$DeleteButton, {
                                            onClick: ()=>setConfirmDelete(true),
                                            children: [
                                                /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)("img", {
                                                    src: (0, (/*@__PURE__*/$parcel$interopDefault($54facc535acf928a$exports))),
                                                    alt: ""
                                                }),
                                                /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)("p", {
                                                    children: "Delete"
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)($99628b6027f3560d$var$EditButton, {
                                            onClick: ()=>setIsEditing(!isEditing),
                                            children: [
                                                /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)("img", {
                                                    src: (0, (/*@__PURE__*/$parcel$interopDefault($354cf25a3a2d11a7$exports))),
                                                    alt: ""
                                                }),
                                                /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)("p", {
                                                    children: "Edit"
                                                })
                                            ]
                                        })
                                    ]
                                }) : /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)($99628b6027f3560d$var$Reply, {
                                    onClick: ()=>setReplying(!replying),
                                    children: [
                                        /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)("img", {
                                            src: (0, (/*@__PURE__*/$parcel$interopDefault($2153c706e8b7b2b7$exports))),
                                            alt: ""
                                        }),
                                        /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)("p", {
                                            children: "Reply"
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    replying && /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)((0, $7223cd352ab12b38$export$2e2bcd8739ae039), {
                        isReplying: setReplying,
                        username: user.username,
                        parentId: forwardedParentId,
                        replying: replying
                    })
                ]
            }),
            replies && /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)((0, $1fb5b12740d48b11$export$2e2bcd8739ae039), {
                children: replies.map(({ id: id, content: content, createdAt: createdAt, score: score, user: user, replies: replies, replyingTo: replyingTo })=>/*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($99628b6027f3560d$var$Comment, {
                        actualId: id,
                        parentId: forwardedParentId,
                        content: content,
                        createdAt: createdAt,
                        score: score,
                        user: user,
                        replies: replies,
                        replyingTo: replyingTo
                    }, id))
            }),
            /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)((0, $06de7fa1f7e4d835$export$2e2bcd8739ae039), {
                id: actualId,
                setConfirmDelete: setConfirmDelete,
                confirmDelete: confirmDelete
            })
        ]
    });
}
const $99628b6027f3560d$var$Wrapper = (0, ($parcel$interopDefault($ltMAx$styledcomponents))).article`
  display: grid;
  margin-top: 1rem;
  grid-template: 40px 1fr 40px / auto 1fr auto;
  row-gap: 0.75rem;
  padding: 1rem;
  font-family: "Rubik";
  background: var(--white);
  border-radius: 0.6rem;

  @media (min-width: 29.688rem) {
    grid-template: auto 1fr / 40px 1fr auto;
    column-gap: 1rem;
  }
`;
const $99628b6027f3560d$var$Head = (0, ($parcel$interopDefault($ltMAx$styledcomponents))).div`
  grid-row: 1;
  grid-column: 1 / 4;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (min-width: 29.688rem) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
`;
const $99628b6027f3560d$var$Name = (0, ($parcel$interopDefault($ltMAx$styledcomponents))).p`
  color: var(--grayish-blue);
  font-weight: 700;
`;
const $99628b6027f3560d$var$Duration = (0, ($parcel$interopDefault($ltMAx$styledcomponents))).p`
  color: var(--grayish-blue);
  /* min-width: fit-content; */
  display: flex;
  flex-wrap: wrap;
`;
const $99628b6027f3560d$var$Content = (0, ($parcel$interopDefault($ltMAx$styledcomponents))).div`
  grid-row: 2 / 3;
  grid-column: 1 / -1;
  color: var(--grayish-blue);

  @media (min-width: 29.688rem) {
    grid-column: 2 / -1;
    grid-row: 2 / 3;
  }
`;
const $99628b6027f3560d$var$Rating = (0, ($parcel$interopDefault($ltMAx$styledcomponents))).div`
  grid-row: 3;
  grid-column: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0 0.75rem;
  border-radius: 8px;
  color: var(--light-grayish-blue);
  background-color: var(--very-light-gray);
  font-weight: 600;

  & p {
    color: var(--moderate-blue);
  }

  & ${(0, $cb5b8057e7005340$export$2e2bcd8739ae039)} {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  @media (min-width: 29.688rem) {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* margin: 0.75rem 0; */
    height: 100px;
  }
`;
const $99628b6027f3560d$var$Reply = (0, ($parcel$interopDefault($ltMAx$styledcomponents)))((0, $cb5b8057e7005340$export$2e2bcd8739ae039))`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--moderate-blue);
  font-weight: 600;
  cursor: pointer;
`;
const $99628b6027f3560d$var$ReplyingTo = (0, ($parcel$interopDefault($ltMAx$styledcomponents))).span`
  color: var(--moderate-blue);
  font-weight: 700;
`;
function $99628b6027f3560d$export$e2255cf6045e8d47({ src: src, alt: alt }) {
    return /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($99628b6027f3560d$var$AvatarImg, {
        src: src,
        alt: alt
    });
}
const $99628b6027f3560d$var$AvatarImg = (0, ($parcel$interopDefault($ltMAx$styledcomponents))).img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
`;
const $99628b6027f3560d$var$CurrentUserActions = (0, ($parcel$interopDefault($ltMAx$styledcomponents))).div`
  grid-row: 3;
  grid-column: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (min-width: 29.688rem) {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }
`;
const $99628b6027f3560d$var$DeleteButton = (0, ($parcel$interopDefault($ltMAx$styledcomponents)))((0, $cb5b8057e7005340$export$2e2bcd8739ae039))`
  color: var(--soft-red);
  font-weight: 700;
  background-color: white;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  & img {
    transform: translateY(-1px);
  }

  &:hover,
  &:focus,
  img:hover,
  img:focus {
    color: var(--pale-red);
  }

  @media (min-width: 29.688rem) and (max-width: 35.75rem) {
    & p {
      display: none;
    }
    margin-right: 0.5rem;
    margin-left: 4rem;
  }
`;
const $99628b6027f3560d$var$EditButton = (0, ($parcel$interopDefault($ltMAx$styledcomponents)))((0, $cb5b8057e7005340$export$2e2bcd8739ae039))`
  color: var(--moderate-blue);
  font-weight: 700;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--light-grayish-blue);
  }

  @media (min-width: 29.688rem) and (max-width: 35.75rem) {
    & p {
      display: none;
    }
    margin-right: 0.5rem;
  }
`;
const $99628b6027f3560d$var$Verified = (0, ($parcel$interopDefault($ltMAx$styledcomponents))).span`
  background-color: var(--moderate-blue);
  color: var(--white);
  padding: 0 0.45rem;
  font-size: 0.75rem;
  border-radius: 2px;
`;
var $99628b6027f3560d$export$2e2bcd8739ae039 = $99628b6027f3560d$var$Comment;


function $aa4c3be2bc892247$var$Comments() {
    const { comments: comments } = (0, $ltMAx$react.useContext)((0, $4989780cd05c3303$export$f70cbd0dcaa225fc));
    const sortedComments = comments.sort((a, b)=>b.score - a.score);
    return /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($aa4c3be2bc892247$var$Wrapper, {
        children: sortedComments && sortedComments.length > 0 && sortedComments.map(({ id: id, content: content, createdAt: createdAt, score: score, user: user, replies: replies })=>/*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)((0, $99628b6027f3560d$export$2e2bcd8739ae039), {
                actualId: id,
                parentId: null,
                content: content,
                createdAt: createdAt,
                score: score,
                user: user,
                replies: replies
            }, id))
    });
}
const $aa4c3be2bc892247$var$Wrapper = (0, $ltMAx$styledcomponents.styled).section`
  margin-bottom: 1rem;
`;
var $aa4c3be2bc892247$export$2e2bcd8739ae039 = $aa4c3be2bc892247$var$Comments;




function $da11a1101b2a894a$var$App() {
    return /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)((0, $4989780cd05c3303$export$2e2bcd8739ae039), {
        children: /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)($da11a1101b2a894a$var$Wrapper, {
            children: /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)($da11a1101b2a894a$var$MaxWidthWrapper, {
                children: [
                    /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)((0, $aa4c3be2bc892247$export$2e2bcd8739ae039), {}),
                    /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)((0, $7223cd352ab12b38$export$2e2bcd8739ae039), {})
                ]
            })
        })
    });
}
const $da11a1101b2a894a$var$Wrapper = (0, $ltMAx$styledcomponents.styled).div`
  display: grid;
  place-content: center;
  min-height: 100dvh;
  padding: 1rem;
  background-color: var(--very-light-gray);
`;
const $da11a1101b2a894a$var$MaxWidthWrapper = (0, $ltMAx$styledcomponents.styled).div`
  position: relative;
  max-width: 700px;
`;
var $da11a1101b2a894a$export$2e2bcd8739ae039 = $da11a1101b2a894a$var$App;



const $ea16c84d5083015b$var$GlobalStyles = (0, $ltMAx$styledcomponents.createGlobalStyle)`
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
  font-size: 100%;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}


/* GLOBAL STYLES */
*,
*:before,
*:after {
  box-sizing: border-box;
  line-height: 1.5;
  font-family: "Rubik", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: auto;
}

#root {
  /*
    Create a stacking context, without a z-index.
    This ensures that all portal content (modals and tooltips) will
    float above the app.
  */
  isolation: isolate;
}

html {
    font-family: "Rubik", sans-serif;
  /*
    Silence the warning about missing Reach Dialog styles
  */
  --reach-dialog: 1;

--dark-blue: hsl(212, 24%, 26%);
--grayish-blue: hsl(211, 10%, 45%);
--light-gray: hsl(223, 19%, 93%);
--very-light-gray: hsl(228, 33%, 97%);
--white: hsl(0, 0%, 100%);

--moderate-blue: hsl(238, 40%, 52%);
--soft-red: hsl(358, 79%, 66%);
--light-grayish-blue: hsl(239, 57%, 85%);
--pale-red: hsl(357, 100%, 86%);
}

html, body, #root {
  min-height: 100vh;
}
`;
var $ea16c84d5083015b$export$2e2bcd8739ae039 = $ea16c84d5083015b$var$GlobalStyles;


const $4fa36e821943b400$var$container = document.getElementById("root");
const $4fa36e821943b400$var$root = (0, $ltMAx$reactdomclient.createRoot)($4fa36e821943b400$var$container);
$4fa36e821943b400$var$root.render(/*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsxs)((0, $ltMAx$reactjsxruntime.Fragment), {
    children: [
        /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)((0, $ea16c84d5083015b$export$2e2bcd8739ae039), {}),
        /*#__PURE__*/ (0, $ltMAx$reactjsxruntime.jsx)((0, $da11a1101b2a894a$export$2e2bcd8739ae039), {})
    ]
}));


//# sourceMappingURL=index.js.map
