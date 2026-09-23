globalThis.ReaderI18n = (() => {
  const messages = {
    en: {
      appName: "Selection Text Reader", intro: "Select text on the current web page, then open this menu to read it aloud.",
      startReading: "Start reading", pause: "Pause", resume: "Resume", stopReading: "Stop reading", scanScreenText: "Scan screen text", voiceSettings: "Voice and speed settings",
      settingsTitle: "Reading Settings", back: "Back", interfaceLanguage: "Interface language", systemVoiceEngine: "Detected system voice engine", windowsSystemVoices: "Windows system", macosSystemVoices: "macOS system", systemVoices: "System", extensionVoice: "Extension", autoDetect: "Automatically detect selected text language", showSelectionButton: "Show the on-page selection button",
      fallbackLanguage: "Fallback language", defaultVoice: "Default voice", automatic: "Automatic", voicesByLanguage: "Voices by language", chinese: "Chinese", english: "English", japanese: "Japanese", korean: "Korean", useDefault: "Use default",
      ocrLanguage: "Screen OCR language", speed: "Speed", pitch: "Pitch", volume: "Volume", saveSettings: "Save settings", testVoice: "Test voice", settingsSaved: "Settings saved", repository: "GitHub repository",
      readOriginal: "Read original", stop: "Stop", previous: "Previous", next: "Next", translateTo: "Translate to", translateRead: "Translate and read", openReadingPanel: "Open reading panel", close: "Close",
      dragToScan: "Drag to select an area. Press Esc to cancel.", screenScanner: "Screen Text Scanner", recognizedText: "Recognized text", readText: "Read text", copyText: "Copy text", scanAgain: "Scan again",
      noActivePage: "No active page found.", selectTextFirst: "Select some text on the page first.", pageAccessDenied: "This page does not allow access to selected text.", refreshBeforeScan: "Refresh this page before using screen scan.",
      readingSelected: "Reading selected text...", readingStarted: "Reading started.", readingStopped: "Reading stopped.", unableRead: "Unable to start reading.", sentenceProgress: "Sentence {current} of {total}",
      readingOriginal: "Reading original text.", translating: "Translating...", translationFailed: "Translation failed.", readingTranslation: "Reading translated text.",
      capturing: "Capturing screen...", loadingOcr: "Loading OCR language model...", recognitionComplete: "Text recognition complete.", noTextFound: "No text was found in this area.", noTextRead: "There is no text to read.", noTextCopy: "There is no text to copy.", readingRecognized: "Reading recognized text.", copied: "Text copied to the clipboard."
    },
    "zh-CN": {
      appName: "选中文字朗读器", intro: "在当前网页选择文字，然后打开此菜单进行朗读。", startReading: "开始朗读", pause: "暂停", resume: "继续", stopReading: "停止朗读", scanScreenText: "扫描屏幕文字", voiceSettings: "声音和语速设置",
      settingsTitle: "朗读设置", back: "返回", interfaceLanguage: "界面语言", systemVoiceEngine: "检测到的系统语音引擎", windowsSystemVoices: "Windows 系统", macosSystemVoices: "macOS 系统", systemVoices: "系统", extensionVoice: "扩展", autoDetect: "自动检测所选文字的语言", showSelectionButton: "显示网页选区按钮", fallbackLanguage: "备用语言", defaultVoice: "默认声音", automatic: "自动", voicesByLanguage: "各语言声音", chinese: "中文", english: "英文", japanese: "日文", korean: "韩文", useDefault: "使用默认声音",
      ocrLanguage: "屏幕 OCR 语言", speed: "语速", pitch: "音调", volume: "音量", saveSettings: "保存设置", testVoice: "试听声音", settingsSaved: "设置已保存", repository: "GitHub 项目主页",
      readOriginal: "朗读原文", stop: "停止", previous: "上一句", next: "下一句", translateTo: "翻译为", translateRead: "翻译并朗读", openReadingPanel: "打开朗读面板", close: "关闭",
      dragToScan: "拖动选择区域，按 Esc 取消。", screenScanner: "屏幕文字扫描", recognizedText: "识别出的文字", readText: "朗读文字", copyText: "复制文字", scanAgain: "重新扫描",
      noActivePage: "未找到活动页面。", selectTextFirst: "请先在网页中选择文字。", pageAccessDenied: "当前页面不允许读取所选文字。", refreshBeforeScan: "请刷新页面后再使用屏幕扫描。", readingSelected: "正在读取所选文字……", readingStarted: "已开始朗读。", readingStopped: "已停止朗读。", unableRead: "无法开始朗读。", sentenceProgress: "第 {current} 句，共 {total} 句",
      readingOriginal: "正在朗读原文。", translating: "正在翻译……", translationFailed: "翻译失败。", readingTranslation: "正在朗读译文。", capturing: "正在截取屏幕……", loadingOcr: "正在加载 OCR 语言模型……", recognitionComplete: "文字识别完成。", noTextFound: "此区域未识别到文字。", noTextRead: "没有可朗读的文字。", noTextCopy: "没有可复制的文字。", readingRecognized: "正在朗读识别文字。", copied: "文字已复制到剪贴板。"
    },
    "zh-TW": {
      appName: "選取文字朗讀器", intro: "在目前網頁選取文字，然後開啟此選單進行朗讀。", startReading: "開始朗讀", pause: "暫停", resume: "繼續", stopReading: "停止朗讀", scanScreenText: "掃描螢幕文字", voiceSettings: "聲音與語速設定",
      settingsTitle: "朗讀設定", back: "返回", interfaceLanguage: "介面語言", systemVoiceEngine: "偵測到的系統語音引擎", windowsSystemVoices: "Windows 系統", macosSystemVoices: "macOS 系統", systemVoices: "系統", extensionVoice: "擴充功能", autoDetect: "自動偵測所選文字的語言", showSelectionButton: "顯示網頁選取按鈕", fallbackLanguage: "備用語言", defaultVoice: "預設聲音", automatic: "自動", voicesByLanguage: "各語言聲音", chinese: "中文", english: "英文", japanese: "日文", korean: "韓文", useDefault: "使用預設聲音",
      ocrLanguage: "螢幕 OCR 語言", speed: "語速", pitch: "音調", volume: "音量", saveSettings: "儲存設定", testVoice: "試聽聲音", settingsSaved: "設定已儲存", repository: "GitHub 專案頁面",
      readOriginal: "朗讀原文", stop: "停止", previous: "上一句", next: "下一句", translateTo: "翻譯為", translateRead: "翻譯並朗讀", openReadingPanel: "開啟朗讀面板", close: "關閉",
      dragToScan: "拖曳選取區域，按 Esc 取消。", screenScanner: "螢幕文字掃描", recognizedText: "辨識出的文字", readText: "朗讀文字", copyText: "複製文字", scanAgain: "重新掃描",
      noActivePage: "找不到目前頁面。", selectTextFirst: "請先在網頁中選取文字。", pageAccessDenied: "目前頁面不允許讀取所選文字。", refreshBeforeScan: "請重新整理頁面後再使用螢幕掃描。", readingSelected: "正在讀取所選文字……", readingStarted: "已開始朗讀。", readingStopped: "已停止朗讀。", unableRead: "無法開始朗讀。", sentenceProgress: "第 {current} 句，共 {total} 句",
      readingOriginal: "正在朗讀原文。", translating: "正在翻譯……", translationFailed: "翻譯失敗。", readingTranslation: "正在朗讀譯文。", capturing: "正在擷取螢幕……", loadingOcr: "正在載入 OCR 語言模型……", recognitionComplete: "文字辨識完成。", noTextFound: "此區域未辨識到文字。", noTextRead: "沒有可朗讀的文字。", noTextCopy: "沒有可複製的文字。", readingRecognized: "正在朗讀辨識文字。", copied: "文字已複製到剪貼簿。"
    },
    ja: {
      appName: "選択テキスト読み上げ", intro: "現在のウェブページでテキストを選択し、このメニューから読み上げます。", startReading: "読み上げ開始", pause: "一時停止", resume: "再開", stopReading: "読み上げ停止", scanScreenText: "画面の文字をスキャン", voiceSettings: "音声と速度の設定",
      settingsTitle: "読み上げ設定", back: "戻る", interfaceLanguage: "表示言語", systemVoiceEngine: "検出されたシステム音声エンジン", windowsSystemVoices: "Windows システム", macosSystemVoices: "macOS システム", systemVoices: "システム", extensionVoice: "拡張機能", autoDetect: "選択したテキストの言語を自動検出", showSelectionButton: "ページ上に選択ボタンを表示", fallbackLanguage: "予備の言語", defaultVoice: "既定の音声", automatic: "自動", voicesByLanguage: "言語別の音声", chinese: "中国語", english: "英語", japanese: "日本語", korean: "韓国語", useDefault: "既定を使用",
      ocrLanguage: "画面 OCR の言語", speed: "速度", pitch: "音程", volume: "音量", saveSettings: "設定を保存", testVoice: "音声をテスト", settingsSaved: "設定を保存しました", repository: "GitHub リポジトリ",
      readOriginal: "原文を読む", stop: "停止", previous: "前へ", next: "次へ", translateTo: "翻訳先", translateRead: "翻訳して読み上げ", openReadingPanel: "読み上げパネルを開く", close: "閉じる",
      dragToScan: "ドラッグして範囲を選択します。Esc でキャンセル。", screenScanner: "画面テキストスキャナー", recognizedText: "認識されたテキスト", readText: "テキストを読む", copyText: "テキストをコピー", scanAgain: "もう一度スキャン",
      noActivePage: "アクティブなページが見つかりません。", selectTextFirst: "最初にページ上のテキストを選択してください。", pageAccessDenied: "このページでは選択テキストにアクセスできません。", refreshBeforeScan: "画面スキャンを使用する前にページを再読み込みしてください。", readingSelected: "選択テキストを読み上げています...", readingStarted: "読み上げを開始しました。", readingStopped: "読み上げを停止しました。", unableRead: "読み上げを開始できません。", sentenceProgress: "{total} 文中 {current} 文目",
      readingOriginal: "原文を読み上げています。", translating: "翻訳しています...", translationFailed: "翻訳に失敗しました。", readingTranslation: "翻訳文を読み上げています。", capturing: "画面をキャプチャしています...", loadingOcr: "OCR 言語モデルを読み込んでいます...", recognitionComplete: "文字認識が完了しました。", noTextFound: "この範囲に文字が見つかりませんでした。", noTextRead: "読み上げるテキストがありません。", noTextCopy: "コピーするテキストがありません。", readingRecognized: "認識したテキストを読み上げています。", copied: "テキストをクリップボードにコピーしました。"
    },
    ko: {
      appName: "선택 텍스트 리더", intro: "현재 웹페이지에서 텍스트를 선택한 후 이 메뉴를 열어 읽으세요.", startReading: "읽기 시작", pause: "일시 정지", resume: "계속", stopReading: "읽기 중지", scanScreenText: "화면 텍스트 스캔", voiceSettings: "음성 및 속도 설정",
      settingsTitle: "읽기 설정", back: "뒤로", interfaceLanguage: "인터페이스 언어", systemVoiceEngine: "감지된 시스템 음성 엔진", windowsSystemVoices: "Windows 시스템", macosSystemVoices: "macOS 시스템", systemVoices: "시스템", extensionVoice: "확장 프로그램", autoDetect: "선택한 텍스트 언어 자동 감지", showSelectionButton: "페이지 선택 버튼 표시", fallbackLanguage: "대체 언어", defaultVoice: "기본 음성", automatic: "자동", voicesByLanguage: "언어별 음성", chinese: "중국어", english: "영어", japanese: "일본어", korean: "한국어", useDefault: "기본값 사용",
      ocrLanguage: "화면 OCR 언어", speed: "속도", pitch: "음높이", volume: "볼륨", saveSettings: "설정 저장", testVoice: "음성 테스트", settingsSaved: "설정이 저장되었습니다", repository: "GitHub 저장소",
      readOriginal: "원문 읽기", stop: "중지", previous: "이전", next: "다음", translateTo: "번역 언어", translateRead: "번역 후 읽기", openReadingPanel: "읽기 패널 열기", close: "닫기",
      dragToScan: "영역을 드래그하세요. Esc를 누르면 취소됩니다.", screenScanner: "화면 텍스트 스캐너", recognizedText: "인식된 텍스트", readText: "텍스트 읽기", copyText: "텍스트 복사", scanAgain: "다시 스캔",
      noActivePage: "활성 페이지를 찾을 수 없습니다.", selectTextFirst: "먼저 페이지에서 텍스트를 선택하세요.", pageAccessDenied: "이 페이지에서는 선택한 텍스트에 접근할 수 없습니다.", refreshBeforeScan: "화면 스캔을 사용하기 전에 페이지를 새로고침하세요.", readingSelected: "선택한 텍스트를 읽는 중...", readingStarted: "읽기를 시작했습니다.", readingStopped: "읽기를 중지했습니다.", unableRead: "읽기를 시작할 수 없습니다.", sentenceProgress: "{total}개 중 {current}번째 문장",
      readingOriginal: "원문을 읽는 중입니다.", translating: "번역 중...", translationFailed: "번역에 실패했습니다.", readingTranslation: "번역문을 읽는 중입니다.", capturing: "화면 캡처 중...", loadingOcr: "OCR 언어 모델 로딩 중...", recognitionComplete: "텍스트 인식이 완료되었습니다.", noTextFound: "이 영역에서 텍스트를 찾지 못했습니다.", noTextRead: "읽을 텍스트가 없습니다.", noTextCopy: "복사할 텍스트가 없습니다.", readingRecognized: "인식된 텍스트를 읽는 중입니다.", copied: "텍스트를 클립보드에 복사했습니다."
    },
    th: {
      appName: "โปรแกรมอ่านข้อความที่เลือก", intro: "เลือกข้อความบนหน้าเว็บปัจจุบัน แล้วเปิดเมนูนี้เพื่ออ่านข้อความ", startReading: "เริ่มอ่าน", pause: "หยุดชั่วคราว", resume: "อ่านต่อ", stopReading: "หยุดอ่าน", scanScreenText: "สแกนข้อความบนหน้าจอ", voiceSettings: "การตั้งค่าเสียงและความเร็ว",
      settingsTitle: "การตั้งค่าการอ่าน", back: "กลับ", interfaceLanguage: "ภาษาของส่วนติดต่อ", systemVoiceEngine: "ระบบเสียงที่ตรวจพบ", windowsSystemVoices: "ระบบ Windows", macosSystemVoices: "ระบบ macOS", systemVoices: "ระบบ", extensionVoice: "ส่วนขยาย", autoDetect: "ตรวจจับภาษาของข้อความที่เลือกโดยอัตโนมัติ", showSelectionButton: "แสดงปุ่มเลือกบนหน้าเว็บ", fallbackLanguage: "ภาษาสำรอง", defaultVoice: "เสียงเริ่มต้น", automatic: "อัตโนมัติ", voicesByLanguage: "เสียงตามภาษา", chinese: "ภาษาจีน", english: "ภาษาอังกฤษ", japanese: "ภาษาญี่ปุ่น", korean: "ภาษาเกาหลี", useDefault: "ใช้ค่าเริ่มต้น",
      ocrLanguage: "ภาษา OCR บนหน้าจอ", speed: "ความเร็ว", pitch: "ระดับเสียง", volume: "ความดัง", saveSettings: "บันทึกการตั้งค่า", testVoice: "ทดสอบเสียง", settingsSaved: "บันทึกการตั้งค่าแล้ว", repository: "ที่เก็บ GitHub",
      readOriginal: "อ่านต้นฉบับ", stop: "หยุด", previous: "ก่อนหน้า", next: "ถัดไป", translateTo: "แปลเป็น", translateRead: "แปลและอ่าน", openReadingPanel: "เปิดแผงการอ่าน", close: "ปิด",
      dragToScan: "ลากเพื่อเลือกพื้นที่ กด Esc เพื่อยกเลิก", screenScanner: "เครื่องสแกนข้อความบนหน้าจอ", recognizedText: "ข้อความที่ตรวจพบ", readText: "อ่านข้อความ", copyText: "คัดลอกข้อความ", scanAgain: "สแกนอีกครั้ง",
      noActivePage: "ไม่พบหน้าเว็บที่ใช้งานอยู่", selectTextFirst: "โปรดเลือกข้อความบนหน้าเว็บก่อน", pageAccessDenied: "หน้าเว็บนี้ไม่อนุญาตให้เข้าถึงข้อความที่เลือก", refreshBeforeScan: "โปรดรีเฟรชหน้าเว็บก่อนใช้การสแกนหน้าจอ", readingSelected: "กำลังอ่านข้อความที่เลือก...", readingStarted: "เริ่มอ่านแล้ว", readingStopped: "หยุดอ่านแล้ว", unableRead: "ไม่สามารถเริ่มอ่านได้", sentenceProgress: "ประโยคที่ {current} จาก {total}",
      readingOriginal: "กำลังอ่านต้นฉบับ", translating: "กำลังแปล...", translationFailed: "การแปลล้มเหลว", readingTranslation: "กำลังอ่านข้อความที่แปล", capturing: "กำลังจับภาพหน้าจอ...", loadingOcr: "กำลังโหลดโมเดลภาษา OCR...", recognitionComplete: "ตรวจจับข้อความเสร็จแล้ว", noTextFound: "ไม่พบข้อความในพื้นที่นี้", noTextRead: "ไม่มีข้อความให้อ่าน", noTextCopy: "ไม่มีข้อความให้คัดลอก", readingRecognized: "กำลังอ่านข้อความที่ตรวจพบ", copied: "คัดลอกข้อความไปยังคลิปบอร์ดแล้ว"
    },
    ms: {
      appName: "Pembaca Teks Pilihan", intro: "Pilih teks pada laman semasa, kemudian buka menu ini untuk membacanya.", startReading: "Mula membaca", pause: "Jeda", resume: "Sambung", stopReading: "Henti membaca", scanScreenText: "Imbas teks skrin", voiceSettings: "Tetapan suara dan kelajuan",
      settingsTitle: "Tetapan Bacaan", back: "Kembali", interfaceLanguage: "Bahasa antara muka", systemVoiceEngine: "Enjin suara sistem yang dikesan", windowsSystemVoices: "Sistem Windows", macosSystemVoices: "Sistem macOS", systemVoices: "Sistem", extensionVoice: "Sambungan", autoDetect: "Kesan bahasa teks yang dipilih secara automatik", showSelectionButton: "Tunjukkan butang pilihan pada laman", fallbackLanguage: "Bahasa sandaran", defaultVoice: "Suara lalai", automatic: "Automatik", voicesByLanguage: "Suara mengikut bahasa", chinese: "Bahasa Cina", english: "Bahasa Inggeris", japanese: "Bahasa Jepun", korean: "Bahasa Korea", useDefault: "Guna lalai",
      ocrLanguage: "Bahasa OCR skrin", speed: "Kelajuan", pitch: "Nada", volume: "Kelantangan", saveSettings: "Simpan tetapan", testVoice: "Uji suara", settingsSaved: "Tetapan disimpan", repository: "Repositori GitHub",
      readOriginal: "Baca teks asal", stop: "Henti", previous: "Sebelumnya", next: "Seterusnya", translateTo: "Terjemah kepada", translateRead: "Terjemah dan baca", openReadingPanel: "Buka panel bacaan", close: "Tutup",
      dragToScan: "Seret untuk memilih kawasan. Tekan Esc untuk batal.", screenScanner: "Pengimbas Teks Skrin", recognizedText: "Teks dikenal pasti", readText: "Baca teks", copyText: "Salin teks", scanAgain: "Imbas lagi",
      noActivePage: "Tiada laman aktif ditemui.", selectTextFirst: "Pilih teks pada laman dahulu.", pageAccessDenied: "Laman ini tidak membenarkan akses kepada teks pilihan.", refreshBeforeScan: "Muat semula laman sebelum menggunakan imbasan skrin.", readingSelected: "Membaca teks pilihan...", readingStarted: "Bacaan dimulakan.", readingStopped: "Bacaan dihentikan.", unableRead: "Tidak dapat mula membaca.", sentenceProgress: "Ayat {current} daripada {total}",
      readingOriginal: "Membaca teks asal.", translating: "Menterjemah...", translationFailed: "Terjemahan gagal.", readingTranslation: "Membaca teks terjemahan.", capturing: "Menangkap skrin...", loadingOcr: "Memuatkan model bahasa OCR...", recognitionComplete: "Pengecaman teks selesai.", noTextFound: "Tiada teks ditemui di kawasan ini.", noTextRead: "Tiada teks untuk dibaca.", noTextCopy: "Tiada teks untuk disalin.", readingRecognized: "Membaca teks yang dikenal pasti.", copied: "Teks disalin ke papan keratan."
    }
  };

  function normalizeLanguage(language) {
    return messages[language] ? language : "en";
  }

  function t(key, language = "en", values = {}) {
    const template = messages[normalizeLanguage(language)][key] || messages.en[key] || key;
    return template.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? `{${name}}`);
  }

  function apply(root, language) {
    root.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = t(element.dataset.i18n, language);
    });
    root.querySelectorAll("[data-i18n-title]").forEach((element) => {
      element.title = t(element.dataset.i18nTitle, language);
    });
    root.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel, language));
    });
  }

  return { t, apply, normalizeLanguage };
})();
