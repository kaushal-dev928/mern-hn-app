import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

const StoryCard = ({ story, bookmarkedIds, setBookmarkedIds }) => {
  const { user } = useContext(AuthContext);
  const isBookmarked = bookmarkedIds.includes(story._id);

  const handleBookmark = async () => {
    if (!user) {
      alert("Please login to bookmark stories");
      return;
    }

    try {
      const { data } = await API.post(`/stories/${story._id}/bookmark`);
      setBookmarkedIds(data.bookmarks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.card}>
      <a href={story.url} target="_blank" rel="noreferrer" style={styles.title}>
        {story.title}
      </a>

      <div style={styles.meta}>
        <span> {story.points} points</span>
        <span> {story.author}</span>
        <span> {story.postedAt}</span>
      </div>

      <button
        onClick={handleBookmark}
        style={{
          ...styles.button,
          backgroundColor: isBookmarked ? "#ff6600" : "#f0f0f0",
          color: isBookmarked ? "white" : "black",
        }}
      >
        {isBookmarked ? "Bookmarked" : "Bookmark"}
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "12px",
    backgroundColor: "white",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    textDecoration: "none",
    display: "block",
    marginBottom: "8px",
  },
  meta: {
    display: "flex",
    gap: "16px",
    fontSize: "13px",
    color: "#666",
    marginBottom: "10px",
  },
  button: {
    padding: "6px 14px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
  },
};

export default StoryCard;