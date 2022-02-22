const withImage = (editor) => {
  const { isVoid } = editor;

  editor.isVoid = (element) =>
    element.type === "image" ? true : isVoid(element);

  return editor;
};

export default withImage;
