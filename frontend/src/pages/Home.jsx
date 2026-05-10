import { useEffect, useState } from "react";
import API from "../api/axios";
import StoryCard from "../components/StoryCard";
import Navbar from "../components/Navbar";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data } = await API.get("/stories");
      setStories(data);
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
        <h1 style={styles.heading}>Top Hacker News Stories</h1>

        {loading ? (
          <p>Loading stories...</p>
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

export default Home;