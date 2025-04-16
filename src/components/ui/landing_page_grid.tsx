import LandingCard from "./landing_card";

const CARD_INFO = [
  {
    id: 1,
    icon: "🏋️",
    title: "Comprehensive Tracking",
    description:
      "Track workouts, nutrition, sleep, and more with our intuitive dashboard and detailed metrics.",
  },
  {
    id: 2,
    title: "Progress Tracking",
    icon: "📊",
    description:
      "Get access to visual graphs and metrics showing improvements over time.",
  },
  {
    id: 3,
    icon: "📹",
    title: "Video Demonstrations",
    description:
      "Video demonstrations for each exercise for proper form and guidance.",
  },
  {
    id: 4,
    icon: "🤝",
    title: "Community Support",
    description:
      "Ask our friendly community for overload tips and general fitness enquiries.",
  },
  {
    id: 5,
    title: "Workout Library",
    icon: "📖",
    description:
      "Get access to pre-designed workouts or create your own custom routines.",
  },
  {
    id: 6,
    title: "Challenge Mode",
    icon: "💪",
    description:
      "Join time-limited fitness challenges to stay motivated and compete with friends.",
  },
];

export default function LandingGrid() {
  return (
    <div className="landing_grid">
      {CARD_INFO.map((card) => (
        <LandingCard
          key={card.id}
          icon={card.icon}
          title={card.title}
          description={card.description}
        ></LandingCard>
      ))}
    </div>
  );
}
