#!/usr/bin/env python3
"""
Интерактивный инструмент для анализа слов на предмет архаизмов
Читает файлы со словами и позволяет вручную классифицировать их
"""

import os
import json
from typing import Set, Dict

def load_existing_archaisms() -> Set[str]:
    """Загружает уже существующие архаизмы из файла"""
    archaisms_file = "extracted_words/archaisms.txt"
    archaisms = set()
    
    if os.path.exists(archaisms_file):
        with open(archaisms_file, 'r', encoding='utf-8') as f:
            for line in f:
                word = line.strip()
                if word and not word.startswith('#'):
                    archaisms.add(word)
    
    return archaisms

def save_archaisms(archaisms: Set[str]):
    """Сохраняет архаизмы в файл"""
    archaisms_file = "extracted_words/archaisms.txt"
    
    with open(archaisms_file, 'w', encoding='utf-8') as f:
        f.write("# Словарь архаизмов из молитв\n")
        f.write("# Слова, которые являются архаичными и нуждаются в современном переводе\n\n")
        
        for word in sorted(archaisms):
            f.write(f"{word}\n")

def analyze_word_chunk(chunk_file: str, existing_archaisms: Set[str]) -> Set[str]:
    """Анализирует один файл со словами"""
    print(f"\n🔍 Анализируем файл: {chunk_file}")
    
    with open(chunk_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Пропускаем заголовочные строки
    words = []
    for line in lines:
        line = line.strip()
        if line and not line.startswith('#') and not line.startswith('Всего'):
            words.append(line)
    
    print(f"📊 Слов для анализа: {len(words)}")
    
    new_archaisms = set()
    
    for i, word in enumerate(words, 1):
        if word in existing_archaisms:
            continue  # Уже классифицировано
            
        print(f"\n[{i}/{len(words)}] Слово: '{word}'")
        print("Это архаизм? (y/n/s - пропустить файл/q - выйти)")
        
        choice = input().lower().strip()
        
        if choice == 'q':
            return new_archaisms
        elif choice == 's':
            print("Пропускаем файл...")
            return new_archaisms
        elif choice == 'y':
            new_archaisms.add(word)
            print(f"✅ '{word}' добавлен в архаизмы")
        elif choice == 'n':
            print(f"❌ '{word}' не архаизм")
        else:
            print("Неверный выбор, пропускаем...")
    
    return new_archaisms

def main():
    """Главная функция"""
    print("🔍 Интерактивный анализ слов на предмет архаизмов")
    
    # Загружаем существующие архаизмы
    existing_archaisms = load_existing_archaisms()
    print(f"📚 Уже найдено архаизмов: {len(existing_archaisms)}")
    
    if existing_archaisms:
        print("Существующие архаизмы:")
        for arch in sorted(list(existing_archaisms)[:10]):
            print(f"  - {arch}")
        if len(existing_archaisms) > 10:
            print(f"  ... и еще {len(existing_archaisms) - 10}")
    
    # Находим все файлы со словами
    words_dir = "extracted_words"
    chunk_files = []
    
    for filename in os.listdir(words_dir):
        if filename.startswith("words_chunk_") and filename.endswith(".txt"):
            chunk_files.append(os.path.join(words_dir, filename))
    
    chunk_files.sort()
    
    print(f"\n📁 Найдено файлов со словами: {len(chunk_files)}")
    
    # Спрашиваем, с какого файла начать
    if existing_archaisms:
        print("\nС какого файла начать анализ? (номер файла или 'all' для всех)")
        start_choice = input().strip()
        
        if start_choice.isdigit():
            start_index = int(start_choice) - 1
            if 0 <= start_index < len(chunk_files):
                chunk_files = chunk_files[start_index:]
            else:
                print("Неверный номер файла")
                return
        elif start_choice.lower() != 'all':
            print("Начинаем с первого файла")
    
    all_archaisms = existing_archaisms.copy()
    
    # Анализируем каждый файл
    for i, chunk_file in enumerate(chunk_files):
        print(f"\n{'='*50}")
        print(f"Файл {i+1}/{len(chunk_files)}: {os.path.basename(chunk_file)}")
        
        new_archaisms = analyze_word_chunk(chunk_file, all_archaisms)
        all_archaisms.update(new_archaisms)
        
        print(f"\n📊 Статистика:")
        print(f"  Новых архаизмов в файле: {len(new_archaisms)}")
        print(f"  Всего архаизмов: {len(all_archaisms)}")
        
        # Сохраняем промежуточные результаты
        save_archaisms(all_archaisms)
        
        # Спрашиваем, продолжать ли
        if i < len(chunk_files) - 1:
            print(f"\nПродолжить анализ следующего файла? (y/n)")
            continue_choice = input().lower().strip()
            if continue_choice != 'y':
                break
    
    print(f"\n✅ Анализ завершен!")
    print(f"📊 Итого найдено архаизмов: {len(all_archaisms)}")
    print(f"💾 Результаты сохранены в: extracted_words/archaisms.txt")

if __name__ == "__main__":
    main()
