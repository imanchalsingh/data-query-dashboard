import React, { useState } from "react";
import QueryInput from "./QueryInput";
import QueryResult from "./QueryResult";
import QueryHistory from "./QueryHistory";
import { motion } from "framer-motion";

const DataQuery = () => {
  const [activeTab, setActiveTab] = useState("result");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div style={{ width: "90vw", height: "90%" }}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Data Query Dashboard
        </motion.h1>

        <div
          style={{
            backgroundColor: "#ffffcc",
            width: "100%",
            height: "95%",
            borderRadius: "10px",
            boxShadow:
              "inset 4px 4px 10px rgba(0, 0, 0, 0.2), inset -4px -4px 10px rgba(100, 99, 99, 0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <QueryInput />

          <div>
            <div style={{ marginTop: "20px" }}>
              <motion.button
                style={{
                  backgroundColor: "#001a33 ",
                  padding: "5px 20px",
                  marginLeft: "20px",
                  borderRadius: "5px",
                  textDecoration: "none",
                  color: "white",
                  border: "#000d1a 2px solid",
                  cursor: "pointer",
                }}
                onClick={() => setActiveTab("result")}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                Query Result
              </motion.button>
              <motion.button
                style={{
                  backgroundColor: "#001a33 ",
                  padding: "5px 20px",
                  marginLeft: "20px",
                  borderRadius: "5px",
                  textDecoration: "none",
                  color: "white",
                  border: "#000d1a 2px solid",
                  cursor: "pointer",
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setActiveTab("history")}
              >
                Query History
              </motion.button>
            </div>

            <div
              style={{
                overflowY: "auto",
                marginTop: "20px",
                height: "60vh",
                padding: "20px",
              }}
            >
              {activeTab === "result" ? <QueryResult /> : <QueryHistory />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataQuery;
