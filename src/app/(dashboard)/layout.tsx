import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh lg:h-screen lg:overflow-hidden bg-zinc-50 dark:bg-zinc-900">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-x-clip pb-20 md:pb-0 lg:overflow-auto">{children}</main>
    </div>
  );
}
