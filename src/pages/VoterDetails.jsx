import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVoter } from "../context/VoterContext";
import {
  ChevronLeft,
  Search,
  Printer,
  CheckCircle2,
  User,
  MapPin,
  Calendar,
  Briefcase,
  UserCircle,
  Users,
  Building2,
} from "lucide-react";

const VoterDetails = () => {
  const { id } = useParams();
  const { getVoterById, data } = useVoter();
  const navigate = useNavigate();
  const [voter, setVoter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadVoter = async () => {
      setIsLoading(true);
      // Small delay for smooth transition
      await new Promise((resolve) => setTimeout(resolve, 200));
      const foundVoter = getVoterById(id);
      if (foundVoter) {
        setVoter(foundVoter);
      }
      setIsLoading(false);
    };
    loadVoter();
  }, [id, getVoterById]);

  // Loading State
  if (isLoading) {
    return (
      <div className="container">
        <div className="page-header">
          <button className="btn-icon" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
          <h2 className="page-title">ভোটার তথ্য</h2>
          <div style={{ width: 44 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "40px" }}>
          <div className="spinner spinner-lg" />
          <p style={{ marginTop: "16px", color: "#6b7280" }}>তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!voter) {
    return (
      <div className="container">
        <div className="page-header">
          <button className="btn-icon" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
          <h2 className="page-title">ভোটার তথ্য</h2>
          <div style={{ width: 44 }} />
        </div>

        <div className="empty-state">
          <div className="empty-state-icon">
            <User size={40} />
          </div>
          <h3 className="empty-state-title">তথ্য পাওয়া যায়নি</h3>
          <p className="empty-state-text">
            এই ভোটার আইডির জন্য কোন তথ্য খুঁজে পাওয়া যায়নি।
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn-primary"
            style={{ marginTop: "24px", maxWidth: "200px" }}
          >
            <Search size={20} />
            নতুন খোঁজ
          </button>
        </div>
      </div>
    );
  }

  const publicationDate = data ? data["ভাটার তািলকা প্রকাশ তারিখ"] : "";
  const voterArea = data ? data["ভোটার এলাকা"] : "";

  const InfoItem = ({ icon: Icon, label, value, highlight }) => (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "14px",
        padding: "16px 0",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "10px",
          background: highlight ? "#dcfce7" : "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: highlight ? "#3ade38" : "#6b7280",
          flexShrink: 0,
        }}
      >
        <Icon size={20} />
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "0.8rem",
            color: "#9ca3af",
            marginBottom: "4px",
            fontWeight: 500,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "#1f2937",
            lineHeight: 1.5,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container safe-bottom">
      {/* Header */}
      <div className="page-header fade-in">
        <button className="btn-icon" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h2 className="page-title">ভোটার তথ্য</h2>
        <div style={{ width: 44 }} />
      </div>

      {/* Voter Profile Card */}
      <div
        className="card slide-up"
        style={{
          textAlign: "center",
          padding: "28px 24px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            color: "#3ade38",
          }}
        >
          <UserCircle size={44} strokeWidth={1.5} />
        </div>

        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            marginBottom: "8px",
            color: "#1f2937",
          }}
        >
          {voter["নাম"]}
        </h1>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "#dcfce7",
            padding: "8px 16px",
            borderRadius: "100px",
            color: "#166534",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          <CheckCircle2 size={16} fill="#3ade38" color="white" />
          <span>ভোটার নং: {voter["ভোটার নং"]}</span>
        </div>
      </div>

      {/* Voter Details Card */}
      <div
        className="card fade-in"
        style={{
          padding: "8px 20px",
          animationDelay: "0.1s",
        }}
      >
        <InfoItem
          icon={User}
          label="ক্রমিক নং"
          value={voter["ক্রমিক নং"]}
        />
        <InfoItem
          icon={Users}
          label="পিতা"
          value={voter["পিতা"]}
        />
        <InfoItem
          icon={Users}
          label="মাতা"
          value={voter["মাতা"]}
        />
        <InfoItem
          icon={Calendar}
          label="জন্ম তারিখ"
          value={voter["জন্ম তারিখ"]}
          highlight
        />
        <InfoItem
          icon={Briefcase}
          label="পেশা"
          value={voter["পেশা"]}
        />
        <InfoItem
          icon={MapPin}
          label="ঠিকানা"
          value={voter["ঠিকানা"]}
          highlight
        />
        {voterArea && (
          <InfoItem
            icon={Building2}
            label="ভোটকেন্দ্র"
            value={voterArea}
            highlight
          />
        )}

        {data && data["ভোটার এলাকা নম্বর"] && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "16px 0",
              fontSize: "0.9rem",
              color: "#6b7280",
            }}
          >
            <span>ভোটার এলাকা নম্বর</span>
            <span style={{ fontWeight: 600, color: "#374151" }}>
              {data["ভোটার এলাকা নম্বর"]}
            </span>
          </div>
        )}

        {publicationDate && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "16px 0",
              fontSize: "0.85rem",
              color: "#9ca3af",
              borderTop: "1px solid #f1f5f9",
            }}
          >
            <span>তালিকা প্রকাশ তারিখ</span>
            <span>{publicationDate}</span>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="bottom-bar">
        <div className="bottom-bar-content">
          <button
            onClick={() => navigate(`/print-preview/${voter["ভোটার নং"]}`)}
            className="btn-outline"
            style={{ flex: 1 }}
          >
            <Printer size={20} />
            প্রিন্ট
          </button>
          <button
            onClick={() => navigate("/")}
            className="btn-primary"
            style={{ flex: 1 }}
          >
            <Search size={20} />
            নতুন খোঁজ
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoterDetails;
