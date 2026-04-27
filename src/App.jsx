import { useState, useRef, useEffect } from 'react';

const FOLDER_STRUCTURE = {
  mycomputer: {
    name: 'My Computer',
    type: 'folder',
    locked: false,
    password: null,
    items: {
      programfiles: { name: 'Program Files', type: 'folder', locked: false, password: null, items: {} },
      mydocs: { name: 'My Documents', type: 'folder', locked: false, password: null, items: {
        photos1998: { name: 'Photos_1998', type: 'folder', locked: false, password: null, items: {
          photo1: { name: 'Summer_Vacation.txt', type: 'file', content: 'Had an amazing summer in 1998! Beach trip was unforgettable. My friend brought his new digital camera and took 500 photos - way more than our old film cameras could handle!\n\nDate: June 1998\n\n[CLUE #1: Remember this year]' }
        }},
        workfiles: { name: 'Work_Files', type: 'folder', locked: false, password: null, items: {
          memo: { name: 'Important_Memo.txt', type: 'file', content: 'TO: All Staff\nFROM: IT Department\nRE: New Computer Upgrades\n\nWe are upgrading all machines to 512MB RAM. This is cutting edge technology!\n\nPlease note your machine ID number:\nMy Machine ID: 512\n\n[CLUE #2: The amount of RAM]' }
        }},
        diary: { name: 'Diary.txt', type: 'file', content: 'Dear Diary,\n\nToday I finally got the internet working! My new 56k modem is BLAZING fast. It only took 10 minutes to download a single image. Can you believe it?\n\nI spent hours on AOL chat rooms. My screen name is CoolDude1995.\n\nMy password hint: 56\n\n[CLUE #3: Modem speed]' },
        finances: { name: 'Finances', type: 'folder', locked: true, password: '1998', items: {
          bills: { name: 'Monthly_Bills.txt', type: 'file', content: 'Internet Bill: $29.99/month\nElectricity: $45.23\nPhone: $35.00\nAOL Subscription: $9.99\n\nTotal: $119.21\n\nNote: I paid for premium AOL access in 1995\n\n[CLUE #4: My birth year combined with summer vacation year]' }
        }}
      }},
      windows: { name: 'Windows', type: 'folder', locked: false, password: null, items: {
        readme: { name: 'System_Info.txt', type: 'file', content: 'WINDOWS 95 SYSTEM INFORMATION\n\nOperating System: Windows 95\nRelease Date: August 24, 1995\nRAM: 64MB\nProcessor: Pentium 166MHz\nHard Drive: 2GB (WOW!)\n\nFun Fact: Windows 95 was revolutionary. It introduced the Start button and "Start Me Up" was the theme song!\n\n[CLUE #5: Year of Windows release]' },
        system32: { name: 'System32', type: 'folder', locked: true, password: '56512', items: {
          config: { name: 'config.sys', type: 'file', content: 'DOS=HIGH,UMB\nDEVICE=C:\\DOS\\HIMEM.SYS\nDEVICE=C:\\DOS\\EMM386.EXE NOEMS\nFILES=30\nBUFFERS=20\n\nThis file controls Windows startup. Do not edit!\n\n[CLUE #6: Combine the modem speed with RAM amount: 56 + 512 = 56512]' }
        }}
      }},
      games: { name: 'Games', type: 'folder', locked: false, password: null, items: {
        minesweeper: { name: 'Minesweeper.exe', type: 'file', content: '[GAME] Minesweeper\n\nFun Fact: Minesweeper was first released in 1989 and became famous with Windows 3.1. This classic game taught millions about probability!' },
        secretfolder: { name: 'Secret_Folder', type: 'folder', locked: true, password: '1995569951956', items: {
          hidden: { name: 'Hidden_Truth.txt', type: 'file', content: 'YOU\'VE FOUND A SECRET!\n\nCongratulations! You\'ve discovered the secret folder. This contains information about the original admin password.\n\nThe admin was created in 1995.\nThe modem speed was 56k.\nThe year I took summer photos: 1998\nCombined: 1995 + 56 + 1998 = 1995561998\n\n[FINAL PASSWORD HINT: 1995561998]' }
        }}
      }}
    }
  },
  mydocs: {
    name: 'My Documents',
    type: 'folder',
    locked: false,
    password: null,
    items: {}
  },
  recycle: {
    name: 'Recycle Bin',
    type: 'folder',
    locked: false,
    password: null,
    items: {
      deleted1: { name: 'DeletedFile_Secret.txt', type: 'file', content: 'DELETED DOCUMENT - RECOVERED FROM RECYCLE BIN\n\nI found an old backup of my passwords!\n\nEmail: user@aol.com\nAOL Password: NotThisOne\nComputer built: 1996\n\nThe real password includes the build year: 1996\n\n[ALTERNATE CLUE: When this computer was built]' },
      oldbackups: { name: 'OldBackups', type: 'folder', locked: false, password: null, items: {
        backup1: { name: 'Backup_1997.txt', type: 'file', content: 'BACKUP FROM 1997\n\nMy computer specifications when I first got it:\n- Intel Pentium 200MHz processor\n- 32MB of RAM (seemed like PLENTY!)\n- 1GB Hard Drive\n\nFun Fact: A 1GB hard drive was considered MASSIVE in 1997. Today a single photo is 3-5MB!\n\n[CLUE: Original RAM amount: 32]' }
      }}
    }
  },
  inbox: {
    name: 'Inbox',
    type: 'folder',
    locked: false,
    password: null,
    items: {
      aol: { name: 'AOL_Welcome.eml', type: 'file', content: 'FROM: AOL Customer Service\nSUBJECT: Welcome to AOL!\nDATE: January 1, 1995\n\nWelcome! You are now part of the AOL family!\n\nWe\'re excited to bring you online. Your AOL account includes:\n- 5 hours per month of internet access\n- Unlimited email\n- Access to AOL chat rooms\n- Exclusive AOL content\n\nYour account was created in: 1995\n\n[CLUE: The year everything started]' },
      birthday: { name: 'Birthday_Message.eml', type: 'file', content: 'FROM: Mom\nSUBJECT: Happy Birthday!\nDATE: March 15, 1999\n\nHappy Birthday sweetheart!\n\nI can\'t believe you\'re turning 16 today! Time flies. I got you the new computer you wanted - it has 128MB of RAM!\n\nLove,\nMom\n\nP.S. - I set the admin password to something special from this year\n\n[CLUE: Admin password relates to this year - 1999]' },
      netscape: { name: 'Netscape_Alert.eml', type: 'file', content: 'FROM: Netscape Navigator Support\nSUBJECT: New Version Available!\nDATE: May 1998\n\nNetscape Navigator 4.0 is here!\n\nThe internet is evolving fast. In 1998, web speeds reached 56k!\n\nFun Fact: Netscape was THE browser in the 90s, competing with Internet Explorer. It was the beginning of the "Browser Wars"!\n\nTIP: Your Internet connection speed from that era: 56k\n\n[CLUE: Connection speed for the era]' }
    }
  },
  admin: {
    name: 'Admin',
    type: 'folder',
    locked: true,
    password: '1995561998',
    items: {
      systemadmin: { name: 'Administrator_Access.txt', type: 'file', content: 'CONGRATULATIONS!\n\nYou have successfully gained ADMIN access!\n\n=== ADMIN CREDENTIALS ===\nUsername: ADMINISTRATOR\nPassword: ████████████\nAccess Level: FULL SYSTEM\nPrivileges: UNRESTRICTED\n\n=== SYSTEM STATUS ===\nOS: Windows 95\nStatus: ACTIVE\nSecurity: COMPROMISED (by you!)\n\n=== GAME COMPLETE ===\n\nYou have successfully unlocked all the secrets of this 90s computer!\n\nClues you collected:\n1. Summer vacation year: 1998\n2. Modem speed: 56k\n3. Windows release: 1995\n4. RAM upgrade: 512MB\n5. System password: 56512\n6. Final password: 1995561998\n\nThanks for playing!\n' },
      secretfiles: { name: 'Secret_Files', type: 'folder', locked: false, password: null, items: {
        readme: { name: 'README.txt', type: 'file', content: 'WELCOME TO ADMIN PANEL\n\nYou are now viewing restricted files. These are the internal system files that control this computer.\n\nFun Facts About 90s Tech:\n\n1. WINDOWS 95 (1995)\n   - First Windows with Start menu\n   - Theme song: "Start Me Up" by Rolling Stones\n   - 24 million copies sold\n   - Changed computing forever\n\n2. INTERNET SPEEDS\n   - 56k modem: Peak internet speed in late 90s\n   - Download speed: ~7KB/s\n   - A 1MB file took ~2.5 minutes!\n   - Streaming video? Impossible!\n\n3. COMPUTER HARDWARE\n   - RAM: Started at 4MB, went to 64MB, 128MB\n   - Hard drives: 540MB was standard, 1GB was luxury\n   - Processors: Pentium 166MHz to Pentium III\n   - No SSDs, no USB ports\n\n4. STORAGE MEDIA\n   - Floppy disks: 1.44MB (seems tiny now!)\n   - Zip drives: 100MB (wow!)\n   - CD-Rs: Burning took 30+ minutes\n   - No cloud storage\n\n5. INTERNET SERVICES\n   - AOL ruled the online world\n   - Dial-up connection made screaming modem noises\n   - Yahoo was the search engine\n   - Google didn\'t exist until 1998\n\nYou\'ve completed the nostalgia journey!\n' }
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
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'locked'

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

  const openWindow = (folderId, folderName, path = []) => {
    const folder = getFolder(folderId, path);
    
    if (folder?.locked && !folder?.unlocked) {
      setPasswordPrompt({
        folderId,
        folderName,
        path,
        attempts: passwordAttempts[`${folderId}-${path.join('-')}`] || 0
      });
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
      
      // Check if they opened Admin folder with correct password
      if (passwordPrompt.folderId === 'admin' && password === '1995561998') {
        setGameState('won');
      }
      
      openWindow(passwordPrompt.folderId, passwordPrompt.folderName, passwordPrompt.path);
    } else if (attempts >= 3) {
      setGameState('locked');
      setPasswordPrompt(null);
    } else {
      setPasswordAttempts({ ...passwordAttempts, [key]: attempts });
      setPasswordInput('');
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
                  {item.type === 'folder' ? (item.locked ? '🔒' : '📁') : '📄'}
                </div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '8px', whiteSpace: 'pre-wrap', fontFamily: 'Courier Prime, monospace', fontSize: '10px', lineHeight: '1.4' }}>
            {folder?.content || 'No content'}
          </div>
        )}
      </div>
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
          Password Required
        </div>
        
        <div style={{ marginBottom: '10px', fontSize: '11px' }}>
          The folder "{prompt.folderName}" is locked.
        </div>
        
        <div style={{ marginBottom: '10px', fontSize: '11px', color: '#ff0000', fontWeight: 'bold' }}>
          Attempts remaining: {3 - attempts}
        </div>
        
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
            fontFamily: 'Arial, sans-serif'
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
  return (
    <div className="bsod">
      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>SYSTEM LOCKDOWN</div>
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
    </div>
  );
}

function WinScreen() {
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
      gap: '40px'
    }}>
      <div style={{ fontSize: '36px', fontWeight: 'bold' }}>
        SYSTEM UNLOCKED!
      </div>
      <div style={{ fontSize: '16px', lineHeight: '1.6', maxWidth: '600px' }}>
        Congratulations! You have successfully gained ADMIN access!<br/>
        <br/>
        You collected all the password clues from throughout the system<br/>
        and deciphered the master password: 1995561998<br/>
        <br/>
        The Admin Panel is now fully accessible.<br/>
        <br/>
        Thanks for exploring the nostalgia of 90s computing!
      </div>
    </div>
  );
}