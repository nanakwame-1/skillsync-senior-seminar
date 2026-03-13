import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Analyze() {
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError("");

    if (!resumeText.trim() || !jobText.trim()) {
      setError("Please enter both resume text and job description.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/matches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobText,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze match.");
      }

      const data = await response.json();

      navigate("/result", { state: data });
    } catch (err) {
      setError("Could not connect to backend. Make sure Spring Boot is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Analyze Resume Match</h1>

      <form onSubmit={handleAnalyze}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Resume Text</label>
          <br />
          <textarea
            rows="10"
            cols="70"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste resume text here"
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Job Description</label>
          <br />
          <textarea
            rows="10"
            cols="70"
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            placeholder="Paste job description here"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Match"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
    </div>
  );
}