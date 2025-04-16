const { getStreamFromURL } = global.utils;

module.exports = {
  config: {
    name: "pair",
    version: "1.0",
    author: "Rulex-al Loufi",
    shortDescription: {
      in: "pair Girls 😗",
      vi: ""
    },
    category: "fun",
    guide: "{prefix}random-female"
  },

  onStart: async function({ api, event, threadsData, message, usersData }) {
    const uidI = event.senderID;
    let dataSender = await api.getUserInfo(uidI);
    const name1 = await dataSender[uidI].name;
    const avatarUrl1 = `https://graph.facebook.com/${uidI}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

    const threadData = await threadsData.get(event.threadID);
    const members = threadData.members.filter(member => member.inGroup);
    const senderGender = threadData.members.find(
      member => member.userID === uidI
    )?.gender;

    if (members.length === 0)
      return message.reply("There are no members in the group ☹️💕😢");

    const eligibleMembers = members.filter(
      member => member.gender !== senderGender
    );
    if (eligibleMembers.length === 0)
      return message.reply(
        "There are no male/other members in the group ☹️💕😢"
      );

    const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
    const randomMember = eligibleMembers[randomIndex];
    let dataRandomMember = await api.getUserInfo(randomMember.userID);
    const name2 = await dataRandomMember[randomMember.userID].name;
    const avatarUrl2 = `https://graph.facebook.com/${randomMember.userID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

    const randomNumber1 = Math.floor(Math.random() * 36) + 65;
    const randomNumber2 = Math.floor(Math.random() * 36) + 65;

    message.reply({
      body: `•『💗』Congratulations  ${name1} 💕 \nthe new husband and wife:
          💕 ${name2} ❤️
        Like Ratio: "${randomNumber1}% 🤭"
        Like Rate: "${randomNumber2} % 💕"
        \nCongratulations 🌝`,
      mentions: [
        { id: uidI, tag: name1 },
        { id: randomMember.userID, tag: name2 }
      ],
      attachment: [
        await getStreamFromURL(avatarUrl1),
        await getStreamFromURL(avatarUrl2)
      ]
    });
  }
};
