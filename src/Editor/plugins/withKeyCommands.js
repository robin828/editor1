import { Node, Path, Transforms } from "slate";

import { createParagraphNode } from "../../utils/editor";

const withKeyCommands = (editor) => {
  const { deleteBackward, insertBreak, isVoid } = editor;

  editor.deleteBackward = (...args) => {
    const parentPath = Path.parent(editor.selection.focus.path);
    const parentNode = Node.get(editor, parentPath);

    if (isVoid(parentNode) || !Node.string(parentNode).length) {
      Transforms.removeNodes(editor, { at: parentPath });
    } else {
      deleteBackward(...args);
    }
  };

  editor.insertBreak = (...args) => {
    const parentPath = Path.parent(editor.selection.focus.path);
    const parentNode = Node.get(editor, parentPath);

    if (isVoid(parentNode)) {
      const nextPath = Path.next(parentPath);
      Transforms.insertNodes(editor, createParagraphNode(), {
        at: nextPath,
        select: true
      });
    } else {
      insertBreak(...args);
    }
  };

  return editor;
};

export default withKeyCommands;
