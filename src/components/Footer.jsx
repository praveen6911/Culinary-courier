// Footer component for footer section
import "../styles/Footer.css";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      Created By
      <i className="fa-solid fa-heart"></i>
      <a
        href="https://www.linkedin.com/in/praveen-kumar-siraparapu-426001255/"
        target="_blank"
        title="Praveen's Linkedin Profile"
      >
        Praveen Kumar Siraparapu
      </a>
      <i className="fa-solid fa-copyright"></i>
      {year}
      <a
        href="https://github.com/praveen6911/react-holidays"
        target="_blank"
        title="Coulinary courier Github Repository"
      >
        <strong>
          Coulinary<span>Courier</span>
        </strong>
      </a>
    </div>
  );
};

export default Footer;
