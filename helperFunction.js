//타임스탬프 -> 연월일시분초
export const formatDate = (milliseconds) => {
  const date = new Date(milliseconds);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};
// 아바타 기본이미지
export const defaultProfileImage = require("./assets/default_profile.png");
