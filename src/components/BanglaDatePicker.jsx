import React, { useState, useEffect, useRef } from "react";
import { Calendar, X } from "lucide-react";

// Convert English numbers to Bangla
const toBanglaNumber = (num) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((digit) => banglaDigits[digit] || digit)
    .join("");
};

// Convert Bangla numbers to English
const toEnglishNumber = (str) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return str
    .toString()
    .split("")
    .map((char) => {
      const index = banglaDigits.indexOf(char);
      return index !== -1 ? index.toString() : char;
    })
    .join("");
};

// Bangla month names
const banglaMonths = [
  { name: "জানুয়ারি", value: "01" },
  { name: "ফেব্রুয়ারি", value: "02" },
  { name: "মার্চ", value: "03" },
  { name: "এপ্রিল", value: "04" },
  { name: "মে", value: "05" },
  { name: "জুন", value: "06" },
  { name: "জুলাই", value: "07" },
  { name: "আগস্ট", value: "08" },
  { name: "সেপ্টেম্বর", value: "09" },
  { name: "অক্টোবর", value: "10" },
  { name: "নভেম্বর", value: "11" },
  { name: "ডিসেম্বর", value: "12" },
];

// Generate years from 1930 to current year
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1930; year--) {
    years.push(year);
  }
  return years;
};

// Generate days based on month and year
const generateDays = (month, year) => {
  if (!month || !year) return Array.from({ length: 31 }, (_, i) => i + 1);
  const daysInMonth = new Date(year, parseInt(month), 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
};

// Scrollable Column Component
const ScrollColumn = ({ items, selected, onSelect, label, renderItem }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && selected) {
      const selectedIndex = items.findIndex(
        (item) => item.toString() === selected.toString()
      );
      if (selectedIndex !== -1) {
        const itemHeight = 44;
        containerRef.current.scrollTop =
          selectedIndex * itemHeight - containerRef.current.clientHeight / 2 + itemHeight / 2;
      }
    }
  }, [selected, items]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div
        style={{
          textAlign: "center",
          fontSize: "0.8rem",
          color: "#6b7280",
          marginBottom: "8px",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <div
        ref={containerRef}
        style={{
          height: "180px",
          overflowY: "auto",
          borderRadius: "10px",
          background: "#f9fafb",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>
          {`
            .scroll-column::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <div className="scroll-column" style={{ padding: "4px" }}>
          {items.map((item) => {
            const itemValue = typeof item === "object" ? item.value : item;
            const isSelected = selected?.toString() === itemValue?.toString();
            return (
              <div
                key={itemValue}
                onClick={() => onSelect(itemValue)}
                style={{
                  padding: "10px 8px",
                  textAlign: "center",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: isSelected ? 600 : 400,
                  background: isSelected ? "#3ade38" : "transparent",
                  color: isSelected ? "#fff" : "#374151",
                  marginBottom: "2px",
                  transition: "all 0.15s ease",
                }}
              >
                {renderItem ? renderItem(item) : item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const BanglaDatePicker = ({ value, onChange }) => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const years = generateYears();
  const days = generateDays(month, year);

  // Parse initial value if provided (handles both Bangla and English numbers)
  useEffect(() => {
    if (value) {
      const parts = value.split("/");
      if (parts.length === 3) {
        setDay(toEnglishNumber(parts[0]));
        setMonth(toEnglishNumber(parts[1]));
        setYear(toEnglishNumber(parts[2]));
      }
    }
  }, []);

  // Update parent when all values are selected
  useEffect(() => {
    if (day && month && year) {
      const formattedDay = day.toString().padStart(2, "0");
      const banglaDay = toBanglaNumber(formattedDay);
      const banglaMonth = toBanglaNumber(month);
      const banglaYear = toBanglaNumber(year);
      onChange(`${banglaDay}/${banglaMonth}/${banglaYear}`);
    }
  }, [day, month, year]);

  const getDisplayText = () => {
    if (day && month && year) {
      const monthName = banglaMonths.find((m) => m.value === month)?.name;
      return `${toBanglaNumber(day)} ${monthName} ${toBanglaNumber(year)}`;
    }
    return "তারিখ নির্বাচন করুন";
  };

  const handleConfirm = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Display field */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="input-field"
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: day && month && year ? "#111827" : "#9ca3af",
        }}
      >
        <span>{getDisplayText()}</span>
        <Calendar size={20} color="#888" />
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
          onClick={() => setIsOpen(false)}
        >
          {/* Picker Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "400px",
              background: "#fff",
              borderRadius: "20px 20px 0 0",
              padding: "20px",
              paddingBottom: "30px",
              animation: "slideUp 0.3s ease",
            }}
          >
            <style>
              {`
                @keyframes slideUp {
                  from {
                    transform: translateY(100%);
                  }
                  to {
                    transform: translateY(0);
                  }
                }
              `}
            </style>

            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>
                জন্ম তারিখ নির্বাচন করুন
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <X size={24} color="#6b7280" />
              </button>
            </div>

            {/* Selected Date Preview */}
            {day && month && year && (
              <div
                style={{
                  textAlign: "center",
                  padding: "12px",
                  background: "#f0fdf4",
                  borderRadius: "10px",
                  marginBottom: "16px",
                  color: "#15803d",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                }}
              >
                {getDisplayText()}
              </div>
            )}

            {/* Scroll Columns */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <ScrollColumn
                items={days}
                selected={day}
                onSelect={setDay}
                label="দিন"
                renderItem={(d) => toBanglaNumber(d)}
              />
              <ScrollColumn
                items={banglaMonths}
                selected={month}
                onSelect={setMonth}
                label="মাস"
                renderItem={(m) => m.name}
              />
              <ScrollColumn
                items={years}
                selected={year}
                onSelect={setYear}
                label="সাল"
                renderItem={(y) => toBanglaNumber(y)}
              />
            </div>

            {/* Confirm Button */}
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!day || !month || !year}
              style={{
                width: "100%",
                padding: "14px",
                background: day && month && year ? "#3ade38" : "#e5e7eb",
                color: day && month && year ? "#fff" : "#9ca3af",
                border: "none",
                borderRadius: "12px",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: day && month && year ? "pointer" : "not-allowed",
              }}
            >
              নিশ্চিত করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BanglaDatePicker;
