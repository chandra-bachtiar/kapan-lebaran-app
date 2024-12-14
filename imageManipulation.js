import sharp from "sharp";
import moment from "moment";
import fs from "fs";

export const imageManipulation = async (type = "Ramadhan", text) => {
    const basePath =
        type === "Ramadhan"
            ? "./image/base/Ramadhan.png"
            : "./image/base/Lebaran.png";
    const outputPath = `./image/${type}/${moment().unix()}.png`;

    // Generate SVG buffer untuk teks
    const svgText = `
        <svg width="800" height="630" xmlns="http://www.w3.org/2000/svg">
            <style>
                @font-face {
                    font-family: 'More Sugar';
                    src: url('./path/to/MoreSugar.ttf') format('truetype');
                }
            </style>
            <rect width="100%" height="100%" fill="transparent"/>
            <text x="68%" y="100%" font-size="400" fill="#344a6b" font-family="More Sugar, Arial, sans-serif" 
                dominant-baseline="middle" text-anchor="middle">${text}</text>
        </svg>
    `;
    const svgBuffer = Buffer.from(svgText);

    // Load gambar base dan overlay teks
    await sharp(basePath)
        .composite([{ input: svgBuffer, top: 0, left: 0 }]) // Tambahin teks ke gambar
        .toFile(outputPath); // Simpan hasil gambar

    return outputPath; // Return path gambar hasil
};
