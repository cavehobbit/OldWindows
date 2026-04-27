import { useEffect, useMemo, useRef, useState } from 'react';

import compIcon from './comp.png';
import docsIcon from './docs.png';
import impPaperIcon from './imppaper.png';
import afterCompletingPaperIcon from './aftercompletingpaper.png';
import internetIcon from './internet.png'; 
import recycleIcon from './recycle.png';
import inboxIcon from './inbox.png';
import cdNotWorkingIcon from './cdnotworking.png';
import cdWorkingIcon from './cdworking.png';
import summerPhoto from './summer.png';

import clickSound from './click.mp3';
import wrongSound from './wrong.mp3';

const START_FILE_TEXT = `Welcome Dear User.

Your goal is to gain admin access.

Read files carefully and collect the important numbers and years hidden across the computer.
Some folders are locked and need passwords.

There is also something extra hidden in the system for people who look a little deeper.

Good luck.`;

const POST_ADMIN_TEXT = `You made it into admin access.

But there is still one more thing hidden in this machine.

Look through the software files again.
One of them mentions an old media player with a very memorable motto.

That clue opens something else on the desktop.

Keep looking.`;

const INTERNET_TEXT = `Internet

No connection.

You must not seek help from the Internet today! We are back in the 90s.
In the late 90s, getting online meant modem noise, waiting, blocked phone line
 & painfully slow image loading `;

const SUMMER_VACATION_TEXT = `Summer Vacation

These photos were taken in 1998.

Digital cameras were magical back then.
A few hundred photos sounded enormous.

Important clue:
1998`;

const FILE_SYSTEM = {
  mycomputer: {
    name: 'My Computer',
    type: 'folder',
    items: {
      programfiles: {
        name: 'Program Files',
        type: 'folder',
        items: {
          ie: {
            name: 'Internet_Explorer.txt',
            type: 'file',
            content: `Internet Explorer 5

Released in 1999.

Back then browser wars were serious.
Especially, Internet Explorer and Netscape were fighting for everything.

A lot of people used whatever came preinstalled and never changed it.`
          },
          winamp: {
            name: 'Winamp.txt',
            type: 'file',
            content: `Winamp

"It really whips the llama's ass."

One of the most iconic media players ever.
People used skins, visualizers, playlists, and MP3 collections.

If you remember the name of this app, it may help you unlock something else.`
          },
          aim: {
            name: 'AIM.txt',
            type: 'file',
            content: `AOL Instant Messenger

The instagram of the late 90s.
Away messages were treated like money.
People stayed online for hours just to talk few moments.`
          }
        }
      },
      mydocs: {
        name: 'My Documents',
        type: 'folder',
        items: {
          photos1998: {
            name: 'Photos_1998',
            type: 'folder',
            items: {
              summer: {
                name: 'Summer_Vacation.txt',
                type: 'file',
                subtype: 'summer-photo',
                content: SUMMER_VACATION_TEXT
              }
            }
          },
          workfiles: {
            name: 'Work_Files',
            type: 'folder',
            items: {
              memo: {
                name: 'IT_Memo.txt',
                type: 'file',
                content: `IT Memo

All office systems are being upgraded to 512MB RAM.

That was huge back then.

Important clue:
512`
              }
            }
          },
          diary: {
            name: 'Diary.txt',
            type: 'file',
            content: `Diary

I finally got the internet working.
My 56k modem feels unbelievably fast.

Downloading even one image still takes forever though.

Important clue:
56`
          },
          finances: {
            name: 'Finances',
            type: 'folder',
            locked: true,
            password: '1998',
            items: {
              bills: {
                name: 'Monthly_Bills.txt',
                type: 'file',
                content: `Monthly Bills

AOL access started in 1995.

Internet wasn't cheap and also wasn't unlimited in spirit.

Important clue:
1995`
              }
            }
          }
        }
      },
      windows: {
        name: 'Windows',
        type: 'folder',
        items: {
          systemInfo: {
            name: 'System_Info.txt',
            type: 'file',
            content: `Windows 95 System Information

Release year: 1995
RAM: 64MB
Processor: Pentium era
Hard drive: tiny by today's standards

Important clue:
1995`
          },
          system32: {
            name: 'System32',
            type: 'folder',
            locked: true,
            password: '56512',
            items: {
              config: {
                name: 'config.sys',
                type: 'file',
                content: `config.sys

In old systems, messing with startup config could ruin your day.
`
              }
            }
          }
        }
      },
      games: {
        name: 'Games',
        type: 'folder',
        items: {
          secretfolder: {
            name: 'Secret_Folder',
            type: 'folder',
            locked: true,
            password: '1995561998',
            items: {
              truth: {
                name: 'Hidden_Truth.txt',
                type: 'file',
                content: `Hidden Truth

You found the secret folder.

This was hidden deep in the system.
The password came from combining all the main clues:
1995 (Windows release year)
56 (Modem speed)
1998 (Summer year)

Well done on finding this.`
              }
            }
          }
        }
      }
    }
  },
  mydocs: {
    name: 'My Documents',
    type: 'folder',
    items: {
      photos1998: {
        name: 'Photos_1998',
        type: 'folder',
        items: {
          summer: {
            name: 'Summer_Vacation.txt',
            type: 'file',
            subtype: 'summer-photo',
            content: SUMMER_VACATION_TEXT
          }
        }
      },
      workfiles: {
        name: 'Work_Files',
        type: 'folder',
        items: {
          memo: {
            name: 'IT_Memo.txt',
            type: 'file',
            content: `IT Memo

All office systems are being upgraded to 512MB RAM.

That sounded huge back then.

Important clue:
512`
          }
        }
      },
      diary: {
        name: 'Diary.txt',
        type: 'file',
        content: `Diary

I finally got the internet working.
My 56k modem feels unbelievably fast.

Downloading even one image still takes forever though.

Important clue:
56`
      },
      finances: {
        name: 'Finances',
        type: 'folder',
        locked: true,
        password: '1998',
        items: {
          bills: {
            name: 'Monthly_Bills.txt',
            type: 'file',
            content: `Monthly Bills

AOL access started in 1995.

Internet wasn't cheap and definitely wasn't unlimited in spirit.

Important clue:
1995`
          }
        }
      }
    }
  },
  recycle: {
    name: 'Recycle Bin',
    type: 'folder',
    items: {
      deleted: {
        name: 'DeletedFile_Secret.txt',
        type: 'file',
        content: `Deleted Note

Computer build year: 1996

Not the main answer, but still useful context.
People recovered deleted files from the recycle bin all the time.`
      }
    }
  },
  inbox: {
    name: 'Inbox',
    type: 'folder',
    items: {
      aol: {
        name: 'AOL_Welcome.eml',
        type: 'file',
        content: `AOL Welcome

Account created in 1995.

"You've got mail" was once enough to make people smile. :)

Fun fact: AOL eventually bought Winamp in 1999.
That media player with the llama quote became part of internet history.`
      },
      geocities: {
        name: 'GeoCities_Signup.eml',
        type: 'file',
        content: `GeoCities Signup

A way to create Personal Websites back then. Although It's still used today`
      }
    }
  },
  admin: {
    name: 'Admin Panel',
    type: 'folder',
    locked: true,
    password: '1995561998',
    items: {
      access: {
        name: 'Administrator_Access.txt',
        type: 'file',
        content: `Admin Access Granted

You got in.

Main password solved:
1995 + 56 + 1998 = 1995561998

But you are not fully done yet.
There is still one hidden unlock left in the machine.

Check the Program Files for a clue about an old media player.`
      }
    }
  }
};

const INITIAL_DESKTOP_ICONS = [
  { id: 'start-info', label: 'START HERE', icon: impPaperIcon, kind: 'special' },
  { id: 'mycomputer', label: 'My Computer', icon: compIcon, kind: 'folder' },
  { id: 'mydocs', label: 'My Documents', icon: docsIcon, kind: 'folder' },
  { id: 'recycle', label: 'Recycle Bin', icon: recycleIcon, kind: 'folder' }, 
  { id: 'inbox', label: 'Inbox', icon: inboxIcon, kind: 'folder' }, 
  { id: 'internet', label: 'Internet', icon: internetIcon, kind: 'special' },
  { id: 'music-player', label: 'Music Player', icon: cdNotWorkingIcon, kind: 'special' }
];

export default function App() {
  const [desktopIcons, setDesktopIcons] = useState(INITIAL_DESKTOP_ICONS);
  const [windows, setWindows] = useState([]);
  const [clock, setClock] = useState('');
  const [showBoot, setShowBoot] = useState(true);
  const [passwordDialog, setPasswordDialog] = useState(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [attempts, setAttempts] = useState({});
  const [lockedOut, setLockedOut] = useState(false);
  const [adminComplete, setAdminComplete] = useState(false);
  const [musicUnlocked, setMusicUnlocked] = useState(false);
  const [openingIcon, setOpeningIcon] = useState(null);
  const [shakePassword, setShakePassword] = useState(false);

  const dragRef = useRef(null);
  const clickAudioRef = useRef(null);
  const wrongAudioRef = useRef(null);

  useEffect(() => {
    clickAudioRef.current = new Audio(clickSound);
    wrongAudioRef.current = new Audio(wrongSound);
    clickAudioRef.current.volume = 0.2;
    wrongAudioRef.current.volume = 0.3;
  }, []);

  useEffect(() => {
    const handleClick = () => {
      if (clickAudioRef.current) {
        clickAudioRef.current.currentTime = 0;
        clickAudioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowBoot(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const getNodeByPath = (rootId, path = []) => {
    let node = FILE_SYSTEM[rootId];
    for (const part of path) {
      if (!node?.items) return null;
      node = Object.values(node.items).find((item) => item.name === part);
    }
    return node;
  };

  const openWindow = (config) => {
    const id = `${config.type}-${Date.now()}-${Math.random()}`;
    setWindows((prev) => [
      ...prev,
      {
        id,
        x: 140 + prev.length * 24,
        y: 80 + prev.length * 24,
        width: config.width || 620,
        height: config.height || 440,
        minimized: false,
        ...config
      }
    ]);
  };

  const handleDesktopOpen = (icon) => {
    setOpeningIcon(icon.id);
    setTimeout(() => setOpeningIcon(null), 100);

    setTimeout(() => {
      if (icon.id === 'start-info') {
        openWindow({
          type: 'text',
          title: 'START HERE',
          content: START_FILE_TEXT
        });
        return;
      }

      //music spotify

      if (icon.id === 'after-admin-note') {
        openWindow({
          type: 'text',
          title: 'FOUND SOMETHING?',
          content: POST_ADMIN_TEXT
        });
        return;
      }

      if (icon.id === 'internet') {
        openWindow({
          type: 'text',
          title: 'Internet',
          content: INTERNET_TEXT
        });
        return;
      }

      if (icon.id === 'music-player') {
        if (!musicUnlocked) {
          setPasswordDialog({
            key: 'music-player',
            title: 'Music Player',
            expected: 'winamp',
            success: () => {
              setMusicUnlocked(true);
              setDesktopIcons((prev) =>
                prev.map((item) =>
                  item.id === 'music-player'
                    ? { ...item, icon: cdWorkingIcon }
                    : item
                )
              );
              openWindow({
                type: 'music',
                title: 'Music Player',
                width: 760,
                height: 520
              });
            }
          });
        } else {
          openWindow({
            type: 'music',
            title: 'Music Player',
            width: 760,
            height: 520
          });
        }
        return;
      }

      const node = FILE_SYSTEM[icon.id];
      if (!node) return;

      if (node.locked) {
        setPasswordDialog({
          key: icon.id,
          title: node.name,
          expected: node.password,
          success: () => {
            if (icon.id === 'admin') {
              setAdminComplete(true);
              setDesktopIcons((prev) => {
                if (prev.some((item) => item.id === 'after-admin-note')) return prev;
                return [
                  ...prev,
                  {
                    id: 'after-admin-note',
                    label: 'FOUND SOMETHING?',
                    icon: afterCompletingPaperIcon,
                    kind: 'special'
                  }
                ];
              });
            }

            openWindow({
              type: 'folder',
              title: node.name,
              rootId: icon.id,
              path: []
            });
          }
        });
        return;
      }

      openWindow({
        type: 'folder',
        title: node.name,
        rootId: icon.id,
        path: []
      });
    }, 100);
  };

  const handleFolderItemOpen = (windowId, rootId, path, item) => {
    if (item.type === 'folder') {
      if (item.locked) {
        setPasswordDialog({
          key: `${rootId}-${[...path, item.name].join('/')}`,
          title: item.name,
          expected: item.password,
          success: () => {
            openWindow({
              type: 'folder',
              title: item.name,
              rootId,
              path: [...path, item.name]
            });
          }
        });
        return;
      }

      openWindow({
        type: 'folder',
        title: item.name,
        rootId,
        path: [...path, item.name]
      });
      return;
    }

    if (item.type === 'file') {
      openWindow({
        type: 'text',
        title: item.name,
        content: item.content,
        subtype: item.subtype
      });
      return;
    }
  };

  const submitPassword = () => {
    if (!passwordDialog) return;
    const key = passwordDialog.key;
    const currentAttempts = attempts[key] || 0;

    if (passwordInput.trim().toLowerCase() === passwordDialog.expected.toLowerCase()) {
      setPasswordInput('');
      setAttempts((prev) => ({ ...prev, [key]: 0 }));
      const success = passwordDialog.success;
      setPasswordDialog(null);
      success?.();
    } else {
      if (wrongAudioRef.current) {
        wrongAudioRef.current.currentTime = 0;
        wrongAudioRef.current.play().catch(e => console.log('Audio play failed:', e));
        
        setShakePassword(true);
        setTimeout(() => setShakePassword(false), 300);
      }

      const next = currentAttempts + 1;
      setAttempts((prev) => ({ ...prev, [key]: next }));
      setPasswordInput('');
      if (next >= 3) {
        setPasswordDialog(null);
        setLockedOut(true);
      }
    }
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
  };

  const restoreWindow = (id) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: false } : w))
    );
  };

  const bringToFront = (id) => {
    setWindows((prev) => {
      const target = prev.find((w) => w.id === id);
      if (!target) return prev;
      return [...prev.filter((w) => w.id !== id), target];
    });
  };

  const startDrag = (e, id) => {
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    dragRef.current = {
      id,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top
    };
    bringToFront(id);
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current) return;
      const { id, offsetX, offsetY } = dragRef.current;
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, x: e.clientX - offsetX, y: e.clientY - offsetY }
            : w
        )
      );
    };

    const onUp = () => {
      dragRef.current = null;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const activePasswordAttempts = useMemo(() => {
    if (!passwordDialog) return 0;
    return attempts[passwordDialog.key] || 0;
  }, [attempts, passwordDialog]);

  if (showBoot) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          background: '#000080',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'Courier New, monospace',
          gap: '18px'
        }}
      >
        <div style={{ fontSize: '24px' }}>Microsoft Windows 95</div>
        <div>Starting up...</div>
        <div
          style={{
            width: '280px',
            height: '18px',
            border: '2px solid #c0c0c0',
            background: '#fff'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#000080',
              animation: 'bootbar 1.2s linear'
            }}
          />
        </div>
        <style>{`
          @keyframes bootbar {
            from { width: 0; }
            to { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  if (lockedOut) {
    return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          background: '#0000aa',
          color: '#ffff55',
          fontFamily: 'Courier New, monospace',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px',
          lineHeight: 1.7
        }}
      >
        <div>
          <div style={{ fontSize: '22px', marginBottom: '20px' }}>SYSTEM LOCKDOWN</div>
          <div>
            Too many incorrect password attempts.
            <br />
            The system has been permanently locked.
            <br />
            <br />
            Press any key to accept your fate.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="desktop">
      <div className="desktop-content">
        {desktopIcons.map((icon, index) => (
          <div
            key={icon.id}
            className={`desktop-icon ${openingIcon === icon.id ? 'opening' : ''}`}
            style={{ left: '20px', top: `${20 + index * 110}px` }}
            onClick={() => handleDesktopOpen(icon)}
          >
            <div className="icon-image">
              <img src={icon.icon} alt={icon.label} />
            </div>
            <div className="icon-label">{icon.label}</div>
          </div>
        ))}

        {windows.map((win) =>
          win.minimized ? null : (
            <div
              key={win.id}
              className="window"
              style={{
                left: `${win.x}px`,
                top: `${win.y}px`,
                width: `${win.width}px`,
                height: `${win.height}px`
              }}
              onMouseDown={() => bringToFront(win.id)}
            >
              <div className="window-title" onMouseDown={(e) => startDrag(e, win.id)}>
                <span className="window-title-text">{win.title}</span>
                <div className="window-buttons">
                  <button className="window-btn" onClick={() => minimizeWindow(win.id)}>_</button>
                  <button className="window-btn">□</button>
                  <button className="window-btn" onClick={() => closeWindow(win.id)}>✕</button>
                </div>
              </div>

              <div className="window-content">
                {win.type === 'folder' && (
                  <>
                    <div className="folder-path">
                      {[FILE_SYSTEM[win.rootId]?.name || win.title, ...win.path].join(' > ')}
                    </div>
                    <div className="file-display custom-scrollbar">
                      <div className="folder-items">
                        {Object.entries(getNodeByPath(win.rootId, win.path)?.items || {}).map(
                          ([key, item]) => (
                            <div
                              key={key}
                              className="file-item"
                              onClick={() =>
                                handleFolderItemOpen(win.id, win.rootId, win.path, item)
                              }
                            >
                              <div className="file-icon">
                            {item.type === 'folder'
                              ? item.locked
                                ? '🔒'
                                : '📁'
                              : '📄'}
                          </div>
                          <span>{item.name}</span>
                        </div>
                          )
                        )}
                      </div>
                    </div>
                  </>
                )}


                {win.type === 'text' && (
                  <>
                    <div className="folder-path">{win.title}</div>
                    <div className="file-display custom-scrollbar">
                      {win.subtype === 'summer-photo' ? (
                        <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
                          <div style={{ flex: 1 }}>
                            <pre className="file-text">{win.content}</pre>
                          </div>
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img 
                              src={summerPhoto} 
                              alt="Summer vacation" 
                              style={{ 
                                maxWidth: '100%', 
                                maxHeight: '100%',
                                objectFit: 'contain',
                                border: '2px solid #404040',
                                borderRadius: '4px'
                              }} 
                            />
                          </div>
                        </div>
                      ) : (
                        <pre className="file-text">{win.content}</pre>
                      )}
                    </div>
                  </>
                )}

                

                {win.type === 'music' && (
                  <>
                    <div className="folder-path">Music Player</div>
                    <div className="file-display">
                      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                      </div>
                      <iframe
                        style={{ borderRadius: '4px' }}
                        width="100%"
                        height="360"
                        src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4UtSsGT1Sbe?utm_source=generator"
                        title="Spotify playlist"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )
        )}
      </div>

      <div className="taskbar">
        <div className="start-button">
          <div className="start-icon">⊞</div>
          Start
        </div>

        <div className="taskbar-apps">
          {windows.filter((w) => w.minimized).map((w) => (
            <div key={w.id} className="taskbar-app" onClick={() => restoreWindow(w.id)}>
              {w.title}
            </div>
          ))}
        </div>

        <div className="system-tray">
          <div className="clock">{clock}</div>
        </div>
      </div>

      {passwordDialog && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <div
            style={{
              width: '380px',
              background: '#c0c0c0',
              border: '2px solid',
              borderColor: '#dfdfdf #404040 #404040 #dfdfdf',
              boxShadow: '1px 1px 0 #fff, -1px -1px 0 #808080',
              padding: '12px'
            }}
          >
            <div
              style={{
                background: 'linear-gradient(to right, #000080, #1084d7)',
                color: 'white',
                fontSize: '11px',
                fontWeight: 'bold',
                padding: '4px 6px',
                marginBottom: '10px'
              }}
            >
              Password Required
            </div>

            <div style={{ fontSize: '12px', marginBottom: '8px' }}>
              {passwordDialog.title} is locked.
            </div>

            <div style={{ fontSize: '12px', color: '#a00000', marginBottom: '10px' }}>
              Attempts remaining: {3 - activePasswordAttempts}
            </div>

            <input
              className={shakePassword ? 'shake' : ''}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submitPassword();
              }}
              style={{
                width: '100%',
                padding: '6px',
                marginBottom: '10px',
                border: shakePassword ? '2px inset #ff4444' : '2px inset #c0c0c0'
              }}
              type="password"
              autoFocus
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
              <button
                onClick={() => {
                  setPasswordDialog(null);
                  setPasswordInput('');
                  setShakePassword(false);
                }}
              >
                Cancel
              </button>
              <button onClick={submitPassword}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}