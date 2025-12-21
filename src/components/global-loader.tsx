import logo from "@/assets/logo.png";

export default function GlobalLoader() {
  return (
    <div className="h-[100vh] w-[100vw] bg-muted flex flex-col items-center justify-center">
      <div className="flex items-center gap-4 mb-15 animate-bounce">
        <img className="w-10" src={logo} alt="daily chirp service logo" />
        <div className="text-2xl font-bold">Daily Chirp</div>
      </div>
    </div>
  );
}
