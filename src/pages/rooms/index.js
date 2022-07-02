import Link from "next/link";
import AppLayout from "../../components/AppLayout";

export default function rooms() {
  return (
    <AppLayout>
      <h1>Estas son las Habitaciones</h1>
      <Link href="/">Go Home</Link>
    </AppLayout>
  );
}
