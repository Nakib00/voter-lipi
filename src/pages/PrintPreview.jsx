import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bnpLogo from "../assets/bnp_marka.png";
import { useVoter } from "../context/VoterContext";
import { ChevronLeft, Settings, Printer } from "lucide-react";

const PrintPreview = () => {
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

  const handlePrint = () => {
    window.print();
  };

  const publicationDate = data ? data["ভাটার তািলকা প্রকাশ তারিখ"] : "N/A";
  const wardNo = data ? data["ওয়ার্ড নম্বর (ইউিনয়ন পিরষেদর জন্য)"] : "০৮";
  const voterArea = data ? data["ভোটার এলাকা"] : "";

  return (
    <div
      className="container"
      style={{
        background: "#f1f5f9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Bar */}
      <div
        className="no-print"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={() => navigate(-1)} style={{ padding: "4px" }}>
            <ChevronLeft size={28} />
          </button>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            প্রিন্ট প্রিভিউ
          </h2>
        </div>
        <button style={{ padding: "8px" }}>
          <Settings size={24} />
        </button>
      </div>

      {/* Preview Card */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "100px",
        }}
      >
        <div
          className="print-card"
          style={{
            background: "white",
            width: "100%",
            maxWidth: "340px", // Approx 80mm/sticker size width
            padding: "24px 20px",
            borderRadius: "4px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            fontFamily: "Hind Siliguri, sans-serif",
          }}
        >
          {/* Logo Placeholder */}
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div
              style={{
                width: 60,
                height: 60,
                background: "#f5f5f5",
                borderRadius: "4px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={bnpLogo}
                width="40"
                alt="logo"
                style={{ opacity: 1.0 }}
              />
            </div>
          </div>

          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "4px",
            }}
          >
            গণপ্রজাতন্ত্রী বাংলাদেশ
          </h2>
          <h3
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              textAlign: "center",
              color: "#333",
            }}
          >
            ভোটার তথ্য স্লিপ (টোকেন)
          </h3>
          <p
            style={{
              fontSize: "0.7rem",
              textAlign: "center",
              fontFamily: "monospace",
              color: "#666",
              letterSpacing: "1px",
              marginBottom: "12px",
            }}
          >
            VOTER-LIPI APP
          </p>

          <div className="dashed-line"></div>

          <div className="info-grid">
            <div className="info-row">
              <span className="label">নাম:</span>
              <span className="value">{voter["নাম"]}</span>
            </div>
            <div className="info-row">
              <span className="label">পিতা:</span>
              <span className="value">{voter["পিতা"]}</span>
            </div>
            <div className="info-row">
              <span className="label">আইডি নং:</span>
              <span className="value">{voter["ভোটার নং"]}</span>
            </div>
            <div className="info-row">
              <span className="label">ভোটকেন্দ্র:</span>
              <span className="value" style={{ fontSize: "0.85rem" }}>
                {voterArea || "মিরপুর সরকারি প্রাথমিক বিদ্যালয়"}
              </span>
            </div>
          </div>

          <div className="dashed-line"></div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.9rem",
              marginBottom: "12px",
            }}
          >
            <div>
              ক্রমিক নং: <b>{voter["ক্রমিক নং"]}</b>
            </div>
            <div>
              ওয়ার্ড নং: <b>{wardNo}</b>
            </div>
          </div>

          <div className="dashed-line"></div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.7rem",
              fontFamily: "monospace",
              color: "#555",
              marginTop: "16px",
              marginBottom: "20px",
            }}
          >
            <div>ID: VL-992-K8</div>
            <div>{publicationDate}</div>
          </div>

          <div
            style={{ borderTop: "1px solid #333", marginBottom: "8px" }}
          ></div>
          <p style={{ textAlign: "center", fontSize: "0.7rem", color: "#666" }}>
            এই স্লিপটি ভোটার-লিপি অ্যাপ থেকে প্রস্তুতকৃত।
          </p>
          <p style={{ textAlign: "center", fontSize: "0.6rem", color: "#888" }}>
            * এটি কোন জাতীয় পরিচয়পত্র নয় *
          </p>

          {/* Dots for visual fidelity to image */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "4px",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#ccc",
              }}
            ></div>
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#aaa",
              }}
            ></div>
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#ccc",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div
        className="no-print"
        style={{
          background: "#f8fafc",
          padding: "20px",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
              fontSize: "0.8rem",
              color: "#64748b",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Printer size={14} /> Bluetooth Printer Connected
            </div>
            <div style={{ color: "#3ade38", fontWeight: 600 }}>
              টোকেন সাইজ: ৫৬মিমি
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="btn-primary"
            style={{
              borderRadius: "8px",
              height: "50px",
              fontSize: "1.1rem",
              background: "#3ade38",
            }}
          >
            <Printer size={20} /> প্রিন্ট করুন
          </button>
        </div>
      </div>

      <style>{`
          .dashed-line {
              border-top: 1px dashed #9ca3af;
              margin: 12px 0;
          }
          .info-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 8px;
              font-size: 0.95rem;
          }
          .label {
              font-weight: 700;
              color: #1f2937;
              width: 30%;
          }
          .value {
              text-align: right;
              font-weight: 500;
              color: #000;
              width: 70%;
          }
           @media print {
              .no-print { display: none !important; }
               .container { background: white !important; min-height: auto !important; display: block !important; padding: 0 !important; }
               .print-card { 
                   box-shadow: none !important; 
                   padding: 0 !important; 
                   max-width: 100% !important; 
                   width: 100% !important;
               }
               body { background: white; }
          }
      `}</style>
    </div>
  );
};

export default PrintPreview;
