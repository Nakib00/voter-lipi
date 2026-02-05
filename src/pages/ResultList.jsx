import React from "react";
import { useNavigate } from "react-router-dom";
import { useVoter } from "../context/VoterContext";
import {
  ChevronLeft,
  User,
  ChevronRight,
  Search,
  SearchX,
  Home,
} from "lucide-react";

const ResultList = () => {
  const { searchResults } = useVoter();
  const navigate = useNavigate();

  // Empty State
  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="container">
        <div className="page-header fade-in">
          <button className="btn-icon" onClick={() => navigate("/")}>
            <ChevronLeft size={24} />
          </button>
          <h2 className="page-title">অনুসন্ধানের ফলাফল</h2>
          <div style={{ width: 44 }} />
        </div>

        <div className="empty-state slide-up">
          <div className="empty-state-icon">
            <SearchX size={40} />
          </div>
          <h3 className="empty-state-title">কোন ফলাফল নেই</h3>
          <p className="empty-state-text">
            দুঃখিত, আপনার অনুসন্ধানে কোন ভোটার খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক তথ্য দিয়ে আবার চেষ্টা করুন।
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn-primary"
            style={{ marginTop: "24px", maxWidth: "200px" }}
          >
            <Home size={20} />
            হোমে ফিরুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container safe-bottom">
      {/* Header */}
      <div className="page-header fade-in">
        <button className="btn-icon" onClick={() => navigate("/")}>
          <ChevronLeft size={24} />
        </button>
        <h2 className="page-title">অনুসন্ধানের ফলাফল</h2>
        <div style={{ width: 44 }} />
      </div>

      {/* Results Count Badge */}
      <div
        className="fade-in"
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#dcfce7",
            padding: "8px 16px",
            borderRadius: "100px",
            color: "#166534",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          <Search size={16} />
          <span>{searchResults.length}টি ফলাফল পাওয়া গেছে</span>
        </div>
      </div>

      {/* Results List */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {searchResults.map((voter, index) => (
          <div
            key={voter["ভোটার নং"] || index}
            className="card card-interactive stagger-item"
            onClick={() => navigate(`/details/${voter["ভোটার নং"]}`)}
            style={{
              padding: "18px",
              margin: 0,
              cursor: "pointer",
            }}
          >
            {/* Voter Info Header */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#64748b",
                  flexShrink: 0,
                }}
              >
                <User size={26} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    fontSize: "1.15rem",
                    marginBottom: "4px",
                    fontWeight: 700,
                    color: "#1f2937",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {voter["নাম"]}
                </h3>
                <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                  পিতা: {voter["পিতা"]}
                </p>
              </div>
              <ChevronRight
                size={22}
                style={{ color: "#9ca3af", flexShrink: 0 }}
              />
            </div>

            {/* Voter Details Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.9rem",
                background: "#f8fafc",
                padding: "12px 14px",
                borderRadius: "10px",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.75rem",
                    marginBottom: "2px",
                    fontWeight: 500,
                  }}
                >
                  জন্ম তারিখ
                </div>
                <div style={{ fontWeight: 600, color: "#374151" }}>
                  {voter["জন্ম তারিখ"]}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    color: "#9ca3af",
                    fontSize: "0.75rem",
                    marginBottom: "2px",
                    fontWeight: 500,
                  }}
                >
                  ভোটার নং
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "#374151",
                    fontFamily: "monospace",
                  }}
                >
                  •••• {voter["ভোটার নং"].slice(-4)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar with New Search Button */}
      <div className="bottom-bar">
        <div className="bottom-bar-content">
          <button
            onClick={() => navigate("/")}
            className="btn-secondary"
            style={{ flex: 1 }}
          >
            <Search size={20} />
            নতুন অনুসন্ধান
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultList;
