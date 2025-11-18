import { useRouter } from "../hooks/useRouter";

export function Link({ to, children, ...props }) {
  const { navigateTo } = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    navigateTo(to)
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}