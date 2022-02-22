import { useState, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import pipe from "lodash/fp/pipe";

import Paragraph from "../Elements/Paragraph";
import Image from "../Elements/Image";

import withImage from "./plugins/withImage";
import withKeyCommands from "./plugins/withKeyCommands";

import { createParagraphNode, createImageNode } from "../utils/editor";

import "./styles.css";

const renderElement = (props) => {
  switch (props.element.type) {
    case "image":
      return <Image {...props} />;
    default:
      return <Paragraph {...props} />;
  }
};

const createEditorWithPlugins = pipe(
  withReact,
  withHistory,
  withImage,
  withKeyCommands
);

const Editor = () => {
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const [value, setValue] = useState([
    createParagraphNode([
      {
        text:
          "Nicolas Kim Coppola (born January 7, 1964),[2][3] known professionally as Nicolas Cage, is an American actor and filmmaker. Cage has been nominated for numerous major cinematic awards, and won an Academy Award, a Golden Globe, and Screen Actors Guild Award for his performance in Leaving Las Vegas (1995). He earned his second Academy Award nomination for his performance as Charlie and Donald Kaufman in Adaptation (2002)."
      }
    ]),
    createImageNode("Nicolas Cage GIF", "https://www.placecage.com/gif/600/250")
  ]);

  return (
    <Slate editor={editor} value={value} onChange={setValue}>
      <Editable autoFocus renderElement={renderElement} />
    </Slate>
  );
};

export default Editor;
