import { signIn } from "@/auth";
import { Button } from "../ui/button";
export function SignInButton({ redirectTo = "/dashboard" }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo });
      }}
    >
      <Button type="submit">Sign in</Button>
    </form>
  );
}
