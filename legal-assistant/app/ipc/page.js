import Link from 'next/link';

export default function IpcCheck() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(3,70,148)] text-white">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">IPC Check</h1>
        <p className="text-lg">Choose an option below:</p>
        <div className="space-x-4">
          <Link href="ipc/code" className="px-4 py-2 bg-white text-[rgb(3,70,148)] font-semibold rounded hover:bg-gray-200 transition duration-200">
              Enter IPC
   
          </Link>
          <Link href="ipc/offense" className="px-4 py-2 bg-white text-[rgb(3,70,148)] font-semibold rounded hover:bg-gray-200 transition duration-200">
              Enter Offense
          </Link>
        </div>
      </div>
    </div>
  );
}
