import { signin } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

export default function SignInButton() {
  return (
    <form action={signin}>
      <Button type="submit">SignIn</Button>
    </form>
  );
}
