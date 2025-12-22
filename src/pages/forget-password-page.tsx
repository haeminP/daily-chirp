import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRequestPasswordResetEmail } from "@/hooks/mutations/use-request-password-reset-email";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");

  const {
    mutate: requestPasswordResetEmail,
    isPending: isRequestPasswordResetEmailPending,
  } = useRequestPasswordResetEmail({
    onSuccess: () => {
      toast.info("Password reset email has been sent.", {
        position: "top-center",
      });
      setEmail("");
    },
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: "top-center",
      });
      setEmail("");
    },
  });

  const handleSendEmailClick = () => {
    if (email.trim() === "") return;
    requestPasswordResetEmail(email);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">Forgot your password?</div>
        <div className="text-muted-foreground">
          Get an email to reset your password
        </div>
      </div>
      <Input
        value={email}
        disabled={isRequestPasswordResetEmailPending}
        onChange={(e) => setEmail(e.target.value)}
        className="py-6"
        placeholder="example@abc.com"
      />
      <Button
        onClick={handleSendEmailClick}
        disabled={isRequestPasswordResetEmailPending}
        className="w-full"
      >
        Get an email for password reset
      </Button>
    </div>
  );
}
