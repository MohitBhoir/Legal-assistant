import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
   <div>
      <div className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-sky-200 h-screen flex items-center justify-center">
        {/* Animated Background Lines */}
        <div className="absolute inset-0">
          {/* Line 1 */}
          <div className="absolute w-[5px] h-full bg-orange-200 animate-line-up left-1/4 sm:left-1/3 md:left-1/4"></div>
          {/* Line 2 */}
          <div className="absolute w-[5px] h-full bg-orange-200 animate-line-down left-1/2 sm:left-2/3 md:left-1/2"></div>
          {/* Line 3 */}
          <div className="absolute h-[5px] w-full bg-orange-200 animate-line-left top-1/3 sm:top-1/4 md:top-1/3"></div>
          {/* Line 4 */}
          <div className="absolute h-[5px] w-full bg-orange-200 animate-line-right top-2/3 sm:top-3/4 md:top-2/3"></div>
        </div>
        <div className="relative z-10 -top-6">
          <SignIn afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}