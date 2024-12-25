import Chat from '../components/Chat';
import Navbar from '../components/navbar';

export default function Forum() {
  return <>
    <Navbar/>
    <div className="min-h-screen bg-transparent">
      <h1 className="text-3xl text-center text-indigo-700 font-semibold my-8">Chat Forum</h1>
      <Chat />
    </div>
  </>
}
