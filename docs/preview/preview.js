// Builds a fake Discord window with fictitious people and messages, so the
// README screenshots never show real accounts. ?scene=chat|menu|settings|profile

const scene = new URLSearchParams(location.search).get('scene') || 'chat';

// ── Assets (inline SVG, no network) ──────────────────────────────────────

const uri = (svg) => 'data:image/svg+xml,' + encodeURIComponent(svg);
const font = "-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif";

const avatar = (initials, a, b) => uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
  <rect width="80" height="80" fill="url(#g)"/>
  <text x="40" y="51" text-anchor="middle" font-family="${font}" font-size="30" font-weight="600" fill="#fff">${initials}</text></svg>`);

const banner = (a, b, c) => uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
    <filter id="f"><feGaussianBlur stdDeviation="28"/></filter>
  </defs>
  <rect width="600" height="260" fill="url(#g)"/>
  <g filter="url(#f)" opacity=".85">
    <circle cx="470" cy="60" r="90" fill="${c}"/><circle cx="120" cy="230" r="110" fill="#fff" opacity=".35"/>
  </g></svg>`);

// A fictitious weather app mockup, the "design" being discussed in the chat.
const weatherShot = uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b6fd6"/><stop offset="1" stop-color="#8fc6ff"/></linearGradient>
    <linearGradient id="sun" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#ffb02e"/></linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>
  <rect width="800" height="500" fill="url(#sky)"/>
  <circle cx="610" cy="120" r="70" fill="url(#sun)"/>
  <g fill="#fff" opacity=".9"><ellipse cx="190" cy="140" rx="110" ry="38"/><ellipse cx="250" cy="118" rx="70" ry="44"/><ellipse cx="540" cy="250" rx="90" ry="28"/></g>
  <rect x="70" y="250" width="320" height="200" rx="28" fill="#fff" fill-opacity=".22" stroke="#fff" stroke-opacity=".5"/>
  <text x="100" y="300" font-family="${font}" font-size="22" font-weight="600" fill="#fff">Lyon</text>
  <text x="96" y="390" font-family="${font}" font-size="86" font-weight="300" fill="#fff">21°</text>
  <text x="100" y="425" font-family="${font}" font-size="18" fill="#fff" fill-opacity=".85">Ensoleillé · Max 24° Min 13°</text>
  <rect x="430" y="330" width="300" height="120" rx="24" fill="#fff" fill-opacity=".22" stroke="#fff" stroke-opacity=".5"/>
  <g font-family="${font}" fill="#fff" font-size="16" text-anchor="middle">
    <text x="480" y="368">10h</text><text x="555" y="368">12h</text><text x="630" y="368">14h</text><text x="700" y="368">16h</text>
    <text x="480" y="425" font-size="22">19°</text><text x="555" y="425" font-size="22">21°</text><text x="630" y="425" font-size="22">23°</text><text x="700" y="425" font-size="22">22°</text>
  </g></svg>`);

const discordLogo = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="9"/></svg>`;

const icon = (d, size = 20) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const I = {
  hash: '<path d="M5 9h15M4 15h15M10 3 8 21M16 3l-2 18"/>',
  speaker: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  headphones: '<path d="M3 17v-4a9 9 0 0 1 18 0v4"/><rect x="3" y="14" width="4" height="7" rx="1.5"/><rect x="17" y="14" width="4" height="7" rx="1.5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  pin: '<path d="M12 17v5M9 3h6l-1 6 4 4H6l4-4z"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  threads: '<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 1 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 1 1 0 5"/>',
  smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  sticker: '<path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9.5L21 14.5V5a2 2 0 0 0-2-2z"/><path d="M14 21v-5a2 2 0 0 1 2-2h5"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
  chevDown: '<path d="m6 9 6 6 6-6"/>',
  chevRight: '<path d="m9 6 6 6-6 6"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  reply: '<path d="M9 14 4 9l5-5"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>',
  dots: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  devices: '<rect x="2" y="4" width="14" height="10" rx="2"/><rect x="17" y="8" width="5" height="12" rx="1.5"/><path d="M6 18h6"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  palette: '<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2a10 10 0 0 0 0 20c1 0 1.5-.8 1.5-1.6 0-.8-.6-1.2-.6-2 0-.9.7-1.6 1.6-1.6H17a5 5 0 0 0 5-5C22 6.6 17.5 2 12 2z"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
};

// ── People (all fictitious) ──────────────────────────────────────────────

const P = {
  lina:   { name: 'Lina',   tag: 'lina.design', a: '#ff9f0a', b: '#ff375f', color: '#ffffff', status: '' },
  maya:   { name: 'Maya',   a: '#64d2ff', b: '#0a84ff', color: '#ff9f0a', status: '', activity: 'Sur Figma' },
  leo:    { name: 'Léo',    a: '#30d158', b: '#0a7a3c', color: '#30d158', status: 'idle', activity: 'Écoute « Lo-fi Morning »' },
  ines:   { name: 'Inès',   a: '#bf5af2', b: '#5e5ce6', color: '#bf5af2', status: '', activity: 'Joue à Mini Metro' },
  hugo:   { name: 'Hugo',   a: '#ffd60a', b: '#ff9f0a', color: '#64d2ff', status: 'dnd', activity: 'Ne pas déranger' },
  sacha:  { name: 'Sacha',  a: '#ff375f', b: '#bf5af2', color: '#ff375f', status: '' },
  noe:    { name: 'Noé',    a: '#8e8e93', b: '#48484a' },
  camille:{ name: 'Camille',a: '#5ac8fa', b: '#30b0c7' },
  jade:   { name: 'Jade',   a: '#ff6482', b: '#ff2d55' },
};
for (const [k, p] of Object.entries(P)) p.img = avatar(p.name[0], p.a, p.b);

const av = (p, size, withStatus = true) =>
  `<div class="avatarWrap_ab12"><img src="${p.img}" width="${size}" height="${size}" alt="">${withStatus && p.status !== undefined ? `<i class="status_a423bd ${p.status}"></i>` : ''}</div>`;

// ── Base window ───────────────────────────────────────────────────────────

const guilds = [
  { label: 'SN', a: '#5e5ce6', b: '#bf5af2', selected: true },
  { label: 'PX', a: '#ff375f', b: '#ff9f0a', unread: true },
  { label: '☕', a: '#a2845e', b: '#5c4033' },
  { label: 'AT', a: '#30d158', b: '#0a84ff', badge: 3 },
  { label: 'OR', a: '#64d2ff', b: '#5e5ce6' },
  { label: 'JD', a: '#34c759', b: '#a8e063' },
  { label: 'SY', a: '#ff2d55', b: '#5856d6', unread: true },
  { label: 'CN', a: '#ffd60a', b: '#ff375f' },
  { label: 'RD', a: '#0a84ff', b: '#30b0c7' },
];

const guildRail = `
<nav class="wrapper_ef3116 guilds__5e434" aria-label="Serveurs"><div class="tree_ef3116"><div class="stack_dbd263 scroller_ef3116">
  <div class="listItem__650eb"><div class="wrapper__6e9f8" data-list-item-id="guildsnav___home"><div class="childWrapper__6e9f8">${discordLogo}</div></div></div>
  <div class="guildSeparator_d0696"></div>
  ${guilds.map((g, i) => `
  <div class="listItem__650eb">
    ${g.selected || g.unread ? `<span class="pill__58105 ${g.selected ? 'selected__58105' : ''}"></span>` : ''}
    <div class="wrapper__6e9f8" data-list-item-id="guildsnav___10${i}"><div class="childWrapper__6e9f8" style="background:linear-gradient(135deg,${g.a},${g.b})">${g.label}</div>
    ${g.badge ? `<span class="numberBadge_d5c4">${g.badge}</span>` : ''}</div>
  </div>`).join('')}
</div></div></nav>`;

const channel = (name, opts = {}) => `
  <li class="containerDefault__29444"><div class="wrapper__2ea32"><a class="link__2ea32 ${opts.selected ? 'selected__2ea32' : ''} ${opts.unread ? 'unread__2ea32' : ''}">${icon(opts.voice ? I.speaker : I.hash, 20)}<span>${name}</span></a></div></li>`;

const channelList = `
<div class="sidebarList__5e434 sidebarListRounded__5e434"><nav class="container__2637a" aria-label="Studio Nébula">
  <div class="bannerHeader_f37cb1"><img src="${banner('#5e5ce6', '#bf5af2', '#64d2ff')}" alt=""><header>Studio Nébula<span class="chev">${icon(I.chevDown, 18)}</span></header></div>
  <div class="scroller__629e4"><ul>
    <li class="category__29444">${icon(I.chevDown, 12)}Bienvenue</li>
    ${channel('annonces')}${channel('règles')}
    <li class="category__29444">${icon(I.chevDown, 12)}Studio</li>
    ${channel('général', { selected: true })}${channel('design', { unread: true })}${channel('inspiration')}${channel('feedback')}${channel('ressources')}
    <li class="category__29444">${icon(I.chevDown, 12)}Vocal</li>
    ${channel('Pair-design', { voice: true })}
    <li class="voiceUsers_a1b2"><div><img src="${P.maya.img}" alt="">Maya</div><div><img src="${P.leo.img}" alt="">Léo</div></li>
    ${channel('Salon détente', { voice: true })}
  </ul></div>
</nav></div>`;

const userPanel = `
<section class="panels__5e434" aria-label="Statut et paramètres de l'utilisateur">
  <div class="container__37e49">
    ${av(P.lina, 34)}
    <div class="names"><b>Lina</b><span>En ligne</span></div>
    <button class="panelButton_e131a9" aria-label="Micro">${icon(I.mic, 20)}</button>
    <button class="panelButton_e131a9" aria-label="Casque">${icon(I.headphones, 20)}</button>
    <button class="panelButton_e131a9" aria-label="Paramètres utilisateur">${icon(I.gear, 20)}</button>
  </div>
</section>`;

const msg = (p, time, html, opts = {}) => `
<li class="messageListItem__5126c">
  <div class="message__5126c ${opts.followUp ? 'followUp' : ''} ${opts.hovered ? 'hovered' : ''}" role="article">
    ${opts.followUp ? '' : `<img class="avatar_c19a55" src="${p.img}" alt="">
    <h3 class="header_c19a55"><span class="username_c19a55" style="color:${p.color}">${p.name}</span><span class="timestamp_c19a55">Aujourd'hui à ${time}</span></h3>`}
    <div class="messageContent_c19a55">${html}</div>
    ${opts.extra || ''}
    ${opts.hovered ? `<div class="buttons__5126c" role="group"><div class="buttonsInner__5126c popover_f84418">
      <div class="hoverBarButton_f84418" role="button">🔥</div><div class="hoverBarButton_f84418" role="button">👏</div><div class="hoverBarButton_f84418" role="button">✨</div>
      <div class="hoverBarButton_f84418" role="button">${icon(I.smile, 18)}</div><div class="hoverBarButton_f84418" role="button">${icon(I.reply, 18)}</div><div class="hoverBarButton_f84418" role="button">${icon(I.dots, 18)}</div>
    </div></div>` : ''}
  </div>
</li>`;

const messages = `
<li class="dateDivider_5126c">Aujourd'hui</li>
${msg(P.maya, '10:02', 'Bonjour l\'équipe ☀️ Qui est partant pour l\'atelier Figma de jeudi soir ?')}
${msg(P.leo, '10:04', 'Moi ! Je ramène les croissants 🥐')}
${msg(P.hugo, '10:05', 'Je bloque mon créneau 👌')}
${msg(P.ines, '10:12', 'J\'ai terminé la maquette de l\'app météo, vos retours sont les bienvenus 🙏', {
  extra: `<div class="imageWrapper_af017a"><img src="${weatherShot}" alt=""></div>
  <div class="reactions_23977b"><span class="reaction_23977b me">🔥 4</span><span class="reaction_23977b">😍 3</span><span class="reaction_23977b">👀 2</span></div>`,
})}
${msg(P.sacha, '10:15', 'Le verre sur les cartes est super propre. Tu as utilisé quoi comme flou ?', { hovered: scene === 'chat' })}
${msg(P.ines, '10:16', 'Un backdrop-filter à 30 px et une teinte légère, rien de plus ✨ <span class="mention_f61d60">@Sacha</span>')}
`;

const header = `
<div class="subtitleContainer_f75fb0"><section class="title_f75fb0" aria-label="En-tête du salon"><div class="upperContainer__9293f">
  <div class="children__9293f">${icon(I.hash, 22)}<span class="name">général</span><span class="divider"></span><span class="topic">Discussions du studio · soyez bienveillants</span></div>
  <div class="toolbar__9293f">
    <div role="button">${icon(I.threads)}</div><div role="button">${icon(I.bell)}</div><div role="button">${icon(I.pin)}</div><div role="button">${icon(I.users)}</div>
    <div class="searchBar__25bec">Rechercher${icon(I.search, 16)}</div>
  </div>
</div></section></div>`;

const composer = `
<form class="form_f75fb0"><div><div class="channelBottomBarArea_f75fb0"><div class="channelTextArea_f75fb0">
  <div class="scrollableContainer__74017 themedBackground__74017">
    <div class="attach_74017">${icon(I.plus, 16)}</div>
    <div class="placeholder_1b31f">Envoyer un message dans #général</div>
    <div class="buttons_74017"><div role="button">${icon(I.gift)}</div><div role="button">${icon(I.image)}</div><div role="button">${icon(I.sticker)}</div><div role="button">${icon(I.smile)}</div></div>
  </div>
</div></div></div></form>`;

const member = (p, offline) => `
<div class="member__5d473 member_c8ffbb ${offline ? 'offline' : ''}">${av(p, 32, !offline)}<div class="who"><b style="color:${offline ? 'inherit' : p.color}">${p.name}</b>${p.activity && !offline ? `<span>${p.activity}</span>` : ''}</div></div>`;

const members = `
<div class="container_c8ffbb"><aside class="membersWrap_c8ffbb"><div class="members_c8ffbb">
  <h3 class="membersGroup_c8ffbb">Équipe — 2</h3>${member(P.maya)}${member(P.hugo)}
  <h3 class="membersGroup_c8ffbb">En ligne — 4</h3>${member(P.ines)}${member(P.leo)}${member(P.sacha)}${member(P.lina)}
  <h3 class="membersGroup_c8ffbb">Hors ligne — 3</h3>${member(P.noe, true)}${member(P.camille, true)}${member(P.jade, true)}
</div></aside></div>`;

// ── Overlays ──────────────────────────────────────────────────────────────

const menuItem = (label, opts = {}) => `
<div class="item_c1e9c4 labelContainer_c1e9c4 ${opts.focused ? 'focused_c1e9c4' : ''} ${opts.danger ? 'colorDanger_c1e9c4' : ''}" role="${opts.role || 'menuitem'}" ${opts.checked !== undefined ? `aria-checked="${opts.checked}"` : ''}>
  <div class="label_c1e9c4">${label}${opts.sub ? `<span class="sub">${opts.sub}</span>` : ''}</div>
  ${opts.chevron ? icon(I.chevRight, 16) : ''}
  ${opts.role ? `<div class="iconContainer_c1e9c4"><svg width="18" height="18"><circle cx="9" cy="9" r="8" fill="none" stroke="currentColor"/></svg></div>` : ''}
  ${opts.children || ''}
</div>`;

const submenu = `
<div class="submenuPaddingContainer_c1e9c4"><div class="layer__529b0" style="position:static">
  <div class="submenu_c1e9c4 menu_c1e9c4" role="menu"><div class="scroller_c1e9c4">
    ${menuItem('Tous les messages', { role: 'menuitemradio', checked: false })}
    ${menuItem('@mentions seulement', { role: 'menuitemradio', checked: true })}
    ${menuItem('Rien', { role: 'menuitemradio', checked: false })}
    <div class="separator_c1e9c4" role="separator"></div>
    ${menuItem('Supprimer @everyone', { role: 'menuitemcheckbox', checked: true })}
    ${menuItem('Rendre muets les événements', { role: 'menuitemcheckbox', checked: false })}
  </div></div>
</div></div>`;

const contextMenu = `
<div class="layer__529b0" style="left:640px;top:332px">
  <div class="menu_c1e9c4 flexible_c1e9c4" role="menu" aria-label="Actions du message"><div class="scroller_c1e9c4">
    <div class="reactionRow_c1e9c4"><span>🔥</span><span>😍</span><span>👏</span><span>✨</span></div>
    ${menuItem('Ajouter une réaction', { chevron: true })}
    <div class="separator_c1e9c4" role="separator"></div>
    ${menuItem('Répondre')}
    ${menuItem('Transférer')}
    ${menuItem('Créer un fil')}
    <div class="separator_c1e9c4" role="separator"></div>
    ${menuItem('Notifications du fil', { chevron: true, focused: true, children: submenu })}
    ${menuItem('Épingler le message')}
    ${menuItem('Copier le lien du message')}
    <div class="separator_c1e9c4" role="separator"></div>
    ${menuItem('Signaler le message', { danger: true })}
  </div></div>
</div>`;

const btn = (label, kind = 'secondary') =>
  `<button class="button_a22cb0 md_a22cb0 ${kind}_a22cb0 hasText_a22cb0"><div class="buttonChildrenWrapper_a22cb0"><div class="buttonChildren_a22cb0"><span class="text-md/medium_cf4812">${label}</span></div></div></button>`;

const sw = (on) => `<label class="switch_a28278"><div class="switchIndicator_a28278"></div><svg class="thumb_a28278" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#fff"/></svg><span class="hiddenVisually_b18fe2"><input type="checkbox" ${on ? 'checked' : ''}></span></label>`;

const field = (label, value, actions) =>
  `<div class="fieldRow_e9e3ed"><div class="l"><b>${label}</b>${value}</div><div class="r">${actions}</div></div>`;

const settings = `
<div class="scrim__40128"></div>
<div class="dialog_x" role="dialog"><div class="outerContainer_e44912">
  <div class="container__8a031 modal_e44912 theme-dark"><div class="modalContent_e44912"><div class="container_abd9a8">
    <aside class="sidebar__409aa theme-dark">
      <div class="profileRow_409aa">${av(P.lina, 40)}<div><b>Lina</b><span>Modifier le profil</span></div></div>
      <div class="wrapper__72c38">${icon(I.search, 16)}<input class="input__75098" placeholder="Rechercher"></div>
      <div class="navItem_409aa selected">${icon(I.user, 18)}Mon compte</div>
      <div class="navItem_409aa">${icon(I.lock, 18)}Confidentialité</div>
      <div class="navItem_409aa">${icon(I.devices, 18)}Appareils</div>
      <div class="navItem_409aa">${icon(I.link, 18)}Connexions</div>
      <div class="navHeader_409aa">Paramètres de l'appli</div>
      <div class="navItem_409aa">${icon(I.palette, 18)}Apparence</div>
      <div class="navItem_409aa">${icon(I.eye, 18)}Accessibilité</div>
      <div class="navItem_409aa">${icon(I.bell, 18)}Notifications</div>
      <div class="navItem_409aa">${icon(I.mic, 18)}Voix et vidéo</div>
    </aside>
    <div class="content_e9e3ed">
      <div class="contentHeader_e9e3ed">Mon compte</div>
      <div class="closeButton_c2b141" role="button" aria-label="Fermer">${icon(I.x, 18)}</div>
      <div class="contentBody_e9e3ed">
        <div class="profileCard_e9e3ed">
          <div class="banner"><img src="${banner('#ff9f0a', '#ff375f', '#ffd60a')}" alt=""></div>
          <div class="row"><img src="${P.lina.img}" alt=""><div class="n"><b>Lina</b><span>lina.design</span></div>${btn('Modifier le profil', 'primary')}</div>
        </div>
        <div class="group_e9e3ed">
          ${field("Nom d'affichage", 'Lina', btn('Modifier'))}
          ${field("Nom d'utilisateur", 'lina.design', btn('Modifier'))}
          ${field('E-mail', '••••••••@exemple.fr <span class="link_e9e3ed">Afficher</span>', btn('Modifier'))}
          ${field('Téléphone', 'Aucun numéro ajouté', btn('Ajouter'))}
        </div>
        <h2 class="sectionTitle_e9e3ed">Notifications</h2>
        <div class="group_e9e3ed">
          ${field('Notifications sur le bureau', '<span style="font-size:14px;color:var(--text-muted)">Recevoir les messages même quand Discord est fermé</span>', sw(true))}
          ${field('Sons des messages', '<span style="font-size:14px;color:var(--text-muted)">Un son discret à chaque nouveau message</span>', sw(true))}
          ${field('Badge des messages non lus', '<span style="font-size:14px;color:var(--text-muted)">Afficher le compteur sur l\'icône de l\'app</span>', sw(false))}
        </div>
      </div>
    </div>
  </div></div></div>
</div></div>`;

const profile = `
<div class="layer__59d0d theme-dark" style="position:absolute;left:872px;top:96px"><div role="dialog">
  <span class="hiddenVisually_b18fe2"></span>
  <div class="outer_c0bea0 theme-dark user-profile-popout">
    <div class="banner"><img src="${banner('#bf5af2', '#5e5ce6', '#64d2ff')}" alt=""></div>
    <div class="head">${av(P.ines, 84)}</div>
    <div class="names"><b>Inès</b><span>ines.studio · elle</span></div>
    <div class="bio">Designer produit chez Nébula. Fan de typographie, de cartes en verre et de café filtre ☕</div>
    <div class="menuOverlay_ce8328"><h3>Membre depuis</h3>12 mars 2024</div>
    <div class="menuOverlay_ce8328"><h3>Rôles</h3><div class="roles_ce8328"><span><i style="background:#bf5af2"></i>Design</span><span><i style="background:#0a84ff"></i>Studio</span><span><i style="background:#30d158"></i>Mentor</span></div></div>
    <div class="dmField_ce8328">Envoyer un message à @Inès${icon(I.smile, 18)}</div>
  </div>
</div></div>`;

// ── Mount ─────────────────────────────────────────────────────────────────

document.body.innerHTML = `
<div id="app-mount" class="appMount__51fd7"><div class="appAsidePanelWrapper_a3002d"><div class="notAppAsidePanel_a3002d"><div class="app_a3002d"><div class="app__160d8">
  <div class="bg__960e4 theme-dark"></div>
  <div class="layers__960e4"><div class="layer__960e4 baseLayer__960e4"><div class="container__5e434"><div class="base__5e434">
    <div class="bar_c38106"><div class="title_c38106" style="display:flex;align-items:center;gap:8px"><img src="${uri(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><rect width='16' height='16' rx='5' fill='#7d6cf0'/></svg>`)}" alt="">Studio Nébula</div></div>
    <div class="content__5e434">
      <div class="sidebar__5e434 theme-dark">${guildRail}${channelList}${userPanel}</div>
      <div class="page__5e434"><div class="chat_f75fb0">
        ${header}
        <div class="content_f75fb0">
          <main class="chatContent_f75fb0" aria-label="général">
            <div class="messagesWrapper__36d07"><div class="scroller__36d07"><div class="scrollerContent__36d07"><ol class="scrollerInner__36d07">${messages}</ol></div></div></div>
            ${composer}
          </main>
          ${members}
        </div>
      </div></div>
    </div>
  </div></div></div></div>
  <div class="layerContainer__59d0d">${scene === 'menu' ? contextMenu : ''}${scene === 'settings' ? settings : ''}${scene === 'profile' ? profile : ''}</div>
</div></div></div></div></div>`;

document.documentElement.dataset.ready = 'true';
