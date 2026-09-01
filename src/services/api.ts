import axios from "axios";

/**
 * Central Axios instance for the FIFA Match backend (Spring Boot).
 *
 * The backend runs locally on http://localhost:8080. If the frontend
 * (http://localhost:5173) hits a CORS error in the browser console,
 * add the following to the Spring Boot app (do NOT change automatically
 * from the frontend project):
 *
 *   @Configuration
 *   public class CorsConfig implements WebMvcConfigurer {
 *       @Override
 *       public void addCorsMappings(CorsRegistry registry) {
 *           registry.addMapping("/api/**")
 *               .allowedOrigins("http://localhost:5173")
 *               .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
 *       }
 *   }
 */
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
