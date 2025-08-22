
const Card = ({ title, img, className = "" }) => {
  return (
    <div className={`relative rounded-3xl overflow-hidden shadow-xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-300 ${className}`}>
      <img 
        src={img} 
        alt={title} 
        className="w-full h-full object-cover" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      <h2 className="absolute bottom-6 left-6 text-3xl font-bold text-white drop-shadow-lg">
        {title}
      </h2>
    </div>
  );
};

export default Card;