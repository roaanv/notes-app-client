import { Storage } from "aws-amplify";

export async function s3Upload(file:File): Promise<string> {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });

  return (stored as any).key;
}
