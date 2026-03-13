import { Link, useLocation } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const result = location.state;

  if (!result) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>No analysis result found</h1>
        <p>Run a new analysis to view your match score and skill breakdown.</p>
        <Link to="/analyze">Go to Analyze Page</Link>
      </div>
    );
  }

  const formattedDate = new Date(result.createdAt).toLocaleString();

  let matchLevel = "Low Match";
  if (result.score >= 70) {
    matchLevel = "Strong Match";
  } else if (result.score >= 40) {
    matchLevel = "Moderate Match";
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Match Result</h1>

      <p>
        <strong>Match ID:</strong> {result.matchId}
      </p>

      <p>
        <strong>Score:</strong> {result.score}%
      </p>

      <p>
        <strong>Match Level:</strong> {matchLevel}
      </p>

      <p>
        <strong>Created At:</strong> {formattedDate}
      </p>

      <div style={{ marginTop: "1rem" }}>
        <h2>Matched Skills</h2>
        {result.matchedSkills && result.matchedSkills.length > 0 ? (
          <ul>
            {result.matchedSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No matched skills found.</p>
        )}
      </div>

      <div style={{ marginTop: "1rem" }}>
        <h2>Missing Skills</h2>
        {result.missingSkills && result.missingSkills.length > 0 ? (
          <ul>
            {result.missingSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No missing skills found.</p>
        )}
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <Link to="/analyze" style={{ marginRight: "1rem" }}>
          Run Another Analysis
        </Link>

        <Link to="/history">
          View History
        </Link>
      </div>
    </div>
  );
}