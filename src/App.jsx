import { useState, useRef, useEffect } from 'react';

//ONLY LOOK IF YOU HAVE TO >< passwords:

//1. A photo dated "Summer 1998" (clue: 1998)
//2. An IT memo mentioning "512MB RAM" (clue: 512)
//3. A diary entry about a "56k modem" (clue: 56)
//4. System files mentioning "Windows 1995" (clue: 1995)
//5. 1995 + 56 + 1998 = the admin password
// Also contains a secret file with the password: LLAMA
// not neccessary to the admin file


const FOLDER_STRUCTURE = {
  mycomputer: {
    name: 'My Computer',
    type: 'folder',
    locked: false,
    password: null,
    items: {
      programfiles: { name: 'Program Files', type: 'folder', locked: false, password: null, items: {
        internetexplorer: { name: 'Internet Explorer', type: 'file', content: 'INTERNET EXPLORER 5.0\n\nThe dominant browser of the late 90s!\n\nFun Facts:\n- Internet Explorer 5 released in 1999\n- 95% market share at its peak\n- Later became the target of jokes for being slow\n- Had fierce rivalry with Netscape Navigator\n\nIE 5 features:\n- Better CSS support\n- DirectX support\n- ActiveX controls\n- Still crashes frequently!\n\nPassword clue hidden: The year IE5 was released = 1999' },
        winamp: { name: 'Winamp', type: 'file', content: 'WINAMP 2.0 - IT REALLY WHIPS THE LLAMA\'S ASS!\n\nThe ICONIC media player of the 90s!\n\nFun Facts:\n- Released in 1997\n- Famous tagline: "It really whips the llama\'s ass!"\n- Had customizable skins (thousands available)\n- Dominated music playback until iPod\n- That visualization mode was HYPNOTIC\n- Used to play MP3s (which were illegal to share!)\n\nWinamp was SO good that:\n- People still use it today (yes, it\'s still alive!)\n- The source code was open-sourced in 2013\n- There\'s a modern version: WinampAI\n\nEaster Egg: Type "LLAMA" as password for secret folder!' }
      }},
      mydocs: { name: 'My Documents', type: 'folder', locked: false, password: null, items: {
        photos1998: { name: 'Photos_1998', type: 'folder', locked: false, password: null, items: {
          photo1: { name: 'Summer_Vacation.txt', type: 'file', content: 'Had an amazing summer in 1998! Beach trip was unforgettable. My friend brought his new digital camera and took 500 photos - way more than our old film cameras could handle!\n\nDate: June 1998\n\nFun Fact: A single digital photo from this era was 200-500KB. Today, a smartphone photo is 3-5MB!\n\n[CLUE #1: The year - 1998]' }
        }},
        workfiles: { name: 'Work_Files', type: 'folder', locked: false, password: null, items: {
          memo: { name: 'Important_Memo.txt', type: 'file', content: 'TO: All Staff\nFROM: IT Department\nRE: New Computer Upgrades\n\nWe are upgrading all machines to 512MB RAM. This is cutting edge technology!\n\nPlease note your machine ID number:\nMy Machine ID: 512\n\nFun Fact: 512MB was considered INSANE back then. A typical game took 500MB-1GB!\n\n[CLUE #2: The amount of RAM - 512]' }
        }},
        diary: { name: 'Diary.txt', type: 'file', content: 'Dear Diary,\n\nToday I finally got the internet working! My new 56k modem is BLAZING fast. It only took 10 minutes to download a single image. Can you believe it?\n\nI spent hours on AOL chat rooms. My screen name is CoolDude1995.\n\nFun Fact: 56k was the theoretical maximum. Real speeds were 40-50KB/s. Downloading a 10MB game took 30+ minutes!\n\n[CLUE #3: Modem speed - 56]' },
        finances: { name: 'Finances', type: 'folder', locked: true, password: '1998', items: {
          bills: { name: 'Monthly_Bills.txt', type: 'file', content: 'Internet Bill: $29.99/month\nElectricity: $45.23\nPhone: $35.00\nAOL Subscription: $9.99\n\nTotal: $119.21\n\nFun Fact: $29.99/month for internet was STANDARD in the 90s. We paid monthly for limited hours!\n\nNote: I paid for premium AOL access in 1995\n\n[CLUE #4: The year I started - 1995]' }
        }},
        secretfolder: { name: 'Secret_Gaming_Stash', type: 'folder', locked: true, password: 'LLAMA', items: {
          readme: { name: 'GameGuides.txt', type: 'file', content: 'GAMING IN THE 90S - SECRET COLLECTION\n\nFavorite Games:\n\n1. DOOM (1993)\n   - The game that made FPS genre\n   - Required 4MB RAM (huge!)\n   - People played it over dial-up modems (lag was BRUTAL)\n   - Shareware model made it free to try\n\n2. STARCRAFT (1998)\n   - Best RTS game ever made\n   - Still competitive esports today\n   - Koreans treat it like soccer\n\n3. HALF-LIFE (1998)\n   - Best FPS campaign ever\n   - Led to Counter-Strike mod\n   - Counter-Strike became HUGE esports title\n\n4. DIABLO (1996)\n   - Addictive hack-and-slash\n   - "Just one more run..."\n   - Blizzard\'s masterpiece\n\n5. POKEMON RED/BLUE (1996)\n   - Game Boy color was needed to see it\n   - Trading between Game Boys was social\n   - People still talk about it\n\n6. THE LEGEND OF ZELDA: OCARINA OF TIME (1998)\n   - First 3D Zelda\n   - STILL considered one of greatest games ever\n   - N64 was amazing for the time\n\n7. FINAL FANTASY VII (1997)\n   - 3 discs!\n   - Aerith\'s death scene shocked everyone\n   - STILL gets remade and remastered\n\nWinamp Easter Egg worked! Nice find!' }
        }}
      }},
      windows: { name: 'Windows', type: 'folder', locked: false, password: null, items: {
        readme: { name: 'System_Info.txt', type: 'file', content: 'WINDOWS 95 SYSTEM INFORMATION\n\nOperating System: Windows 95\nRelease Date: August 24, 1995\nRAM: 64MB\nProcessor: Pentium 166MHz\nHard Drive: 2GB (WOW!)\n\nFun Fact: Windows 95 was revolutionary. It introduced the Start button and "Start Me Up" was the theme song! It was a cultural phenomenon.\n\n[CLUE #5: Windows release year - 1995]' },
        system32: { name: 'System32', type: 'folder', locked: true, password: '56512', items: {
          config: { name: 'config.sys', type: 'file', content: 'DOS=HIGH,UMB\nDEVICE=C:\\DOS\\HIMEM.SYS\nDEVICE=C:\\DOS\\EMM386.EXE NOEMS\nFILES=30\nBUFFERS=20\n\nThis file controls Windows startup. Do not edit!\n\nFun Fact: CONFIG.SYS was crucial for DOS/Windows 3.1 systems. It allocated memory and loaded drivers before Windows could even start!\n\n[CLUE #6: Combine modem (56) + RAM (512) = 56512]' }
        }}
      }},
      games: { name: 'Games', type: 'folder', locked: false, password: null, items: {
        minesweeper: { name: 'Minesweeper.exe', type: 'game', gameType: 'minesweeper', content: '[GAME] Minesweeper\n\nFun Fact: Minesweeper was first released in 1989 and became famous with Windows 3.1. This classic game taught millions about probability and logic!\n\nClick to play!' },
        snake: { name: 'Snake.exe', type: 'game', gameType: 'snake', content: '[GAME] Classic Snake\n\nThe legendary mobile game! Score 100+ to unlock a bonus clue!\n\nClick to play!' },
        secretfolder: { name: 'Secret_Folder', type: 'folder', locked: true, password: '1995561998', items: {
          hidden: { name: 'Hidden_Truth.txt', type: 'file', content: 'YOU\'VE FOUND THE FINAL SECRET!\n\nCongratulations! You\'ve discovered the secret folder. This contains information about the original admin password.\n\nThe admin was created in 1995.\nThe modem speed was 56k.\nThe year I took summer photos: 1998\nCombined: 1995 + 56 + 1998 = 1995561998\n\nFun Fact: This password represents the three key moments in my computing timeline!\n\n[FINAL PASSWORD: 1995561998]' }
        }}
      }}
    }
  },

  //desktop stuff
  mydocs: {
    name: 'My Documents',
    type: 'folder',
    locked: false,
    password: null,
    item: {}
  },

  recycle: {
    name: 'Recycle Bin',
    type: 'folder',
    locked: false,
    password: null,
    items: {
      deleted1: { name: 'DeletedFile_Secret.txt', type: 'file', content: 'DELETED DOCUMENT - RECOVERED FROM RECYCLE BIN\n\nI found an old backup of my passwords!\n\nEmail: user@aol.com\nAOL Password: NotThisOne\nComputer built: 1996\n\nThe real password includes the build year: 1996\n\nFun Fact: Deleting files didn\'t actually delete them in the 90s! They stayed in Recycle Bin until emptied. People would recover "deleted" files all the time.\n\n[ALTERNATE CLUE: Computer build year - 1996]' },
      oldbackups: { name: 'OldBackups', type: 'folder', locked: false, password: null, items: {
        backup1: { name: 'Backup_1997.txt', type: 'file', content: 'BACKUP FROM 1997\n\nMy computer specifications when I first got it:\n- Intel Pentium 200MHz processor\n- 32MB of RAM (seemed like PLENTY!)\n- 1GB Hard Drive\n- 56k Modem\n- CDROM drive (cutting edge!)\n\nFun Fact: A 1GB hard drive was considered MASSIVE in 1997. Today a single photo is 3-5MB! A typical game today is 50-100GB.\n\nAlso: CDROM drives could read data at 32x speed - this was BLAZINGLY FAST compared to floppy disks!\n\n[CLUE: Original RAM amount - 32]' }
      }}
    }
  },
  inbox: {
    name: 'Inbox',
    type: 'folder',
    locked: false,
    password: null,
    items: {
      aol: { name: 'AOL_Welcome.eml', type: 'file', content: 'FROM: AOL Customer Service\nSUBJECT: Welcome to AOL!\nDATE: January 1, 1995\n\nWelcome! You are now part of the AOL family!\n\nWe\'re excited to bring you online. Your AOL account includes:\n- 5 hours per month of internet access\n- Unlimited email\n- Access to AOL chat rooms\n- Exclusive AOL content\n- Classic greeting: "You\'ve Got Mail!"\n\nFun Fact: AOL was THE gateway to the internet for most Americans in the 90s. Before broadband, AOL was king! In 2000, AOL merged with Time Warner for $165 BILLION - the biggest merger in history at the time.\n\nYour account was created in: 1995\n\n[CLUE: The year everything started - 1995]' },
      birthday: { name: 'Birthday_Message.eml', type: 'file', content: 'FROM: Mom\nSUBJECT: Happy Birthday!\nDATE: March 15, 1999\n\nHappy Birthday sweetheart!\n\nI can\'t believe you\'re turning 16 today! Time flies. I got you the new computer you wanted - it has 128MB of RAM!\n\nP.S. - I set the admin password to something special from this year and your past.\n\nFun Fact: Birthday emails in the 90s were special because internet access cost money! Your mom paying for online time to email you was LOVE.\n\nLove,\nMom\n\n[CLUE: Admin password relates to this year and your history - 1999]' },
      netscape: { name: 'Netscape_Alert.eml', type: 'file', content: 'FROM: Netscape Navigator Support\nSUBJECT: New Version Available!\nDATE: May 1998\n\nNetscape Navigator 4.0 is here!\n\nThe internet is evolving fast. In 1998, web speeds reached 56k!\n\nFun Fact: Netscape was THE browser in the 90s, competing with Internet Explorer. This was the beginning of the "Browser Wars"! Netscape eventually lost and was acquired by AOL.\n\nTIP: Your Internet connection speed from that era: 56k\n\n[CLUE: Connection speed - 56]' },
      spam: { name: 'Nigeria_Prince.eml', type: 'file', content: 'FROM: unknown@unknown.com\nSUBJECT: YOU HAVE WON!!!\n\nCongratulations!\n\nYou have been selected to receive $5,000,000 from a dying Nigerian prince!\n\nSend us your bank details and we will transfer the money!\n\nFun Fact: This spam email became an ICON of the 90s internet. The "Nigerian Prince" scam is still around today, 30+ years later! It\'s one of the oldest internet scams.\n\nNobody fell for this... right?' }
    }
  },

  //admin password 
  admin: {
    name: 'Admin',
    type: 'folder',
    locked: true,
    password: '1995561998',
    items: {
      systemadmin: { name: 'Administrator_Access.txt', type: 'file', content: 'CONGRATULATIONS!\n\nYou have successfully gained ADMIN access!\n\n=== ADMIN CREDENTIALS ===\nUsername: ADMINISTRATOR\nPassword: ████████████\nAccess Level: FULL SYSTEM\nPrivileges: UNRESTRICTED\n\n=== SYSTEM STATUS ===\nOS: Windows 95\nStatus: ACTIVE\nSecurity: COMPROMISED (by you!)\n\n=== GAME COMPLETE ===\n\nYou have successfully unlocked all the secrets of this 90s computer!\n\nClues you collected:\n1. Summer vacation year: 1998\n2. Modem speed: 56k\n3. RAM upgrade: 512MB\n4. Windows release: 1995\n5. System password: 56512\n6. Secret password: 1995561998\n7. Easter Egg: LLAMA (Winamp reference!)\n\nThanks for playing the ultimate 90s nostalgia experience!\n' },
      secretfiles: { name: 'Secret_Files', type: 'folder', locked: false, password: null, items: {
        readme: { name: 'README.txt', type: 'file', content: 'WELCOME TO ADMIN PANEL\n\nYou are now viewing restricted files. These are the internal system files that control this computer.\n\n=== FUN FACTS ABOUT 90S TECH ===\n\n1. WINDOWS 95 (August 24, 1995)\n   - First Windows with Start menu\n   - Theme song: "Start Me Up" by Rolling Stones ($3 million to license!)\n   - 24 million copies sold in first 4 years\n   - Changed computing forever\n   - Shipped with 3.1GB of software\n\n2. INTERNET SPEEDS & MODEMS\n   - 56k modem: Peak dial-up speed in late 90s\n   - Download speed: ~7KB/s\n   - A 1MB file took ~2.5 minutes!\n   - Streaming video? Impossible!\n   - The noise! That modem handshake sound is iconic\n\n3. COMPUTER HARDWARE\n   - RAM: Started at 4MB (1990), went to 64MB, 128MB, 256MB\n   - Hard drives: 540MB was standard, 1GB was luxury, 2GB was crazy\n   - Processors: Pentium 166MHz to Pentium III (800MHz+)\n   - No SSDs, no USB ports, no built-in WiFi\n   - Cooling? Fans that sounded like jets!\n\n4. STORAGE MEDIA\n   - Floppy disks: 1.44MB (a single Windows update was 5 floppies!)\n   - Zip drives: 100MB (wow! ...until they failed and corrupted data)\n   - CD-Rs: Burning took 30+ minutes, might fail\n   - DVD didn\'t exist until 1997\n   - No cloud storage, NO BACKUP OPTIONS\n\n5. INTERNET SERVICES\n   - AOL ruled with 40 million users\n   - Dial-up connection made SCREAMING modem noises\n   - You had to CHOOSE between phone or internet\n   - Yahoo was the search engine (Google was just starting)\n   - Instant Messaging (AIM) was how teens communicated\n   - Chat rooms were the social media of the 90s\n\n6. FAMOUS MOMENTS\n   - 1995: Windows 95 launches, internet becomes mainstream\n   - 1998: Google founded, Netscape dies\n   - 1999: Y2K panic, people thought computers would break\n   - 1999: The Matrix, The Sixth Sense, peak 90s culture\n   - 2000: Dot-com bubble BURST, many internet companies failed\n\n7. THINGS WE DID IN THE 90S\n   - Typed "\\\\\\\\servername\\\\\\\\share" to access network drives\n   - Waited for images to load line-by-line\n   - Listened to entire conversations on dial-up tone\n   - Got kicked offline by family members needing the phone\n   - Rebooted constantly (Windows was UNSTABLE)\n   - Right-clicked to see file extensions (.exe, .txt, .avi)\n   - Played Snake on Nokia 3310 phones\n   - Burned CDs and labeled them with markers\n   - Made custom desktop wallpapers\n   - Used screensavers like Flying Toasters and Starfield\n\n8. THE SOUND OF THE 90s\n   - Windows 95 startup chime\n   - Modem handshake (screech-screech-beep-beep)\n   - "You\'ve Got Mail!" (AOL notification)\n   - dial-up tone (EEEEEEE-BEEEE-BEEEE)\n   - Windows error sound (ding!)\n   - CD-ROM drive sounds\n   - Hard drive clicking\n\n9. FAMOUS SOFTWARE\n   - Netscape Navigator (later died to Internet Explorer)\n   - Lotus 1-2-3 (Excel was the underdog)\n   - WordPerfect (Microsoft Word eventually won)\n   - Winamp ("it really whips the llama\'s ass!")\n   - Kazaa (peer-to-peer file sharing, before it was illegal)\n   - Limewire (file sharing, very illegal)\n\n10. Y2K - THE MILLENNIUM BUG\n    - Everyone thought computers would break on Jan 1, 2000\n    - Because dates were stored as 2-digit years (99 became 00)\n    - Governments spent BILLIONS fixing it\n    - Doomsday preppers bought generators\n    - It was all overhyped... nothing happened\n    - But the fixes were probably necessary anyway!\n\n=== YOU COMPLETED THE GAME ===\n\nYou\'ve journeyed through the nostalgia of 90s computing!\nYou discovered the passwords hidden in time.\nYou unlocked the secrets of the past.\nYou even found the Easter Eggs!\n\nWelcome to the Admin Panel, retro computing enthusiast!\n' }
      }}
    }
  }
};

export default function App() {
  const [windows, setWindows] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [clock, setClock] = useState('');
  const [draggedWindow, setDraggedWindow] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [passwordPrompt, setPasswordPrompt] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordAttempts, setPasswordAttempts] = useState({});
  const [gameState, setGameState] = useState('playing');
  const [showBootScreen, setShowBootScreen] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef(null);

  const desktopIcons = [
    { id: 'mycomputer', label: 'My Computer', icon: '💾' },
    { id: 'mydocs', label: 'My Documents', icon: '📁' },
    { id: 'recycle', label: 'Recycle Bin', icon: '🗑️' },
    { id: 'inbox', label: 'Inbox', icon: '📧' },
    { id: 'admin', label: 'Admin Panel', icon: '🔐' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setClock(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showBootScreen) {
      const timer = setTimeout(() => setShowBootScreen(false), 3000);
      playSound('boot');
      return () => clearTimeout(timer);
    }
  }, [showBootScreen]);

  //sounds (tempo)


  const playSound = (type) => {
    if (!audioRef.current) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

    if (type === 'boot') {
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } else if (type === 'error') {
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } else if (type === 'success') {
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  };

  const openWindow = (folderId, folderName, path = []) => {
    const folder = getFolder(folderId, path);
    
    if (folder?.locked && !folder?.unlocked) {
      setPasswordPrompt({
        folderId,
        folderName,
        path,
        attempts: passwordAttempts[`${folderId}-${path.join('-')}`] || 0
      });
      playSound('error');
      return;
    }

    const windowId = `window-${folderId}-${Date.now()}`;
    const newWindow = {
      id: windowId,
      folderId,
      label: folderName,
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 100,
      width: 600,
      height: 450,
      minimized: false,
      path,
    };

    setWindows([...windows, newWindow]);
    setSelectedIcon(null);
    playSound('boot');
  };

  const getFolder = (folderId, path = []) => {
    let current = FOLDER_STRUCTURE[folderId];
    for (let name of path) {
      const found = Object.values(current.items || {}).find(i => i.name === name);
      if (found) current = found;
    }
    return current;
  };

  const handlePasswordSubmit = (password) => {
    const key = `${passwordPrompt.folderId}-${passwordPrompt.path.join('-')}`;
    const folder = getFolder(passwordPrompt.folderId, passwordPrompt.path);
    const attempts = (passwordAttempts[key] || 0) + 1;

    if (password === folder.password) {
      setPasswordAttempts({ ...passwordAttempts, [key]: 0 });
      setPasswordPrompt(null);
      setPasswordInput('');
      
      if (passwordPrompt.folderId === 'admin' && password === '1995561998') {
        setGameState('won');
        playSound('success');
      } else {
        playSound('success');
      }
      
      openWindow(passwordPrompt.folderId, passwordPrompt.folderName, passwordPrompt.path);
    } else if (attempts >= 3) {
      setGameState('locked');
      setPasswordPrompt(null);
      playSound('error');
    } else {
      setPasswordAttempts({ ...passwordAttempts, [key]: attempts });
      setPasswordInput('');
      playSound('error');
    }
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id) => {
    setWindows(windows.map(w => w.id === id ? { ...w, minimized: true } : w));
  };

  const unminimizeWindow = (id) => {
    setWindows(windows.map(w => w.id === id ? { ...w, minimized: false } : w));
  };

  const handleDesktopIconDoubleClick = (id) => {
    const icon = desktopIcons.find(i => i.id === id);
    openWindow(id, icon.label, []);
  };

  const handleWindowMouseDown = (e, id) => {
    if (e.target.closest('.window-btn') || e.target.closest('.file-item')) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    
    setDraggedWindow(id);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (draggedWindow) {
        setWindows(windows.map(w => {
          if (w.id === draggedWindow) {
            return {
              ...w,
              x: e.clientX - dragOffset.x,
              y: e.clientY - dragOffset.y,
            };
          }
          return w;
        }));
      }
    };

    const handleMouseUp = () => {
      setDraggedWindow(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedWindow, dragOffset, windows]);

  if (showBootScreen) {
    return <BootScreen />;
  }

  if (gameState === 'locked') {
    return <BSOD />;
  }

  return (
    <div className="desktop" onClick={() => setContextMenu(null)}>
      <div className="desktop-content">
        {desktopIcons.map(icon => (
          <div
            key={icon.id}
            className={`desktop-icon ${selectedIcon === icon.id ? 'selected' : ''}`}
            style={{ left: '20px', top: `${20 + desktopIcons.indexOf(icon) * 80}px` }}
            onClick={() => setSelectedIcon(selectedIcon === icon.id ? null : icon.id)}
            onDoubleClick={() => handleDesktopIconDoubleClick(icon.id)}
          >
            <div className="icon-image">{icon.icon}</div>
            <div className="icon-label">{icon.label}</div>
          </div>
        ))}

        {windows.map(window => (
          !window.minimized && (
            <FileWindow
              key={window.id}
              window={window}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMouseDown={(e) => handleWindowMouseDown(e, window.id)}
              onOpenFolder={openWindow}
            />
          )
        ))}

        {passwordPrompt && (
          <PasswordDialog
            prompt={passwordPrompt}
            input={passwordInput}
            onInputChange={setPasswordInput}
            onSubmit={handlePasswordSubmit}
            onCancel={() => {
              setPasswordPrompt(null);
              setPasswordInput('');
            }}
            attempts={passwordAttempts[`${passwordPrompt.folderId}-${passwordPrompt.path.join('-')}`] || 0}
          />
        )}

        {gameState === 'won' && (
          <WinScreen />
        )}
      </div>

      <div className="taskbar">
        <div className="start-button">
          <div className="start-icon">⊞</div>
          Start
        </div>
        <div className="taskbar-apps">
          {windows.filter(w => w.minimized).map(w => (
            <div
              key={w.id}
              className="taskbar-app"
              onClick={() => unminimizeWindow(w.id)}
            >
              {w.label}
            </div>
          ))}
        </div>
        <div className="system-tray">
          <div className="clock">{clock}</div>
        </div>
      </div>
      
      <audio ref={audioRef} />
    </div>
  );
}

function BootScreen() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#000080',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '40px',
      color: 'white',
      fontFamily: 'Courier Prime, monospace',
      textAlign: 'center',
      fontSize: '14px',
      lineHeight: '1.8',
      animation: 'fadeInOut 3s ease-in-out'
    }}>
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
      
      <div style={{ fontSize: '20px' }}>
        Microsoft Windows 95
      </div>
      
      <div>
        <div>Starting Windows 95...</div>
        <div style={{ marginTop: '20px' }}>
          <div style={{ background: '#c0c0c0', height: '20px', width: '300px', border: '2px solid #dfdfdf', overflow: 'hidden' }}>
            <div style={{
              background: '#000080',
              height: '100%',
              width: '0%',
              animation: 'progress 3s ease-in-out'
            }}></div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

function FileWindow({ window, onClose, onMinimize, onMouseDown, onOpenFolder }) {
  const getFolder = () => {
    let current = FOLDER_STRUCTURE[window.folderId];
    for (let name of window.path) {
      const found = Object.values(current.items || {}).find(i => i.name === name);
      if (found) current = found;
    }
    return current;
  };

  const folder = getFolder();

  const handleFileClick = (itemKey, item) => {
    if (item.type === 'folder') {
      onOpenFolder(window.folderId, item.name, [...window.path, item.name]);
    }
  };

  const breadcrumb = [window.label, ...window.path].join(' > ');

  return (
    <div
      className="window"
      style={{
        left: `${window.x}px`,
        top: `${window.y}px`,
        width: `${window.width}px`,
        height: `${window.height}px`,
      }}
    >
      <div
        className="window-title"
        onMouseDown={onMouseDown}
      >
        <span className="window-title-text">{window.label}</span>
        <div className="window-buttons">
          <button
            className="window-btn"
            onClick={() => onMinimize(window.id)}
          >
            _
          </button>
          <button className="window-btn">□</button>
          <button
            className="window-btn"
            onClick={() => onClose(window.id)}
          >
            ✕
          </button>
        </div>
      </div>
      <div className="window-content">
        <div className="folder-path">{breadcrumb}</div>
        
        {folder?.type === 'folder' ? (
          <div className="folder-items">
            {Object.entries(folder.items || {}).map(([key, item]) => (
              <div
                key={key}
                className="file-item"
                onDoubleClick={() => handleFileClick(key, item)}
              >
                <div className="file-icon">
                  {item.type === 'folder' ? (item.locked ? '🔒' : '📁') : item.type === 'game' ? '🎮' : '📄'}
                </div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        ) : folder?.type === 'game' ? (
          <GameWindow gameType={folder.gameType} />
        ) : (
          <div style={{ padding: '8px', whiteSpace: 'pre-wrap', fontFamily: 'Courier Prime, monospace', fontSize: '10px', lineHeight: '1.4', overflow: 'auto', height: '100%' }}>
            {folder?.content || 'No content'}
          </div>
        )}
      </div>
    </div>
  );
}

function GameWindow({ gameType }) {
  const [gameActive, setGameActive] = useState(false);

  if (gameType === 'minesweeper') {
    return (
      <Minesweeper />
    );
  } else if (gameType === 'snake') {
    return (
      <Snake />
    );
  }

  return <div style={{ padding: '8px' }}>Unknown game type</div>;
}

function Minesweeper() {
  const [board, setBoard] = useState(() => generateBoard());
  const [revealed, setRevealed] = useState(new Set());
  const [flagged, setFlagged] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  function generateBoard() {
    const board = Array(100).fill(0);
    let mines = 0;
    while (mines < 10) {
      const idx = Math.floor(Math.random() * 100);
      if (board[idx] === 0) {
        board[idx] = 'M';
        mines++;
      }
    }
    
    for (let i = 0; i < 100; i++) {
      if (board[i] !== 'M') {
        let count = 0;
        const row = Math.floor(i / 10);
        const col = i % 10;
        for (let r = row - 1; r <= row + 1; r++) {
          for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < 10 && c >= 0 && c < 10) {
              if (board[r * 10 + c] === 'M') count++;
            }
          }
        }
        board[i] = count;
      }
    }
    return board;
  }

  const handleClick = (idx) => {
    if (gameOver || won || revealed.has(idx) || flagged.has(idx)) return;

    if (board[idx] === 'M') {
      setGameOver(true);
      const newRevealed = new Set(revealed);
      board.forEach((cell, i) => {
        if (cell === 'M') newRevealed.add(i);
      });
      setRevealed(newRevealed);
      return;
    }

    const newRevealed = new Set(revealed);
    const flood = (i) => {
      if (newRevealed.has(i) || flagged.has(i)) return;
      newRevealed.add(i);
      if (board[i] === 0) {
        const row = Math.floor(i / 10);
        const col = i % 10;
        for (let r = row - 1; r <= row + 1; r++) {
          for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < 10 && c >= 0 && c < 10) {
              flood(r * 10 + c);
            }
          }
        }
      }
    };
    flood(idx);
    setRevealed(newRevealed);

    if (newRevealed.size === 90) {
      setWon(true);
    }
  };

  const handleRightClick = (e, idx) => {
    e.preventDefault();
    if (gameOver || won || revealed.has(idx)) return;
    const newFlagged = new Set(flagged);
    if (newFlagged.has(idx)) {
      newFlagged.delete(idx);
    } else {
      newFlagged.add(idx);
    }
    setFlagged(newFlagged);
  };

  return (
    <div style={{ padding: '10px', textAlign: 'center' }}>
      <div style={{ marginBottom: '10px', fontSize: '11px', fontWeight: 'bold' }}>
        {gameOver ? 'GAME OVER!' : won ? 'YOU WON!' : `Mines: ${10 - flagged.size}`}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 20px)', gap: '1px', justifyContent: 'center', marginBottom: '10px' }}>
        {board.map((cell, idx) => (
          <div
            key={idx}
            onClick={() => handleClick(idx)}
            onContextMenu={(e) => handleRightClick(e, idx)}
            style={{
              width: '20px',
              height: '20px',
              background: revealed.has(idx) ? (cell === 'M' ? '#ff0000' : '#c0c0c0') : '#dfdfdf',
              border: '1px solid',
              borderColor: revealed.has(idx) ? '#808080' : '#ffffff #404040 #404040 #ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '9px',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#0000ff'
            }}
          >
            {flagged.has(idx) ? '🚩' : revealed.has(idx) && cell !== 'M' && cell !== 0 ? cell : ''}
          </div>
        ))}
      </div>
      {gameOver && <button onClick={() => window.location.reload()}>New Game</button>}
      {won && <button onClick={() => window.location.reload()}>New Game</button>}
    </div>
  );
}

function Snake() {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([8, 8]);
  const [direction, setDirection] = useState([0, 1]);
  const [nextDirection, setNextDirection] = useState([0, 1]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameLoopRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowUp' && direction[0] === 0) setNextDirection([-1, 0]);
      if (e.key === 'ArrowDown' && direction[0] === 0) setNextDirection([1, 0]);
      if (e.key === 'ArrowLeft' && direction[1] === 0) setNextDirection([0, -1]);
      if (e.key === 'ArrowRight' && direction[1] === 0) setNextDirection([0, 1]);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    gameLoopRef.current = setInterval(() => {
      setSnake(prevSnake => {
        setDirection(nextDirection);
        const head = prevSnake[0];
        const newHead = [head[0] + nextDirection[0], head[1] + nextDirection[1]];

        if (newHead[0] < 0 || newHead[0] >= 15 || newHead[1] < 0 || newHead[1] >= 15) {
          setGameOver(true);
          return prevSnake;
        }

        if (prevSnake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])) {
          setGameOver(true);
          return prevSnake;
        }

        let newSnake = [newHead, ...prevSnake];

        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore(prev => prev + 10);
          setFood([Math.floor(Math.random() * 15), Math.floor(Math.random() * 15)]);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 200);

    return () => clearInterval(gameLoopRef.current);
  }, [nextDirection, food]);

  return (
    <div style={{ padding: '10px', textAlign: 'center' }}>
      <div style={{ marginBottom: '10px', fontSize: '11px', fontWeight: 'bold' }}>
        Score: {score} {gameOver && '| GAME OVER'}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 20px)', gap: '1px', justifyContent: 'center', background: '#000000', marginBottom: '10px' }}>
        {Array(15).fill(null).map((_, row) =>
          Array(15).fill(null).map((_, col) => {
            const isSnake = snake.some(segment => segment[0] === row && segment[1] === col);
            const isFood = food[0] === row && food[1] === col;
            return (
              <div
                key={`${row}-${col}`}
                style={{
                  width: '20px',
                  height: '20px',
                  background: isSnake ? '#00ff00' : isFood ? '#ff0000' : '#000000',
                  border: '1px solid #333333'
                }}
              />
            );
          })
        )}
      </div>
      {gameOver && <button onClick={() => window.location.reload()}>New Game</button>}
    </div>
  );
}

function PasswordDialog({ prompt, input, onInputChange, onSubmit, onCancel, attempts }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }}>
      <div style={{
        background: '#c0c0c0',
        border: '2px solid',
        borderColor: '#dfdfdf #404040 #404040 #dfdfdf',
        padding: '20px',
        width: '400px',
        boxShadow: '1px 1px 0 #ffffff, -1px -1px 0 #808080'
      }}>
        <div style={{
          background: 'linear-gradient(to right, #000080, #1084d7)',
          color: 'white',
          padding: '4px',
          marginBottom: '20px',
          fontWeight: 'bold',
          fontSize: '11px'
        }}>
          Password Required - Access Denied
        </div>
        
        <div style={{ marginBottom: '10px', fontSize: '11px' }}>
          The folder "{prompt.folderName}" is locked.
        </div>
        
        <div style={{ marginBottom: '10px', fontSize: '11px', color: '#ff0000', fontWeight: 'bold' }}>
          Attempts remaining: {3 - attempts}
        </div>

        {attempts === 2 && (
          <div style={{ marginBottom: '10px', fontSize: '11px', color: '#ff0000', backgroundColor: '#ffcccc', padding: '6px', border: '1px solid #ff0000' }}>
            WARNING: One more wrong attempt will lock the system!
          </div>
        )}
        
        <input
          type="password"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSubmit(input)}
          placeholder="Enter password"
          style={{
            width: '100%',
            padding: '6px',
            border: '2px solid',
            borderColor: '#dfdfdf #404040 #404040 #dfdfdf',
            marginBottom: '10px',
            fontSize: '11px',
            fontFamily: 'Arial, sans-serif',
            boxSizing: 'border-box'
          }}
          autoFocus
        />
        
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{
              background: '#c0c0c0',
              border: '2px solid',
              borderColor: '#dfdfdf #404040 #404040 #dfdfdf',
              padding: '4px 16px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold'
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(input)}
            style={{
              background: '#c0c0c0',
              border: '2px solid',
              borderColor: '#dfdfdf #404040 #404040 #dfdfdf',
              padding: '4px 16px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold'
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

function BSOD() {
  useEffect(() => {
    const audio = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audio.createOscillator();
    const gainNode = audio.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audio.destination);
    gainNode.gain.setValueAtTime(0.3, audio.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 0.3);
    
    oscillator.frequency.setValueAtTime(200, audio.currentTime);
    oscillator.start(audio.currentTime);
    oscillator.stop(audio.currentTime + 0.3);
  }, []);

  return (
    <div className="bsod">
      <div style={{ fontSize: '18px', fontWeight: 'bold', animation: 'bsodFlash 1s infinite' }}>
        SYSTEM LOCKDOWN
      </div>
      <div className="bsod-text">
        A fatal exception 0E has occurred at 0028:C0001A1F in VxD KERNEL.<br/>
        <br/>
        TOO MANY INCORRECT PASSWORD ATTEMPTS<br/>
        <br/>
        The current application will be terminated.<br/>
        <br/>
        Press any key to shut down the system.<br/>
        <br/>
        <br/>
        <br/>
        ERROR: ACCESS DENIED<br/>
        COMPUTER WILL NOW POWER OFF...<br/>
      </div>
      <style>{`
        @keyframes bsodFlash {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

function WinScreen() {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '2001';
    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    const confetti = [];

    for (let i = 0; i < 100; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 5 + 2,
        speedX: Math.random() * 6 - 3,
        speedY: Math.random() * 8 + 5,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
        color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'][Math.floor(Math.random() * 5)]
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((particle, index) => {
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        particle.rotation += particle.rotationSpeed;

        if (particle.y > canvas.height) {
          confetti.splice(index, 1);
        }

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
        ctx.restore();
      });

      if (confetti.length > 0) {
        requestAnimationFrame(animate);
      } else {
        document.body.removeChild(canvas);
      }
    };

    animate();

    return () => {
      if (canvas.parentElement) {
        document.body.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#000080',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      flexDirection: 'column',
      color: '#ffff55',
      fontFamily: 'Courier Prime, monospace',
      textAlign: 'center',
      gap: '40px',
      animation: 'winFadeIn 1s ease-in'
    }}>
      <style>{`
        @keyframes winFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      
      <div style={{ fontSize: '36px', fontWeight: 'bold' }}>
        SYSTEM UNLOCKED!
      </div>
      <div style={{ fontSize: '16px', lineHeight: '1.6', maxWidth: '600px' }}>
        Congratulations! You have successfully gained ADMIN access!<br/>
        <br/>
        You collected all the password clues from throughout the system<br/>
        and deciphered the master password: 1995561998<br/>
        <br/>
        You also found the Easter Egg (LLAMA - Winamp reference!)
        <br/>
        The Admin Panel is now fully accessible.<br/>
        <br/>
        You've completed the ultimate 90s nostalgia experience!
      </div>
    </div>
  );
}

