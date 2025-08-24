interface CommonPageProps {
  children: React.ReactNode;
}

export default function CommonPage({ children }: CommonPageProps) {
  return <div className="max-w-7xl mx-auto">{children}</div>;
}
