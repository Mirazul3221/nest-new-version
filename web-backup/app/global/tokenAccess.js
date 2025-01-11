"use client";
export const localstoreToken = {};
if(typeof window !== 'undefined'){
  // now access your localStorage
  localstoreToken.token =  localStorage.getItem("token")
}