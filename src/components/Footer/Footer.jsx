const Footer = () => {
  return (
    <footer className="sm:text-base text-sm w-full bg-[var(--theme)] text-white p-3 flex items-center justify-center">
      <p>
        {" "}
        Created By <span className="font-medium">Sachin Alam</span> |{" "}
        <a href="https://github.com/sachin9998/Financely" target="_blank">
          Github
        </a>{" "}
        |{" "}
        <a href="https://linkedin.com/in/sachinalam/" target="_blank">
          Linkedin
        </a>
      </p>
    </footer>
  );
};

export default Footer;
