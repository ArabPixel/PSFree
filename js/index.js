const ckbaj = document.getElementById('ckbaj');
const ckbdc = document.getElementById('ckbdc');
const visibleDiv = localStorage.getItem('visibleDiv') || 'jailbreak-page';
const savedaj = localStorage.getItem('autojbstate');
const savedc = localStorage.getItem('dbugc');
const menuBtns = document.querySelectorAll('.menu-btn');
const psBtns = document.querySelectorAll('.ps-btn');
const plsbtn = document.querySelectorAll('.button-container button');

var ps4fw

var ps4FwVersion
let platform

window.addEventListener('DOMContentLoaded', loadsettings);

document.getElementById('jailbreak').addEventListener('click', () => {
  jailbreak();
});

document.getElementById('binloader').addEventListener('click', () => {
  binloader();
});

document.querySelectorAll('button[data-func]').forEach(button => {
  button.addEventListener('click', () => {
    const payload = button.getAttribute('data-func');
    Loadpayloads(payload);
  });
});

document.getElementById('generate-cache-btn').addEventListener('click', () => {
  fetch('/generate_manifest', { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      alert('Error: ' + error + "\nThis option only work on local server !\nPlease make sure you'r server is up.");
    });
});

document.getElementById('update-exploit').addEventListener('click', () => {
  fetch('/update_exploit', { method: 'POST' })
    .then(res => res.json())
    .then(data => {
      document.getElementById('console').textContent = data.results.join('\n') + "\nPlease don't forget to update the cache !";
    })
    .catch(err => {
      alert('Error: ' + err + "\nThis option only work on local server !\nPlease make sure you'r server is up.");
    });
});

ckbaj.addEventListener('change', (e) => {
  //alert("WARNING :\nThis option make the jailbreak unstable and this option is not recommended please use the jailbreak button instead !");
  localStorage.setItem('autojbstate', e.target.checked);
  onCheckboxChange(e.target.checked);
});

ckbdc.addEventListener('change', (e) => {
  localStorage.setItem('dbugc', e.target.checked);
  onCheckboxChange(e.target.checked);
  if (ckbdc.checked) {
    document.getElementById('DebugConsole').style.display  = 'flex';
  } else {
    document.getElementById('DebugConsole').style.display = 'none';
  }
});

function isHttps() {
  return window.location.protocol === 'https:';
}

async function loadMultipleModules(files) {
  try {
    // Dynamically import all modules
    const modules = await Promise.all(files.map(file => import(file)));
    return modules; // array of imported modules
  } catch (error) {
    console.error("Error loading modules:", error);
    throw error;
  }
}

function showabout() {
  document.getElementById('about-popup').style.display = 'flex'; // Show popup
  document.getElementById('overlay-popup').style.display = 'block'; // Show overlay
}

function closeabout() {
  document.getElementById('about-popup').style.display = 'none'; // Hide popup
  document.getElementById('overlay-popup').style.display = 'none'; // Hide overlay
}

function showsettings() {
  document.getElementById('settings-popup').style.display = 'flex'; // Show popup
  document.getElementById('overlay-popup').style.display = 'block'; // Show overlay
}

function closesettings() {
  document.getElementById('settings-popup').style.display = 'none'; // Hide popup
  document.getElementById('overlay-popup').style.display = 'none'; // Hide overlay
}

function CheckFW() {
  const userAgent = navigator.userAgent;
  const ps4Regex = /PlayStation 4/;
  const elementsToHide = [
    'jailbreak-page', 'jailbreak', 'autojbchkb', 'agtext', 
    'payloadsbtn', 'generate-cache-btn', 'update-exploit', 'settings-btn'
  ];

  if (ps4Regex.test(userAgent)) {
    const firmwareMatch = userAgent.match(/PlayStation 4\/([\d.]+)/);
    const fwVersion = firmwareMatch ? firmwareMatch[1] : null;
    ps4FwVersion = fwVersion;
    if (fwVersion === '7.00' || fwVersion === '7.01' || fwVersion === '7.02' || fwVersion === '7.50' || fwVersion === '7.51' || fwVersion === '7.55' || fwVersion === fwVersion === '8.00' || fwVersion === '8.01' || fwVersion === '8.01' || fwVersion === '8.03' || fwVersion === '8.50' || fwVersion === '8.52' || fwVersion === '9.00' || fwVersion === '9.03' || fwVersion === '9.04' || fwVersion === '9.50' || fwVersion === '9.51' || fwVersion === '9.60') {
      document.getElementById('PS4FW').textContent = `PS4 FW: ${fwVersion} | Compatible`;
      document.getElementById('PS4FW').style.color = 'green';
      ps4fw = fwVersion.replace('.','');
    } else {
      document.getElementById('PS4FW').textContent = `PS4 FW: ${fwVersion || 'Unknown'} | Incompatible`;
      document.getElementById('PS4FW').style.color = 'red';

      elementsToHide.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });
    }

    document.title = "PSFree | " + fwVersion
  } else {
    platform = 'Unknown platform';

    if (/Android/.test(userAgent)) platform = 'Android';
    else if (/iPhone|iPad|iPod/.test(userAgent)) platform = 'iOS';
    else if (/Macintosh/.test(userAgent)) platform = 'MacOS';
    else if (/Windows/.test(userAgent)) platform = 'Windows';
    else if (/Linux/.test(userAgent)) platform = 'Linux';

    document.getElementById('PS4FW').textContent = `You're not on a PS4, platform: ${platform}`;
    document.getElementById('PS4FW').style.color = 'red';

    elementsToHide.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }
}

function checksettings() {
  if (localStorage.getItem('HEN')) {
    menuBtns.forEach(el => {
      el.onmouseover = () => el.style.backgroundColor = '#00F0FF';
      el.onmouseout = () => el.style.backgroundColor = '';
    });

    psBtns.forEach(el => {
      el.onmouseover = () => {
      el.style.boxShadow = '0 0px 48px #00F0FF, 0 0px 10px #000c';
        const svg = el.querySelector('svg');
        if (svg) svg.style.fill = '#00F0FF';
      };
      el.onmouseout = () => {
        el.style.boxShadow = '';
        const svg = el.querySelector('svg');
        if (svg) svg.style.fill = '';
      };
    });

    plsbtn.forEach(btn => {
      btn.style.borderColor = '#00F0FF';
      btn.addEventListener('mouseenter', () => {
        btn.style.backgroundColor = '#00F0FF';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.backgroundColor = ''; 
      });
    });

    document.getElementById('console').style.borderColor = '#00F0FF';
    document.getElementById('header-title').style.borderColor = '#00F0FF';
    document.getElementById('header-title').style.textShadow = '0px 0px 15px #00F0FF';
    
    const containers = document.querySelectorAll('.button-container');
    containers.forEach(container => {
      container.style.borderColor = '#00F0FF';
    });
  } else {
    menuBtns.forEach(el => {
      el.onmouseover = () => el.style.backgroundColor = '#FFB84D';
      el.onmouseout = () => el.style.backgroundColor = '';
    });

    psBtns.forEach(el => {
      el.onmouseover = () => {
        el.style.boxShadow = '0 0px 48px #FFB84D, 0 0px 10px #000c';
        const svg = el.querySelector('svg');
        if (svg) svg.style.fill = '#FFB84D';
      };
      el.onmouseout = () => {
        el.style.boxShadow = '';
        const svg = el.querySelector('svg');
        if (svg) svg.style.fill = '';
      };
    });

    plsbtn.forEach(btn => {
      btn.style.borderColor = '#FFB84D';
      btn.addEventListener('mouseenter', () => {
        btn.style.backgroundColor = '#FFB84D';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.backgroundColor = '';
      });
    });

    document.getElementById('console').style.borderColor = '#FFB84D';
    document.getElementById('header-title').style.borderColor = '#FFB84D';
    document.getElementById('header-title').style.textShadow = '0px 0px 15px #FFB84D';
    document.getElementById('button-container').style.borderColor = '#FFB84D';

    const containers = document.querySelectorAll('.button-container');
    containers.forEach(container => {
      container.style.borderColor = '#FFB84D';
    });
  }
}

function choosejb(hen) {
  if (hen === 'HEN') {
    localStorage.removeItem('GoldHEN');
    localStorage.setItem('HEN', 1);
  } else if (hen === 'GoldHEN') {
    localStorage.removeItem('HEN');
    localStorage.setItem('GoldHEN', 1);
  }
  checksettings();
}

function showpayloads() {
  let payloadsBtn = document.getElementById('payloadsbtn');
  let payloadsPage = document.getElementById('payloads-page');
  let jailbreakPage = document.getElementById('jailbreak-page');
  let PS4FW = document.getElementById('PS4FW');
  let storageLang = localStorage.getItem('language');
  
  if (!payloadsBtn.classList.contains('active')){
    jailbreakPage.style.display = 'none';
    PS4FW.style.display = 'none';
    payloadsPage.style.display = 'block';
    if (storageLang == 'en') payloadsBtn.textContent = 'Jailbreak';
    if (storageLang == 'ar') payloadsBtn.textContent = 'التهكير';
    localStorage.setItem('visibleDiv', 'payloads-page');
    payloadsBtn.classList.add('active');
  }else{
    jailbreakPage.style.display = 'block';
    PS4FW.style.display = 'flex';
    payloadsPage.style.display = 'none';
    if (storageLang == 'en') payloadsBtn.textContent = 'Payloads';
    if (storageLang == 'ar') payloadsBtn.textContent = 'الإضافات';
    localStorage.setItem('visibleDiv', 'jailbreak-page');
    payloadsBtn.classList.remove('active');
  }
  CheckFW();
}

function showtoolspayloads() {
  document.getElementById('payloads-linux').style.display = 'none';
  document.getElementById('payloads-game').style.display = 'none';
  document.getElementById('payloads-tools').style.display = 'block';
}

function showgamepayloads() {
  document.getElementById('payloads-linux').style.display = 'none';
  document.getElementById('payloads-game').style.display = 'block';
  document.getElementById('payloads-tools').style.display = 'none';
}

function showlinuxpayloads() {
  document.getElementById('payloads-linux').style.display = 'block';
  document.getElementById('payloads-game').style.display = 'none';
  document.getElementById('payloads-tools').style.display = 'none';
}

function loadjbflavor() {
  const savedValue = localStorage.getItem('selectedHEN');
  if (savedValue) {
    const radio = document.querySelector(`input[name="hen"][value="${savedValue}"]`);
    if (radio) {
      radio.checked = true;
    }
  }
}

function savejbflavor() {
  const radios = document.querySelectorAll('input[name="hen"]');
  radios.forEach(radio => {
    if (radio.checked) {
      localStorage.setItem('selectedHEN', radio.value);
    }
  });
}

function savelanguage() {
  const radios = document.querySelectorAll('input[name="language"]');
  radios.forEach(radio => {
    if (radio.checked) {
      localStorage.setItem('language', radio.value);
    }
  });
}

function loadlanguage(){
  var language = localStorage.getItem('language');
  if (language == null) document.querySelector('input[name=language][value="en"]').checked = true;
  document.querySelector('input[name="language"][value="' + language + '"').checked = true;
}

function loadajbsettings(){
  if (savedaj !== null) {
    ckbaj.checked = savedaj === 'true';
    onCheckboxChange(ckbaj.checked);
  }

  if (savedc !== null){
    ckbdc.checked = savedc === 'true';
    onCheckboxChange(ckbdc.checked);
  }

  if (ckbaj.checked) {
    if (sessionStorage.getItem('jbsuccess')) {
      console.log('Aleardy jailbroken !');
    } else {
      document.getElementById('jailbreak').style.display = 'none';
      document.getElementById('loader').style.display = 'flex';
      setTimeout(() => {
        jailbreak();
      }, 3000);
    }
  }

  if (ckbdc.checked) {
    document.getElementById('DebugConsole').style.display  = 'flex';
  } else {
    document.getElementById('DebugConsole').style.display = 'none';
  }

  if (isHttps()) {
    const btn1 = document.getElementById('generate-cache-btn');
    const btn2 = document.getElementById('update-exploit');
    if (btn1) btn1.style.display = 'none';
    if (btn2) btn2.style.display = 'none';
  }

  if (visibleDiv === 'jailbreak-page') {
    document.getElementById('jailbreak-page').style.display = 'block';
    document.getElementById('PS4FW').style.display = 'flex';
    document.getElementById('payloads-page').style.display = 'none';
    document.getElementById('payloadsbtn').textContent = 'Payloads';
  } else {
    document.getElementById('jailbreak-page').style.display = 'none';
    document.getElementById('PS4FW').style.display = 'none';
    document.getElementById('payloads-page').style.display = 'block';
    document.getElementById('payloadsbtn').textContent = 'Jailbreak';
    localStorage.setItem('visibleDiv', 'payloads-page');
  }
}

async function jailbreak() {
  try {
    document.getElementById('jailbreak').style.display = 'none';
    document.getElementById('loader').style.display = 'flex';
    const modules = await loadMultipleModules([
      '../payloads/Jailbreak.js',
      '../psfree/alert.mjs'
    ]);
    console.log("All modules are loaded!");
    const JailbreakModule = modules[0];

    if (localStorage.getItem('HEN')) {
      if (JailbreakModule && typeof JailbreakModule.HEN === 'function') {
          JailbreakModule.HEN(ps4fw);
      } else {
          console.error("HEN function not found in Jailbreak.js module");
      }
    } else if (localStorage.getItem('GoldHEN')) {
      if (JailbreakModule && typeof JailbreakModule.GoldHEN === 'function') {
          JailbreakModule.GoldHEN();
      } else {
          console.error("GoldHEN function not found in Jailbreak.js module");
      }
    } else {
      if (JailbreakModule && typeof JailbreakModule.GoldHEN === 'function') {
          JailbreakModule.GoldHEN();
      } else {
          console.error("GoldHEN function not found in Jailbreak.js module");
      }
    }
  } catch (e) {
    console.error("Failed to jailbreak:", e);
  }
}

async function binloader() {
  try {
    sessionStorage.setItem('binloader', 1);
    const modules = await loadMultipleModules([
      '../psfree/alert.mjs'
    ]);
    console.log("All modules are loaded!");

    const goldhenModule = modules[0];
    if (goldhenModule && typeof goldhenModule.runBinLoader === 'function') {
      goldhenModule.runBinLoader();
    } else {
      console.error("GoldHEN function not found in GoldHEN.js module");
    }
  } catch (e) {
    console.error("Failed to jailbreak:", e);
  }
}

async function Loadpayloads(payload) {
  try {
    let modules;
    sessionStorage.removeItem('binloader');
    if (isHttps()) {
      modules = await loadMultipleModules([
        '../payloads/payloads.js',
        '../psfree/alert.mjs'
      ]);
      console.log("All modules are loaded!");
    } else {
      modules = await loadMultipleModules([
        '../payloads/payloads.js'
      ]);
      console.log("All modules are loaded!");
    }

    const payloadModule = modules[0];
    if (payloadModule && typeof payloadModule[payload] === 'function') {
      payloadModule[payload]();
    } else {
      console.error(`${payload} function not found in payloads.js module`);
    }
  } catch (e) {
    console.error(`Failed to load ${payload}:`, e);
  }
}

function loadsettings() {
  loadajbsettings();
  loadjbflavor();
  checksettings();
  CheckFW();
  setLanguage(localStorage.getItem('language'))
  loadlanguage();
}

function onCheckboxChange(checked) {
  if (checked) {
    console.log('Checkbox is checked!');
  } else {
    console.log('Checkbox is unchecked!');
  }
}

// Language
// Language Strings
const languages = {
  "en": {
    "menuPayloads": "Payloads",
    "menuForceCache": "Force-Cache",
    "menuUpdateExploit": "Update-Exploit",
    "menuSettings": "Settings",
    "menuAbout": "About",
    "ps4FwSupported": `PS4 FW: ${ps4FwVersion} | Compatible`,
    "ps4FwUnsupported": `PS4 FW: ${ps4FwVersion} | Incompatible`,
    "notPs4": `You're not on a PS4, platform: ${platform}`,
    "payloadsToolsHeader": "Tools",
    "payloadsGameHeader": "Game",
    "payloadsLinuxHeader": "Linux",
    "binLoader": "Bin-Loader",
    "appDumper": "App-Dumper",
    "kernelDumper": "Kernel-Dumper",
    "ps4DumperVtx": "PS4-Dumper-VTX",
    "app2Usb": "App2USB",
    "disableUpdates": "Disable-Updates",
    "enableUpdates": "Enable-Updates",
    "ftp": "FTP",
    "historyBlocker": "History-Blocker",
    "kernelClock": "Kernel-Clock",
    "orbisToolbox": "Orbis-Toolbox",
    "ps4Debug": "PS4-Debug",
    "toDex": "ToDex",
    "toDev": "ToDev",
    "toKratos": "ToKratos",
    "toCex": "ToCex",
    "backupDb": "Backup-DB",
    "restoreDb": "Restore-DB",
    "rifRenamer": "RIF-Renamer",
    "exitIdu": "ExitIDU",
    "disableAslr": "Disable-ASLR",
    "moduleDumper": "Module-Dumper",
    "webrRte": "WebRTE",
    "permanentUart": "Permanent-UART",
    "pupDecrypt": "PUP-Decrypt",
    "linux1gb": "Linux-1GB",
    "linux2gb": "Linux-2GB",
    "linux3gb": "Linux-3GB",
    "linux4gb": "Linux-4GB",
    "linux5gb": "Linux-5GB",
    "debugConsoleHeader": "Debug Console",
    "aboutPsfreeHeader": "About PSFree",
    "aboutVersion": "Version: 1.5.1",
    "aboutDescription": "A simple web interface for PS4 jailbreak.",
    "closeButton": "Close",
    "settingsPsfreeHeader": "Settings PSFree",
    "ps4FirmwaresSupportedHeader": "PS4 Firmwares supported",
    "chooseYourFlavorHeader": "Choose your flavor",
    "autoJailbreakText": "Auto-Jailbreak",
    "enableDebugConsoleText": "Enable Debug Console",
    "languageHeader": "Language",
    "englishOption": "English",
    "arabicOption": "Arabic",
    "installPsfreeLite": "Install PSFree-Lite",
    "arabicOption": "Arabic",
    "englishOption": "English"
  },
  "ar": {
    "menuPayloads": "الإضافات",
    "menuForceCache": "فرض التخزين المؤقت",
    "menuUpdateExploit": "تحديث الثغرة",
    "menuSettings": "الإعدادات",
    "menuAbout": "حول",
    "ps4FwSupported": `بلايستايشن 4 إصدار: ${ps4FwVersion} | متوافق`,
    "ps4FwUnsupported": `بلايستايشن 4 إصدار ${ps4FwVersion || 'غير معروف'} | غير متوافق`,
    "notPs4": `أنت لست على جهاز بلايستايشن 4. المنصة: ${platform == undefined ? "غير معروفة" : platform}`,
    "payloadsToolsHeader": "الأدوات",
    "payloadsGameHeader": "الألعاب",
    "payloadsLinuxHeader": "لينكس",
    "binLoader": "محمل ملفات bin",
    "appDumper": "ناسخ التطبيقات",
    "kernelDumper": "ناسخ الكيرنال",
    "ps4DumperVtx": "ناسخ PS4-VTX",
    "app2Usb": "تطبيق إلى USB",
    "disableUpdates": "تعطيل التحديثات",
    "enableUpdates": "تفعيل التحديثات",
    "ftp": "FTP",
    "historyBlocker": "مانع السجل",
    "kernelClock": "كسر سرعة النواة",
    "orbisToolbox": "صندوق أدوات أوربيس",
    "ps4Debug": "ps4Debug",
    "toDex": "toDex",
    "toDev": "toDev",
    "toKratos": "إلى كراتوس",
    "toCex": "إلى Cex",
    "backupDb": "نسخ قاعدة البيانات احتياطيًا",
    "restoreDb": "استعادة قاعدة البيانات",
    "rifRenamer": "إعادة تسمية ملفات RIF",
    "exitIdu": "الخروج من IDU",
    "disableAslr": "تعطيل ASLR",
    "moduleDumper": "ناسخ الإضافة",
    "webrRte": "WebRTE",
    "permanentUart": "UART دائم",
    "pupDecrypt": "فك تشفير PUP",
    "linux1gb": "لينكس-1 جيجابايت",
    "linux2gb": "لينكس-2 جيجابايت",
    "linux3gb": "لينكس-3 جيجابايت",
    "linux4gb": "لينكس-4 جيجابايت",
    "linux5gb": "لينكس-5 جيجابايت",
    "debugConsoleHeader": "وحدة تحكم",
    "aboutPsfreeHeader": "حول PSFree",
    "aboutVersion": "الإصدار: 1.5.1",
    "aboutDescription": "واجهة ويب بسيطة لجيلبريك PS4.",
    "closeButton": "إغلاق",
    "settingsPsfreeHeader": "إعدادات PSFree",
    "ps4FirmwaresSupportedHeader": "إصدارات PS4 المدعومة",
    "chooseYourFlavorHeader": "اختر نوع الـ HEN",
    "autoJailbreakText": "تهكير تلقائي",
    "enableDebugConsoleText": "تمكين وحدة تحكم",
    "languageHeader": "اللغة",
    "installPsfreeLite": "تثبيت PSFree-Lite",
    "arabicOption": "العربية",
    "englishOption": "الإنجليزية"
  }
};
var language = localStorage.getItem('language');

let currentLanguage = language == null ? "en": language; // Default language

// Function to update the UI with the selected language
function setLanguage(lang) {
    currentLanguage = lang;
    const strings = languages[currentLanguage];

    if (!strings) {
        console.error(`Language strings for '${lang}' not found.`);
        return;
    }

    // Update Floating Menu Buttons
    document.getElementById('payloadsbtn').textContent = strings.menuPayloads;
    document.getElementById('generate-cache-btn').textContent = strings.menuForceCache;
    document.getElementById('update-exploit').textContent = strings.menuUpdateExploit;
    document.getElementById('settings-btn').textContent = strings.menuSettings;
    document.getElementById('about-btn').textContent = strings.menuAbout;

    // Update PS4FW Message
    if (ps4FwVersion != undefined && Number(ps4FwVersion) <= 9.6){
      // For some reason ps4FwVersion and platform variables shows undefined even tho it is.
      let message = strings.ps4FwSupported.replace("undefined", ps4FwVersion)
      document.getElementById("PS4FW").textContent = message;
      document.getElementById("PS4FW").style.color = "green";
    }else if (ps4FwVersion != undefined && Number(ps4FwVersion) > 9.6){
      let message = strings.ps4FwUnsupported.replace(undefined, ps4FwVersion);
      document.getElementById("PS4FW").textContent = message;
      document.getElementById("PS4FW").style.color = "red";
    }else {
      let message;
      if (currentLanguage == "en") message = strings.notPs4.replace("undefined", platform);
      if (currentLanguage == "ar") message = strings.notPs4.replace("غير معروفة", platform);
      document.getElementById("PS4FW").textContent = message;
      document.getElementById("PS4FW").style.color = "red";
    }

    // Update Jailbreak Button Title
    document.getElementById('jailbreak').title = strings.jailbreakButtonTitle;

    // Update Payloads Headers
    document.getElementById('floating-tools').textContent = strings.payloadsToolsHeader;
    document.getElementById('floating-games').textContent = strings.payloadsGameHeader;
    document.getElementById('floating-linux').textContent = strings.payloadsLinuxHeader;
    document.getElementById('tools1').textContent = strings.payloadsToolsHeader;
    document.getElementById('tools2').textContent = strings.payloadsGameHeader;
    document.getElementById('tools3').textContent = strings.payloadsLinuxHeader;


    // Update Payload Buttons (Tools)
    const toolButtons = document.querySelector('#payloads-tools .button-container').children;
    const toolButtonMap = {
        "binloader": "binLoader",
        "load_AppDumper": "appDumper",
        "load_KernelDumper": "kernelDumper",
        "load_VTXDumper": "ps4DumperVtx",
        "load_App2USB": "app2Usb",
        "load_DisableUpdates": "disableUpdates",
        "load_EnableUpdates": "enableUpdates",
        "load_FTP": "ftp",
        "load_HistoryBlocker": "historyBlocker",
        "load_KernelClock": "kernelClock",
        "load_Orbis": "orbisToolbox",
        "load_PS4Debug": "ps4Debug",
        "load_ToDex": "toDex",
        "load_ToDev": "toDev",
        "load_ToKratos": "toKratos",
        "load_ToCex": "toCex",
        "load_BackupDB": "backupDb",
        "load_RestoreDB": "restoreDb",
        "load_RIFRenamer": "rifRenamer",
        "load_ExitIDU": "exitIdu",
        "load_DisableASLR": "disableAslr",
        "load_ModuleDumper": "moduleDumper",
        "load_WebrRTE": "webrRte",
        "load_PermanentUART": "permanentUart",
        "load_PUPDecrypt": "pupDecrypt"
    };
    for (let i = 0; i < toolButtons.length; i++) {
        const button = toolButtons[i];
        const key = button.id || button.dataset.func; // Use id first, then data-func
        if (key && toolButtonMap[key]) {
            button.textContent = strings[toolButtonMap[key]];
        }
    }

    // Update Payload Buttons (Linux)
    const linuxButtons = document.querySelector('#payloads-linux .button-container').children;
    const linuxButtonMap = {
        "load_Linux": "linux1gb",
        "load_Linux2gb": "linux2gb",
        "load_Linux3gb": "linux3gb",
        "load_Linux4gb": "linux4gb",
        "load_Linux5gb": "linux5gb"
    };
    for (let i = 0; i < linuxButtons.length; i++) {
        const button = linuxButtons[i];
        const key = button.dataset.func;
        if (key && linuxButtonMap[key]) {
            button.textContent = strings[linuxButtonMap[key]];
        }
    }

    // Update Debug Console
    document.querySelector('#DebugConsole h3').textContent = strings.debugConsoleHeader;

    // Update About Popup
    document.querySelector('#about-popup h2').textContent = strings.aboutPsfreeHeader;
    document.querySelector('#about-popup p:nth-of-type(1)').textContent = strings.aboutVersion;
    document.querySelector('#about-popup p:nth-of-type(2)').textContent = strings.aboutDescription;
    document.getElementById('close-about').textContent = strings.closeButton;

    // Update Settings Popup
    document.querySelector('#settings-popup h2').textContent = strings.settingsPsfreeHeader;
    document.querySelector('#PS4FWOK h3').textContent = strings.ps4FirmwaresSupportedHeader;
    document.querySelector('#choosejb h3').textContent = strings.chooseYourFlavorHeader;
    document.getElementById('autojbchkb').querySelector('p').textContent = strings.autoJailbreakText;
    document.getElementById('debugconsolechkb').querySelector('p').textContent = strings.enableDebugConsoleText;
    document.getElementById('chooselang').querySelector('h3').textContent = strings.languageHeader;
    document.getElementById('close-settings').textContent = strings.closeButton;
    document.getElementById('arLang').textContent = strings.arabicOption;
    document.getElementById('enLang').textContent = strings.englishOption;
    // if (document.getElementById('install-psfrl')) { // Check if the element exists
    //     document.getElementById('install-psfrl').textContent = strings.installPsfreeLite;
    // }

    // Set text direction based on language
    const psfreetop = document.getElementById("header");
    document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    if (document.body.dir == 'rtl'){
      psfreetop.style.justifyContent = "flex-end";
      document.getElementById("DebugConsole").querySelector('h3').style.right = '5%';
      document.getElementById("DebugConsole").querySelector('h3').style.left = 'inherit';

    }else{
      psfreetop.style.justifyContent = "flex-start";
        document.getElementById("DebugConsole").querySelector('h3').style.right = 'inherit';
      document.getElementById("DebugConsole").querySelector('h3').style.left = '5%';
    }
    
}