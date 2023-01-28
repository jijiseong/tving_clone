import { IMG_URL } from "./api";

export function makeImagePath(id: string, format?: "original" | "w500") {
  return `${IMG_URL}/${format ? format : "original"}/${id}`;
}
