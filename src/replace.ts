/**
 * A generic recursive replacement function that will crawl any object provided to it's initial call and replace any string value that is exactly equal to the "match" param with the value of the "replacement" param. This function should handle any JSON structure of any arbitrary complexity, as well as arrays and individual values.
 * @param content Any value of any type in which values should be replaced.
 * @param match A string which is used to match content against, this is the "target" value of the replacement.
 * @param replacement The string to replace any values that are equal to the "match" param with/
 * @returns
 */
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
