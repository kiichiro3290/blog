import Link from "next/link";
import Container from "./container";

const Header = () => {
  return (
    <div className="bg-orange-300 pt-8">
      <Container>
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 pb-4 flex justify-between">
          <Link href="/" className="hover:underline">
            Blog
          </Link>
          <div className="flex gap-8">
            <Link href="https://github.com/kiichiro3290">GitHub</Link>
          </div>
        </h2>
      </Container>
    </div>
  );
};

export default Header;
