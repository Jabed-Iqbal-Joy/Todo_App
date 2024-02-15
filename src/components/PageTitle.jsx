export default function PageTitle({ label, icon }) {
  return (
    <div className="block  h-12 w-full flex gap-5 items-center mb-10">
      <span>{icon}</span>
      <h1 className="text-2xl font-bold">{label}</h1>
    </div>
  );
}
