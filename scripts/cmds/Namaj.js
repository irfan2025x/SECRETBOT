const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "namaj",
    version: "1.0",
    author: "Irfan Ahmed",
    countDown: 20,
    role: 0,
    shortDescription: { vi: "", en: "" },
    longDescription: { vi: "", en: "" },
    category: "general",
    guide: { en: "" },
    envConfig: {}
  },
  onStart: async function ({ message, event }) {
    // ৫ ওয়াক্ত নামাজের নাম ও সোর্স
    const namajList = [
      {
        name: "Fajr",
        index: 1,
        niyat: "নিয়ত: আমি আল্লাহর সন্তুষ্টির জন্য ফজরের নামাজ ২ রাকআত ফরজ আদায় করি।",
        arabic: "أصلي فرض صلاة الفجر",
        transliteration: "আসল্লি ফারদ সালাতুল ফাজর",
        translation: "আমি ফজরের ফরজ নামাজ আদায় করি।",
        source: "সহীহ মুসলিম"
      },
      {
        name: "Dhuhr",
        index: 2,
        niyat: "নিয়ত: আমি আল্লাহর সন্তুষ্টির জন্য যোহরের নামাজ ৪ রাকআত ফরজ আদায় করি।",
        arabic: "أصلي فرض صلاة الظهر",
        transliteration: "আসল্লি ফারদ সালাতুল যোহর",
        translation: "আমি যোহরের ফরজ নামাজ আদায় করি।",
        source: "সহীহ বুখারি"
      },
      {
        name: "Asr",
        index: 3,
        niyat: "নিয়ত: আমি আল্লাহর সন্তুষ্টির জন্য আসরের নামাজ ৪ রাকআত ফরজ আদায় করি।",
        arabic: "أصلي فرض صلاة العصر",
        transliteration: "আসল্লি ফারদ সালাতুল আসর",
        translation: "আমি আসরের ফরজ নামাজ আদায় করি।",
        source: "সহীহ মুসলিম"
      },
      {
        name: "Maghrib",
        index: 4,
        niyat: "নিয়ত: আমি আল্লাহর সন্তুষ্টির জন্য মাগরিবের নামাজ ৩ রাকআত ফরজ আদায় করি।",
        arabic: "أصلي فرض صلاة المغرب",
        transliteration: "আসল্লি ফারদ সালাতুল মাগরিব",
        translation: "আমি মাগরিবের ফরজ নামাজ আদায় করি।",
        source: "সহীহ বুখারি"
      },
      {
        name: "Isha",
        index: 5,
        niyat: "নিয়ত: আমি আল্লাহর সন্তুষ্টির জন্য ইশার নামাজ ৪ রাকআত ফরজ আদায় করি।",
        arabic: "أصلي فرض صلاة العشاء",
        transliteration: "আসল্লি ফারদ সালাতুল ইশা",
        translation: "আমি ইশার ফরজ নামাজ আদায় করি।",
        source: "সহীহ মুসলিম"
      }
    ];

    // সময় ও তারিখ
    const now = moment().tz('Asia/Dhaka');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');

    // নামাজের নাম পাঠানো
    let replyMessage = "💫《 ⩸__𝐍𝐚𝐦𝐚𝐣 𝐖𝐚𝐤𝐭𝐬__⩸ 》💫\n";
    namajList.forEach(namaj => {
      replyMessage += `${namaj.index}. ${namaj.name}\n`;
    });

    // নামাজের নামের সাথে বার্তা
    message.reply({
      body: `${replyMessage}\n
💫《 ⩸__𝐁𝐨𝐭 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧__⩸ 》💫\n
\🤖BOT NAME: ⩸__${global.GoatBot.config.nickNameBot}__⩸
\🗓 DATE: ${date}
\⏰ NOW TIME: ${time}\n
🔍 Information provided by: Irfan Ahmed\n
📩 Reply with the number of the namaj to get its details.`
    });
  },

  onChat: async function ({ event, message }) {
    const namajList = [
      {
        name: "Fajr",
        niyat: "নিয়ত: আমি আল্লাহর সন্তুষ্টির জন্য ফজরের নামাজ ২ রাকআত ফরজ আদায় করি।",
        arabic: "أصلي فرض صلاة الفجر",
        transliteration: "আসল্লি ফারদ সালাতুল ফাজর",
        translation: "আমি ফজরের ফরজ নামাজ আদায় করি।",
        source: "সহীহ মুসলিম"
      },
      {
        name: "Dhuhr",
        niyat: "নিয়ত: আমি আল্লাহর সন্তুষ্টির জন্য যোহরের নামাজ ৪ রাকআত ফরজ আদায় করি।",
        arabic: "أصلي فرض صلاة الظهر",
        transliteration: "আসল্লি ফারদ সালাতুল যোহর",
        translation: "আমি যোহরের ফরজ নামাজ আদায় করি।",
        source: "সহীহ বুখারি"
      },
      {
        name: "Asr",
        niyat: "নিয়ত: আমি আল্লাহর সন্তুষ্টির জন্য আসরের নামাজ ৪ রাকআত ফরজ আদায় করি।",
        arabic: "أصلي فرض صلاة العصر",
        transliteration: "আসল্লি ফারদ সালাতুল আসর",
        translation: "আমি আসরের ফরজ নামাজ আদায় করি।",
        source: "সহীহ মুসলিম"
      },
      {
        name: "Maghrib",
        niyat: "নিয়ত: আমি আল্লাহর সন্তুষ্টির জন্য মাগরিবের নামাজ ৩ রাকআত ফরজ আদায় করি।",
        arabic: "أصلي فرض صلاة المغرب",
        transliteration: "আসল্লি ফারদ সালাতুল মাগরিব",
        translation: "আমি মাগরিবের ফরজ নামাজ আদায় করি।",
        source: "সহীহ বুখারি"
      },
      {
        name: "Isha",
        niyat: "নিয়ত: আমি আল্লাহর সন্তুষ্টির জন্য ইশার নামাজ ৪ রাকআত ফরজ আদায় করি।",
        arabic: "أصلي فرض صلاة العشاء",
        transliteration: "আসল্লি ফারদ সালাতুল ইশা",
        translation: "আমি ইশার ফরজ নামাজ আদায় করি।",
        source: "সহীহ মুসলিম"
      }
    ];

    const replyIndex = parseInt(event.body.trim());
    if (isNaN(replyIndex) || replyIndex < 1 || replyIndex > 5) {
      return message.reply("দয়া করে ১ থেকে ৫ পর্যন্ত একটি নাম্বার লিখুন।");
    }

    // কোনো ভুল নাম্বার দিলে পেমেন্ট সিস্টেমে নাম্বার চেক করতে বলা হবে
    const namaj = namajList[replyIndex - 1];

    message.reply({
      body: `
নামাজ: ${namaj.name}
নিয়ত: ${namaj.niyat}
আরবি: ${namaj.arabic}
বাংলা উচ্চারণ: ${namaj.transliteration}
বাংলা অনুবাদ: ${namaj.translation}
সূত্র: ${namaj.source}`
    });
  }
};
