//Web3Storage import
import { Web3Storage } from "web3.storage";
import imageCompression from "browser-image-compression";


var options = {
  maxSizeMB: 1,
  useWebWorker: true,
};

const token = process.env.NEXT_PUBLIC_STORAGE_API;
const client = new Web3Storage({ token });

export const uploadFile = async (file, type) => {
  if (!file) return;

  const fileName = file.name.replace(/ /g, "");

  var blob = file.slice(0, file.size, file.type);
  const newFile = new File([blob], fileName, {type: file.type});

  let finalFile = newFile;

  try {
    if (type === "image") finalFile = await imageCompression(newFile, options);

    const cid = await client.put([finalFile]);

    return `https://${cid}.ipfs.dweb.link/${fileName}`;
  } catch (e) {
    console.log(e);
  }
};