import './Button.css';

interface ButtonProps {
  text: string;
  onClick: () => void; 
  className?: string;
}

function Button({ text, onClick, className }: ButtonProps) {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
}
export default Button;
