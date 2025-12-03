import { Link } from 'react-router';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  children?: React.ReactNode;
  className?: string;
}

const baseStyles =
  'inline-flex items-center gap-2 rounded-lg transition cursor-pointer group';

const variants = {
  primary: 'bg-amber-500 hover:bg-amber-400 text-black px-4 py-2',
  secondary: 'bg-gray-700 hover:bg-gray-600 text-white px-6 py-3',
  ghost: 'text-white hover:text-amber-500 px-2',
  link: 'text-sm hover:font-semibold',
};

const Button = ({
  to,
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) => {
  const styles = `${baseStyles} ${variants[variant]} ${className ?? ''}`;

  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    );
  }
  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};

export default Button;
