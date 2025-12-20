import { signInWithOAuth } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export default function useSignInWithOAuth() {
  return useMutation({
    mutationFn: signInWithOAuth,
  });
}
