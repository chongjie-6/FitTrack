export default function LandingCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="landing_card">
      <p className="text-3xl">{icon}</p>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
