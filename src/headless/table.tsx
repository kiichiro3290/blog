export default function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="table-auto w-full">
      {children}
    </table>
  );
}
