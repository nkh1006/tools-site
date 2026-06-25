export default function AdBanner({ size = "horizontal" }: { size?: "horizontal" | "square" }) {
  const cls =
    size === "horizontal"
      ? "h-24 w-full"
      : "h-60 w-full";

  return (
    <div className={`${cls} bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm my-4`}>
      광고 영역
    </div>
  );
}
