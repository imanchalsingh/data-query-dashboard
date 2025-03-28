import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
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

const chartTypes = [Bar];

const generateRandomData = () => {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 20) + 1);
};

const QueryResult = () => {
  const { result, loading, error } = useSelector((state) => state.query);
  const randomChartIndex = Math.floor(Math.random() * chartTypes.length);
  const SelectedChart = chartTypes[randomChartIndex];

  const data = {
    labels: ["Metric A", "Metric B", "Metric C", "Metric D"],
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
      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
      )}
      {error && <p>{error}</p>}
      {!loading && result && (
        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p>{result.query}</p>
          <div>
            <SelectedChart data={data} options={options} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QueryResult;
