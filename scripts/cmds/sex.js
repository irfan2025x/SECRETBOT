module.exports = {
  config: {
    name: "sex",
    version: "7.0",
    author: "xnil",
    countDown: 5,
    role: 1,
    shortDescription: "all video ðŸ“·",
    longDescription: "",
    category: "Video",
    guide: "{pn}"
  },
   onStart: async function ({ message }) {
   var xnil= ["https://i.imgur.com/FbnZI40.mp4",
"https://i.imgur.com/E9gbTEZ.mp4",
"https://i.imgur.com/17nXn9K.mp4",
"https://i.imgur.com/nj23cCe.mp4",
"https://i.imgur.com/lMpmBFb.mp4",
"https://i.imgur.com/85iuBp2.mp4",
"https://i.imgur.com/E9gbTEZ.mp4",
"https://i.imgur.com/R3XHTby.mp4",
"https://i.imgur.com/qX2HUXp.mp4",
"https://i.imgur.com/R3XHTby.mp4",
"https://i.imgur.com/MYn0ese.mp4",
 "https://i.imgur.com/yipoKec.mp4",
"https://i.imgur.com/0tFSIWT.mp4",
"https://i.imgur.com/BzP6eD8.mp4",
"https://i.imgur.com/aDlwRWy.mp4",
"https://i.imgur.com/l3c86M3.mp4",
"https://i.imgur.com/lfjT7bx.mp4",
"https://i.imgur.com/Zp5sci1.mp4",
"https://i.imgur.com/S6rHOc1.mp4",
"https://i.imgur.com/cAHRfq3.mp4",
"https://i.imgur.com/zzqEWkN.mp4",
"https://i.imgur.com/fL1igWD.mp4",
"https://i.imgur.com/ZRt0bGT.mp4",
"https://i.imgur.com/fAKWP0W.mp4",
"https://i.imgur.com/FbnZI40.mp4",
]

let msg = xnil[Math.floor(Math.random()*xnil.length)]
message.send({
  body: 'sex😻',attachment: await global.utils.getStreamFromURL(msg)
})
}
     }
