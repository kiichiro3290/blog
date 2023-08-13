import Container from "./container";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <p>All rights reserved © kiichiro_kai 2023</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
