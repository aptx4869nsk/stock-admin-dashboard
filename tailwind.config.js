/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

/**
 * darkMode: 'media' or 'class'
 * can put under 'content': [],
 使用 media：

自动切换：media 方式会根据用户的系统设置（如操作系统或浏览器）自动切换暗黑模式，无需手动操作。
简洁：无需在 HTML 元素上添加特定的类来切换暗黑模式，样式会根据系统设置自动应用。
一致性：可以确保用户在整个网站或应用程序中始终看到一致的暗黑模式样式。
使用 class：

手动控制：class 方式需要在 HTML 元素上手动添加 .dark 类来切换暗黑模式样式。
灵活性：可以根据需要选择性地在特定元素上应用暗黑模式样式，而不是整个网站或应用程序。
定制性：可以自定义类名，并根据项目需求定义自己的暗黑模式类。
 */
