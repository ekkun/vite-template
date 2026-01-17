// src/react/Button.tsx
const Button = () => {
  const handleClick = () => {
    alert('押下されました！');
  };

  return (
    <button className="button" type="button" onClick={handleClick}>
      押下してください！
    </button>
  );
};

export { Button };
