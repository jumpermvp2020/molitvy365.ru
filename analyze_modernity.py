#!/usr/bin/env python3
"""
Улучшенный скрипт для анализа качества современного перевода в JSON файлах молитв
Анализирует несколько предложений и определяет, действительно ли это современный русский язык
"""

import json
import sys
import os
import re
from typing import Dict, Any, List, Tuple

def load_prayer_file(file_path: str) -> Dict[str, Any]:
    """Загружает JSON файл молитвы"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Ошибка загрузки файла {file_path}: {e}")
        return None

def analyze_text_modernity(text: str) -> Tuple[bool, List[str]]:
    """
    Анализирует текст на современность русского языка
    Возвращает (is_modern, issues_list)
    """
    issues = []
    
    # Разбиваем текст на предложения (примерно)
    sentences = re.split(r'[.!?]+', text)
    sentences = [s.strip() for s in sentences if s.strip()]
    
    # Берем первые 5 предложений для анализа
    sample_sentences = sentences[:5]
    
    if not sample_sentences:
        return False, ["Текст пустой или не содержит предложений"]
    
    print(f"📝 Анализируем первые {len(sample_sentences)} предложений:")
    for i, sentence in enumerate(sample_sentences, 1):
        print(f"  {i}. {sentence[:100]}{'...' if len(sentence) > 100 else ''}")
    
    # Загружаем словарь архаизмов из файла
    archaisms_file = "extracted_words/archaisms.txt"
    archaic_words = set()
    
    try:
        with open(archaisms_file, 'r', encoding='utf-8') as f:
            for line in f:
                word = line.strip()
                if word and not word.startswith('#'):
                    archaic_words.add(word)
    except FileNotFoundError:
        print(f"Файл {archaisms_file} не найден, используем базовый словарь")
        archaic_words = {
            'яко', 'еже', 'иже', 'яже', 'егоже', 'паче', 'нежели',
            'во', 'ко', 'молиши', 'даруеши', 'сподоби', 'избави',
            'архистратиже', 'архангеле', 'святый', 'благоутробие',
            'напрасние', 'всякаго', 'благаго', 'аще', 'аз', 'еси',
            'мя', 'твоего', 'твое', 'твоя', 'твоих', 'твоим', 'твою',
            'твои', 'твоему', 'твоея', 'твой', 'твоей', 'твоею'
        }
    
    # Проверяем на церковнославянские формы по паттернам
    church_slavonic_patterns = [
        # Архаичные окончания
        r'\b\w+ие\b',  # напрасние, благоутробие
        r'\b\w+аго\b',  # благаго
        r'\b\w+яго\b',  # всякаго
        r'\b\w+ши\b',  # молиши, даруеши
        r'\b\w+шися\b',  # молишися
        r'\b\w+шии\b',  # молящии
    ]
    
    # Проверяем каждое предложение на архаичные слова
    archaic_count = 0
    modern_count = 0
    
    for sentence in sample_sentences:
        words = re.findall(r'\b\w+\b', sentence.lower())
        
        for word in words:
            if word in archaic_words:
                archaic_count += 1
                issues.append(f"Архаичное слово '{word}' в предложении: {sentence[:50]}...")
        
        # Проверяем на современные конструкции
        modern_patterns = [
            r'\bкак\b',  # как (вместо яко)
            r'\bчто\b',  # что (вместо еже)
            r'\bкоторый\b',  # который (вместо иже)
            r'\bкоторая\b',  # которая (вместо яже)
            r'\bв\b',  # в (вместо во)
            r'\bк\b',  # к (вместо ко)
            r'\bболее\b',  # более (вместо паче)
            r'\bчем\b',  # чем (вместо нежели)
        ]
        
        for pattern in modern_patterns:
            if re.search(pattern, sentence, re.IGNORECASE):
                modern_count += 1
    
    # Проверяем по паттернам (дополнительно)
    for sentence in sample_sentences:
        for pattern in church_slavonic_patterns:
            matches = re.findall(pattern, sentence, re.IGNORECASE)
            if matches:
                for match in matches:
                    if len(match) > 3:  # Игнорируем короткие совпадения
                        archaic_count += 1
                        issues.append(f"Архаичная форма '{match}' в предложении: {sentence[:50]}...")
    
    # Определяем, современный ли текст
    # Если мало архаичных слов - текст современный
    is_modern = archaic_count < 2
    
    return is_modern, issues

def analyze_prayer_file(file_path: str) -> Dict[str, Any]:
    """Анализирует файл молитвы на качество современного перевода"""
    print(f"\n🔍 Анализируем файл: {file_path}")
    
    data = load_prayer_file(file_path)
    if not data:
        return {"error": "Не удалось загрузить файл"}
    
    result = {
        "file": file_path,
        "title": data.get("title", "Неизвестно"),
        "contentModern_exists": "contentModern" in data,
        "contentModern_length": 0,
        "is_modern": False,
        "issues": [],
        "sample_text": ""
    }
    
    if "contentModern" in data:
        content_modern = data["contentModern"]
        result["contentModern_length"] = len(content_modern)
        result["sample_text"] = content_modern[:300] + "..." if len(content_modern) > 300 else content_modern
        
        # Анализируем качество перевода
        is_modern, issues = analyze_text_modernity(content_modern)
        result["is_modern"] = is_modern
        result["issues"] = issues
        
        print(f"📄 Заголовок: {result['title']}")
        print(f"📊 Длина contentModern: {result['contentModern_length']} символов")
        print(f"✅ Современный перевод: {'ДА' if is_modern else 'НЕТ'}")
        
        if issues:
            print("⚠️  Проблемы:")
            for issue in issues[:5]:  # Показываем только первые 5 проблем
                print(f"   - {issue}")
        else:
            print("✨ Проблем не найдено")
    else:
        print("❌ Поле contentModern отсутствует")
    
    return result

def main():
    """Главная функция"""
    if len(sys.argv) < 2:
        print("Использование: python analyze_modernity.py <путь_к_файлу>")
        print("Пример: python analyze_modernity.py data/prayers/molitva-5-pyatnitsa-arhangelu-selafiilu.json")
        return
    
    file_path = sys.argv[1]
    
    if not os.path.exists(file_path):
        print(f"Файл не найден: {file_path}")
        return
    
    result = analyze_prayer_file(file_path)
    
    # Выводим итоговый результат
    print(f"\n📋 ИТОГОВЫЙ РЕЗУЛЬТАТ:")
    print(f"   Файл: {result['file']}")
    print(f"   Современный перевод: {'✅ ДА' if result['is_modern'] else '❌ НЕТ'}")
    if result['issues']:
        print(f"   Найдено проблем: {len(result['issues'])}")

if __name__ == "__main__":
    main()
