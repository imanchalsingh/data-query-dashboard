import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const chartTypes = [Line];

const generateRandomData = () => {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 20) + 1);
};

const QueryResult = () => {
  const { result, loading, error } = useSelector((state) => state.query);
  const randomChartIndex = Math.floor(Math.random() * chartTypes.length);
  const SelectedChart = chartTypes[randomChartIndex];

  const data = {
    labels: ["M(A)", "M(B)", "M(C)", "M(D)"],
    datasets: [
      {
        label: "Query Insights",
        data: generateRandomData(),
        backgroundColor: ["#3498db", "#e74c3c", "#2ecc71", "#f1c40f"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "#000" },
      },
    },
    scales: {
      y: {
        ticks: { color: "#000" },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
      x: {
        ticks: { color: "#000" },
        grid: { color: "rgba(0, 0, 0, 0.1)" },
      },
    },
  };

  return (
    <motion.div
      style={{ height: "50vh" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Query Result</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && result && (
        <motion.div
          style={{
            position: "relative",
            width: "300px",
            margin: "20px auto",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            background: "#fff",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p>{result.query}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "300px",
              height: "200px",
            }}
          >
            {loading ? (
              <p>Loading...</p>
            ) : (
              <SelectedChart data={data} options={options} />
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QueryResult;
