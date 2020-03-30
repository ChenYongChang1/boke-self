let baseUrl = "";

if (process.env.NODE_ENV === "development") {
  baseUrl = "http://127.0.0.1:8000";
  // baseUrl = "http://106.14.212.56/api";
} else if (process.env.NODE_ENV === "production") {
  baseUrl = "http://106.14.212.56/api";
}
export default baseUrl;
