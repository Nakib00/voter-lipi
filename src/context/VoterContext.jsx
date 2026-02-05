import React, { createContext, useContext, useState, useEffect } from "react";
import voterData from "../data/voters.json";

const VoterContext = createContext();

export const useVoter = () => useContext(VoterContext);

export const VoterProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voters, setVoters] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Simulating async load if needed, but imported directly for now
    if (voterData && voterData.main_data) {
      setData(voterData.main_data);
      setVoters(voterData.main_data.voters || []);
    }
    setLoading(false);
  }, []);

  const searchVoters = (name, dob) => {
    if (!name || !dob) return [];

    const normalizedName = name.trim();
    const normalizedDob = dob.trim();

    // SQL-like search behavior (Partial match for Name, Exact for DOB)
    const results = voters.filter((voter) => {
      const vName = voter["নাম"] ? voter["নাম"].trim() : "";
      const vDob = voter["জন্ম তারিখ"] ? voter["জন্ম তারিখ"].trim() : "";

      // Check if both fields exist and match (Name contains query, DOB matches exact)
      return vName.includes(normalizedName) && vDob === normalizedDob;
    });

    setSearchResults(results);
    return results;
  };

  const getVoterById = (id) => {
    return voters.find((v) => v["ভোটার নং"] === id);
  };

  return (
    <VoterContext.Provider
      value={{
        data,
        loading,
        searchVoters,
        searchResults,
        getVoterById,
      }}
    >
      {children}
    </VoterContext.Provider>
  );
};
