const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('settings.env'))
    require('dotenv').config({ path: __dirname + '/settings.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'B.M.B-TECH;;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUpRRUZWYjRmNVBNUFZwaEdMbGpCdVBZUkFxLy9UU1F4MGxrNThDU1FHaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRXpxY3ZnQXRVUVkxVzFTR0R3ZnVCaTBMTkFLZ0l3TTUyUTg2M2dRUzdGUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhTkczQndQSWJ3VE5yY24zaFFqYyt2OUgrRUlDTlQyeHRjaU02KzdJV21nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCMFZHQzlIcVVlU2lXQjZodTVkVm5COE1RZjhJQzkzRUhLWm42RDh1d2x3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJMSTVxNFM2Qm1ZQVI1ekFIVXJFb2tmbzJUQmpRK2liNG41eWdYTi81R0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJVaGx2bFFHNWVMbTNXY2N2WUk5RjJoc2xVMk5rN2x2bE8zNVdWd0J1aUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUJYN3ZURHE2dXZUekVybjBtRjQ4MGdvWDE5Wlc5VE42T3J2YmdvU1IxWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaExqUnBDa2x1Qnh0WEdRbE5Nd2p1MlQ2a2lXL2dwc2huWTVpdWFCZUd5cz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNZQXJTdC9BdXI3S0xMblFWMGNweDhibzhscHdLN3VZSm4raUlqTWgyWnJwSmFELzViMTdLdzhvUE9VUUYydkNGMEhGSFhUU1psNzl1akVSSWVUZ2lnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQwLCJhZHZTZWNyZXRLZXkiOiJkN2I4WUVOWVBFRTliMVcvMVdKSmIyRG5vL0pNcXE4T2JmbFNZMHFsTzBFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTc3Njk1OTM2M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2QTVGMkQ4QzgyQzhGOEIwOTkxNUUwODRGQTVFQUU3MiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU2NzQ2NjI1fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU3NzY5NTkzNjNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNjc2MkJEMjlGQjkzMDJCMDNBMjI0NTQ0N0U4MDlDNUYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1Njc0NjYyN31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiRkwzU1dOTlAiLCJtZSI6eyJpZCI6IjI1NTc3Njk1OTM2MzoxM0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjE1NjQ3NDgwMjE3NjEwNzoxM0BsaWQiLCJuYW1lIjoiflN0ZXdhcnRsaXTwn5iC8J+YrfCfkY0ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0ltb3l6OFE3YWJYeFFZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InZQaEloVXkrc0s0V0dITFk1Vkc1MDZyL2ZpM1ltRjM4ZW51ckUxS1lnRms9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik5uV05uY3FBNDVFOUJOcUdDV0xuSUxxbGh1N1hCdkNTdkpFVU5ZVW5mMVZDbmlXbnBsN0d2djZZanZJWjUvN1JHTnk4K3QycncrNzhjaEFqYjBIYURBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJrUTZRTjRCaVlqU2tEaHQ5VmxVWmlOcnVweWM4QXMwVFBjY3ZvZS9LTmMxb2Z3ejc1UHN4aXZTMnBvOU1WTzBqUzM3d2ErRWxBbmRqc0hDdlY2R0Fpdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTc3Njk1OTM2MzoxM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiejRTSVZNdnJDdUZoaHkyT1ZSdWRPcS8zNHQySmhkL0hwN3F4TlNtSUJaIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTY3NDY2MTksImxhc3RQcm9wSGFzaCI6IjJHNEFtdSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUHpKIn0= ',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255776959363",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/8qq3l4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY, // ✅
    WARN_COUNT : process.env.WARN_COUNT || '3',
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    CHAT_BOT: process.env.CHAT_BOT || 'yes', // ✅
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
