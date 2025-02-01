import api from "@/utils/api";

class WalletApi {
  register = async (walletAddress: string, chain: string) => {
    try {
      const response = await api.post("/api/v1/challenges", { walletAddress, chain });
      return response.data;
    } catch (error) {
      console.error("Error registering wallet:", error);
    }
  };
}

export default WalletApi;