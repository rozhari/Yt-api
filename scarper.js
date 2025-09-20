const axios = require("axios");

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const ytd = async (url) => {
  const headers = { Referer: "https://id.ytmp3.mobi/" };
  let videoID;

  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") videoID = parsed.pathname.slice(1);
    if (parsed.hostname.includes("youtube.com")) videoID = parsed.searchParams.get("v");
  } catch {
    throw new Error("Invalid YouTube URL");
  }

  if (!videoID) throw new Error("Couldn't extract video ID");

  const urlParam = { v: videoID, f: "mp4", _: Math.random() };

  const { data: initData } = await axios.get(
    `https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`,
    { headers }
  );
  const fullConvertUrl = `${initData.convertURL}&${new URLSearchParams(urlParam)}`;
  const { data: convertData } = await axios.get(fullConvertUrl, { headers });

  while (true) {
    const { data: prog } = await axios.get(convertData.progressURL, { headers });
    if (prog.error) throw new Error("Convert failed: " + prog.error);
    if (prog.progress === 3) {
      return {
        title: prog.title,
        url: convertData.downloadURL
      };
    }
    await delay(1000);
  }
};

module.exports = { ytd };
