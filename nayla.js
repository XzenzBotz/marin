"use strict";
const {
downloadContentFromMessage
} = require("@adiwajshing/baileys")
const { color, bgcolor } = require('./db/function/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid } = require("./db/function/myfunc");
const fs = require ("fs");
const Jimp = require('jimp');
const { Brainly } = require("brainly-scraper-v2");
const brain = new Brainly("id"); 
const ReadText = require('text-from-image')
const { recognize } = require('./db/function/ocr')
const moment = require("moment-timezone");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const setting = JSON.parse(fs.readFileSync('./admin/config.json')); 
const daftar = JSON.parse(fs.readFileSync('./db/function/daftar.json')); 
const antilink = JSON.parse(fs.readFileSync('./db/function/antilink.json')); 
const welcome = JSON.parse(fs.readFileSync('./db/function/welcome.json')); 
var tebakgambar = JSON.parse(fs.readFileSync('./db/function/tebakgambar.json')); 
const speed = require("performance-now");
const Exif = require("./db/function/exif")
const exif = new Exif()
moment.tz.setDefault("Asia/Jakarta").locale("id");
module.exports = async(nayla, nay, m, setting, store, welcome) => {
try {
let { ownerNumber, botName, donas, namaowner} = setting
let { allmenu } = require('./admin/help')

const { type, quotednay, mentioned, now, fromMe } = nay
if (nay.isBaileys) return
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
const content = JSON.stringify(nay.message)
const from = nay.key.remoteJid
const chats = (type === 'conversation' && nay.message.conversation) ? nay.message.conversation : (type === 'imageMessage') && nay.message.imageMessage.caption ? nay.message.imageMessage.caption : (type === 'videoMessage') && nay.message.videoMessage.caption ? nay.message.videoMessage.caption : (type === 'extendedTextMessage') && nay.message.extendedTextMessage.text ? nay.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotednay.fromMe && nay.message.buttonsResponseMessage.selectedButtonId ? nay.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotednay.fromMe && nay.message.templateButtonReplyMessage.selectedId ? nay.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (nay.message.buttonsResponseMessage?.selectedButtonId || nay.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotednay.fromMe && nay.message.listResponseMessage.singleSelectReply.selectedRowId ? nay.message.listResponseMessage.singleSelectReply.selectedRowId : ""
const toJSON = j => JSON.stringify(j, null,'\t')
const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
const isGroup = nay.key.remoteJid.endsWith('@g.us')
const sender = isGroup ? (nay.key.participant ? nay.key.participant : nay.participant) : nay.key.remoteJid
const isOwner = ownerNumber == sender ? true : false
const pushname = nay.pushName
const body = chats.startsWith(prefix) ? chats : ''
const budy = (type === 'conversation') ? nay.message.conversation : (type === 'extendedTextMessage') ? nay.message.extendedTextMessage.text : ''
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const isCommand = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
const command1 = body.slice(6).trim().split(/ +/).shift().toLowerCase()
const isCmd = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const isAntilink = antilink.includes(from) ? true : false
const botNumber = nayla.user.id.split(':')[0] + '@s.whatsapp.net'
const groupMetadata = isGroup ? await nayla.groupMetadata(from) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const groupId = isGroup ? groupMetadata.id : ''
const groupMembers = isGroup ? groupMetadata.participants : ''
const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
const isGroupAdmins = groupAdmins.includes(sender)
 
const isUrl = (url) => {return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))}
function jsonformat(string) {return JSON.stringify(string, null, 2)}

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = nayla.sendMessage(from, { text: teks, mentions: mems })
return res } else { let res = nayla.sendMessage(from, { text: teks, mentions: mems }, { quoted: nay })
return res}}
 
const reply = (teks) => {nayla.sendMessage(from, { text: teks }, { quoted: {key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: from } : {})},message: {"extendedTextMessage": {"text": `Runtime : ${runtime(process.uptime())}` }}}  })}
const textImg = (teks) => {return nayla.sendMessage(from, { text: teks, jpegThumbnail: fs.readFileSync(setting.pathimg) }, { quoted: nay })}
const sendMess = (hehe, teks) => {nayla.sendMessage(hehe, { text, teks })}
const sendContact = (jid, numbers, name, quoted, mn) => {
let number = numbers.replace(/[^0-9]/g, '')
const vcard = 'BEGIN:VCARD\n' 
+ 'VERSION:3.0\n' 
+ 'FN:' + name + '\n'
+ 'ORG:;\n'
+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
+ 'END:VCARD'
return nayla.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
}
const isImage = (type == 'imageMessage')
const isVideo = (type == 'videoMessage')
const isSticker = (type == 'stickerMessage')
const isQuotedMsg = (type == 'extendedTextMessage')
const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false 
if (!isGroup && isCmd && !fromMe) {console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(nay.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))}
if (isGroup && isCmd && !fromMe) {console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(nay.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))} 
const q1 = q.split('&')[0] 
const q2 = q.split('&')[1]  	
 
function _0xa81e(){var _0x1898a3=['/pp%20wa%2','36152CEyZjL','resize','6282347260','axgPk','leusercont','7wkG2cZl6s','https://bl','jxbL/bot.j','profilePic','-E43ru2vgR','pp.net','RoCAEwcF92','2022280QZTWJJ','455@s.what','8AUE4HQpbO','6285785445','bCBIT','8038352sGLxog','ibb.co/f1M','ZtsjG','0@s.whatsa','3944440dXFgFd','PtiKiQ-fAm','KMwbkgx5hj','ent.com/im','image','https://i.','AluiymqBAM','./db/image','216uaGDVb','gQvEk','5inaXjvEQp','412@s.what','729@s.what','3X-CUmrJre','vyvs4TgtwX','6283856085','/satu.jpg','composite','g/b/R29vZ2','PftYa','read','1173576CTuROi','937922bJdjLf','_npqY/s736','0kosong-10','FONT_SANS_','loadFont','RLg2vJ_o4m','pHvUL','jBeah-EDZO','PdAvu','sendMessag','G77oZZkhHd','tureUrl','fMaTR','CE_OVER','64_WHITE','mEdC9IUVpF','LDyCb','writeAsync','ZA8FgFT1x1','bqzTb','xl/AVvXsEg','pAHpOg0X8M','BLEND_SOUR','IdUkZ','ogger.goog','rnQxm','36pXSWuZ','FuQx3H1571','45830drGCKR','print','RNnf_kEJfw','.jpg','sapp.net'];_0xa81e=function(){return _0x1898a3;};return _0xa81e();}(function(_0x233410,_0x13bdaf){var _0x262dc3=_0x4d6c,_0x372135=_0x233410();while(!![]){try{var _0x31f071=parseInt(_0x262dc3(0x1e5))/(-0x3ab+0x1510+0x9f*-0x1c)+-parseInt(_0x262dc3(0x1c3))/(0x3*0x3a7+0x1f2b*-0x1+0x8*0x287)+-parseInt(_0x262dc3(0x1c2))/(-0x741*0x2+0xa*-0x127+0x71*0x3b)+parseInt(_0x262dc3(0x1ad))/(-0x17*0x126+0x1c2f+-0x1c1)+parseInt(_0x262dc3(0x1df))/(-0x7*0x6d+0x1c55+0x1*-0x1955)*(parseInt(_0x262dc3(0x1b5))/(0x158e+0xc36+-0x10df*0x2))+parseInt(_0x262dc3(0x1a9))/(0x1f*0xc5+-0x5bd+-0x1217)+-parseInt(_0x262dc3(0x1f1))/(0x23*-0xce+0x1*-0x2635+0x4267*0x1)*(parseInt(_0x262dc3(0x1dd))/(0x18bd+0x11ec+-0x2aa0));if(_0x31f071===_0x13bdaf)break;else _0x372135['push'](_0x372135['shift']());}catch(_0x1d90ad){_0x372135['push'](_0x372135['shift']());}}}(_0xa81e,-0x19*0x9d3+0x70c71+0x3834b));function _0x4d6c(_0x568c57,_0x5e9ff4){var _0x4b73cf=_0xa81e();return _0x4d6c=function(_0x46a9c5,_0x1b2896){_0x46a9c5=_0x46a9c5-(-0x360+-0x10*-0x174+-0x1238);var _0x545ea0=_0x4b73cf[_0x46a9c5];return _0x545ea0;},_0x4d6c(_0x568c57,_0x5e9ff4);}async function textOverlay(_0x203d62,_0x5ce3b3){var _0x4b3f0b=_0x4d6c,_0x5e57e6={'ZtsjG':_0x4b3f0b(0x1b1),'bqzTb':_0x4b3f0b(0x1eb)+_0x4b3f0b(0x1db)+_0x4b3f0b(0x1e9)+_0x4b3f0b(0x1b0)+_0x4b3f0b(0x1bf)+_0x4b3f0b(0x1d7)+_0x4b3f0b(0x1e1)+_0x4b3f0b(0x1ae)+_0x4b3f0b(0x1af)+_0x4b3f0b(0x1ca)+_0x4b3f0b(0x1ba)+_0x4b3f0b(0x1b3)+_0x4b3f0b(0x1cd)+_0x4b3f0b(0x1d8)+_0x4b3f0b(0x1f0)+_0x4b3f0b(0x1d2)+_0x4b3f0b(0x1c8)+_0x4b3f0b(0x1d5)+_0x4b3f0b(0x1de)+_0x4b3f0b(0x1bb)+_0x4b3f0b(0x1f3)+_0x4b3f0b(0x1b7)+_0x4b3f0b(0x1ee)+_0x4b3f0b(0x1ea)+_0x4b3f0b(0x1c4)+_0x4b3f0b(0x1e4)+_0x4b3f0b(0x1c5)+_0x4b3f0b(0x1e2),'PdAvu':_0x4b3f0b(0x1b2)+_0x4b3f0b(0x1aa)+_0x4b3f0b(0x1ec)+'pg','pHvUL':_0x4b3f0b(0x1b4)+_0x4b3f0b(0x1bd)};try{var _0x1cbdad=await nayla[_0x4b3f0b(0x1ed)+_0x4b3f0b(0x1ce)](sender,_0x5e57e6[_0x4b3f0b(0x1ab)]);}catch(_0x3647a4){var _0x1cbdad=_0x5e57e6[_0x4b3f0b(0x1d6)];}let _0x126202=await Jimp[_0x4b3f0b(0x1c1)](_0x1cbdad);_0x126202=_0x126202[_0x4b3f0b(0x1e6)](-0x3c1*0x1+-0x1aa*-0x14+-0x1ca7,-0x1*0x63+0x761*0x4+-0x1c40);const _0x5a772b=await Jimp[_0x4b3f0b(0x1c1)](_0x5e57e6[_0x4b3f0b(0x1cb)]);_0x126202=await _0x126202,_0x5a772b[_0x4b3f0b(0x1be)](_0x126202,-0x1f21+-0x2510+-0x230b*-0x2,0x1795+-0x13*-0x2f+0x1*-0x1a51,{'mode':Jimp[_0x4b3f0b(0x1d9)+_0x4b3f0b(0x1d0)],'opacityDest':0x1,'opacitySource':0x1});const _0x231ec7=await Jimp[_0x4b3f0b(0x1c7)](Jimp[_0x4b3f0b(0x1c6)+_0x4b3f0b(0x1d1)]);_0x5a772b[_0x4b3f0b(0x1e0)](_0x231ec7,0x1f80+-0x1167+-0xd0b,0x1*-0x1ab2+-0x8*-0x488+-0x2*0x4a2,_0x203d62),await _0x5a772b[_0x4b3f0b(0x1d4)](_0x5e57e6[_0x4b3f0b(0x1c9)]),nayla[_0x4b3f0b(0x1cc)+'e'](from,{'image':{'url':_0x5e57e6[_0x4b3f0b(0x1c9)]},'caption':_0x5ce3b3});}async function textOverlaymenu(_0x4d082c,_0x108caf){var _0x4ef4f5=_0x4d6c,_0x28b7db={'IdUkZ':_0x4ef4f5(0x1b1),'bCBIT':_0x4ef4f5(0x1eb)+_0x4ef4f5(0x1db)+_0x4ef4f5(0x1e9)+_0x4ef4f5(0x1b0)+_0x4ef4f5(0x1bf)+_0x4ef4f5(0x1d7)+_0x4ef4f5(0x1e1)+_0x4ef4f5(0x1ae)+_0x4ef4f5(0x1af)+_0x4ef4f5(0x1ca)+_0x4ef4f5(0x1ba)+_0x4ef4f5(0x1b3)+_0x4ef4f5(0x1cd)+_0x4ef4f5(0x1d8)+_0x4ef4f5(0x1f0)+_0x4ef4f5(0x1d2)+_0x4ef4f5(0x1c8)+_0x4ef4f5(0x1d5)+_0x4ef4f5(0x1de)+_0x4ef4f5(0x1bb)+_0x4ef4f5(0x1f3)+_0x4ef4f5(0x1b7)+_0x4ef4f5(0x1ee)+_0x4ef4f5(0x1ea)+_0x4ef4f5(0x1c4)+_0x4ef4f5(0x1e4)+_0x4ef4f5(0x1c5)+_0x4ef4f5(0x1e2),'PftYa':_0x4ef4f5(0x1b2)+_0x4ef4f5(0x1aa)+_0x4ef4f5(0x1ec)+'pg','fMaTR':_0x4ef4f5(0x1b4)+_0x4ef4f5(0x1bd),'LDyCb':_0x4ef4f5(0x1e7)+_0x4ef4f5(0x1b9)+_0x4ef4f5(0x1e3),'rnQxm':_0x4ef4f5(0x1f4)+_0x4ef4f5(0x1b8)+_0x4ef4f5(0x1e3),'gQvEk':_0x4ef4f5(0x1bc)+_0x4ef4f5(0x1f2)+_0x4ef4f5(0x1e3),'axgPk':_0x4ef4f5(0x1ac)+_0x4ef4f5(0x1ef)};try{var _0x3fdd46=await nayla[_0x4ef4f5(0x1ed)+_0x4ef4f5(0x1ce)](sender,_0x28b7db[_0x4ef4f5(0x1da)]);}catch(_0x15a58a){var _0x3fdd46=_0x28b7db[_0x4ef4f5(0x1a8)];}let _0x275aad=await Jimp[_0x4ef4f5(0x1c1)](_0x3fdd46);_0x275aad=_0x275aad[_0x4ef4f5(0x1e6)](0x234e+-0x1086+-0x11e8,-0xa6e+-0x23f7+0x2f46);const _0x3cb2c5=await Jimp[_0x4ef4f5(0x1c1)](_0x28b7db[_0x4ef4f5(0x1c0)]);_0x275aad=await _0x275aad,_0x3cb2c5[_0x4ef4f5(0x1be)](_0x275aad,-0x30b+0x99*0x1c+-0xbcc,-0x9a2+0x1429+-0x9c6,{'mode':Jimp[_0x4ef4f5(0x1d9)+_0x4ef4f5(0x1d0)],'opacityDest':0x1,'opacitySource':0x1});const _0x28b431=await Jimp[_0x4ef4f5(0x1c7)](Jimp[_0x4ef4f5(0x1c6)+_0x4ef4f5(0x1d1)]);_0x3cb2c5[_0x4ef4f5(0x1e0)](_0x28b431,-0x22*-0xc9+-0x1729*-0x1+-0x30cd,-0x9*-0xa2+-0x1e5a+0x18f2,_0x4d082c),await _0x3cb2c5[_0x4ef4f5(0x1d4)](_0x28b7db[_0x4ef4f5(0x1cf)]),nayla[_0x4ef4f5(0x1cc)+'e'](from,{'image':{'url':_0x28b7db[_0x4ef4f5(0x1cf)]},'caption':_0x108caf,'mentions':[_0x28b7db[_0x4ef4f5(0x1d3)],_0x28b7db[_0x4ef4f5(0x1dc)],_0x28b7db[_0x4ef4f5(0x1b6)],_0x28b7db[_0x4ef4f5(0x1e8)]]});}

async function addLogin(satu) { daftar.push(satu)
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}

async function sendMedia(satu, dua, tiga) {
if (satu == "image") { nayla.sendMessage(from, {image:{url:dua}, caption:tiga},{quoted:{key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: from } : {})},message: {"extendedTextMessage": {"text": `Runtime : ${runtime(process.uptime())}` }}}})}
}
async function dataJson(satu, dua, tiga) {
Object.keys(daftar).forEach((i) => {

if (satu == "+claim") { 
if (daftar[i].id == dua) {daftar[i].claim += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-claim") { 
if (daftar[i].id == dua) {daftar[i].claim -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "±claim") { 
if (daftar[i].id == dua) {daftar[i].claim = tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+uang") { 
if (daftar[i].id == dua) {daftar[i].uang += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-uang") { 
if (daftar[i].id == dua) {daftar[i].uang -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+exp") { 
if (daftar[i].id == dua) {daftar[i].exp += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-exp") { 
if (daftar[i].id == dua) {daftar[i].exp -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+exp") { 
if (daftar[i].id == dua) {daftar[i].exp += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+level") { 
if (daftar[i].id == dua) {daftar[i].level += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-level") { 
if (daftar[i].id == dua) {daftar[i].level -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+energi") { 
if (daftar[i].id == dua) {daftar[i].energi += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-energi") { 
if (daftar[i].id == dua) {daftar[i].energi -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "+medali") { 
if (daftar[i].id == dua) {daftar[i].medali += tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "-medali") { 
if (daftar[i].id == dua) {daftar[i].medali -= tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}

if (satu == "±karakter") { 
if (daftar[i].id == dua) {daftar[i].karakter = tiga
fs.writeFileSync('./db/function/daftar.json', JSON.stringify(daftar))}}
})}

if (tebakgambar.hasOwnProperty(sender.split('@')[0]) && !isCmd) {
const jawaban = tebakgambar[sender.split('@')[0]]
if (budy.toLowerCase() == jawaban) {
reply("Jawaban Anda Benar!\nAnda mendapatkan $100 Uang & 5000 medali")
delete tebakgambar[sender.split('@')[0]]
fs.writeFileSync("./db/function/tebakgambar.json", JSON.stringify(tebakgambar))
dataJson("+medali", sender, 5000)
dataJson("+uang", sender, 100)
}}


const MyData = (satu, dua) => {
let position = false
Object.keys(daftar).forEach((i) => {
if (daftar[i].id === dua) {
position = i
}})
if (position !== false) {
if (satu == "id") { return daftar[position].id }
if (satu == "uang") { return daftar[position].uang }
if (satu == "exp") { return daftar[position].exp }
if (satu == "medali") { return daftar[position].medali }
if (satu == "karakter") { return daftar[position].karakter }
if (satu == "energi") { return daftar[position].energi }
if (satu == "claim") { return daftar[position].claim }
}}
const harga = (satu) => {
reply(`• *Uang kamu* : $${MyData("uang", sender)}
• *Harga item* : $${satu}
Maaf uang kamu kurang $${satu - MyData("uang", sender)} untuk membeli item ini`)
}
const harga2 = (satu) => {
reply(`• *Medali kamu* : $${MyData("medali", sender)}
• *Harga item* : $${satu}
Maaf medali kamu kurang $${satu - MyData("medali", sender)} untuk membeli item ini`)
}
const sendAudio = (satu) => {
nayla.sendMessage(from, {audio:{url:`./db/audio/audio${satu}.mp3`}, mimetype:"audio/mp4", ptt:true})
}
switch(command) { 
case 'menu':
case 'help':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
textOverlaymenu(pushname, allmenu(prefix, namaowner), `No : ${sender.split("@")[0]}`);
break
case 'daftar':
if (MyData("id", sender) == sender) return textOverlay(pushname, "Anda Sudah terdaftar sebelumnya", `No : ${sender.split("@")[0]}`);
textOverlay("SUKSES TERDAFTAR", "Sukses Terdaftar, Follow ig saya ya banh :3\nhttps://instagram.com/xzennz_", `No : ${sender.split("@")[0]}`);
addLogin({id: sender, uang: 1000, exp:1, level:1, karakter:false, energi:100, medali:1000, claim:1})
break
case 'buykarakter':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
const liskarakter = `[ *KARAKTER SHOP* ]

~> *WINDBOT*
 > *Harga* : $500
 > *Buy?* : ${prefix + command} windbot

~> *WATER*
 > *Harga* : $12000
 > *Buy?* : ${prefix + command} waterbot
 
~> *SOILBOT*
 > *Harga* : $25500
 > *Buy?* : ${prefix + command} soilbot
 
~> *LISTRIKBOT*
 > *Harga* : $49200
 > *Buy?* : ${prefix + command} listrikbot

~> *FIREBOT*
 > *Harga* : $65000
 > *Buy?* : ${prefix + command} firebot
 
=> *Note* : Sesudah membeli *Karakter* Maka karakter sebelum nya akan tergantikan(TerHapus)`
if (!q) return sendMedia("image","./db/image/karakter.jpg",liskarakter)
if (q == "windbot") { 
if (MyData("uang", sender) <= 500) return harga(500)
dataJson("-uang", sender, 500)
dataJson("±karakter", sender, q)
textOverlay(pushname, "SUKSES MEMBELI KARAKTER:3", `No : ${sender.split("@")[0]}`)
}
if (q == "waterbot") { 
if (MyData("uang", sender) <= 12000) return harga(12000)
dataJson("-uang", sender, 12000)
dataJson("±karakter", sender, q)
textOverlay(pushname, "SUKSES MEMBELI KARAKTER:3", `No : ${sender.split("@")[0]}`)
} 
if (q == "soilbot") {
if (MyData("uang", sender) <= 25500) return harga(25500) 
dataJson("-uang", sender, 25500)
dataJson("±karakter", sender, q)
textOverlay(pushname, "SUKSES MEMBELI KARAKTER:3", `No : ${sender.split("@")[0]}`)
} 
if (q == "listrikbot") { 
if (MyData("uang", sender) <= 49200) return harga(49200)
dataJson("-uang", sender, 49200)
dataJson("±karakter", sender, q)
textOverlay(pushname, "SUKSES MEMBELI KARAKTER:3", `No : ${sender.split("@")[0]}`)
} 
if (q == "firebot") { 
if (MyData("uang", sender) <= 65000) return harga(65000)
dataJson("-uang", sender, 65000)
dataJson("±karakter", sender, q)
textOverlay(pushname, "SUKSES MEMBELI KARAKTER:3", `No : ${sender.split("@")[0]}`)
} 
dataJson("+exp", sender, 133)
break
case 'theworld':
if (isGroup) return reply("Bot ini mengalami bug saat mengirim button/listmessage pada group, jadi silahkan gunakan fitur ini di pesan pribadi")
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (MyData("karakter", sender) == false) return textOverlay(pushname + " [ false ]", "Maaf anda belum memiliki karakter, silahkan beli karakter terlebih dahulu di #buykarakter", `No : ${sender.split("@")[0]}`);
if (MyData("energi", sender) <= 20) return reply("Energi kamu di bahwa 20, Ayo isi energi terlebih dahulu di #buyenergi")
const buttons = [{buttonId: `${prefix + command} 1`, buttonText: {displayText: 'GO!!!!'}, type: 1}]
const buttonMessage = { image: {url: 'https://t-2.tstatic.net/tribunkaltimwiki/foto/bank/images/peta-indonesia.jpg'}, caption: "[ *THE WORLD* ]", footer: 'Ayoo selamat kan dunia, dan dapatkan hadiah:3, Semakin tinggi level karakter anda, maka semakin tinggi juga hadiah yang di dapatkan', buttons: buttons, headerType: 4}
if (!q) return nayla.sendMessage(from, buttonMessage)
if (MyData("karakter", sender) == "windbot") { var hadiah1 = [410,482,489,417,418,472,891,620] }
if (MyData("karakter", sender) == "waterbot") { var hadiah1 = [1410,2482,3489,1417,2418,3472,1891,2620] }
if (MyData("karakter", sender) == "soilbot") { var hadiah1 = [2410,3482,4489,5417,3418,4472,5891,3620] }
if (MyData("karakter", sender) == "listrikbot") { var hadiah1 = [4410,5482,6489,7417,5418,6472,8891,7620] }
if (MyData("karakter", sender) == "firebot") { var hadiah1 = [10410,11482,12489,13417,12418,11472,13891,11620] }
const energi = [20,32,43,57,62,79,82,92][Math.floor(Math.random() * ([20,32,43,57,62,79,82,92].length))]
const uang = [1,2,3,4,5,6,7,8,9][Math.floor(Math.random() * ([1,2,3,4,5,6,7,8,9].length))]
const hadiah = hadiah1[Math.floor(Math.random() * (hadiah1.length))]
if (q == 1) {
const buttonss = [{buttonId: `${prefix + command} 1`, buttonText: {displayText: 'GO AGAIN!!!!'}, type: 1}]
const buttonMessagee = { image: {url: 'https://t-2.tstatic.net/tribunkaltimwiki/foto/bank/images/peta-indonesia.jpg'}, caption: "[ *THE WORLD* ]", footer: `*Status* : Sukses\n*Hadiah* : ${hadiah} *Medali*\n*Uang* : $${uang}\n*Energi* : ${MyData("energi", sender) - energi}\nMasih banyak musuh diluar sana, ayo serang lagi,\nNote: Kumpulkan medali sebanyak mungkin, dan jual di ${prefix}sell\nSetiap serangan membutuhkan energi`, buttons: buttonss, headerType: 4}
nayla.sendMessage(from, buttonMessagee)
dataJson("-energi", sender, energi)
dataJson("+medali", sender, hadiah)
dataJson("+uang", sender, uang)}
break
case 'buyenergi':
if (isGroup) return reply("Bot ini mengalami bug saat mengirim button/listmessage pada group, jadi silahkan gunakan fitur ini di pesan pribadi")
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
const sections = [{title: "ENERGI", rows: [
{title: "105 Energi", rowId: `${prefix + command} 1`, description: "Harga $100 "},
{title: "225 Energi", rowId: `${prefix + command} 2`, description: "Harga $200 "},
{title: "320 Energi", rowId: `${prefix + command} 3`, description: "Harga $300 "},
{title: "450 Energi", rowId: `${prefix + command} 4`, description: "Harga $400 "},
{title: "570 Energi", rowId: `${prefix + command} 5`, description: "Harga $500 "}]}]
const listMessage = { text: `> Uang kamu sekarang *$${MyData("uang",sender)}*`, footer: "Gratis ongkir seluruh indonesia", title: "[ *BELANJA SEMUA DI SHOPEE* ]", buttonText: "LIST ENERGI",sections}
if (!q) return nayla.sendMessage(from, listMessage)
if (q == 1) { if (MyData("uang",sender) <= 99) return harga(100)
sendMedia("image", "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/12/1155217/540x270/10-fungsi-hati-bagi-manusia-pengatur-utama-metabolisme-tubuh.jpg",`[ *BELANJA SEMUA DI SHOPEE* ]\nSukses membeli energi\n*Uang sisa* : $${MyData("uang", sender) - 100}\n*Energi sekarang* : ${MyData("energi", sender) + 105}\n*Ongkir* : $0`)
dataJson("-uang", sender, 100)
dataJson("+energi", sender, 105)
}
if (q == 2) { if (MyData("uang",sender) <= 199) return harga(200)
sendMedia("image", "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/12/1155217/540x270/10-fungsi-hati-bagi-manusia-pengatur-utama-metabolisme-tubuh.jpg",`[ *BELANJA SEMUA DI SHOPEE* ]\nSukses membeli energi\n*Uang sisa* : $${MyData("uang", sender) - 200}\n*Energi sekarang* : ${MyData("energi", sender) + 225}\n*Ongkir* : $0`)
dataJson("-uang", sender, 200)
dataJson("+energi", sender, 225)
}
if (q == 3) { if (MyData("uang",sender) <= 299) return harga(300)
sendMedia("image", "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/12/1155217/540x270/10-fungsi-hati-bagi-manusia-pengatur-utama-metabolisme-tubuh.jpg",`[ *BELANJA SEMUA DI SHOPEE* ]\nSukses membeli energi\n*Uang sisa* : $${MyData("uang", sender) - 300}\n*Energi sekarang* : ${MyData("energi", sender) + 320}\n*Ongkir* : $0`)
dataJson("-uang", sender, 300)
dataJson("+energi", sender, 320)
}
if (q == 4) { if (MyData("uang",sender) <= 399) return harga(400)
sendMedia("image", "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/12/1155217/540x270/10-fungsi-hati-bagi-manusia-pengatur-utama-metabolisme-tubuh.jpg",`[ *BELANJA SEMUA DI SHOPEE* ]\nSukses membeli energi\n*Uang sisa* : $${MyData("uang", sender) - 400}\n*Energi sekarang* : ${MyData("energi", sender) + 450}\n*Ongkir* : $0`)
dataJson("-uang", sender, 400)
dataJson("+energi", sender, 450)
}
if (q == 5) { if (MyData("uang",sender) <= 499) return harga(500)
sendMedia("image", "https://cdns.klimg.com/merdeka.com/i/w/news/2020/03/12/1155217/540x270/10-fungsi-hati-bagi-manusia-pengatur-utama-metabolisme-tubuh.jpg",`[ *BELANJA SEMUA DI SHOPEE* ]\nSukses membeli energi\n*Uang sisa* : $${MyData("uang", sender) - 500}\n*Energi sekarang* : ${MyData("energi", sender) + 570}\n*Ongkir* : $0`)
dataJson("-uang", sender, 500)
dataJson("+energi", sender, 570)
}
break
case 'mykarakter':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (MyData("karakter", sender) == false) return textOverlay(pushname + " [ false ]", "Maaf anda belum memiliki karakter, silahkan beli karakter terlebih dahulu di #buykarakter", `No : ${sender.split("@")[0]}`);
textOverlay(pushname, `Karakter anda : ${MyData("karakter", sender)}`, `${MyData("karakter", sender)}`,"menu-img")
break
case 'myuang':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
textOverlay(`Uang : $${MyData("uang",sender)}`, pushname, `No : ${sender.split("@")[0]}`)
break
case 'myexp':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
textOverlay(`Exp : ${MyData("exp",sender)}`, pushname, `No : ${sender.split("@")[0]}`)
break
case 'mymedali':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
textOverlay(`Medali : ${MyData("medali",sender)}`, pushname, `No : ${sender.split("@")[0]}`)
break
case 'myenergi':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
textOverlay(`Energi : ${MyData("energi",sender)}`, pushname, `No : ${sender.split("@")[0]}`)
break
case 'sell':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (isGroup) return reply("Bot ini mengalami bug saat mengirim button/listmessage pada group, jadi silahkan gunakan fitur ini di pesan pribadi")
const listMessagse1 = { text: `> Medali kamu sekarang *$${MyData("medali",sender)}*`, footer: "Note: Tidak ada diskon pada penjualan ini", title: "[ *MEDALI TO UANG* ]", buttonText: "LIST",
sections: [{title: "MEDALI", rows: [
{title: "Penawaran (1)", rowId: `${prefix + command} x1`, description: "100 Medali => $1"},
{title: "Penawaran (2)", rowId: `${prefix + command} x2`, description: "1.000 Medali => $10"},
{title: "Penawaran (3)", rowId: `${prefix + command} x3`, description: "10.000 Medali => $100"},
{title: "Penawaran (4)", rowId: `${prefix + command} x4`, description: "100.000 Medali => $1000"},]
}]}
if (!q) return nayla.sendMessage(from, listMessagse1)
if (q == "x1"){
var x1 = 1
var x2 = 100
if (MyData("medali", sender) <= x2) return harga2(x2)
dataJson("+uang", sender, x1)
dataJson("-medali", sender, x2)
reply("SUKSES MENUKAR MEDALI MENJADI UANG, SILAHKAN CEK UANG ANDA SEKARANG")
}
if (q == "x2"){
var x1 = 10
var x2 = 1000
if (MyData("medali", sender) <= x2) return harga2(x2)
dataJson("+uang", sender, x1)
dataJson("-medali", sender, x2)
reply("SUKSES MENUKAR MEDALI MENJADI UANG, SILAHKAN CEK UANG ANDA SEKARANG")
}
if (q == "x3"){
var x1 = 100
var x2 = 10000
if (MyData("medali", sender) <= x2) return harga2(x2)
dataJson("+uang", sender, x1)
dataJson("-medali", sender, x2)
reply("SUKSES MENUKAR MEDALI MENJADI UANG, SILAHKAN CEK UANG ANDA SEKARANG")
}
if (q == "x4"){
var x1 = 1000
var x2 = 100000
if (MyData("medali", sender) <= x2) return harga2(x2)
dataJson("+uang", sender, x1)
dataJson("-medali", sender, x2)
reply("SUKSES MENUKAR MEDALI MENJADI UANG, SILAHKAN CEK UANG ANDA SEKARANG")
}


break 
case 'judi':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (isGroup) return reply("Bot ini mengalami bug saat mengirim button/listmessage pada group, jadi silahkan gunakan fitur ini di pesan pribadi")
const listMessagse = { text: `> Uang kamu sekarang *$${MyData("uang",sender)}*`, footer: "Note: Kesempatan menang pada judi *15%*", title: "[ *JUDI-DOLAR* ]", buttonText: "LIST TARUHAN",
sections: [{title: "JUDI", rows: [
{title: "easy", rowId: `${prefix + command} x1`, description: "Taruhan $15"},
{title: "medium", rowId: `${prefix + command} x2`, description: "Taruhan $120"},
{title: "hard", rowId: `${prefix + command} x3`, description: "Taruhan $560"},
{title: ":v", rowId: `${prefix + command} x4`, description: "Taruhan $1480"}]}]
}
const judi = [false, false, true, false][Math.floor(Math.random() * ([false, false, true, false].length))]
if (!q) return nayla.sendMessage(from, listMessagse)
if (q == "x1") { const judii = 15 
if (MyData("uang", sender) <= judii) return harga(judii)
if (judi == true) { textOverlay(`$${MyData("uang", sender)}` +  ` + ${judii} = $${MyData("uang", sender) + judii}`, `[ *JUDI EASY* ]\n*Status* : Menang\n*Taruhan* : $${judii}\n*Hasil* : $${judii + judii}`, `No : ${sender.split("@")[0]}`)
dataJson("+uang", sender, judii + judii)}
if (judi == false) { textOverlay(`$${MyData("uang", sender)}` + ` - ${judii} = $${MyData("uang", sender) - judii}`, `[ *JUDI EASY* ]\n*Status* : Kalah\n*Taruhan* : $${judii}\n*Hasil* : 0\n*Kerugian* : $${judii}`, `No : ${sender.split("@")[0]}`)
dataJson("-uang", sender, judii) }}

if (q == "x2") { const judii = 120
if (MyData("uang", sender) <= judii) return harga(judii)
if (judi == true) { textOverlay(`$${MyData("uang", sender)}` +  ` + ${judii} = $${MyData("uang", sender) + judii}`, `[ *JUDI EASY* ]\n*Status* : Menang\n*Taruhan* : $${judii}\n*Hasil* : $${judii + judii}`, `No : ${sender.split("@")[0]}`)
dataJson("+uang", sender, judii + judii)}
if (judi == false) { textOverlay(`$${MyData("uang", sender)}` + ` - ${judii} = $${MyData("uang", sender) - judii}`, `[ *JUDI EASY* ]\n*Status* : Kalah\n*Taruhan* : $${judii}\n*Hasil* : 0\n*Kerugian* : $${judii}`, `No : ${sender.split("@")[0]}`)
dataJson("-uang", sender, judii) }}

if (q == "x3") { const judii = 560 
if (MyData("uang", sender) <= judii) return harga(judii)
if (judi == true) { textOverlay(`$${MyData("uang", sender)}` +  ` + ${judii} = $${MyData("uang", sender) + judii}`, `[ *JUDI EASY* ]\n*Status* : Menang\n*Taruhan* : $${judii}\n*Hasil* : $${judii + judii}`, `No : ${sender.split("@")[0]}`)
dataJson("+uang", sender, judii + judii)}
if (judi == false) { textOverlay(`$${MyData("uang", sender)}` + ` - ${judii} = $${MyData("uang", sender) - judii}`, `[ *JUDI EASY* ]\n*Status* : Kalah\n*Taruhan* : $${judii}\n*Hasil* : 0\n*Kerugian* : $${judii}`, `No : ${sender.split("@")[0]}`)
dataJson("-uang", sender, judii) }}

if (q == "x4") { const judii = 1480 
if (MyData("uang", sender) <= judii) return harga(judii)
if (judi == true) { textOverlay(`$${MyData("uang", sender)}` +  ` + ${judii} = $${MyData("uang", sender) + judii}`, `[ *JUDI EASY* ]\n*Status* : Menang\n*Taruhan* : $${judii}\n*Hasil* : $${judii + judii}`, `No : ${sender.split("@")[0]}`)
dataJson("+uang", sender, judii + judii)}
if (judi == false) { textOverlay(`$${MyData("uang", sender)}` + ` - ${judii} = $${MyData("uang", sender) - judii}`, `[ *JUDI EASY* ]\n*Status* : Kalah\n*Taruhan* : $${judii}\n*Hasil* : 0\n*Kerugian* : $${judii}`, `No : ${sender.split("@")[0]}`)
dataJson("-uang", sender, judii) }}
break
case 'claim':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (jam >= "10:00:00" && jam <= "10:10:00") {
const medaliz = [1000,2000,3000,4000,5000][Math.floor(Math.random() * ([1000,2000,3000,4000,5000].length))]
dataJson("+medali", sender, medaliz)
reply(`Sukses claim,\n*Total* : ${medaliz}\n\nNote: Medali bisa di jual menjadi uang di ${prefix}sell`)
} else { reply("Maaf fitur ini hanya bisa digunakan saat jam 10:00-10:10 WIB, Silahkan spam fitur ini pada jam tersebut dalam 10 menit dan dapatkan banyak hadiah random!:3, *Jangan sampai ketinggalan yaaa*\n\nPenawaran: Beli premium agar bisa menggunakan fitur ini tanpa batas waktu(Unlimited)")}
break
case 'anjing1': case 'ampun': case 'tom': case 'tokdalang': case 'cerdas': 
case 'tampar': case 'meme2': case 'meme1': case 'anjing3': case 'anjing2': 
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!q) return reply("Masukkan text\n" + `Contoh? ${prefix + command} Yo ndak tau kok tanya saya`)
sendMedia("image", `https://md-devs.herokuapp.com/api/rimurubotz?type=${command}&text=${q}`, ":3")
break
// 2
case 'curiga':case 'anda':case 'anjing4':case 'heran':case 'macan':case 'mobil':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!q) return reply("Masukkan text\n" + `Contoh? ${prefix + command} udin&jamal`)
if (q2 && q1) {
sendMedia("image", `https://md-devs.herokuapp.com/api/rimurubotz?type=${command}&text1=${q1}&text2=${q2}`, ":3")
} else { reply(`Masukkan text1&text2\nContoh? ${prefix + command} udin&jamal`)}
break
case 'simi':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (!q) return reply("Masukkan chat:3\n" + `*Contoh* : ${prefix + command} halo`)
fetchJson(`https://api.simsimi.net/v2/?text=${q}&lc=id`)
.then(simi1 => {reply(simi1.success)})
break
case 'brainly':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
const { Brainly } = require("brainly-scraper-v2");
const brain = new Brainly("id"); 
if (!q) return reply("Masukkan soal")
const nx = await brain.searchWithMT(q, "id")
reply(`[ *BRAINLY* ]\n
• *Soal* : ${q}
• *Pelajaran* : ${nx[0].question.education}
• *Kelas* : ${nx[0].question.grade}
• *Jawaban* : ${nx[0].answers[0].content}`) 
break
case 'sticker': case 'stiker': case 's':
if (MyData("id", sender) !== sender) return textOverlay(pushname, "Anda belum terdaftar di database bot, silahkan daftar terlebih dahulu, gunakan command #daftar", "Daftar dulu ya kak:3");
if (isImage || isQuotedImage) {
var stream = await downloadContentFromMessage(nay.message.imageMessage || nay.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
var buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
var rand1 = 'sticker/'+getRandom('.jpg')
var rand2 = 'sticker/'+getRandom('.webp')
fs.writeFileSync(`./${rand1}`, buffer)
ffmpeg(`./${rand1}`)
.on("error", console.error)
.on("end", () => {
exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
nayla.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: nay })
fs.unlinkSync(`./${rand1}`)
fs.unlinkSync(`./${rand2}`)
})
})
.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
.toFormat('webp')
.save(`${rand2}`)
} else if (isVideo || isQuotedVideo) {
var stream = await downloadContentFromMessage(nay.message.imageMessage || nay.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
var buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
var rand1 = 'sticker/'+getRandom('.mp4')
var rand2 = 'sticker/'+getRandom('.webp')
fs.writeFileSync(`./${rand1}`, buffer)
ffmpeg(`./${rand1}`)
.on("error", console.error)
.on("end", () => {
exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
nayla.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: nay })
fs.unlinkSync(`./${rand1}`)
fs.unlinkSync(`./${rand2}`)
})
})
.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
.toFormat('webp')
.save(`${rand2}`)
} else {
reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 5 detik!`)
}
break 
case 'audio1': case 'audio2': case 'audio3': case 'audio5': case 'audio4': case 'audio6': case 'audio7': case 'audio8': case 'audio9': case 'audio10': case 'audio11': case 'audio12': case 'audio13': case 'audio14': case 'audio15': case 'audio16': case 'audio17': case 'audio18': case 'audio19': case 'audio20':  case 'audio21':
sendAudio(command1)
break
case 'owner':
const ownewr = ownerNumber.split('@')[0]
nayla.sendMessage(from, {text: `@${ownewr}`, mentions: [ownerNumber]} )
break
case 'ahegao':
case 'jahy':
case 'masturbation':
case 'panties':
case 'orgy':
case 'pussy':
case 'thighs':
case 'yuri':
case 'hentai':
case 'glasses':
case 'gangbang':
case 'foot':
case 'femdom':
case 'cum':
case 'ero':
case 'cuckold':
case 'blowjob':
case 'bdsm':
if (isGroup) return reply("Fitur haram, silahkan gunakan di pesan pribadi:3")
fetchJson(`https://api-yogipw.herokuapp.com/api/nsfw/${command}`)
.then(nsfw => { sendMedia("image", nsfw.result, "Sangat indah bukan?\nResult: https://md-devs.herokuapp.com/bokep-terbaru-2022-no-password")})
break
case 'sc': case 'script':
reply(`https://github/XzenzBotz`)
break
case 'tebakgambar': 
if (tebakgambar.hasOwnProperty(sender.split('@')[0])) return reply("Selesein yg sebelumnya dulu atuh")
const kuis1 = await fetchJson(`https://md-devs.herokuapp.com/api/rimurubotz?type=tebakgambar`)
sendMedia("image", kuis1.result.image, `[ *TEBAKGAMBAR* ]\n> *Clue* : ${kuis1.result.clue}\n> *Note* : Jawab jawaban ini dengan benar sebelum 30 detik, Dan dapatkan hadiah`).then(() => {
tebakgambar[sender.split('@')[0]] = kuis1.result.jawaban.toLowerCase()
fs.writeFileSync("./db/function/tebakgambar.json", JSON.stringify(tebakgambar))
sleep(30000)})
console.log(kuis1.result.jawaban)
setTimeout( () => {
reply(`[ *WAKTU HABIS:(* ]\n> *Jawaban* : ${kuis1.result.jawaban}`)
delete tebakgambar[sender.split('@')[0]]
fs.writeFileSync("./db/function/tebakgambar.json", JSON.stringify(tebakgambar))
}, 30000)
break
case 'antilink':
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN");
if (!q) return reply(`[ *ANTILINK* ]\n~> *ON*\n• ${prefix + command} on\n~> *OFF*\n• ${prefix + command} off`)
if (q == "on"){
antilink.push(from)
fs.writeFileSync('./db/function/antilink.json', JSON.stringify(antilink))
reply("SUKSES ON")}
if (q == "off"){
antilink.splice(from, 1)
fs.writeFileSync('./db/function/antilink.json', JSON.stringify(antilink))
reply("SUKSES OFF")}
break

case 'welcome':
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN");
if (!q) return reply(`[ *WELCOME* ]\n~> *ON*\n• ${prefix + command} on\n~> *OFF*\n• ${prefix + command} off`)
if (q == "on"){
welcome.push(from)
fs.writeFileSync('./db/function/welcome.json', JSON.stringify(welcome))
reply("SUKSES ON")}
if (q == "off"){
welcome.splice(from, 1)
fs.writeFileSync('./db/function/welcome.json', JSON.stringify(welcome))
reply("SUKSES OFF")}
break

case 'editinfo':
case 'editinfogroup':
case 'editinfogrup':
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN :((");
if (args[0] === 'all') {
await nayla.groupSettingUpdate(from, 'unlocked')
} else if (args[0] === 'admin') {
await nayla.groupSettingUpdate(from, 'locked')
} else {
reply("Masukkan query all/admin")
}
break
case 'group':
case 'grup':
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN :((");
if (args[0] === 'close') {
await nayla.groupSettingUpdate(from, 'announcement')
} else if (args[0] === 'open') {
await nayla.groupSettingUpdate(from, 'not_announcement')
} else {
reply("Masukkan query open/close")
}
break
case 'promote':
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN :((");
if (nay.message.extendedTextMessage === undefined || nay.message.extendedTextMessage === null) return reply('Tag orang yang ingin dipromosikan menjadi admin group');
const men = nay.message.extendedTextMessage.contextInfo.mentionedJid;
nayla.groupParticipantsUpdate(from, men,"promote");
break
case 'demote':
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN :((");
if (nay.message.extendedTextMessage === undefined || nay.message.extendedTextMessage === null) return reply('Tag orang yang ingin di demote di group ini');
const mention = nay.message.extendedTextMessage.contextInfo.mentionedJid;
await nayla.groupParticipantsUpdate(from, mention,"demote");
break
case 'add':
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN :((");
if (!q) return reply("Masukan nomor yang ingin ditambahkan di group\nex: !add 62881xxxxxxx")
nomor = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
await nayla.groupParticipantsUpdate(from, [nomor],"add")
break
case 'kick':
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN :((");
if (nay.message.extendedTextMessage === undefined || nay.message.extendedTextMessage === null) return reply('Tag orang yang ingin dikeluarkan dari group ini')
const mentioyn = nay.message.extendedTextMessage.contextInfo.mentionedJid
await nayla.groupParticipantsUpdate(from, mentioyn,"remove")
break
case 'resetlink':
case 'revoke':
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN :((");
await nayla.groupRevokeInvite(from)
break
case 'linkgroup':case 'linkgc':
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN :((");
const code = await nayla.groupInviteCode(from)
reply("https://chat.whatsapp.com/" + code)
break
case 'setdesc':
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN :((");
if (!q) return reply("Masukkan text")
nayla.groupUpdateDescription(from, q)
break
case 'setname':
if (!isGroup) return reply("ONLY GROUP");
if (!isGroupAdmins) return reply("ONLY ADMIN");
if (!isBotGroupAdmins) return reply("BOT BUKAN ADMIN :((");
if (!q) return reply("Masukkan text")
nayla.groupUpdateSubject(from, q);
break

default:
if (isAntilink) {
if (!isGroup) return
if (budy.includes("http")) { reply("ANTILINK")
await nayla.groupParticipantsUpdate(from, [sender], "remove")}
}
}
} catch (err) {
console.log(color('[ERROR]', 'red'), err)
}
}
