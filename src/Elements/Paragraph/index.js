import "./styles.css";

const Paragraph = ({ attributes, children }) => (
  <p {...attributes} className="element-paragraph">
    {children}
  </p>
);

export default Paragraph;
