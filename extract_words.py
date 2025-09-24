#!/usr/bin/env python3
"""
Скрипт для извлечения всех уникальных слов из молитв
Разбивает слова на файлы по 500 слов для удобного анализа
"""

import json
import os
import re
from collections import Counter
from typing import Set, List

def extract_words_from_text(text: str) -> Set[str]:
    """Извлекает все слова из текста"""
    # Убираем знаки препинания и разбиваем на слова
    words = re.findall(r'\b[а-яё]+\b', text.lower())
    return set(words)

def process_all_prayers() -> Set[str]:
    """Обрабатывает все файлы молитв и извлекает уникальные слова"""
    prayers_dir = "data/prayers"
    all_words = set()
    
    if not os.path.exists(prayers_dir):
        print(f"Директория {prayers_dir} не найдена")
        return all_words
    
    files = [f for f in os.listdir(prayers_dir) if f.endswith('.json')]
    print(f"Найдено {len(files)} файлов молитв")
    
    for filename in files:
        filepath = os.path.join(prayers_dir, filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Извлекаем слова из всех текстовых полей
            text_fields = ['content', 'contentModern', 'summary', 'explanation']
            for field in text_fields:
                if field in data and data[field]:
                    words = extract_words_from_text(data[field])
                    all_words.update(words)
                    print(f"  {filename}: {field} - {len(words)} слов")
                    
        except Exception as e:
            print(f"Ошибка обработки файла {filename}: {e}")
    
    return all_words

def save_words_to_files(words: Set[str], words_per_file: int = 500):
    """Сохраняет слова в файлы по указанному количеству"""
    words_list = sorted(list(words))
    total_words = len(words_list)
    
    print(f"Всего уникальных слов: {total_words}")
    print(f"Будет создано файлов: {(total_words + words_per_file - 1) // words_per_file}")
    
    # Создаем директорию для файлов со словами
    words_dir = "extracted_words"
    os.makedirs(words_dir, exist_ok=True)
    
    # Разбиваем на файлы
    for i in range(0, total_words, words_per_file):
        chunk = words_list[i:i + words_per_file]
        filename = f"words_chunk_{i//words_per_file + 1:03d}.txt"
        filepath = os.path.join(words_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(f"# Слова {i+1}-{min(i+words_per_file, total_words)} из {total_words}\n")
            f.write(f"# Всего слов в файле: {len(chunk)}\n\n")
            
            for word in chunk:
                f.write(f"{word}\n")
        
        print(f"Создан файл: {filepath} ({len(chunk)} слов)")

def create_word_frequency_file(words: Set[str]):
    """Создает файл с частотой слов"""
    prayers_dir = "data/prayers"
    word_counter = Counter()
    
    files = [f for f in os.listdir(prayers_dir) if f.endswith('.json')]
    
    for filename in files:
        filepath = os.path.join(prayers_dir, filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Считаем частоту слов
            text_fields = ['content', 'contentModern', 'summary', 'explanation']
            for field in text_fields:
                if field in data and data[field]:
                    words_in_text = re.findall(r'\b[а-яё]+\b', data[field].lower())
                    word_counter.update(words_in_text)
                    
        except Exception as e:
            print(f"Ошибка обработки файла {filename}: {e}")
    
    # Сохраняем частоту слов
    words_dir = "extracted_words"
    filepath = os.path.join(words_dir, "word_frequency.txt")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write("# Частота слов в молитвах\n")
        f.write("# Формат: слово - количество вхождений\n\n")
        
        for word, count in word_counter.most_common():
            f.write(f"{word} - {count}\n")
    
    print(f"Создан файл частоты слов: {filepath}")

def main():
    """Главная функция"""
    print("🔍 Извлекаем все уникальные слова из молитв...")
    
    # Извлекаем все слова
    all_words = process_all_prayers()
    
    if not all_words:
        print("❌ Не удалось извлечь слова")
        return
    
    print(f"\n📊 Статистика:")
    print(f"  Всего уникальных слов: {len(all_words)}")
    
    # Сохраняем слова в файлы
    print(f"\n💾 Сохраняем слова в файлы...")
    save_words_to_files(all_words, 500)
    
    # Создаем файл с частотой слов
    print(f"\n📈 Создаем файл с частотой слов...")
    create_word_frequency_file(all_words)
    
    print(f"\n✅ Готово! Проверьте папку 'extracted_words'")
    print(f"📁 Файлы для анализа:")
    print(f"  - words_chunk_*.txt - слова по 500 штук")
    print(f"  - word_frequency.txt - частота слов")

if __name__ == "__main__":
    main()
