import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bnpLogo from "../assets/bnp_marka.png";
import { useVoter } from "../context/VoterContext";
import { ChevronLeft, Printer, FileText } from "lucide-react";

const PrintPreview = () => {
  const { id } = useParams();
  const { getVoterById, data } = useVoter();
  const navigate = useNavigate();
  const [voter, setVoter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    const loadVoter = async () => {
      setIsLoading(true);
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
      <div className="container" style={{ background: "#f1f5f9" }}>
        <div className="page-header no-print">
          <button className="btn-icon" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
          <h2 className="page-title">প্রিন্ট প্রিভিউ</h2>
          <div style={{ width: 44 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "60px" }}>
          <div className="spinner spinner-lg" />
          <p style={{ marginTop: "16px", color: "#6b7280" }}>লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // Not Found State
  if (!voter) {
    return (
      <div className="container" style={{ background: "#f1f5f9" }}>
        <div className="page-header no-print">
          <button className="btn-icon" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </button>
          <h2 className="page-title">প্রিন্ট প্রিভিউ</h2>
          <div style={{ width: 44 }} />
        </div>

        <div className="empty-state">
          <div className="empty-state-icon">
            <FileText size={40} />
          </div>
          <h3 className="empty-state-title">তথ্য পাওয়া যায়নি</h3>
          <p className="empty-state-text">প্রিন্ট করার জন্য কোন তথ্য নেই।</p>
        </div>
      </div>
    );
  }

  const handlePrint = async () => {
    setIsPrinting(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    window.print();
    setIsPrinting(false);
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
      <div className="page-header no-print fade-in">
        <button className="btn-icon" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h2 className="page-title">প্রিন্ট প্রিভিউ</h2>
        <div style={{ width: 44 }} />
      </div>

      {/* Preview Card Container */}
      <div
        className="slide-up"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 0",
          paddingBottom: "140px",
        }}
      >
        <div
          className="print-card"
          style={{
            background: "white",
            width: "100%",
            maxWidth: "340px",
            padding: "28px 24px",
            borderRadius: "8px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
            fontFamily: "'Noto Sans Bengali', sans-serif",
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div
              style={{
                width: 65,
                height: 65,
                background: "#f8fafc",
                borderRadius: "8px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #e5e7eb",
              }}
            >
              <img
                src={bnpLogo}
                width="42"
                alt="logo"
                style={{ opacity: 1.0 }}
              />
            </div>
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "4px",
              color: "#1f2937",
            }}
          >
            গণপ্রজাতন্ত্রী বাংলাদেশ
          </h2>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              textAlign: "center",
              color: "#374151",
              marginBottom: "4px",
            }}
          >
            ভোটার তথ্য স্লিপ (টোকেন)
          </h3>
          <p
            style={{
              fontSize: "0.7rem",
              textAlign: "center",
              fontFamily: "monospace",
              color: "#9ca3af",
              letterSpacing: "2px",
              marginBottom: "16px",
            }}
          >
            VOTER-LIPI APP
          </p>

          <div className="dashed-line" />

          {/* Voter Info */}
          <div className="info-grid">
            <div className="print-info-row">
              <span className="print-label">নাম:</span>
              <span className="print-value">{voter["নাম"]}</span>
            </div>
            <div className="print-info-row">
              <span className="print-label">পিতা:</span>
              <span className="print-value">{voter["পিতা"]}</span>
            </div>
            <div className="print-info-row">
              <span className="print-label">আইডি নং:</span>
              <span className="print-value" style={{ fontFamily: "monospace" }}>
                {voter["ভোটার নং"]}
              </span>
            </div>
            <div className="print-info-row">
              <span className="print-label">ভোটকেন্দ্র:</span>
              <span className="print-value" style={{ fontSize: "0.85rem" }}>
                {voterArea || "মিরপুর সরকারি প্রাথমিক বিদ্যালয়"}
              </span>
            </div>
          </div>

          <div className="dashed-line" />

          {/* Additional Info */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.9rem",
              marginBottom: "12px",
              color: "#374151",
            }}
          >
            <div>
              ক্রমিক নং: <b>{voter["ক্রমিক নং"]}</b>
            </div>
            <div>
              ওয়ার্ড নং: <b>{wardNo}</b>
            </div>
          </div>

          <div className="dashed-line" />

          {/* Footer Info */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.7rem",
              fontFamily: "monospace",
              color: "#6b7280",
              marginTop: "16px",
              marginBottom: "20px",
            }}
          >
            <div>ID: VL-{voter["ক্রমিক নং"]}</div>
            <div>{publicationDate}</div>
          </div>

          <div style={{ borderTop: "1px solid #1f2937", marginBottom: "12px" }} />

          <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#6b7280", marginBottom: "4px" }}>
            এই স্লিপটি ভোটার-লিপি অ্যাপ থেকে প্রস্তুতকৃত।
          </p>
          <p style={{ textAlign: "center", fontSize: "0.65rem", color: "#9ca3af" }}>
            * এটি কোন জাতীয় পরিচয়পত্র নয় *
          </p>

          {/* Decorative Dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "6px",
              marginTop: "20px",
            }}
          >
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#d1d5db" }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#9ca3af" }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#d1d5db" }} />
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="bottom-bar no-print">
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          {/* Printer Status */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
              fontSize: "0.8rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#6b7280",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#3ade38",
                }}
              />
              <span>প্রিন্টার প্রস্তুত</span>
            </div>
            <div
              style={{
                background: "#dcfce7",
                color: "#166534",
                padding: "4px 12px",
                borderRadius: "100px",
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            >
              টোকেন সাইজ: ৫৬মিমি
            </div>
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="btn-primary"
            disabled={isPrinting}
            style={{
              height: "54px",
              fontSize: "1.1rem",
            }}
          >
            {isPrinting ? (
              <>
                <div className="spinner" style={{ width: 22, height: 22, borderWidth: 2 }} />
                <span>প্রিন্ট হচ্ছে...</span>
              </>
            ) : (
              <>
                <Printer size={22} />
                <span>প্রিন্ট করুন</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        .dashed-line {
          border-top: 1px dashed #d1d5db;
          margin: 14px 0;
        }
        .print-info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 0.95rem;
        }
        .print-label {
          font-weight: 700;
          color: #1f2937;
          width: 30%;
        }
        .print-value {
          text-align: right;
          font-weight: 500;
          color: #374151;
          width: 70%;
        }
        @media print {
          .no-print { display: none !important; }
          .container {
            background: white !important;
            min-height: auto !important;
            display: block !important;
            padding: 0 !important;
          }
          .print-card {
            box-shadow: none !important;
            padding: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            border-radius: 0 !important;
          }
          body { background: white; }
        }
      `}</style>
    </div>
  );
};

export default PrintPreview;
