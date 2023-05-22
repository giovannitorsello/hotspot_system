import axios from "axios";
class UploadLogoService {
  upload(file, onUploadProgress) {
    console.log("File is:", file);
    let formData = new FormData();
    formData.append("file", file);
    return axios.post("/api/customer/upload/logo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return axios.get("/files");
  }
}

export default new UploadLogoService();
