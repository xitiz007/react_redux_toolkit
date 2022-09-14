import { useDispatch } from "react-redux";
import { addReaction } from "./postsSlice";
const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};
const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([key, value]) => (
    <button
      key={key}
      onClick={() => dispatch(addReaction({ postId: post.id, reaction: key }))}
    >
      {value} {post.reactions[key]}
    </button>
  ));
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
