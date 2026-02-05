import React from "react";
import { useNavigate } from "react-router-dom";
import { useVoter } from "../context/VoterContext";
import {
  ChevronLeft,
  User,
  ShieldCheck,
  ChevronRight,
  Search,
} from "lucide-react";

const ResultList = () => {
  const { searchResults } = useVoter();
  const navigate = useNavigate();

  if (!searchResults || searchResults.length === 0) {
    return (
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>কোন ফলাফল নেই।</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{ padding: "8px", background: "#f3f4f6", borderRadius: "50%" }}
        >
          <ChevronLeft size={24} />
        </button>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>
          অনুসন্ধানের ফলাফল
        </h2>
        <div
          style={{
            width: 40,
            height: 40,
            background: "#dcfce7",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#3ade38",
          }}
        >
          <ShieldCheck size={20} />
        </div>
      </div>

      <div
        style={{
          color: "#3ade38",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Search size={16} />
        <span>{searchResults.length}টি ফলাফল পাওয়া গেছে</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          paddingBottom: "80px",
        }}
      >
        {searchResults.map((voter, index) => (
          <div
            key={index}
            className="card"
            style={{
              padding: "20px",
              margin: 0,
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  background: "#f1f5f9",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#94a3b8",
                }}
              >
                <User size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    marginBottom: "4px",
                    fontWeight: 700,
                  }}
                >
                  {voter["নাম"]}
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                  পিতা: {voter["পিতা"]}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.95rem",
                marginBottom: "20px",
                background: "#f8fafc",
                padding: "12px",
                borderRadius: "8px",
              }}
            >
              <div>
                <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                  জন্ম তারিখ
                </div>
                <div style={{ fontWeight: 600 }}>{voter["জন্ম তারিখ"]}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                  ভোটার নং
                </div>
                <div style={{ fontWeight: 600 }}>
                  **** {voter["ভোটার নং"].slice(-4)}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/details/${voter["ভোটার নং"]}`)}
              className="btn-primary"
              style={{
                borderRadius: "8px",
                padding: "10px",
                fontSize: "0.95rem",
              }}
            >
              বিস্তারিত দেখুন <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Floating Bottom Nav Placeholder inside Container */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          padding: "16px",
          borderTop: "1px solid #eee",
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          color: "#94a3b8",
        }}
      >
        <span>আরো লোড করুন</span>{" "}
        <ChevronLeft size={16} style={{ transform: "rotate(-90deg)" }} />
      </div>
    </div>
  );
};

export default ResultList;
