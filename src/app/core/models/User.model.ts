export interface User {
  id: string;
  role: "admin" | "user";
  email: string;
  name: string;
}
