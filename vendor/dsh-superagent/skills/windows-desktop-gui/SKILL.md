---
name: windows-desktop-gui
description: Default Windows Desktop GUI interaction policy combining CursorTouch/Windows-MCP UIAutomation accessibility tree tools, DSH native sandboxed PowerShell/FS tools, and .NET UIAutomation fallback.
---

# Windows Desktop GUI & System Control Policy

## 1. Dual-Layer Default Execution Architecture
- **Default Desktop GUI Engine**: `Windows-MCP (CursorTouch/Windows-MCP)`
- **Native Sandbox Shell Enforcement**: `ENABLED` (Strictly use DSH native `pwsh`/`bash` & `fs` tools; NEVER call `mcp__windows_mcp__Powershell-Tool`)
- **Set-of-Marks Vision Fallback**: `ENABLED` (Use `State-Tool` with `use_vision=true` when UIAutomation tree is empty)
- **Automatic .NET UIAutomation Fallback**: `ENABLED`

## 2. When Controlling Desktop GUI Applications (Windows-MCP Primary)
1. **Inspect Accessibility Tree First**: Call `mcp__windows_mcp__State-Tool` (`use_vision=false` first for low latency; set `use_vision=true` if interacting with Canvas/games/custom-drawn controls).
2. **Execute Atomic GUI Actions**:
   - Click controls by coordinates from `State-Tool`: `mcp__windows_mcp__Click-Tool` (`loc=[x, y]`, `button="left"`, `clicks=1`).
   - Input text into fields: `mcp__windows_mcp__Type-Tool` (`loc=[x, y]`, `text="..."`, `clear=false`, `press_enter=true`).
   - Launch / switch / resize windows: `mcp__windows_mcp__App-Tool` (`mode="launch" | "switch" | "resize"`).
   - Send hotkeys: `mcp__windows_mcp__Shortcut-Tool` (`shortcut="ctrl+c"`, `"alt+tab"`, etc.).

## 3. When Executing System Commands, Scripts, or File I/O
- **ALWAYS** use DSH native tools (`pwsh` / `bash`, `read_file`, `write_file`, `edit_file`) which run inside the DSH Windows ACL Restricted Token Sandbox and Win32 Job Objects.
- **NEVER** use `mcp__windows_mcp__Powershell-Tool` for file or shell operations.

## 4. Zero-Dependency Fallback (.NET UIAutomation via Native `pwsh`)
If `mcp__windows_mcp__*` tools are offline or unavailable on the target Windows host, fall back to querying the Windows UIAutomation tree directly via the native `pwsh` tool:
```powershell
Add-Type -AssemblyName UIAutomationClient, UIAutomationTypes
$root = [System.Windows.Automation.AutomationElement]::RootElement
$cond = New-Object System.Windows.Automation.PropertyCondition(
  [System.Windows.Automation.AutomationElement]::IsOffscreenProperty, $false
)
$root.FindAll([System.Windows.Automation.TreeScope]::Children, $cond) |
  Select-Object @{N="Name";E={$_.Current.Name}}, @{N="Class";E={$_.Current.ClassName}}, @{N="Rect";E={$_.Current.BoundingRectangle}}
```
