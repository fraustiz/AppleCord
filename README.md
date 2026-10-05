<div align="center">

# Applecord

**Discord en Liquid Glass, façon iOS 27 et macOS Tahoe.**
<br>
Un thème pour [Equicord](https://github.com/Equicord/Equicord) et [Vencord](https://vencord.dev).

</div>

## Ce que fait le thème

- **Le contenu sur le fond système, le verre pour la navigation.** Le chat repose directement sur le noir de `systemBackground`, sans papier peint ni dégradé décoratif. Ce qui flotte au-dessus est en verre : la barre latérale (serveurs + salons), le panneau utilisateur, la zone de saisie.
- **Tout ce qui s'ouvre au-dessus de Discord est en verre** : menus et sous-menus, popouts (épinglés, fils, boîte de réception, recherche, profils), modales et paramètres, sélecteur d'emojis, autocomplétion, listes déroulantes, infobulles, barre d'actions des messages, visionneuse d'images. Les surfaces sont reconnues par rôle ARIA et par structure, donc les nouvelles fenêtres de Discord sont couvertes d'office.
- **Les codes Apple** : couleurs système (labels, fills, séparateurs), bleu `#0A84FF` à la place du blurple, interrupteurs verts, boutons en capsule, coches dans les menus, typographie SF avec un interlettrage par taille, logo Apple sur le bouton Accueil.
- **Coins concentriques.** Un élément inséré dans un autre a pour rayon celui du parent moins l'écart : le panneau utilisateur dans la barre latérale, les lignes dans les menus.
- **Des ressorts plutôt que des courbes fixes.** Les paramètres d'Apple (amortissement, temps de réponse) sont convertis en courbes CSS `linear()` au build. Le retour est immédiat à l'appui, avec un léger rebond au relâchement.
- **Pages revues** : liste d'amis façon liste iOS, Nitro et Boutique façon App Store, salons vocaux façon FaceTime.

## Installation

Le thème tient dans un seul fichier : [`dist/Applecord.theme.css`](dist/Applecord.theme.css).

**Par lien (mises à jour automatiques).** Dans Equicord ou Vencord : *Paramètres → Thèmes → Thèmes en ligne*, ajoute :

```
https://raw.githubusercontent.com/fraustiz/AppleCord/main/dist/Applecord.theme.css
```

**Extension navigateur.** *Paramètres → Thèmes → Edit QuickCSS*, puis colle le contenu du fichier.

**Vesktop / Discord + Equicord.** *Paramètres → Thèmes → Open Themes Folder*, copie le fichier dans ce dossier et active « Applecord ».

> [!NOTE]
> Le thème est conçu pour l'apparence sombre de Discord.

## Personnaliser

Tous les réglages sont des variables `--ac-*` ([`src/00-tokens.css`](src/00-tokens.css)). Surcharge-les dans QuickCSS, après le thème :

```css
:root {
  --ac-accent: #bf5af2;          /* teinte : violet système */
  --ac-bg: #1c1c1e;              /* fond un peu moins noir */
  --ac-radius-pane: 28px;        /* rayon de la barre latérale et des fenêtres */
  --ac-glass-menu: rgba(255, 255, 255, 0.16); /* menus plus dépolis */
  --ac-glass-menu-blur: 12px;    /* … et plus transparents */
  --ac-home-glyph: url("data:image/svg+xml,…"); /* icône du bouton Accueil */
}
```

| Variable | Rôle |
| --- | --- |
| `--ac-accent` | Teinte des actions, sélections, liens |
| `--ac-bg` | Fond du contenu |
| `--ac-glass-sidebar`, `--ac-glass-plate`, `--ac-glass-popover` | Densité du verre : barre latérale, plaques (saisie, profil), fenêtres |
| `--ac-glass-menu`, `--ac-glass-menu-blur`, `--ac-glass-menu-dim` | Verre dépoli des menus : voile, flou, atténuation de l'arrière-plan |
| `--ac-radius-pane`, `--ac-radius-card`, `--ac-inset` | Rayons et retrait (les rayons internes en découlent) |
| `--ac-home-glyph` | Icône du bouton Accueil (n'importe quel SVG monochrome) |

## Accessibilité

Le thème suit les réglages du système et de Discord :

- **Réduire les animations** (macOS ou Discord) : les ressorts deviennent de simples fondus, sans zoom ni rebond.
- **Réduire la transparence** : le verre devient opaque, la hiérarchie reste la même.
- **Augmenter le contraste** : labels plus clairs, séparateurs et bords plus marqués, verre quasi opaque.

## Développer

```bash
npm run dev     # recompile dist/ à chaque modification de src/
npm run build   # build unique
```

- **Aperçu sans client modifié** : colle [`dist/inject.js`](dist/inject.js) dans la console DevTools de discord.com.
- **Trouver une fenêtre oubliée** : colle [`dev/audit.js`](dev/audit.js), ouvre la fenêtre, lance `acAudit()`. Chaque ligne `NO-GLASS` est une surface opaque que le thème ne couvre pas encore.

| Fichier | Rôle |
| --- | --- |
| `src/00-tokens.css` | Réglages `--ac-*` : couleurs, verre, rayons, typo |
| `src/10-palette.css` | Variables de Discord remappées vers les couleurs système |
| `src/20-base.css` | Fond, police, interlettrage |
| `src/30-layout.css` | Barre latérale flottante, panneau utilisateur, couche de contenu |
| `src/40-components.css` | Saisie, boutons, interrupteurs, menus, amis, Boutique, vocal |
| `src/45-overlays.css` | Le verre de tout ce qui s'ouvre au-dessus de Discord |
| `src/50-motion.css` | Retour à l'appui, apparition des menus |
| `src/90-accessibility.css` | Mouvements réduits, transparence réduite, contraste élevé |
| `build.mjs` | Assemble `src/`, génère les ressorts, développe les `@custom-selector` |
| `dev/audit.js` | Liste les surfaces opaques restantes dans les fenêtres ouvertes |

Les sélecteurs visent le début des noms de classes (`[class^="sidebar_"]`) et la structure du DOM, jamais les hashes (`sidebar__5e434`) : le thème survit aux mises à jour de Discord tant que les composants gardent leur nom.

## Crédits

Principes de design et de mouvement tirés du skill [`apple-design`](https://github.com/emilkowalski/skills) d'Emil Kowalski, lui-même issu des sessions WWDC d'Apple.

<sub>Projet indépendant, sans lien avec Apple Inc. ni Discord Inc. Apple et le logo Apple sont des marques d'Apple Inc., Discord est une marque de Discord Inc.</sub>
