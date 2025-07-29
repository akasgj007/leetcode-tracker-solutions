import { useEffect, useState } from "react";
import { difficultyLabels, statusLabels } from "../constants";

const ProblemForm = ({ onSubmit, editingProblem, clearEditing }) => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [status, setStatus] = useState("not-started");
  const [problemNumber, setProblemNumber] = useState(0);
  const [leetcodeLink, setLeetcodeLink] = useState("");
  const [githubLink, setGithubLink] = useState("");

  useEffect(() => {
    if (editingProblem) {
      setTitle(editingProblem.title || "");
      setDifficulty(editingProblem.difficulty || "easy");
      setStatus(editingProblem.status || "not-started");
      setProblemNumber(editingProblem.problemNumber || 0);
      setLeetcodeLink(editingProblem.leetcodeLink || "");
      setGithubLink(editingProblem.githubLink || "");
    } else {
      setTitle("");
      setDifficulty("easy");
      setStatus("not-started");
      setProblemNumber(0);
      setLeetcodeLink("");
      setGithubLink("");
    }
  }, [editingProblem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation for required fields
    if (!problemNumber || !title || !leetcodeLink || !githubLink) {
      alert(
        "Please fill in all required fields: Problem Number, Name, and Links."
      );
      return;
    }

    try {
      onSubmit({
        title,
        difficulty,
        status,
        problemNumber,
        leetcodeLink,
        githubLink,
      });

      // Reset form
      setTitle("");
      setDifficulty("easy");
      setStatus("not-started");
      setProblemNumber("");
      setLeetcodeLink("");
      setGithubLink("");
      if (editingProblem) {
        alert("✅ Problem Updated successfully");
      } else {
        alert("✅ Problem added successfully");
      }
    } catch (error) {
      console.error("❌ Error adding problem:", error);
      alert("Failed to add problem");
    }
  };

  return (
    <div className="mt-4 w-100">
      <h2 className="mb-3">
        {editingProblem ? "Edit Problem" : "Add Problem"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm bg-light">
        <div className="mb-3">
          <label className="form-label">Problem Number</label>
          <input
            type="number"
            className="form-control"
            placeholder="e.g. 1"
            min={1}
            required
            value={problemNumber}
            onChange={(e) => setProblemNumber(Number(e.target.value))}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter problem title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Difficulty</label>
          <select
            className="form-select"
            required
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}>
            {Object.keys(difficultyLabels).map((key) => (
              <option key={key} value={key}>
                {difficultyLabels[key]}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}>
            {Object.keys(statusLabels).map((key) => (
              <option key={key} value={key}>
                {statusLabels[key]}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">LeetCode Link</label>
          <input
            type="url"
            required
            className="form-control"
            placeholder="https://leetcode.com/..."
            value={leetcodeLink}
            onChange={(e) => setLeetcodeLink(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">GitHub Solution Link</label>
          <input
            type="url"
            required
            className="form-control"
            placeholder="https://github.com/..."
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
          />
        </div>

        <div className="d-flex flex-wrap gap-2">
          <button type="submit" className="btn btn-primary">
            {editingProblem ? "Update" : "Add"}
          </button>
          {editingProblem && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={clearEditing}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProblemForm;
