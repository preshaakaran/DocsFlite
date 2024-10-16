import Header from "@/components/header";
import Upload from "@/components/upload";
import { currentUser } from "@clerk/nextjs/server";

export default async function UploadPage() {
  const user = await currentUser();
  const plainUser = user ? JSON.parse(JSON.stringify(user)) : null;
  return (<div>

    <Upload user={plainUser} />
    </div>);
}