import express from 'express';
import { adminRoute,protectedRoute } from '../middleware/auth.middleware.js';
import { getAnalytics,getDailyDonationsData  } from '../controllers/analytics.controller.js';

const router = express.Router();

router.get("/",protectedRoute,adminRoute,async(req,res)=>{
    try {
        const analyticsData = await getAnalytics();

        const endDate = new Date();
        const startDate = new Date(endDate.getTime()- 7*24*60*60*1000);//7 days back
        
        const dailyDonationsData = await getDailyDonationsData(startDate, endDate);

        res.json({
            analyticsData,
            dailyDonationsData
        })
    } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
});

export default router;