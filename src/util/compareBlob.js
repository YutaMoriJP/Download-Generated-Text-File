/**
 *
 * @param {Blob} current
 * @param {Blob} previous
 * @returns resolved promise value with a boolean value. If the content of the blob is equal, it's true.
 */
const compareBlob = async (current, previous) => {
  const a = new Response(current).text();
  const b = new Response(previous).text();
  const [blob1, blob2] = await Promise.all([a, b]);
  return blob1.replace(/\s/g, "") === blob2.replace(/\s/g, "");
};

export default compareBlob;
