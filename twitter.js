import 'dotenv/config'
import { TwitterApi } from "twitter-api-v2"

const token = process.env.X_TOKEN
const X = new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_SECRET
})

export default X