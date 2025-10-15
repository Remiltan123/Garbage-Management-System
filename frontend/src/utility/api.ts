const base_url = "http://localhost:3000";
import {
  RegisterDetails,
  RegisterResponse,
  LoginDetails,
  GarbageReportsResponse,
} from "../Model/model";

export const predictWaste = async (file: File) => {
  const formdata = new FormData();
  formdata.append("file", file);

  const response = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    body: formdata,
  });
  if (!response.ok) {
    throw new Error("Failed to get prediction");
  }
  const data = await response.json();
  console.log(".....>", data);
  return data;
};

export const askQuestion = async (question: string): Promise<string> => {
  try {
    const response = await fetch(`${base_url}/api/ask/question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch response");
    }
    const data = await response.json();
    return data.answer || "No answer found.";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "⚠️ Error fetching answer. Please try again.";
  }
};

export const userRegister = async (
  data: RegisterDetails
): Promise<RegisterResponse> => {
  try {
    const res = await fetch(`${base_url}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.log(res.json());
      throw new Error("Registration failed!");
    }

    const result = await res.json();
    console.log(result);
    return { success: true, result: result };
  } catch (error) {
    console.error("Register error:", error);
    return { success: false, message: "Registration failed" };
  }
};

export const userLogin = async (data: LoginDetails) => {
  console.log(data);
  try {
    const res = await fetch(`${base_url}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      console.error("Login failed:", result.message);
      return { success: false, message: result.message };
    }

    return { success: true, data: result.data, token: result.data?.token };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Login failed due to a network error." };
  }
};

export const getCollectorGarbageReports = async (
  collectorId: string
): Promise<GarbageReportsResponse> => {
  try {
    const response = await fetch(
      `${base_url}/api/garbage/reports/collector/${collectorId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch garbage reports");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching collector garbage reports:", error);
    throw error;
  }
};
