const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
config: {
  name: "owner",
  aurthor:"Tokodori",// Convert By Goatbot Tokodori 
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "admin",
  guide: "{pn}"
},

  onStart: async function ({ api, event }) {
  try {
    const ownerInfo = {
      name: '𝒢𝓍 𝑅𝒶𝒾𝒽𝒶𝓃',
      gender: '𝑀𝒶𝓁𝑒',
      age: '𝓤𝓷𝓴𝓷𝓸𝔀𝓷',
      height: '𝓤𝓷𝓴𝓷𝓸𝔀𝓷',
      facebookLink: 'stalk moko mwa',
      nick: '𝑅𝒶𝒽𝓊𝓊𝓊'
    };

    const bold = 'https://tinyurl.com/2czyjn8e'; // Replace with your Google Drive videoid link https://drive.google.com/uc?export=download&id=here put your video id

    const tmpFolderPath = path.join(__dirname, 'tmp');

    if (!fs.existsSync(tmpFolderPath)) {
      fs.mkdirSync(tmpFolderPath);
    }

    const videoResponse = await axios.get(bold, { responseType: 'arraybuffer' });
    const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

    fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

    const response = `
𝗢𝘄𝗻𝗲𝗿 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻 -𝗛𝗜𝗡𝗔𝗧𝗔 :🤍✨

~ 𝐍𝐚𝐦𝐞: ${ownerInfo.name}

~ 𝐆𝐞𝐧𝐝𝐞𝐫: ${ownerInfo.gender}

~ 𝐀𝐠𝐞: ${ownerInfo.age}

~ 𝐇𝐞𝐢𝐠𝐡𝐭: ${ownerInfo.height}

~ 𝐍𝐢𝐜𝐤: ${ownerInfo.nick}

~ 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞: 𝗛𝗜𝗡𝗔𝗧𝗔 ✨
`;


    await api.sendMessage({
      body: response,
      attachment: fs.createReadStream(videoPath)
    }, event.threadID, event.messageID);

    if (event.body.toLowerCase().includes('ownerinfo')) {
      api.setMessageReaction('🚀', event.messageID, (err) => {}, true);
    }
  } catch (error) {
    console.error('Error in ownerinfo command:', error);
    return api.sendMessage('An error occurred while processing the command.', event.threadID);
  }
},
};
