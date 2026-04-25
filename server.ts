
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Mock Data ---
  const stadiums = [
    { id: "stadium-1", name: "Wankhede Stadium", city: "Mumbai", capacity: 33000, lat: 18.9389, lng: 72.8258 },
    { id: "stadium-2", name: "M. Chinnaswamy Stadium", city: "Bengaluru", capacity: 40000, lat: 12.9788, lng: 77.5996 },
    { id: "stadium-3", name: "Eden Gardens", city: "Kolkata", capacity: 66000, lat: 22.5646, lng: 88.3433 },
    { id: "stadium-4", name: "Narendra Modi Stadium", city: "Ahmedabad", capacity: 132000, lat: 23.0919, lng: 72.5975 },
    { id: "stadium-5", name: "Dharamshala Stadium", city: "Himachal", capacity: 23000, lat: 32.1979, lng: 76.3245 },
    { id: "stadium-6", name: "Arun Jaitley Stadium", city: "Delhi", capacity: 41000, lat: 28.6377, lng: 77.2431 },
  ];

  const mockMatches = [
    {
      id: "match-1",
      stadiumId: "stadium-1",
      teams: ["Mumbai Indians", "Chennai Super Kings"],
      score: "185/4 (18.2 overs)",
      target: "192",
      prob: "65%",
      status: "LIVE",
      crr: "10.09",
      rrr: "4.20",
      pace: "Ending Early", // Logic: High run rate, low overs left
      predictedEndTime: new Date(Date.now() + 15 * 60000).toISOString(),
    },
    {
      id: "match-2",
      stadiumId: "stadium-2",
      teams: ["RCB", "Gujarat Titans"],
      score: "45/1 (5.4 overs)",
      target: "Projected 210",
      prob: "52%",
      status: "LIVE",
      crr: "8.10",
      rrr: "N/A",
      pace: "Delayed", // Logic: Powerplay taking longer, slow over rate
      predictedEndTime: new Date(Date.now() + 180 * 60000).toISOString(),
    },
    {
      id: "match-3",
      stadiumId: "stadium-4",
      teams: ["India", "Australia"],
      score: "210/2 (25.0 overs)",
      target: null,
      prob: "88%",
      status: "LIVE",
      crr: "8.40",
      rrr: "N/A",
      pace: "On Time",
      predictedEndTime: new Date(Date.now() + 120 * 60000).toISOString(),
    }
  ];

  // --- API Routes ---
  
  // Get all stadiums
  app.get("/api/stadiums", (req, res) => {
    res.json(stadiums);
  });

  // Get live matches
  app.get("/api/matches", (req, res) => {
    res.json(mockMatches);
  });

  // Get dynamic transit info for a stadium
  app.get("/api/transit/:stadiumId", (req, res) => {
    const { stadiumId } = req.params;
    const stadium = stadiums.find(s => s.id === stadiumId);
    
    if (!stadium) return res.status(404).json({ error: "Stadium not found" });

    const match = mockMatches.find(m => m.stadiumId === stadiumId);
    const predictedEnd = match ? new Date(match.predictedEndTime) : new Date(Date.now() + 60 * 60000);
    
    const transit = [
      { 
        type: "Metro", 
        route: "Blue Line (Gate 3)", 
        nextTrain: new Date(predictedEnd.getTime() + 5 * 60000).toISOString(), 
        frequency: "Every 4 mins post-match", 
        status: "High Availability",
        availableVehicles: ["M-104", "M-105", "M-109"]
      },
      { 
        type: "Bus", 
        route: "Route 101 (Special)", 
        nextBus: new Date(predictedEnd.getTime() + 10 * 60000).toISOString(), 
        frequency: "Continuous shuttle", 
        status: "Active",
        availableVehicles: ["B-45", "B-88", "B-12", "B-90"]
      },
      { 
        type: "Train", 
        route: "Local (Fast)", 
        nextTrain: new Date(predictedEnd.getTime() + 15 * 60000).toISOString(), 
        frequency: "Every 15 mins", 
        status: "On Time",
        availableVehicles: ["T-22", "T-15"]
      },
    ];

    const density = match ? "High (92%)" : "Medium (45%)";

    res.json({
      stadiumName: stadium.name,
      predictedMatchEnd: predictedEnd.toISOString(),
      crowdDensity: density,
      transitOptions: transit
    });
  });

  // Nearby services (Hospitals, Hotels, etc.)
  app.get("/api/nearby/:stadiumId", (req, res) => {
    const { stadiumId } = req.params;
    const stadium = stadiums.find(s => s.id === stadiumId);
    if (!stadium) return res.status(404).json({ error: "Stadium not found" });

    const nearbyData: Record<string, any[]> = {
      "stadium-1": [ // Wankhede
        { name: "Bombay Hospital", type: "Hospital", rating: 4.5, dist: "1.2km" },
        { name: "The Taj Mahal Palace", type: "Hotel", rating: 4.9, dist: "2.5km" },
        { name: "Marine Drive Airbnb", type: "Airbnb", rating: 4.7, dist: "0.5km" },
        { name: "Pizza by the Bay", type: "Restaurant", rating: 4.4, dist: "0.8km" }
      ],
      "stadium-2": [ // Chinnaswamy
        { name: "St. Martha's Hospital", type: "Hospital", rating: 4.3, dist: "1.5km" },
        { name: "ITC Gardenia", type: "Hotel", rating: 4.8, dist: "2.0km" },
        { name: "Lavelle Road Loft", type: "Airbnb", rating: 4.6, dist: "0.4km" },
        { name: "Sunny's Restaurant", type: "Restaurant", rating: 4.7, dist: "1.1km" }
      ],
      "stadium-4": [ // Narendra Modi
        { name: "Apollo Hospital", type: "Hospital", rating: 4.6, dist: "3.2km" },
        { name: "ITC Narmada", type: "Hotel", rating: 4.9, dist: "4.5km" },
        { name: "Riverside Stay", type: "Airbnb", rating: 4.3, dist: "1.2km" },
        { name: "Vishalla", type: "Restaurant", rating: 4.5, dist: "5.0km" }
      ]
    };

    res.json({
      lat: stadium.lat,
      lng: stadium.lng,
      recommendations: nearbyData[stadiumId] || [
        { name: "City General Hospital", type: "Hospital", rating: 4.2, dist: "2.0km" },
        { name: "Grand Plaza Hotel", type: "Hotel", rating: 4.5, dist: "3.0km" }
      ]
    });
  });

  // --- Vite / SPA Handling ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
