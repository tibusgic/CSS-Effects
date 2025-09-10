# Contribuer à CSS Effects Studio

Merci de votre intérêt pour contribuer au projet ! 🎉

## 🔍 Comment Contribuer

### 1. Ajouter un Nouvel Effet

1. **Créez un fichier CSS** dans `assets/css/` pour votre effet
2. **Ajoutez l'effet** dans `effects.css`
3. **Mettez à jour** le HTML dans `index.html`
4. **Testez** sur différents navigateurs

### 2. Structure d'un Effet

```css
/* Nom de l'effet */
.votre-effet {
  /* Propriétés de base */
  width: 100px;
  height: 100px;
  position: relative;
  /* Animation principale */
  animation: votreAnimation 2s infinite;
}

/* Pseudo-éléments si nécessaire */
.votre-effet::before {
  content: '';
  position: absolute;
  /* ... */
}

/* Keyframes */
@keyframes votreAnimation {
  0% { /* État initial */ }
  50% { /* État intermédiaire */ }
  100% { /* État final */ }
}
```

### 3. Guidelines

- ✅ Utilisez les variables CSS du projet
- ✅ Commentez les animations complexes
- ✅ Testez la responsivité
- ✅ Vérifiez les performances
- ✅ Suivez le style de code existant

### 4. Catégories d'Effets

- **Texte** : Effets typographiques
- **Animation** : Mouvements et transitions
- **3D** : Effets tridimensionnels
- **Néon** : Effets lumineux

### 5. Process de Review

1. Fork du repository
2. Création d'une branche feature
3. Développement de l'effet
4. Tests et validation
5. Pull Request avec description détaillée

## 📋 Checklist

Avant de soumettre votre contribution :

- [ ] L'effet fonctionne sur Chrome, Firefox, Safari
- [ ] Le code est bien commenté
- [ ] L'effet est responsive
- [ ] Les performances sont optimales
- [ ] La documentation est mise à jour

## 🐛 Rapporter un Bug

1. Vérifiez que le bug n'existe pas déjà
2. Créez une issue détaillée
3. Incluez les étapes de reproduction
4. Mentionnez votre environnement (OS, navigateur)

## 💡 Proposer une Fonctionnalité

1. Ouvrez une issue "Feature Request"
2. Décrivez l'utilité de la fonctionnalité
3. Proposez une implémentation si possible

---

Merci pour votre contribution ! 🙏
