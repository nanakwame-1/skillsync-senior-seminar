import { useEffect, useState } from "react";

export default function History() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:8080/matches");

        if (!response.ok) {
          throw new Error("Failed to fetch history.");
        }

        const data = await response.json();
        setMatches(data);
      } catch (err) {
        setError("Could not load history.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getMatchLevel = (score) => {
    if (score >= 70) return "Strong Match";
    if (score >= 40) return "Moderate Match";
    return "Low Match";
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Analysis History</h1>

      {loading && <p>Loading history...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && matches.length === 0 && (
        <p>No analysis history found.</p>
      )}

      {!loading && !error && matches.length > 0 && (
        <div>
          {matches.map((match) => (
            <div
              key={match.matchId}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
              }}
            >
              <p>
                <strong>Match ID:</strong> {match.matchId}
              </p>

              <p>
                <strong>Score:</strong> {match.score}%
              </p>

              <p>
                <strong>Match Level:</strong> {getMatchLevel(match.score)}
              </p>

              <p>
                <strong>Created At:</strong>{" "}
                {new Date(match.createdAt).toLocaleString()}
              </p>

              <div style={{ marginTop: "0.5rem" }}>
                <strong>Matched Skills:</strong>
                {match.matchedSkills && match.matchedSkills.length > 0 ? (
                  <ul>
                    {match.matchedSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <p>None</p>
                )}
              </div>

              <div style={{ marginTop: "0.5rem" }}>
                <strong>Missing Skills:</strong>
                {match.missingSkills && match.missingSkills.length > 0 ? (
                  <ul>
                    {match.missingSkills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <p>None</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}