module.exports = {
  config: {
    name: "hadis2",
    version: "1.0",
    author: "Irfan Ahmed",
    countDown: 20,
    role: 0,
    category: "knowledge",
    guide: {
      en: "Use this command to get one random hadith in Bangla from different books."
    }
  },
  onStart: async function ({ message }) {
    // হাদিসের নতুন বইয়ের তথ্য
    const hadithBooks = [
      {
        name: "তিরমিজি",
        link: "https://sunnah.com/tirmidhi",
        hadiths: [
          {
            text: "যে ব্যক্তি রোজা রাখে এবং মিথ্যা বলা থেকে বিরত থাকে না, তার পানাহার ত্যাগ করার প্রয়োজন নেই।",
            source: "তিরমিজি - পৃষ্ঠা ১০",
            arabic: "مَنْ لَمْ يَدَعْ قَوْلَ الزُّورِ فَلَيْسَ لِلَّهِ حَاجَةٌ فِي أَنْ يَدَعَ طَعَامَهُ وَشَرَابَهُ"
          },
          {
            text: "তোমরা প্রতিবেশীদের প্রতি সদয় হও।",
            source: "তিরমিজি - পৃষ্ঠা ২৪",
            arabic: "أَحْسِنُوا إِلَى جِيرَانِكُمْ"
          },
          {
            text: "কিয়ামতের দিনে একজন নেককারের ওজন পাহাড়সম হবে।",
            source: "তিরমিজি - পৃষ্ঠা ৩৫",
            arabic: "إِنَّ الْحَسَنَاتِ يُثْقِلْنَ الْمِيزَانَ"
          },
          {
            text: "সুখী সেই ব্যক্তি, যে আল্লাহর সাথে ভালোবাসা গড়ে তোলে।",
            source: "তিরমিজি - পৃষ্ঠা ৫৫",
            arabic: "طُوبَى لِمَنْ أَحَبَّ اللَّهَ وَاللَّهُ أَحَبَّهُ"
          },
          {
            text: "অন্যের কষ্ট লাঘব করো, আল্লাহ তোমার কষ্ট দূর করবেন।",
            source: "তিরমিজি - পৃষ্ঠা ৭৭",
            arabic: "مَنْ فَرَّجَ عَنْ مُؤْمِنٍ كُرْبَةً، فَرَّجَ اللَّهُ عَنْهُ كُرْبَةً"
          }
        ]
      },
      {
        name: "ইবনে মাজাহ",
        link: "https://sunnah.com/ibnmajah",
        hadiths: [
          {
            text: "তোমাদের মধ্যে উত্তম সেই ব্যক্তি যে তার স্ত্রীর প্রতি ভালো আচরণ করে।",
            source: "ইবনে মাজাহ - পৃষ্ঠা ৮",
            arabic: "خَيْرُكُمْ خَيْرُكُمْ لِنِسَائِهِ"
          },
          {
            text: "রাতের প্রথম তৃতীয়াংশে আল্লাহ দোয়া গ্রহণ করেন।",
            source: "ইবনে মাজাহ - পৃষ্ঠা ১৩",
            arabic: "يَقْبَلُ اللَّهُ الدُّعَاءَ فِي الثُّلُثِ الأَوَّلِ مِنَ اللَّيْلِ"
          },
          {
            text: "সৎ কাজের ফলাফল জান্নাত।",
            source: "ইবনে মাজাহ - পৃষ্ঠা ৩৫",
            arabic: "الْجَنَّةُ هِيَ ثَمَرَةُ الأَعْمَالِ الصَّالِحَةِ"
          },
          {
            text: "আল্লাহর সাথে ধৈর্য ধরো, নিশ্চয়ই তিনি ধৈর্যশীলদের ভালোবাসেন।",
            source: "ইবনে মাজাহ - পৃষ্ঠা ৭১",
            arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ"
          },
          {
            text: "তোমরা উত্তম খাবার খাও, যাতে তোমাদের দেহ ও আত্মা পবিত্র থাকে।",
            source: "ইবনে মাজাহ - পৃষ্ঠা ৯২",
            arabic: "كُلُوا الطَّيِّبَاتِ تَطْهُرُوا"
          }
        ]
      },
      {
        name: "মুসনাদ আহমদ",
        link: "https://sunnah.com/musnadahmad",
        hadiths: [
          {
            text: "প্রতিদিন সকালে একটি দান করুন, এটি আপনার রিজিক বৃদ্ধি করবে।",
            source: "মুসনাদ আহমদ - পৃষ্ঠা ৫",
            arabic: "تَصَدَّقُوا كُلَّ صَبَاحٍ يَزِيدُ رِزْقَكُمْ"
          },
          {
            text: "যে ব্যক্তি আল্লাহর উপর নির্ভর করে, আল্লাহ তার জন্য যথেষ্ট।",
            source: "মুসনাদ আহমদ - পৃষ্ঠা ৩২",
            arabic: "مَنْ تَوَكَّلَ عَلَى اللَّهِ فَهُوَ حَسْبُهُ"
          },
          {
            text: "আল্লাহ সেই ব্যক্তিকে সাহায্য করেন, যে নিজের উপর খোদা নির্ভরশীল।",
            source: "মুসনাদ আহমদ - পৃষ্ঠা ৪০",
            arabic: "إِنَّ اللَّهَ يُعِينُ مَنْ أَعَانَ نَفْسَهُ"
          },
          {
            text: "ঈমান হলো হৃদয়ের শান্তি।",
            source: "মুসনাদ আহমদ - পৃষ্ঠা ৫০",
            arabic: "الإِيمَانُ هُوَ سَكِينَةُ الْقَلْبِ"
          },
          {
            text: "আল্লাহ মুমিনদের সকল প্রকার কল্যাণ প্রদান করেন।",
            source: "মুসনাদ আহমদ - পৃষ্ঠা ৭২",
            arabic: "إِنَّ اللَّهَ يُبَارِكُ فِي حَيَاةِ الْمُؤْمِنِينَ"
          }
        ]
      }
    ];

    // রেনডমভাবে একটি বই নির্বাচন
    const randomBook = hadithBooks[Math.floor(Math.random() * hadithBooks.length)];

    // রেনডমভাবে একটি হাদিস নির্বাচন
    const randomHadith = randomBook.hadiths[Math.floor(Math.random() * randomBook.hadiths.length)];

    // রেসপন্স তৈরি
    const response = `📚 *বইয়ের নাম:* ${randomBook.name}\n🔗 *লিংক:* ${randomBook.link}\n\n📖 *হাদিস:*\n"${randomHadith.text}"\n\n🕌 *আরবি:* ${randomHadith.arabic}\n📄 *সূত্র:* ${randomHadith.source}`;

    // বার্তা পাঠানো
    message.reply(response);
  }
};
