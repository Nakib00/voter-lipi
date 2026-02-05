import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVoter } from "../context/VoterContext";
import { Search, UserCircle2, AlertCircle, Shield } from "lucide-react";
import BanglaDatePicker from "../components/BanglaDatePicker";

const Home = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const { searchVoters } = useVoter();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("দয়া করে আপনার নাম লিখুন");
      return;
    }

    if (!dob) {
      setError("দয়া করে জন্ম তারিখ নির্বাচন করুন");
      return;
    }

    setIsSearching(true);
    setError("");

    // Small delay for better UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300));

    const results = searchVoters(name.trim(), dob);

    if (results.length > 0) {
      if (results.length === 1) {
        navigate(`/details/${results[0]["ভোটার নং"]}`);
      } else {
        navigate("/results");
      }
    } else {
      setError("কোন ভোটার খুঁজে পাওয়া যায়নি। সঠিক তথ্য দিয়ে আবার চেষ্টা করুন।");
      setIsSearching(false);
    }
  };

  return (
    <div className="container" style={{ display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div className="page-header fade-in">
        <div style={{ width: 44 }} />
        <h2
          style={{
            fontSize: "1.3rem",
            fontWeight: 800,
            background: "linear-gradient(135deg, #3ade38 0%, #22c55e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ভোটার-লিপি
        </h2>
        <div style={{ width: 44 }} />
      </div>

      {/* Hero Section */}
      <div className="header-center slide-up">
        <div
          style={{
            width: 110,
            height: 110,
            background: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#3ade38",
            marginBottom: "24px",
            boxShadow: "0 8px 30px rgba(58, 222, 56, 0.2)",
          }}
        >
          <UserCircle2 size={55} strokeWidth={1.5} />
        </div>
        <h1
          style={{
            fontSize: "1.9rem",
            fontWeight: 800,
            marginBottom: "10px",
            color: "#1f2937",
          }}
        >
          আপনার তথ্য খুঁজুন
        </h1>
        <p
          style={{
            color: "#6b7280",
            fontSize: "1rem",
            maxWidth: "280px",
          }}
        >
          সঠিক নাম ও জন্ম তারিখ দিয়ে আপনার ভোটার তথ্য খুঁজে নিন
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="fade-in" style={{ animationDelay: "0.1s" }}>
        {/* Name Input */}
        <div style={{ marginBottom: "20px" }}>
          <label className="input-label">
            নাম <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            className="input-field"
            type="text"
            placeholder="আপনার পুরো নাম লিখুন"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            disabled={isSearching}
            autoComplete="name"
            style={{
              fontSize: "1.05rem",
            }}
          />
        </div>

        {/* Date of Birth Input */}
        <div style={{ marginBottom: "28px" }}>
          <label className="input-label">
            জন্ম তারিখ <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <BanglaDatePicker
            value={dob}
            onChange={(date) => {
              setDob(date);
              if (error) setError("");
            }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="alert alert-error"
            style={{ marginBottom: "20px" }}
          >
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Search Button */}
        <button
          type="submit"
          className="btn-primary"
          disabled={isSearching}
          style={{
            height: "56px",
            fontSize: "1.1rem",
          }}
        >
          {isSearching ? (
            <>
              <div className="spinner" style={{ width: 22, height: 22, borderWidth: 2 }} />
              <span>খুঁজছি...</span>
            </>
          ) : (
            <>
              <Search size={22} />
              <span>তথ্য খুঁজুন</span>
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: "40px",
          paddingBottom: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#9ca3af",
            fontSize: "0.85rem",
          }}
        >
          <Shield size={16} />
          <span>নিরাপদ ও যাচাইকৃত তথ্য</span>
        </div>
        <p
          style={{
            color: "#d1d5db",
            fontSize: "0.75rem",
          }}
        >
          Powered by Napver
        </p>
      </div>
    </div>
  );
};

export default Home;
