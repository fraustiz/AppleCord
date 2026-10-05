# Applecord

Un thème Vencord / Equicord qui habille Discord en **Liquid Glass**, à la manière d'une app iOS 27 / macOS Tahoe.

Il suit les principes du skill `apple-design` (`.agents/skills/apple-design`) :

- **Le contenu sur un fond système, le verre pour la navigation.** Le chat et la liste des membres reposent directement sur `systemBackground` (noir en mode sombre). La couche de navigation flotte en verre : la barre latérale (serveurs + salons), le panneau utilisateur et la zone de saisie.
- **Tout ce qui s'ouvre au-dessus de Discord est en verre** : menus, popouts (épinglés, fils, boîte de réception, recherche, profils), modales et paramètres, sélecteur d'emojis/GIF, listes déroulantes, infobulles, barre d'actions des messages, visionneuse d'images, toasts. Les surfaces sont reconnues par rôle ARIA et par structure, pas une par une, pour que les nouvelles fenêtres de Discord soient couvertes d'office.
- **Coins concentriques.** Le panneau utilisateur est inséré de 8 px dans la barre latérale : son rayon vaut celui de la barre latérale moins 8 px. Même règle pour les éléments des menus.
- **Couleurs système Apple** : labels, fills, séparateurs, bleu système `#0A84FF` à la place du blurple, interrupteurs verts comme sur iOS, logo Apple à la place du logo Discord.
- **Typographie SF** avec un interlettrage adapté à chaque taille.
- **Des ressorts plutôt que des courbes fixes.** Les paramètres d'Apple (amortissement + temps de réponse) sont convertis en `linear()` CSS au moment du build. Le retour visuel est immédiat à l'appui, puis le bouton revient avec un léger rebond.
- **Accessibilité** : `prefers-reduced-motion`, le réglage « Réduire les animations » de Discord, `prefers-reduced-transparency` et `prefers-contrast`.

## Installation

Le fichier à utiliser est `dist/Applecord.theme.css`.

- **Extension navigateur Equicord / Vencord** : Paramètres → Equicord (ou Vencord) → Thèmes → « Edit QuickCSS ». Colle le contenu de `dist/Applecord.theme.css`.
- **Vesktop / Discord + Equicord** : Paramètres → Thèmes → « Open Themes Folder ». Copie `dist/Applecord.theme.css` dans ce dossier, puis active « Applecord ».

## Développement

```bash
npm run dev     # recompile dist/ à chaque modification de src/
npm run build   # build unique
```

Pour un aperçu rapide sans client modifié, colle `dist/inject.js` dans la console DevTools de discord.com. Le CSP de Discord autorise les `<style>` inline, mais bloque les feuilles de style servies depuis localhost.

Pour repérer une fenêtre qui ne serait pas encore en verre, colle `dev/audit.js` dans la même console, ouvre la fenêtre, puis lance `acAudit()`. Les lignes `NO-GLASS` sont des surfaces opaques que le thème ne couvre pas.

### Structure

| Fichier | Rôle |
| --- | --- |
| `src/00-tokens.css` | Tous les réglages `--ac-*` : couleurs, verre, rayons, typo |
| `src/10-palette.css` | Variables de Discord remappées vers les couleurs système Apple |
| `src/20-base.css` | Fond, police, interlettrage |
| `src/30-layout.css` | Barre latérale flottante, panneau utilisateur, couche de contenu |
| `src/40-components.css` | Zone de saisie, interrupteurs, menus, infobulles, messages |
| `src/45-overlays.css` | Le verre de tout ce qui s'ouvre au-dessus de Discord |
| `src/50-motion.css` | Retour à l'appui, apparition des menus |
| `src/90-accessibility.css` | Mouvements réduits, transparence réduite, contraste élevé |
| `build.mjs` | Assemble `src/`, génère les ressorts `linear()`, développe les `@custom-selector`, écrit `inject.js` |
| `dev/audit.js` | Liste les surfaces opaques restantes dans les fenêtres ouvertes |

Les sélecteurs ciblent le début des noms de classes (`[class^="sidebar_"]`) et la structure du DOM, pas les hashes (`sidebar__5e434`). Ils résistent donc aux mises à jour de Discord tant que les composants gardent leur nom.

## Personnaliser

Surcharge les tokens dans QuickCSS, après le thème :

```css
:root {
  --ac-accent: #bf5af2;   /* violet système */
  --ac-bg: #1c1c1e;       /* fond moins noir */
  --ac-radius-pane: 28px;
  --ac-home-glyph: url("…svg"); /* icône du bouton Accueil */
}
```
