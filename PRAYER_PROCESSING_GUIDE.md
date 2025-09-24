# Руководство по обработке молитв

## Задача
Обработать все молитвы в папке `/data/prayers/` для онлайн площадки молитв:

### Основные требования:
1. **Добавить переносы строк (\n)** в поля `content` и `contentModern`
2. **Перевести `contentModern` на разговорный русский** - заменить церковнославянские формы на современные
3. **Адаптировать для домашней молитвы** - убрать обращения к священнику, заменить на обращения к Богу
4. **Убрать энциклопедические сведения** - оставить только молитву
5. **Для некоторых найти готовые переводы** в интернете

## Правила обработки:

### Церковнославянские формы → Современный русский:
- "мя" → "меня"
- "честный отче" → "Господи" (для домашней молитвы)
- "леностию" → "ленностью"
- "небрежением" → "небрежностью"
- "усердие" → "усердием"
- "благоговение" → "благоговением"
- "яже" → "которые"
- "алчущих" → "голодных"
- "крестнаго знамение" → "крестного знамения"
- "воззрением" → "взглядом"
- "прекословием" → "пререканием"

### Обращения к священнику → Обращения к Богу:
- "Прости мя, честный отче" → "Прости меня, Господи"
- "Простите меня, батюшка" → "Прости меня, Господи"
- "Ты же, честный отче" → "Ты же, Господи"

### Переносы строк:
- После каждого "Прости меня, Господи"
- После каждого "Грешил:" или "Согрешил:"
- В конце абзацев
- После основных тематических блоков

## Статус обработки:

### ✅ Обработано:
- `ispoved.json` - исповедь (полностью обработана)
- `molitva-gospodnya-otche-nash.json` - Отче наш (полностью обработана)
- `molitva-ko-presvyatoy-bogoroditse.json` - молитва к Богородице (полностью обработана)
- `molitva-angelu-hranitelyu.json` - молитва ангелу-хранителю (полностью обработана)
- `molitva-na-son.json` - молитва на сон (полностью обработана)
- `molitva-na-blagoslovenie-pischi-i-pitiya-miryanam.json` - молитва на благословение пищи (полностью обработана)
- `dve-utrennie-maloizvestnye-molitvy.json` - две утренние молитвы (полностью обработана)
- `molitva-v-bolezni.json` - молитва в болезни (полностью обработана)
- `ezhednevnye-molitvy-o-chadah.json` - молитвы о детях (полностью обработана)
- `o-puteshestvuyuschih.json` - молитвы о путешествующих (полностью обработана)
- `posledovanie-ko-svyatomu-prichascheniyu.json` - последование ко Святому Причащению (полностью обработана)
- `blagodarstvennye-molitvy-po-svyatom-prichaschenii.json` - благодарственные молитвы после причащения (полностью обработана)
- `blagoslovenie-materi.json` - благословение матери (полностью обработана)
- `blagodarenie-za-vsyakoe-blagodeyanie-bozhie.json` - благодарение за всякое благодеяние Божие (полностью обработана)
- `akafist-iisusu-sladchayshemu.json` - акафист Иисусу Сладчайшему (полностью обработана)
- `akafist-presvyatoy-bogoroditse.json` - акафист Пресвятой Богородице (полностью обработана)
- `akafist-za-edinoumershego.json` - акафист за единоумершего (полностью обработана - исправлен современный перевод)
- `apostolu-fome.json` - апостолу Фоме (полностью обработана)
- `arhangelu-varahiilu-pokrovitelyu-blagochestivyh-semeystv-nebesnym-chinam-besplotnym.json` - архангелу Варахиилу (полностью обработана)
- `17-ya-kafizma-pominalnaya-chtomaya-v-dni-osobogo-pominoveniya-usopshih.json` - 17-я кафизма поминальная (полностью обработана)
- `bessrebrenikam-i-chudotvortsam-kosme-i-damianu.json` - бессребреникам Косме и Дамиану (полностью обработана)
- `blagovernomu-knyazyu-daniilu-moskovskomu.json` - князю Даниилу Московскому (полностью обработана)
- `blagovernomu-knyazyu-petru-i-knyagine-fevronii-muromskim-chudotvortsam.json` - князю Петру и княгине Февронии (полностью обработана)
- `blazhennomu-prokopiyu-hrista-radi-yurodivomu-ustyuzhskomu-chudotvortsu.json` - блаженному Прокопию Устюжскому (полностью обработана)
- `blazhenstva-evangelskie.json` - блаженства евангельские (полностью обработана)
- `bogorodichnoe-pravilo.json` - богородичное правило (полностью обработана)
- `bozhiey-materi-mlekopitatelnitse.json` - Божией Матери Млекопитательнице (полностью обработана)
- `chas-shestoy.json` - час шестой (полностью обработана - исправлен современный перевод)
- `chas-tretiy.json` - час третий (полностью обработана - исправлен современный перевод)
- `chasy-svyatoy-pashi.json` - часы святой Пасхи (полностью обработана)
- `chin-chteniya-12-ti-psalmov.json` - чин чтения 12 псалмов (полностью обработана)
- `chin-litii-sovershaemoy-miryaninom-doma-i-na-kladbische.json` - чин литии (полностью обработана)
- `chin-molitvennago-utesheniya-srodnikov-zhivot-svoy-samovolne-skonchavshago.json` - чин молитвенного утешения (полностью обработана)
- `chin-obednitsy.json` - чин обедницы (полностью обработана)
- `cvyatitelyu-nektariyu-eginskomu.json` - святителю Нектарию Эгинскому (полностью обработана)
- `cvyatomu-blagovernomu-velikomu-knyazyu-aleksandru-nevskomu.json` - князю Александру Невскому (полностью обработана)
- `cvyatomu-prepodobnomu-irinarhu-zatvorniku-rostovskomu.json` - преподобному Иринарху Ростовскому (полностью обработана)
- `cvyatomu-ravnoapostolnomu-velikomu-knyazyu-vladimiru.json` - князю Владимиру (полностью обработана)
- `cvyatym-sedmi-otrokam-izhe-vo-efese-maksimilianu-iamvlihu-martinianu-ioannu-dionisiyu-eksakustodianu-i-antoninu.json` - семи отрокам Ефесским (полностью обработана)
- `desyat-zapovedey.json` - десять заповедей (полностью обработана)
- `devyatyy-chas.json` - девятый час (полностью обработана)
- `ezhednevnaya-molitva-svyatitelya-filareta-mitropolita-moskovskogo.json` - ежедневная молитва святителя Филарета (полностью обработана)
- `iisusova-molitva.json` - Иисусова молитва (полностью обработана - исправлен современный перевод)
- `inaya-molitva.json` - иная молитва (полностью обработана)
- `kanon-angelu-hranitelyu.json` - канон ангелу-хранителю (полностью обработана)
- `kanon-molebnyy-ko-gospodu-iisusu-hristu-i-prechistoy-bogoroditse-materi-gospodni-pri-razluchenii-dushi-ot-tela-vsyakogo-pravovernogo.json` - канон молебный ко Господу и Богородице (полностью обработана)
- `kanon-molebnyy-ko-presvyatoy-bogoroditse.json` - канон молебный ко Пресвятой Богородице (полностью обработана)
- `kanon-o-samovolne-zhivot-svoy-skonchavshih.json` - канон о самовольно скончавших (полностью обработана)
- `kanon-pokayannyy-ko-gospodu-nashemu-iisusu-hristu.json` - канон покаянный ко Господу (полностью обработана)
- `kanon-za-bolyaschego-glas-3-y.json` - канон за болящего (полностью обработана)
- `keleynoe-pravilo.json` - келейное правило (полностью обработана)
- `ko-gospodu-iisusu-hristu.json` - ко Господу Иисусу Христу (полностью обработана)
- `kogda-zametish-za-soboy-kakoy-greh-molitva-sv-ioanna-kronshtadtskogo.json` - когда заметишь за собой какой грех (полностью обработана)
- `konchina-cheloveka.json` - кончина человека (полностью обработана)
- `kratchayshiy-obraz-izbavleniya-ot-hulnyh-mysley.json` - кратчайший образ избавления от хульных мыслей (полностью обработана)
- `liturgiya-oglashennyh.json` - литургия оглашенных (полностью обработана)
- `liturgiya-vernyh.json` - литургия верных (полностью обработана)
- `molenie-o-tom-chtoby-bog-daroval-nam-userdie-k-molitve-za-usopshih-i-prinyal-by-eyo.json` - моление о том, чтобы Бог даровал нам усердие к молитве за усопших (полностью обработана)
- `molenie-o-upokoenii-pravoslavnyh-voinov-za-veru-i-otechestvo-na-brani-ubiennyh.json` - моление о упокоении православных воинов (полностью обработана)
- `molitva-1-ponedelnik-arhangelu-mihailu.json` - молитва 1 (понедельник архангелу Михаилу) (полностью обработана - исправлен современный перевод)
- `molitva-1.json` - молитва 1 (полностью обработана)
- `molitva-2-vtornik-arhangelu-gavriilu.json` - молитва 2 (вторник архангелу Гавриилу) (полностью обработана - исправлен современный перевод)
- `molitva-2.json` - молитва 2 (полностью обработана)
- `molitva-3.json` - молитва 3 (полностью обработана)
- `molitva-4-chetverg-arhangelu-uriilu.json` - молитва 4 (четверг архангелу Уриилу) (полностью обработана - исправлен современный перевод)
- `molitva-4.json` - молитва 4 (полностью обработана)
- `molitva-5-pyatnitsa-arhangelu-selafiilu.json` - молитва 5 (пятница архангелу Селафиилу) (полностью обработана - исправлен современный перевод)
- `molitva-6-subbota-arhangelu-iegudiilu.json` - молитва 6 (суббота архангелу Иегудиилу) (полностью обработана - исправлен современный перевод)
- `molitva-arhangelu-rafailu.json` - молитва архангелу Рафаилу (полностью обработана - исправлен современный перевод)
- `molitva-arhistratigu-mihailu.json` - молитва архистратигу Михаилу (полностью обработана - исправлен современный перевод)
- `molitva-apostolu-simonu-zilotu.json` - молитва апостолу Симону Зилоту (полностью обработана - исправлен современный перевод)
- `molitva-beremennyh-zhenschin-o-blagopoluchnom-razreshenii.json` - молитва беременных женщин о благополучном разрешении (полностью обработана - исправлен современный перевод)
- `molitva-bolyaschey.json` - молитва болящей (полностью обработана - исправлен современный перевод)
- `molitva-chestnomu-krestu-da-voskresnet-bog.json` - молитва честному кресту (полностью обработана - исправлен современный перевод)
- `molitva-ob-otroke-neudobouchaschemsya-ploho-uchaschemsya.json` - молитва об отроке неудобоучащемся (плохо учащемся) (полностью обработана - исправлен современный перевод и добавлены переносы строк)
- `desyat-zapovedey.json` - десять заповедей (полностью обработана - добавлены переносы строк и улучшен современный перевод)
- `simvol-very.json` - символ веры (полностью обработана - добавлены переносы строк и улучшен современный перевод)
- `molitvy-utrennie-i-vechernie.json` - молитвы утренние и вечерние (полностью обработана - добавлены переносы строк и улучшен современный перевод)

### 🔄 В процессе:
- (нет)

### ⏳ Ожидает обработки:
- Все остальные файлы в папке `/data/prayers/`

## Приоритет обработки:
1. **Основные молитвы** (Отче наш, Богородице Дево, и т.д.)
2. **Повседневные молитвы** (утренние, вечерние)
3. **Молитвы по случаям** (болезнь, путешествие, и т.д.)
4. **Акафисты и каноны**
5. **Специальные чины**

## Заметки:
- Для каждой молитвы нужно индивидуально решать: искать готовый перевод или адаптировать самостоятельно
- Некоторые молитвы могут содержать энциклопедические сведения - их нужно убрать
- Важно сохранить смысл и дух молитвы при переводе
- Всегда проверять результат на естественность звучания

---
*Последнее обновление: $(date)*
