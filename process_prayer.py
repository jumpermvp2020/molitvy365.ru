#!/usr/bin/env python3
"""
Вспомогательный скрипт для обработки JSON файлов молитв
Помогает разбивать длинные поля на части и собирать их обратно
"""

import json
import sys
import os
from typing import Dict, Any, List

def load_prayer_file(file_path: str) -> Dict[str, Any]:
    """Загружает JSON файл молитвы"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Ошибка загрузки файла {file_path}: {e}")
        return None

def save_prayer_file(file_path: str, data: Dict[str, Any]) -> bool:
    """Сохраняет JSON файл молитвы"""
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        print(f"Ошибка сохранения файла {file_path}: {e}")
        return False

def split_long_field(content: str, max_length: int = 1000) -> List[str]:
    """Разбивает длинное поле на части"""
    if len(content) <= max_length:
        return [content]
    
    parts = []
    current_pos = 0
    
    while current_pos < len(content):
        # Ищем ближайший конец предложения или абзаца
        end_pos = min(current_pos + max_length, len(content))
        
        # Если это не конец строки, ищем ближайший перенос строки или точку
        if end_pos < len(content):
            for i in range(end_pos, current_pos + max_length // 2, -1):
                if content[i] in ['\n', '.', '!', '?']:
                    end_pos = i + 1
                    break
        
        parts.append(content[current_pos:end_pos])
        current_pos = end_pos
    
    return parts

def get_field_info(data: Dict[str, Any], field_name: str) -> Dict[str, Any]:
    """Получает информацию о поле"""
    if field_name not in data:
        return {"exists": False}
    
    content = data[field_name]
    return {
        "exists": True,
        "length": len(content),
        "preview": content[:200] + "..." if len(content) > 200 else content,
        "parts": split_long_field(content)
    }

def update_field(data: Dict[str, Any], field_name: str, new_content: str) -> bool:
    """Обновляет поле в данных"""
    try:
        data[field_name] = new_content
        return True
    except Exception as e:
        print(f"Ошибка обновления поля {field_name}: {e}")
        return False

def process_prayer_file(file_path: str, field_name: str = "contentModern", new_content: str = None):
    """Основная функция обработки файла молитвы"""
    print(f"Обрабатываем файл: {file_path}")
    
    # Загружаем файл
    data = load_prayer_file(file_path)
    if not data:
        return False
    
    # Получаем информацию о поле
    field_info = get_field_info(data, field_name)
    print(f"Поле '{field_name}':")
    print(f"  Существует: {field_info['exists']}")
    if field_info['exists']:
        print(f"  Длина: {field_info['length']} символов")
        print(f"  Превью: {field_info['preview']}")
        print(f"  Частей: {len(field_info['parts'])}")
    
    # Если нужно обновить поле
    if new_content:
        print(f"Обновляем поле '{field_name}'...")
        if update_field(data, field_name, new_content):
            if save_prayer_file(file_path, data):
                print("✅ Файл успешно обновлен!")
                return True
            else:
                print("❌ Ошибка сохранения файла")
                return False
        else:
            print("❌ Ошибка обновления поля")
            return False
    
    return True

def main():
    """Главная функция"""
    if len(sys.argv) < 2:
        print("Использование: python process_prayer.py <путь_к_файлу> [поле] [новое_содержимое]")
        print("Примеры:")
        print("  python process_prayer.py data/prayers/chas-shestoy.json")
        print("  python process_prayer.py data/prayers/chas-shestoy.json contentModern")
        print("  python process_prayer.py data/prayers/chas-shestoy.json contentModern 'Новый текст'")
        return
    
    file_path = sys.argv[1]
    field_name = sys.argv[2] if len(sys.argv) > 2 else "contentModern"
    new_content = sys.argv[3] if len(sys.argv) > 3 else None
    
    if not os.path.exists(file_path):
        print(f"Файл не найден: {file_path}")
        return
    
    process_prayer_file(file_path, field_name, new_content)

if __name__ == "__main__":
    main()
