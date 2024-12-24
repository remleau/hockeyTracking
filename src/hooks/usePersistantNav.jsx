import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate for v6

// Utility to get the current page from localStorage
const getCurrentPage = () => localStorage.getItem("currentPage") || "/";

const usePersistentNavigation = () => {
  const [currentPage, setCurrentPage] = useState(getCurrentPage());
  const navigate = useNavigate(); // useNavigate hook for navigation in v6

  useEffect(() => {
    // On mount, check localStorage and set the page accordingly
    const savedPage = getCurrentPage();
    if (savedPage) {
      setCurrentPage(savedPage);
      navigate(savedPage); // Navigate to the saved page (without the leading "/")
    }
  }, [navigate]);

  const navigateTo = (page) => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page);
    navigate(page); // Update the browser's URL without adding a leading "/"
  };

  return { currentPage, navigateTo };
};

export default usePersistentNavigation;
