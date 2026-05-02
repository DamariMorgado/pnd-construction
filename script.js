document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const label = item.querySelector('.gallery-label').textContent;
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox-cap').textContent = label;
    document.getElementById('lightbox').classList.add('active');
  });
});

function closeLightbox(e) {
  if (e.target === document.getElementById('lightbox')) {
    document.getElementById('lightbox').classList.remove('active');
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('lightbox').classList.remove('active');
});
