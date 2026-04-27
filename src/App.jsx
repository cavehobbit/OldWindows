import { useState, useRef, useEffect } from 'react';

export default function App() {
  const [desktopIcons, setDesktopIcons] = useState([
    { id: 'mycomputer', label: 'My Computer', icon: '💾', x: 20, y: 20 },
    { id: 'mydocs', label: 'My Documents', icon: '📁', x: 20, y: 100 },
    { id: 'recycle', label: 'Recycle Bin', icon: '🗑️', x: 20, y: 180 },
    { id: 'inbox', label: 'Inbox', icon: '📧', x: 20, y: 260 },
  ]);

  const [windows, setWindows] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [clock, setClock] = useState('');
  const windowRef = useRef(null);
  const [draggedWindow, setDraggedWindow] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setClock(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const openWindow = (id, label) => {
    const existingWindow = windows.find(w => w.id === id);
    if (existingWindow) {
      setWindows(windows.filter(w => w.id !== id).concat(existingWindow));
      return;
    }

    const newWindow = {
      id,
      label,
      x: Math.random() * 200 + 100,
      y: Math.random() * 200 + 100,
      width: 500,
      height: 400,
      minimized: false,
      content: id,
    };

    setWindows([...windows, newWindow]);
    setSelectedIcon(null);
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

  const handleDesktopIconClick = (id) => {
    setSelectedIcon(selectedIcon === id ? null : id);
  };

  const handleDesktopIconDoubleClick = (id) => {
    openWindow(id, desktopIcons.find(i => i.id === id)?.label);
  };

  const handleDesktopRightClick = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleWindowMouseDown = (e, id) => {
    if (e.target.closest('.window-btn') || e.target.closest('.file-item')) return;
    
    const window = windows.find(w => w.id === id);
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

  return (
    <div className="desktop" onClick={() => setContextMenu(null)}>
      <div className="desktop-content">
        {desktopIcons.map(icon => (
          <div
            key={icon.id}
            className={`desktop-icon ${selectedIcon === icon.id ? 'selected' : ''}`}
            style={{ left: `${icon.x}px`, top: `${icon.y}px` }}
            onClick={() => handleDesktopIconClick(icon.id)}
            onDoubleClick={() => handleDesktopIconDoubleClick(icon.id)}
            onContextMenu={handleDesktopRightClick}
          >
            <div className="icon-image">{icon.icon}</div>
            <div className="icon-label">{icon.label}</div>
          </div>
        ))}

        {windows.map(window => (
          !window.minimized && (
            <div
              key={window.id}
              className="window"
              style={{
                left: `${window.x}px`,
                top: `${window.y}px`,
                width: `${window.width}px`,
                height: `${window.height}px`,
              }}
              onMouseDown={() => setWindows(windows.map(w => w.id === window.id ? { ...w } : w))}
            >
              <div
                className="window-title"
                onMouseDown={(e) => handleWindowMouseDown(e, window.id)}
              >
                <span className="window-title-text">{window.label}</span>
                <div className="window-buttons">
                  <button
                    className="window-btn"
                    onClick={() => minimizeWindow(window.id)}
                  >
                    _
                  </button>
                  <button className="window-btn">□</button>
                  <button
                    className="window-btn"
                    onClick={() => closeWindow(window.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="window-content">
                <WindowContent type={window.content} />
              </div>
            </div>
          )
        ))}

        {contextMenu && (
          <div
            className="context-menu"
            style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
          >
            <div className="context-menu-item">Refresh</div>
            <div className="context-menu-item">Properties</div>
          </div>
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

function WindowContent({ type }) {
  const getContent = () => {
    switch (type) {
      case 'mycomputer':
        return (
          <div className="folder-view">
            <div className="folder-path">C:\</div>
            <div className="folder-items">
              <div className="file-item">
                <div className="file-icon">📁</div>
                <span>Program Files</span>
              </div>
              <div className="file-item">
                <div className="file-icon">📁</div>
                <span>My Documents</span>
              </div>
              <div className="file-item">
                <div className="file-icon">📁</div>
                <span>Windows</span>
              </div>
              <div className="file-item">
                <div className="file-icon">📁</div>
                <span>Games</span>
              </div>
              <div className="file-item">
                <div className="file-icon">📁</div>
                <span>System32</span>
              </div>
            </div>
          </div>
        );
      case 'mydocs':
        return (
          <div className="folder-view">
            <div className="folder-path">C:\My Documents</div>
            <div className="folder-items">
              <div className="file-item">
                <div className="file-icon">📁</div>
                <span>Photos_1998</span>
              </div>
              <div className="file-item">
                <div className="file-icon">📁</div>
                <span>Work_Files</span>
              </div>
              <div className="file-item">
                <div className="file-icon">📄</div>
                <span>Diary.txt</span>
              </div>
              <div className="file-item">
                <div className="file-icon">📁</div>
                <span>Finances</span>
              </div>
            </div>
          </div>
        );
      case 'recycle':
        return (
          <div className="folder-view">
            <div className="folder-path">Recycle Bin</div>
            <div className="folder-items">
              <div className="file-item">
                <div className="file-icon">📄</div>
                <span>DeletedFile_Secret.txt</span>
              </div>
              <div className="file-item">
                <div className="file-icon">📁</div>
                <span>OldBackups</span>
              </div>
            </div>
          </div>
        );
      case 'inbox':
        return (
          <div className="folder-view">
            <div className="folder-path">Inbox</div>
            <div className="folder-items">
              <div className="file-item">
                <div className="file-icon">📧</div>
                <span>AOL_Welcome.eml</span>
              </div>
              <div className="file-item">
                <div className="file-icon">📧</div>
                <span>Birthday_Message.eml</span>
              </div>
              <div className="file-item">
                <div className="file-icon">📧</div>
                <span>NetScape_Alert.eml</span>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Window content here</div>;
    }
  };

  return getContent();
}