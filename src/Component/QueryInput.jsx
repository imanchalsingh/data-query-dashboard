import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitQuery, querySuccess } from "../redux/querySlice";
import { motion } from "framer-motion";

const querySuggestions = [
  "Show me last month's sales",
  "Get top 5 performing products",
  "Fetch all users who signed up this week",
  "Show revenue trends for Q1",
];

const QueryInput = () => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.length > 0) {
      setFilteredSuggestions(
        querySuggestions.filter((q) =>
          q.toLowerCase().includes(input.toLowerCase())
        )
      );
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    dispatch(submitQuery());

    setTimeout(() => {
      dispatch(querySuccess({ query, result: "AI-generated insights" }));
    }, 3000);

    setQuery("");
    setFilteredSuggestions([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%" }}>
          <input
            style={{
              width: "50%",
              height: "30px",
              borderRadius: "5px",
              border: "#cc2900 2px solid ",
              paddingLeft: "10px",
              margin: "20px",
              cursor: "pointer",
            }}
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Enter your query..."
          />
          <motion.button
            style={{
              backgroundColor: "#cc2900",
              padding: "5px 20px",
              marginLeft: "20px",
              borderRadius: "5px",
              textDecoration: "none",
              color: "white",
              border: "#b32400 2px solid",
              cursor: "pointer",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
          <div
            style={{
              width: "65%",
              textAlign: "left",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {filteredSuggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setQuery(suggestion);
                      setFilteredSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default QueryInput;
