document.addEventListener('DOMContentLoaded', function () {

  const calcCategory = document.getElementById('calc-category');
  const calcComplexity = document.getElementById('calc-complexity');
  const calcSize = document.getElementById('calc-size');
  const calcRush = document.getElementById('calc-rush');
  const addonLed = document.getElementById('addon-led');
  const addonKnockdown = document.getElementById('addon-knockdown');
  const calcResult = document.getElementById('calc-result');
  const btnSendQuote = document.getElementById('btn-send-quote');

  function calculateQuote() {
    let basePrice = parseFloat(calcCategory.value) || 0;
    let complexityMultiplier = parseFloat(calcComplexity.value) || 1;
    let sizeCm = parseFloat(calcSize.value) || 100;
    let rushMultiplier = parseFloat(calcRush.value) || 1;

    let sizeCost = (sizeCm / 100) * 100000;
    let subtotal = (basePrice + sizeCost) * complexityMultiplier * rushMultiplier;

    if (addonLed && addonLed.checked) {
      subtotal += parseFloat(addonLed.value);
    }
    if (addonKnockdown && addonKnockdown.checked) {
      subtotal += parseFloat(addonKnockdown.value);
    }

    let finalTotal = Math.round(subtotal / 10000) * 10000;
    calcResult.textContent = 'Rp ' + finalTotal.toLocaleString('id-ID');
    return finalTotal;
  }

  if (calcCategory) {
    [calcCategory, calcComplexity, calcSize, calcRush, addonLed, addonKnockdown].forEach(element => {
      if (element) {
        element.addEventListener('change', calculateQuote);
        element.addEventListener('input', calculateQuote);
      }
    });
    calculateQuote();
  }

  if (btnSendQuote) {
    btnSendQuote.addEventListener('click', function () {
      let categoryText = calcCategory.options[calcCategory.selectedIndex].text;
      let complexityText = calcComplexity.options[calcComplexity.selectedIndex].text;
      let sizeValue = calcSize.value;
      let totalEstimated = calcResult.textContent;

      let waMessage = `Halo CosCraft Studio, saya ingin konsultasi order custom prop/kostum dengan rincian estimator:` +
        `%0A- Jenis: ${encodeURIComponent(categoryText)}` +
        `%0A- Kerumitan: ${encodeURIComponent(complexityText)}` +
        `%0A- Ukuran: ${sizeValue} cm` +
        `%0A- Estimasi Biaya: ${encodeURIComponent(totalEstimated)}` +
        `%0A%0AMohon info ketersediaan slot pengerjaannya ya!`;

      window.open(`https://wa.me/6281234567890?text=${waMessage}`, '_blank');
    });
  }

  const filterButtons = document.querySelectorAll('#portfolio-filters button');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      filterButtons.forEach(b => {
        b.classList.remove('btn-info', 'active');
        b.classList.add('btn-outline-secondary', 'text-white');
      });

      this.classList.remove('btn-outline-secondary', 'text-white');
      this.classList.add('btn-info', 'active');

      const filterValue = this.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const char = document.getElementById('contact-char').value;
      const msg = document.getElementById('contact-msg').value;

      const waMsg = `Halo CosCraft Studio, nama saya ${encodeURIComponent(name)}.` +
        `%0ASaya ingin konsultasi order custom untuk karakter: ${encodeURIComponent(char)}.` +
        `%0A%0A*Detail Pesan:*%0A${encodeURIComponent(msg)}`;

      window.open(`https://wa.me/6281234567890?text=${waMsg}`, '_blank');
    });
  }

});