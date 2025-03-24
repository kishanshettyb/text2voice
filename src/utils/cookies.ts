// "use server";

// import { cookies } from "next/headers";

// export async function setAuthToken(token: string) {
//   cookies().set("token", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     path: "/",
//   });
// }

// export async function getAuthToken(): Promise<string | null> {
//   return cookies().get("token")?.value || null;
// }

// export async function clearAuthToken() {
//   cookies().delete("token");
// }
