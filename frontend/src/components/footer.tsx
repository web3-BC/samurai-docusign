import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-100 bg-white py-10">
      <Image
        height={28}
        width={350}
        src={"/images/samurai.svg"}
        alt="samurai logo text-black"
        className="mx-auto mb-4"
      />

      <p className="text-center">
        Github:{" "}
        <a
          href="https://github.com/web3-BC/samurai-docusign"
          className="text-secondary-500"
        >
          @web3-BC/samurai-docusign
        </a>
      </p>
    </footer>
  );
};

export default Footer;
