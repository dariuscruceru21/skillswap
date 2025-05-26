import User from "../models/user.model.js";
import Listing from "../models/listing.model.js";
import Donation from "../models/donation.model.js";
import { get } from "mongoose";

export const getAnalytics = async () => {
  const totalUsers = await User.countDocuments();
  const totalListings = await Listing.countDocuments();

  const donationsData = await Donation.aggregate([
    {
      $group: {
        _id: null, //groups all documents together
        totalDonations: { $sum: 1 },
        totalRevenue: { $sum: "$amount" }, //assuming amount is the field for donation amount
      },
    },
  ]);

  const { totalDonations, totalRevenue } = donationsData[0] || {
    totalDonations: 0,
    totalRevenue: 0,
  };
  return {
    users: totalUsers,
    listings: totalListings,
    totalDonations,
    totalRevenue,
  };
};
export const getDailyDonationsData = async (startDate, endDate) => {
  try {
    const dailyDonationsData = await Donation.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, //group by date
        totalDonations: { $sum: 1 },
        totalAmount: { $sum: "$amount" }, //assuming amount is the field for donation amount
      },
    },
    {
      $sort: { _id: 1 }, //sort by date ascending
    },
  ]);

  const dateArray = getDatesInRange(startDate, endDate);
  return dateArray.map((date) => {
    const foundData = dailyDonationsData.find((item) => item._id === date);

    return {
      date,
      totalDonations: foundData?.totalDonations || 0, //if foundData is undefined, return 0
      totalAmount: foundData?.totalAmount || 0, //if foundData is undefined, return 0
    };
  });
  } catch (error) {
    throw error;
  }
};

function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]); // Format as YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}
