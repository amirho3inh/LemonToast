# 🍋 LemonToast

**LemonToast** is a flexible and modern toast notification library built with vanilla JavaScript and styled using TailwindCSS. It supports themes, multiple styles, icons, progress bars, smooth animations, RTL layout, and action buttons — all customizable with a simple API.

---

## 🚀 Features

- Light / Dark / Auto Theme Support
- Multiple Positions & Concurrent Toasts
- Progress Bar
- Multiple Visual Styles (`glass`, `neumorphic`, `rounded`, etc.)
- Custom Icons
- RTL Support
- Entry/Exit Animations
- Optional Action Button
- Fully Customizable

---

## 📦 Installation

### 1. Include LemonToast in your HTML

```html
<!-- CSS -->
<link rel="stylesheet" href="lemonToast.min.css" />

<!-- Script -->
<script src="lemonToast.min.js"></script>
```

> Make sure TailwindCSS is loaded before `lemonToast.css`.

---

## 📚 Usage

```js
LemonToast.show({
  title: 'Test Notification',
  message: 'Operation <strong>completed successfully</strong>!',
  type: 'success',              // success | error | warning | info
  icon: '✅',                   // Any emoji or HTML
  rtl: true,                   // Enable Right-to-Left layout
  duration: 5000,              // Duration in milliseconds
  position: 'top-left',        // top-right | top-left | bottom-right | bottom-center | ...
  style: 'glass',              // default | glass | neumorphic | rounded
  typeStyle: 'outline',        // filled | outline
  theme: 'auto',               // light | dark | auto
  progress: true,              // Show progress bar
  animation: 'bounce',         // fade | slide | zoom | bounce | flip
  showCloseButton: false,      // Hide/Show close (×) button
  action: {
    label: 'Undo',
    onClick: () => alert('Undo clicked!')
  },
  onShow: () => console.log('Toast shown'),
  onClose: () => console.log('Toast closed')
});
```

---

## 🧩 Options Reference

| Option           | Type       | Default    | Description |
|------------------|------------|------------|-------------|
| `title`          | `string`   | `''`       | Optional title above the message |
| `message`        | `string`   | `''`       | Toast message (HTML allowed) |
| `type`           | `string`   | `'info'`   | `success`, `error`, `warning`, `info` |
| `icon`           | `string`   | `''`       | Emoji or HTML icon |
| `rtl`            | `boolean`  | `false`    | Enables right-to-left layout |
| `duration`       | `number`   | `4000`     | Auto-dismiss duration in ms |
| `position`       | `string`   | `'top-right'` | Toast position |
| `style`          | `string`   | `'default'` | `default`, `glass`, `neumorphic`, `rounded` |
| `typeStyle`      | `string`   | `'filled'` | `filled` or `outline` appearance for type |
| `theme`          | `string`   | `'auto'`   | Light/Dark theme detection |
| `progress`       | `boolean`  | `false`    | Show progress bar |
| `animation`      | `string`   | `'fade'`   | Entry/exit animation |
| `showCloseButton`| `boolean`  | `true`     | Display the close (×) button |
| `action`         | `object`   | `null`     | `{ label: string, onClick: function }` |
| `onShow`         | `function` | `null`     | Callback on toast show |
| `onClose`        | `function` | `null`     | Callback on toast close |

---

## 🎨 Styles

- `default`: Clean and minimal
- `glass`: Frosted blur effect with transparency
- `neumorphic`: Soft shadows and 3D feel
- `rounded`: Fully rounded pill-like design

---

## 🖼 Type Styles

- `filled`: Solid background color
- `outline`: Transparent background with border

---

## 🎬 Animations

Animations support both entry and exit effects:

- `fade`
- `slide`
- `zoom`
- `bounce`
- `flip`

Each animation is smooth and designed with CSS for performance.

---

## 🌗 Themes

- `light`: Light mode only
- `dark`: Dark mode only
- `auto`: Follows system preference (`prefers-color-scheme`)

---

## 📁 File Structure

```
/LemonToast
│
├── lemonToast.js
├── lemonToast.min.js
├── lemonToast.css
└── lemonToast.min.css
```

---

## 🛠 Customization

You can extend `LemonToast` by:

- Adding new animations in `lemonToast.css`
- Creating custom styles or type variants
- Integrating with frameworks (React, Vue, Alpine.js)
- Localizing buttons and content

---

## 🧪 Example

```js
LemonToast.show({
  title: 'Error',
  message: 'There was a problem connecting to the server.',
  type: 'error',
  icon: '⚠️',
  position: 'bottom-center',
  style: 'neumorphic',
  theme: 'dark',
  typeStyle: 'outline',
  animation: 'slide',
  progress: true
});
```

---

## 📜 License

MIT License — Free for personal and commercial use.

---

## ✨ Author

Crafted with ❤️ by Amirhossein
