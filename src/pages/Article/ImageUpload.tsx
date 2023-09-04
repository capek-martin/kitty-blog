import { useEffect, useState } from "react";
import http, { authHeaders } from "../../api/axios";
import { toast } from "react-toastify";
import { Button, Divider } from "@mui/material";
import { apiUrl } from "../../api/apiUrl";

interface Props {
  apiPostFilesUrl: string;
  imageId: string | null;
  setImageId: (id: string | null) => void;
}

/**
 * Image upload component
 */
export const ImageUpload = ({
  apiPostFilesUrl,
  imageId,
  setImageId,
}: Props) => {
  const [selectedImage, setSelectedImage] = useState<
    string | null | ArrayBuffer
  >(null);

  const fetchImage = async () => {
    if (!imageId) return;
    await http
      .apiGetFiles({
        url: `${apiUrl.IMAGES}/${imageId}`,
        config: {
          headers: {
            ...authHeaders(),
            "Content-Type": "application/json",
          },
          method: "GET",
          responseType: "blob",
        },
      })
      .then(async (response) => {
        if (response?.status !== 200) return;
        const fileUrl: string = URL.createObjectURL(response?.data);
        setSelectedImage(fileUrl);
      });
  };

  useEffect(() => {
    if (!imageId) return;
    fetchImage();
  }, [imageId]);

  /**
   * Removes selected file
   */
  const handleRemove = async () => {
    if (!imageId) return;
    try {
      const response = await http.apiDelete({
        url: `${apiPostFilesUrl}/${imageId}`,
      });
      if (response?.status === 204) {
        setImageId(null);
        setSelectedImage(null);
        toast.success("Success!");
      }
    } catch (err) {
      toast.error("error");
    }
  };

  /**
   * Uploads selected file
   */
  const handleUpload = async (selectedFile: File) => {
    try {
      const formData = new FormData();
      // only 1 image
      formData.append("image", selectedFile);
      const response = await http.apiPostFiles({
        url: apiPostFilesUrl,
        data: formData,
      });
      if (response?.status === 200) {
        setImageId(response.data[0].imageId);
        toast.success("Success!");
      }
    } catch (err) {
      toast.error("error");
    }
  };

  /**
   * Selects file
   */
  const handleImgUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!event.target.files) return;
    const selectedFile = event.target.files[0];
    handleUpload(selectedFile);

    // preview uploaded file
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => setSelectedImage(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <>
      {selectedImage ? (
        <div>
          <img src={selectedImage as string} alt="Selected" width="300" />
          <br />
          <div style={{ display: "flex" }}>
            <Button>Upload new</Button>
            <Divider orientation="vertical" flexItem />
            <Button onClick={handleRemove} color="error">
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <input
          id="contained-button-file"
          accept="image/*"
          type="file"
          title="Upload an Image"
          onChange={handleImgUpload}
        />
      )}
    </>
  );
};
