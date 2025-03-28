import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";

// Keep only Bar chart type for now
const chartTypes = [Bar];

const QueryHistory = () => {
  const queries = useSelector((state) => state.query.queries);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Query History</h2>
      {queries.length === 0 ? (
        <p>No recent queries.</p>
      ) : (
        <ul>
          {queries.map((queryObj, index) => {
            // Always use the first chart type (Bar)
            const SelectedChart = chartTypes[0];

            const data = {
              labels: ["Metric A", "Metric B", "Metric C", "Metric D"],
              datasets: [
                {
                  label: "Query Insights",
                  data: queryObj.result.data || [12, 19, 7, 15],
                  backgroundColor: ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f"],
                },
              ],
            };

            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingBottom: "20px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ margin: "10px" }}
                >
                  <p>{queryObj.query}</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <SelectedChart data={data} />
                  </div>
                </motion.li>
              </div>
            );
          })}
        </ul>
      )}
    </motion.div>
  );
};

export default QueryHistory;
