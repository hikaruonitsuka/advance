type Props = {
  children: React.ReactNode;
};

export default function Inner({ children }: Props) {
  return <div className="mx-auto max-w-7xl px-4">{children}</div>;
}
