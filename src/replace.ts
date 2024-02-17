const recursiveReplace = (content: any, match: string, replacement: string) => {
  if (typeof content === "string") {
    return content === match ? replacement : content;
  } else if (Array.isArray(content)) {
    return content.map((item) => recursiveReplace(item, match, replacement));
  } else if (typeof content === "object") {
    for (const key in content) {
      content[key] = recursiveReplace(content[key], match, replacement);
    }
    return content;
  }
  return content;
};

export default recursiveReplace;
