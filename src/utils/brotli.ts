import brotliPromise from "brotli-wasm";

export const decompressPolygonJson = async <T>(
  compressedPolygon: string
): Promise<T> => {
  const brotli = await brotliPromise;

  const raw = new Uint8Array(Buffer.from(compressedPolygon, "base64"));
  const decompressed = brotli.decompress(raw);

  const jsonString = new TextDecoder().decode(decompressed);

  return JSON.parse(jsonString);
};
