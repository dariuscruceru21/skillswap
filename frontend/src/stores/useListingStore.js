import { create } from "zustand";
import axios from "../lib/axios";

export const useListingStore = create((set) => ({
  listings: [],
  loading: false,

  setListings: (listings) => set({ listings }),

  createListing: async (listingData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/listings", listingData);
      set((prevState) => ({
        listings: [...prevState.listings, res.data.listing],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
    }
  },

  fetchAllListings: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/listings");
      set({ listings: response.data.listings, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  fetchListingsByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/listings/category/${category}`);
      set({ listings: response.data.listings, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  deleteListing: async (listingId) => {
    set({ loading: true });
    try {
      await axios.post(`/listings/${listingId}`); // POST for delete as in your backend
      set((prevState) => ({
        listings: prevState.listings.filter((listing) => listing._id !== listingId),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
    }
  },

  toggleFeaturedListing: async (listingId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/listings/${listingId}`);
      set((prevState) => ({
        listings: prevState.listings.map((listing) =>
          listing._id === listingId
            ? { ...listing, isFeatured: response.data.isFeatured }
            : listing
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
    }
  },

  fetchFeaturedListings: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/listings/featured");
      set({ listings: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },
}));