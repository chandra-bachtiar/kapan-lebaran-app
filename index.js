import X from "./twitter.js";
import { imageManipulation } from "./imageManipulation.js";
import "dotenv/config";
import moment from "moment";

async function main() {
    const tglPuasa = moment(process.env.RAMADHAN, "DD/MM/YYYY");
    const tglLebaran = moment(process.env.LEBARAN, "DD/MM/YYYY");

    const today = moment();
    const isRamadhan = today.isBetween(tglPuasa, tglLebaran);

    const text = !isRamadhan ? "Ramadhan" : "Lebaran";
    const dateDiff = isRamadhan
        ? tglLebaran.diff(today, "days") + 1
        : tglPuasa.diff(today, "days") + 1;

    const imagePath = await imageManipulation(text, dateDiff.toString());

    try {
        const media = await X.v1.uploadMedia(imagePath);
        const tweet = await X.v2.tweet(
            `Hari ke-${dateDiff} menjelang ${text}!`,
            {
                media: {
                    media_ids: [media],
                },
            }
        );
        console.log(tweet);
    } catch (error) {
        console.error("Error detail:", error.data || error);
    }
}

main();

// imageManipulation("Ramadhan", "10");
