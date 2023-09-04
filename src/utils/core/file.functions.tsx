import { apiUrl } from "../../api/apiUrl";
import http, { authHeaders } from "../../api/axios";

/**
 * Image placeholder - static img
 */
export const placeholderImg = "/images/placeholder.jpg";

/**
 * Fetches selected image
 * @param imageId
 */
export const fetchImage = async (imageId: string) => {
  try {
    const response = await http.apiGetFiles({
      url: `${apiUrl.IMAGES}/${imageId}`,
      config: {
        headers: {
          ...authHeaders(),
          "Content-Type": "application/json",
        },
        method: "GET",
        responseType: "blob",
      },
    });

    if (response?.status !== 200) return placeholderImg;

    const fileUrl = URL.createObjectURL(response?.data);
    return fileUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    return placeholderImg;
  }
};
