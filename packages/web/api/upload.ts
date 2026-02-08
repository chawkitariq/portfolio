import api from "@/configs/api";
import { type UploadedFileResponse } from "@portfolio/api";
import { AxiosResponse } from "axios";

export function uploadFile(
  file: File,
): Promise<AxiosResponse<UploadedFileResponse>> {
  const formData = new FormData();
  formData.append("file", file);
  return api.postForm("/upload", formData);
}
