const fs = require('fs');
const ytdl = require('ytdl-core');
const path = require('path');

// Получаем ссылку на видео из аргумента командной строки
const videoURL = process.argv[2];

// Путь к папке "Загрузки" на компьютере
const downloadPath = path.join(process.env['USERPROFILE'], 'Downloads');

// Проверяем, что ссылка на видео была передана в качестве аргумента командной строки
if (!videoURL) {
  console.error('Введите ссылку на видео в качестве аргумента командной строки');
  process.exit(1);
}

// Получаем информацию о видео
ytdl.getBasicInfo(videoURL)
  .then((info) => {
    // Извлекаем название видео
    const videoTitle = info.videoDetails.title;

    // Скачиваем видео и аудио и записываем их в файл в папке "Загрузки"
    ytdl(videoURL, { filter: 'audioandvideo', quality: 'highest' })
      .pipe(fs.createWriteStream(path.join(downloadPath, `${videoTitle}.mp4`)));
  })
  .catch((err) => {
    console.error(`Ошибка загрузки видео: ${err}`);
  });