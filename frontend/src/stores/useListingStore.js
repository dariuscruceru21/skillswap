import { create } from "zustand";
import api from "../lib/axios";

export const useListingStore = create((set) => ({
  listings: [],
  loading: false,
  error: null,

  setListings: (listings) => set({ listings }),

  createListing: async (listingData) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/api/listings", listingData);
      set((prevState) => ({
        listings: [...prevState.listings, res.data.listing],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false, error: error.response?.data?.message || "Failed to create listing" });
    }
  },

  fetchAllListingsForExplore: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/api/listings/explore");
      set({ listings: response.data || [], loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || "Failed to fetch listings",
        listings: [] 
      });
    }
  },

  fetchAllListings: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/api/listings");
      set({ listings: response.data.listings || [], loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || "Failed to fetch listings",
        listings: [] 
      });
    }
  },

  fetchListingsByCategory: async (category) => {
    set({ loading: true, error: null });
    try {
      const response = await api.get(`/api/listings/category/${category}`);
      set({ listings: response.data.listings || [], loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || "Failed to fetch listings by category",
        listings: [] 
      });
    }
  },

  deleteListing: async (listingId) => {
    set({ loading: true, error: null });
    try {
      await api.post(`/api/listings/${listingId}`);
      set((prevState) => ({
        listings: prevState.listings.filter((listing) => listing._id !== listingId),
        loading: false,
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || "Failed to delete listing" 
      });
    }
  },

  toggleFeaturedListing: async (listingId) => {
    set({ loading: true, error: null });
    try {
      const response = await api.patch(`/api/listings/${listingId}`);
      set((prevState) => ({
        listings: prevState.listings.map((listing) =>
          listing._id === listingId
            ? { ...listing, isFeatured: response.data.isFeatured }
            : listing
        ),
        loading: false,
      }));
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || "Failed to toggle featured status" 
      });
    }
  },

  fetchFeaturedListings: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/api/listings/featured");
      set({ listings: response.data || [], loading: false });
    } catch (error) {
      set({ 
        loading: false, 
        error: error.response?.data?.message || "Failed to fetch featured listings",
        listings: [] 
      });
    }
  },
}));