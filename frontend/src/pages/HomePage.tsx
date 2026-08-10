import { useGetHealthQuery } from "@/store/api/healthApi";

export default function HomePage() {
  const { data, isLoading, isError } = useGetHealthQuery();

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-5xl font-bold tracking-tight">Virexon App</h1>
      <p className="text-gray-400 text-lg">
        React 19 · Vite · Redux Toolkit · Tailwind CSS v4
      </p>

      <div className="mt-4 rounded-xl border border-gray-800 bg-gray-900 px-8 py-6 text-center">
        <p className="text-sm text-gray-500 mb-2">API Status</p>
        {isLoading && <p className="text-yellow-400">Checking API…</p>}
        {isError && <p className="text-red-400">Could not reach the backend</p>}
        {data && <p className="text-green-400">{data.message}</p>}
      </div>
    </main>
  );
}
