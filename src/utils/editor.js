export const createParagraphNode = (children = [{ text: "" }]) => ({
  type: "paragraph",
  children
});

export const createImageNode = (alt, src) => ({
  type: "image",
  alt,
  src,
  children: [{ text: "" }]
});
