import { useSelector, useDispatch } from "react-redux";
import { Bar } from "react-chartjs-2";
import { motion } from "framer-motion";
import { deleteQuery } from "../redux/querySlice";
import { IconButton } from "@mui/material";

const QueryHistory = () => {
  const queries = useSelector((state) => state.query.queries);
  const dispatch = useDispatch();

  const handleDelete = (index) => {
    dispatch(deleteQuery(index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ textAlign: "center" }}>Query History</h2>
      {queries.length === 0 ? (
        <p style={{ textAlign: "center" }}>No recent queries.</p>
      ) : (
        <ul style={{ padding: 0 }}>
          {queries.map((queryObj, index) => {
            const data = {
              labels: queryObj.result?.labels || [
                "M(A)",
                "M(B)",
                "M(C)",
                "M(D)",
              ],
              datasets: [
                {
                  label: "Query Insights",
                  data: queryObj.result?.data || [12, 19, 7, 15],
                  backgroundColor: ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f"],
                },
              ],
            };

            const options = {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            };

            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  width: "350px",
                  margin: "20px auto",
                  padding: "10px",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  background: "#fff",
                }}
              >
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    listStyle: "none",
                    textAlign: "center",
                  }}
                >
                  <p>{queryObj.query}</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "300px",
                      height: "200px",
                    }}
                  >
                    <Bar data={data} options={options} />
                  </div>
                </motion.li>

                <IconButton
                  onClick={() => handleDelete(index)}
                  color="error"
                  style={{
                    position: "absolute",
                    top: "-25px",
                    right: "-10px",
                    fontWeight: "bold",
                  }}
                >
                  x
                </IconButton>
              </div>
            );
          })}
        </ul>
      )}
    </motion.div>
  );
};

export default QueryHistory;
