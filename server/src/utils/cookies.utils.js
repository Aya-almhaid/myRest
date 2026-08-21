import cookie from "cookie-parser";

export const setAccessTokenCookie = (res, token) => {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 1000,
  });
};

export const setRefreshTokenCookie = (res, token) => {
  res.cookie("refreshTokens", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 1000,
  });
};

export const clearTokensCookies = (res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshTokens");
};
