// CSS Effects Studio - JavaScript Principal

document.addEventListener('DOMContentLoaded', function() {
  // Éléments DOM
  const searchInput = document.getElementById('searchInput');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const demos = document.querySelectorAll('.demo');
  const activeCount = document.getElementById('activeCount');

  // Fonction de recherche
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const tableRows = document.querySelectorAll('tbody tr:not(.category-header)');
    
    tableRows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
  });

  // Gestion des filtres
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      filterTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.dataset.filter;
      demos.forEach(demo => {
        if (filter === 'all' || demo.dataset.category === filter) {
          demo.style.display = 'flex';
        } else {
          demo.style.display = 'none';
        }
      });
    });
  });

  // Gestion des checkboxes
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const target = this.dataset.target;
      const demo = document.querySelector(`[data-category] .${target}`)?.closest('.demo');
      
      if (demo) {
        demo.style.opacity = this.checked ? '1' : '0.3';
      }
      
      updateActiveCount();
    });
  });

  // Mise à jour du compteur
  function updateActiveCount() {
    const activeCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    activeCount.textContent = activeCheckboxes.length;
  }

  // Boutons d'action
  document.getElementById('exportBtn').addEventListener('click', function() {
    exportCSS();
  });

  document.getElementById('previewBtn').addEventListener('click', function() {
    togglePreviewMode();
  });

  document.getElementById('themeBtn').addEventListener('click', function() {
    toggleTheme();
  });

  // Fonction d'export CSS
  function exportCSS() {
    const activeEffects = [];
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const effectName = checkbox.dataset.target;
        activeEffects.push(effectName);
      }
    });
    
    // Créer le contenu CSS à exporter
    const cssContent = generateCSSExport(activeEffects);
    
    // Créer et télécharger le fichier
    const blob = new Blob([cssContent], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'css-effects-studio.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('CSS exporté avec succès !', 'success');
  }

  // Générateur de CSS pour l'export
  function generateCSSExport(effects) {
    let css = `/* CSS Effects Studio - Export personnalisé */\n`;
    css += `/* Généré le ${new Date().toLocaleDateString()} */\n\n`;
    css += `/* Variables CSS */\n`;
    css += `:root {\n`;
    css += `  --neon: #7afcff;\n`;
    css += `  --neon2: #c85cff;\n`;
    css += `  --purple: #8b5cf6;\n`;
    css += `  --orange: #f97316;\n`;
    css += `  --green: #10b981;\n`;
    css += `  --red: #ef4444;\n`;
    css += `  --yellow: #eab308;\n`;
    css += `}\n\n`;
    
    effects.forEach(effect => {
      css += `/* Effet: ${effect} */\n`;
      css += getEffectCSS(effect);
      css += `\n\n`;
    });
    
    return css;
  }

  // Obtenir le CSS spécifique d'un effet
  function getEffectCSS(effectName) {
    // Cette fonction devrait retourner le CSS spécifique à chaque effet
    // Pour simplifier, on retourne un commentaire
    return `/* CSS pour l'effet ${effectName} à implémenter */`;
  }

  // Mode aperçu
  function togglePreviewMode() {
    const playground = document.querySelector('.playground');
    playground.classList.toggle('preview-mode');
    
    if (playground.classList.contains('preview-mode')) {
      playground.style.gridTemplateColumns = 'repeat(auto-fill, minmax(400px, 1fr))';
      showNotification('Mode aperçu activé', 'info');
    } else {
      playground.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
      showNotification('Mode aperçu désactivé', 'info');
    }
  }

  // Basculement de thème
  function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const btn = document.getElementById('themeBtn');
    
    if (document.body.classList.contains('light-theme')) {
      btn.textContent = '☀️ Mode Clair';
      showNotification('Thème clair activé', 'info');
    } else {
      btn.textContent = '🌙 Mode Sombre';
      showNotification('Thème sombre activé', 'info');
    }
  }

  // Système de notifications
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    
    switch(type) {
      case 'success':
        notification.style.background = 'linear-gradient(45deg, #10b981, #059669)';
        break;
      case 'error':
        notification.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';
        break;
      default:
        notification.style.background = 'linear-gradient(45deg, #3b82f6, #2563eb)';
    }
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Animation d'entrée pour les démos
  demos.forEach((demo, index) => {
    demo.style.animationDelay = `${index * 0.1}s`;
    demo.style.animation = 'fadeInUp 0.6s ease forwards';
  });

  // Gestion des boutons de code
  document.querySelectorAll('.code-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const demo = this.closest('.demo');
      const effectClass = demo.querySelector('[class*="glitch"], [class*="shimmer"], [class*="radar"]')?.className;
      
      if (effectClass) {
        copyToClipboard(getEffectHTML(effectClass));
        showNotification('Code copié dans le presse-papiers !', 'success');
      }
    });
  });

  // Copier dans le presse-papiers
  function copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      // Fallback pour les navigateurs plus anciens
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }

  // Générer le HTML d'exemple pour un effet
  function getEffectHTML(effectClass) {
    return `<!-- CSS Effects Studio - ${effectClass} -->
<div class="${effectClass}">
  <!-- Votre contenu ici -->
</div>

<!-- N'oubliez pas d'inclure le CSS correspondant -->`;
  }

  // Initialisation
  updateActiveCount();
  
  // Charger les effets CSS
  loadEffectsCSS();
});

// Charger le fichier CSS des effets
function loadEffectsCSS() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = './assets/css/effects.css';
  document.head.appendChild(link);
}

// Animation d'entrée
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Thème clair */
  .light-theme {
    background: linear-gradient(120deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%) !important;
    color: #1e293b !important;
  }
  
  .light-theme .panel {
    background: linear-gradient(145deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.01)) !important;
    border-color: rgba(0, 0, 0, 0.1) !important;
  }
  
  .light-theme .demo {
    background: linear-gradient(145deg, rgba(0, 0, 0, 0.02), rgba(255, 255, 255, 0.1)) !important;
    border-color: rgba(0, 0, 0, 0.1) !important;
  }
`;
document.head.appendChild(style);
