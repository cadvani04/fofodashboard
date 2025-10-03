import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="flex items-center justify-evenly align-top">
        <Image src="https://www.fofostudios.com/img/Archive/ChatGPT%20Image%20Aug%2018,%202025,%2004_41_35%20PM.png" alt="Fofo Labs Worldwide" width={90} height={38} priority />
      <h1 className="text-4xl font-bold">Fofo Labs Worldwide</h1>
      <h2 className="text-4xl font-bold hover:cursor-pointer">Settings</h2>
    </div>

  );
}