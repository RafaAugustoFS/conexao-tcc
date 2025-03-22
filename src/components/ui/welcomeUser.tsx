const getCurrentDate = () => {
  const today = new Date();
  return today.toLocaleDateString("pt-BR", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function WelcomeMessage() {
  return (
    <div>
      <div>
        <p className="text-gray-500">{getCurrentDate()}</p>
      </div>
    </div>
  );
}
