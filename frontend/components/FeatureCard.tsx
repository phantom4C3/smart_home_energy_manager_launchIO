interface FeatureCardProps {
  id: string
  title: string;
  description : string;
  onClick: () => void;
}

export default function FeatureCard({ id, title, description, onClick } : FeatureCardProps ){
  return (
    <div
      className="p-4 border border-black rounded-lg shadow-md hover:shadow-lg cursor-pointer transition flex flex-col bg-gradient-to-r from-pink-  via-pink-600 via-45%% to-pink-400 mx-auto max-w-[20rem] hover:scale-105
      "
      onClick={onClick}
      id={id}
    >
      <h3 className="text-xl font-semibold ">{title}</h3>
      <p>{description}</p> 
    </div>
  );
}
 
