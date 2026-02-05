import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVoter } from "../context/VoterContext";
import { Search, UserCircle2, Calendar, Menu } from "lucide-react";

const Home = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const { searchVoters } = useVoter();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!name || !dob) {
      setError("দয়া করে নাম এবং জন্ম তারিখ প্রদান করুন");
      return;
    }
    const results = searchVoters(name, dob);
    if (results.length > 0) {
      if (results.length === 1) {
        navigate(`/details/${results[0]["ভোটার নং"]}`);
      } else {
        navigate("/results");
      }
    } else {
      setError("কোন ভোটার খুঁজে পাওয়া যায়নি। সঠিক তথ্য দিন।");
    }
  };

  return (
    <div className="container">
      {/* Navbar Placeholder */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <Menu size={28} />
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>ভোটার-লিপি</h2>
        <div style={{ width: 28 }}></div> {/* Spacer */}
      </div>

      <div className="header-center">
        <div
          style={{
            width: 100,
            height: 100,
            background: "#dcfce7",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#3ade38",
            marginBottom: "20px",
          }}
        >
          <UserCircle2 size={50} strokeWidth={1.5} />
        </div>
        <h1
          style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "8px" }}
        >
          আপনার তথ্য খুঁজুন
        </h1>
        <p style={{ color: "#3ade38", fontSize: "1rem" }}>
          সঠিক নাম ও জন্ম তারিখ প্রদান করুন
        </p>
      </div>

      <form onSubmit={handleSearch}>
        <div style={{ marginBottom: "24px" }}>
          <label className="input-label">নাম</label>
          <input
            className="input-field"
            type="text"
            placeholder="আপনার নাম লিখুন"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
          />
        </div>

        <div style={{ marginBottom: "32px" }}>
          <label className="input-label">জন্ম তারিখ</label>
          <div style={{ position: "relative" }}>
            <input
              className="input-field"
              type="text"
              placeholder="DD/MM/YYYY"
              value={dob}
              onChange={(e) => {
                setDob(e.target.value);
                setError("");
              }}
            />
            <Calendar
              size={20}
              color="#888"
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        </div>

        {error && (
          <p
            style={{
              color: "#ef4444",
              marginBottom: "16px",
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          >
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary">
          তথ্য খুঁজুন
        </button>
      </form>

      <p
        style={{
          textAlign: "center",
          marginTop: "auto",
          paddingTop: "40px",
          color: "#9ca3af",
          fontSize: "0.8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
        }}
      >
        <span style={{ fontSize: "1.2em" }}>🛡</span> Napver
      </p>
    </div>
  );
};

export default Home;
