const spaceBackground = document.querySelector('.space-background') as HTMLElement;

// 确保 spaceBackground 已经被正确选中
if (spaceBackground) {
  // 生成 35 个星星
  for (let i = 0; i < 30; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // 随机设置位置
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

    // 随机设置大小（大星星和小星星）
    const size = Math.random() * 3 + 1; // 1px ~ 4px
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // 根据大小调整闪烁速度和延迟
    star.style.animationDuration = `${Math.random() * 3 + 2}s`; // 随机闪烁速度
    star.style.animationDelay = `${Math.random() * 3}s`;        // 随机延迟

    spaceBackground.appendChild(star);
  }
}