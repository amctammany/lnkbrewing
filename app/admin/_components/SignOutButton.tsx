import { signout } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return (
    <form action={signout}>
      <Button type="submit">Sign Out</Button>
    </form>
  );
}
