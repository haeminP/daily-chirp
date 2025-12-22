import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdatePassword } from "@/hooks/mutations/use-update-password";
import { generateErrorMessage } from "@/lib/error";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: updatePassword, isPending: isUpdatePasswordPending } =
    useUpdatePassword({
      onSuccess: () => {
        toast.info("Succesfully updated the password.", {
          position: "top-center",
        });
        navigate("/");
      },
      onError: (error) => {
        const message = generateErrorMessage(error);
        toast.error(message, {
          position: "top-center",
        });
        setPassword("");
      },
    });
  const handleUpdatePasswordClick = () => {
    if (password.trim() === "") return;
    updatePassword(password);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-bold">Reset Password</div>
        <div className="text-muted-foreground">Enter a new password</div>
      </div>
      <Input
        value={password}
        disabled={isUpdatePasswordPending}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="py-6"
        placeholder="password"
      />
      <Button
        onClick={handleUpdatePasswordClick}
        disabled={isUpdatePasswordPending}
        className="w-full"
      >
        Reset password
      </Button>
    </div>
  );
}
