import React from "react";
import { Package } from "lucide-react";

const SplashScreen = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          background: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          marginBottom: "24px",
          position: "relative",
        }}
      >
        {/* Using a simple icon as logo placeholder */}
        <div style={{ color: "#3ade38" }}>
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
              fill="#3ade38"
            />
            <path
              d="M12 8L15 11"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 14L12 11"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="7" y="15" width="10" height="2" rx="1" fill="white" />
          </svg>
        </div>
      </div>

      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "8px" }}>
        ভোটার-লিপি
      </h1>
      <p style={{ color: "#666", marginBottom: "40px" }}>
        ভোটার তথ্য খোঁজ করুন সহজে
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#888",
          marginBottom: "20px",
          fontSize: "0.9rem",
        }}
      >
        <span style={{ color: "#3ade38" }}>✔</span> SECURE & VERIFIED
      </div>

      <div
        style={{
          width: "200px",
          height: "6px",
          background: "#e5e7eb",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          className="progress-bar"
          style={{ width: "100%", height: "100%", background: "#3ade38" }}
        ></div>
      </div>

      <style>{`
        .progress-bar {
            animation: load 2s ease-in-out infinite;
            transform-origin: 0% 50%;
        }
        @keyframes load {
            0% { transform: scaleX(0); }
            50% { transform: scaleX(0.7); }
            100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
