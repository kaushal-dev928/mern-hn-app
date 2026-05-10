import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import StoryCard from "../components/StoryCard";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

const Bookmarks = () => {
  const [stories, setStories] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const { data } = await API.get("/stories");
      const allStories = data;

      const updatedUser = await API.get("/auth/me");
      const ids = updatedUser.data.bookmarks;

      setBookmarkedIds(ids);

      const bookmarked = allStories.filter((s) => ids.includes(s._id));
      setStories(bookmarked);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.heading}>My Bookmarks</h1>

        {loading ? (
          <p>Loading...</p>
        ) : stories.length === 0 ? (
          <p>No bookmarks yet.</p>
        ) : (
          stories.map((story) => (
            <StoryCard
              key={story._id}
              story={story}
              bookmarkedIds={bookmarkedIds}
              setBookmarkedIds={setBookmarkedIds}
            />
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "24px 16px",
  },
  heading: {
    fontSize: "22px",
    marginBottom: "20px",
    color: "#333",
  },
};

export default Bookmarks;