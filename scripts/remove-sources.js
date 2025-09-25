const fs = require('fs');
const path = require('path');

// Путь к папке с молитвами
const prayersDir = path.join(__dirname, '../data/utrennie_molitvy_archive/guide_rich');

// Функция для удаления источников из файла молитвы
function removeSourcesFromPrayer(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const prayerData = JSON.parse(content);
        
        // Удаляем поля с источниками
        delete prayerData.origin_background;
        delete prayerData.scriptural_refs;
        delete prayerData.liturgical_context;
        
        // Удаляем источники из seasonal_variations если они есть
        if (prayerData.seasonal_variations) {
            prayerData.seasonal_variations.forEach(variation => {
                if (variation.sources) {
                    delete variation.sources;
                }
            });
        }
        
        // Записываем обновленный файл
        fs.writeFileSync(filePath, JSON.stringify(prayerData, null, 2), 'utf8');
        console.log(`✓ Обработан файл: ${path.basename(filePath)}`);
        
        return true;
    } catch (error) {
        console.error(`✗ Ошибка при обработке файла ${filePath}:`, error.message);
        return false;
    }
}

// Основная функция
function main() {
    console.log('🚀 Начинаем удаление источников из молитв...\n');
    
    if (!fs.existsSync(prayersDir)) {
        console.error(`❌ Папка не найдена: ${prayersDir}`);
        process.exit(1);
    }
    
    const files = fs.readdirSync(prayersDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    if (jsonFiles.length === 0) {
        console.log('❌ JSON файлы не найдены');
        process.exit(1);
    }
    
    console.log(`📁 Найдено ${jsonFiles.length} файлов для обработки\n`);
    
    let processedCount = 0;
    let errorCount = 0;
    
    jsonFiles.forEach(file => {
        const filePath = path.join(prayersDir, file);
        const success = removeSourcesFromPrayer(filePath);
        
        if (success) {
            processedCount++;
        } else {
            errorCount++;
        }
    });
    
    console.log(`\n📊 Результаты:`);
    console.log(`✅ Успешно обработано: ${processedCount} файлов`);
    console.log(`❌ Ошибок: ${errorCount} файлов`);
    
    if (errorCount === 0) {
        console.log('\n🎉 Все источники успешно удалены!');
    } else {
        console.log('\n⚠️  Некоторые файлы не удалось обработать');
    }
}

// Запускаем скрипт
main();
