import Link from "next/link";
import Container from "./container";

const Header = () => {
  return (
    <header> 
      <div className="flex flex-row gap-4 p-4">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="https://github.com/kiichiro3290">GitHub</Link>
      </div>
    </header>
  );
};

export default Header;
