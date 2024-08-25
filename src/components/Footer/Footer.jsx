const Footer = () => {
  return (
    <footer className=" text-sm fixed right- bottom-0 w-full sm:text-base sm:w-full bg-[var(--theme)] text-white p-3 flex items-center justify-center">
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
