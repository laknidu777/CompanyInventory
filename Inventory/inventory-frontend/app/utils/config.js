export const API_BASE_URL = "http://localhost:5002";

// ✅ Function to check if the user is authenticated
export const checkAuth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/business-owners/refresh-token`, {
      method: "POST",
      credentials: "include", // ✅ Ensures cookies are included
    });

    if (response.ok) {
      return true; // User is authenticated
    }
    return false; // Tokens expired
  } catch (error) {
    console.error("Auth check failed:", error);
    return false;
  }
};

// ✅ Logout function
export const logout = async () => {
  await fetch(`${API_BASE_URL}/api/business-owners/logout`, {
    method: "POST",
    credentials: "include",
  });
  window.location.href = "/auth/login";
};
