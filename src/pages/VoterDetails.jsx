import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVoter } from "../context/VoterContext";
import {
  ChevronLeft,
  Share2,
  Search,
  Printer,
  CheckCircle2,
} from "lucide-react";

const VoterDetails = () => {
  const { id } = useParams();
  const { getVoterById, data } = useVoter();
  const navigate = useNavigate();
  const [voter, setVoter] = useState(null);

  useEffect(() => {
    const foundVoter = getVoterById(id);
    if (foundVoter) {
      setVoter(foundVoter);
    }
  }, [id, getVoterById]);

  if (!voter) {
    return (
      <div className="container">
        <p>লোড হচ্ছে...</p>
      </div>
    );
  }

  const DetailRow = ({ label, value, isBadge }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px 0",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <span style={{ color: isBadge ? "#3ade38" : "#64748b", fontWeight: 500 }}>
        {label}
      </span>
      <span style={{ fontWeight: 600, textAlign: "right" }}>
        {isBadge ? (
          <span
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "4px 12px",
              borderRadius: "100px",
              fontSize: "0.9rem",
            }}
          >
            {value}
          </span>
        ) : (
          value
        )}
      </span>
    </div>
  );

  const publicationDate = data ? data["ভাটার তািলকা প্রকাশ তারিখ"] : "";

  return (
    <div className="container" style={{ paddingBottom: "90px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <button onClick={() => navigate(-1)} style={{ padding: "8px" }}>
          <ChevronLeft size={28} />
        </button>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700 }}>ভোটার তথ্য</h2>
        <button style={{ padding: "8px" }}>
          <Share2 size={24} />
        </button>
      </div>

      <div className="header-center" style={{ marginBottom: "10px" }}>
        <h1
          style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "8px" }}
        >
          {voter["নাম"]}
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "#3ade38",
            fontWeight: 600,
          }}
        >
          <CheckCircle2 size={18} fill="#3ade38" color="white" />
          <span>ভোটার নং: {voter["ভোটার নং"]}</span>
        </div>
      </div>

      <div className="card" style={{ padding: "10px 24px" }}>
        <DetailRow label="ক্রমিক নং" value={voter["ক্রমিক নং"]} />
        <DetailRow
          label="ভোটার এলাকা নম্বর"
          value={data ? data["ভোটার এলাকা নম্বর"] : ""}
        />
        <DetailRow label="নাম" value={voter["নাম"]} />
        <DetailRow label="ভোটার নং" value={voter["ভোটার নং"]} />
        <DetailRow label="পিতা" value={voter["পিতা"]} />
        <DetailRow label="মাতা" value={voter["মাতা"]} />
        <DetailRow label="পেশা" value={voter["পেশা"]} isBadge={true} />
        <DetailRow label="জন্ম তারিখ" value={voter["জন্ম তারিখ"]} />

        <div style={{ padding: "16px 0", borderBottom: "1px solid #f1f5f9" }}>
          <div
            style={{ color: "#3ade38", fontWeight: 500, marginBottom: "8px" }}
          >
            ঠিকানা
          </div>
          <div style={{ lineHeight: "1.6", fontWeight: 500 }}>
            {voter["ঠিকানা"]}
          </div>
        </div>

        <DetailRow label="তালিকা প্রকাশ তারিখ" value={publicationDate} />
      </div>

      {/* Floating Action Buttons */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: 0,
          right: 0,
          padding: "0 20px",
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          maxWidth: "480px",
          margin: "0 auto",
        }}
      >
        <button
          onClick={() => navigate(`/print-preview/${voter["ভোটার নং"]}`)}
          className="btn-primary"
          style={{
            background: "white",
            border: "2px solid #3ade38",
            color: "black",
            boxShadow: "none",
          }}
        >
          <Printer size={20} /> প্রিন্ট
        </button>

        <button
          onClick={() => navigate("/")}
          className="btn-primary"
          style={{
            background: "#f3f4f6",
            border: "none",
            color: "black",
            boxShadow: "none",
          }}
        >
          <Search size={20} /> নতুন খোঁজ
        </button>
      </div>
    </div>
  );
};

export default VoterDetails;
