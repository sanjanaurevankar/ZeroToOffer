import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getQuestions } from "../services/questionService";
import { getUserProgress, toggleSolved } from "../services/progressService";
import "../styles/Questions.css";

interface Question {
  _id: string;
  title: string;
  difficulty: string;
  topic: string;
  platform: string;
}

interface Progress {
  question: string;
  solved: boolean;
}

const Questions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [questionsRes, progressRes] = await Promise.all([
          getQuestions(),
          getUserProgress(),
        ]);
        setQuestions(questionsRes.data);
        const map: Record<string, boolean> = {};
        progressRes.data.forEach((p: Progress) => { map[p.question] = p.solved; });
        setProgressMap(map);
      } catch (err) {
        console.error(err);
        setError("Couldn't load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleToggle = async (questionId: string) => {
    const previous = progressMap[questionId] || false;
    setProgressMap((prev) => ({ ...prev, [questionId]: !previous }));
    try {
      const res = await toggleSolved(questionId);
      setProgressMap((prev) => ({ ...prev, [questionId]: res.data.solved }));
    } catch (err) {
      console.error(err);
      setProgressMap((prev) => ({ ...prev, [questionId]: previous }));
    }
  };

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.title.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = difficulty === "All" || question.difficulty === difficulty;
    const matchesTopic = topic === "All" || question.topic === topic;
    return matchesSearch && matchesDifficulty && matchesTopic;
  });

  return (
    <Layout>
      <h1>Questions</h1>
      <hr />
      {error && <p className="error-text">{error}</p>}
      <input type="text" placeholder="🔍 Search Questions..." value={search} onChange={(e) => setSearch(e.target.value)} className="search-box" />
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="difficulty-filter">
        <option value="All">All</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <select value={topic} onChange={(e) => setTopic(e.target.value)} className="difficulty-filter">
        <option value="All">All Topics</option>
        <option value="Arrays">Arrays</option>
        <option value="Hashing">Hashing</option>
        <option value="Sliding Window">Sliding Window</option>
        <option value="Binary Search">Binary Search</option>
        <option value="Linked List">Linked List</option>
        <option value="Stack">Stack</option>
        <option value="Queue">Queue</option>
        <option value="Trees">Trees</option>
      </select>

      {loading ? (
        <p>Loading questions...</p>
      ) : (
        <table className="questions-table">
          <thead>
            <tr>
              <th>Status</th><th>Title</th><th>Difficulty</th><th>Topic</th><th>Platform</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuestions.map((question) => {
              const solved = progressMap[question._id] || false;
              return (
                <tr key={question._id}>
                  <td>
                    <button type="button" className="status-toggle" onClick={() => handleToggle(question._id)} aria-label={solved ? "Mark as unsolved" : "Mark as solved"} title={solved ? "Solved" : "Not solved"}>
                      {solved ? "✅" : "○"}
                    </button>
                  </td>
                  <td>{question.title}</td>
                  <td><span className={`difficulty ${question.difficulty.toLowerCase()}`}>{question.difficulty}</span></td>
                  <td>{question.topic}</td>
                  <td>{question.platform}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default Questions;
