import LandingCard from "./landing_card";

const CARD_INFO = [
  {
    id: 1,
    icon: "🏋️",
    title: "Comprehensive Tracking",
    description:
      "Track workouts, nutrition, and sleep with our intuitive dashboard that displays detailed metrics and insights.",
  },
  {
    id: 2,
    title: "Progress Tracking",
    icon: "📊",
    description:
      "Visualize your fitness journey with interactive graphs and metrics that show improvements and trends over time.",
  },
  {
    id: 3,
    icon: "📹",
    title: "Video Demonstrations",
    description:
      "Access detailed video demonstrations for every exercise to ensure proper form and maximize your workout results.",
  },
  {
    id: 4,
    icon: "🤝",
    title: "Community Support",
    description:
      "Connect with our friendly community to share tips, get answers to fitness questions, and find ongoing motivation.",
  },
  {
    id: 5,
    title: "Workout Library",
    icon: "📖",
    description:
      "Browse our extensive collection of pre-designed workout routines or build and save your own custom fitness plans.",
  },
  {
    id: 6,
    title: "Challenge Mode",
    icon: "💪",
    description:
      "Boost motivation by joining time-limited fitness challenges where you can compete with friends and fellow users.",
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
