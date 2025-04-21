import { Registration, User } from "types";

interface LoginResp {
  message: string;
  token: string;
  user: User;
}

export const loginUser = async (body: {
  email: string;
  password: string;
}): Promise<LoginResp> => {
  const response = await fetch(`http://localhost:5000/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const registerUser = async (registration: Registration) => {
  const response = await fetch("http://localhost:5000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registration),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
