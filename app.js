/* Pokémon Zenith Story Manager — static, self-hostable, no backend, no build step. */
'use strict';
const STORAGE = 'zenith.story.manager.v1';
const THEME_KEY = 'zenith.story.manager.theme';
const VERSION = 1;
const STATUS = {idea:'Ý tưởng',draft:'Bản nháp',writing:'Đang viết',implemented:'Đã vào game',done:'Hoàn tất',todo:'Chưa làm',progress:'Đang làm',complete:'Hoàn thành'};
const SCENE_TYPES = {cutscene:'Cutscene',dialogue:'Hội thoại',battle:'Battle',choice:'Lựa chọn',exploration:'Khám phá',other:'Khác'};
const NAV = [
  ['dashboard','Tổng quan','layout-dashboard'],['chapters','Chương truyện','book-open'],['scenes','Cảnh & hội thoại','clapperboard'],
  ['characters','Nhân vật','users'],['quests','Nhiệm vụ','list-checks'],['locations','Địa điểm','map-pin'],['flags','Switch / Variable','sliders'],['flow','Story Flow','git-branch']
];
const ICONS = {
  'book-open':'<path d="M12 7v14m0-14C9 5.5 5 5 2 6v14c3-1 7-.5 10 1m0-14c3-1.5 7-2 10-1v14c-3-1-7-.5-10 1"/>',
  'layout-dashboard':'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  'clapperboard':'<path d="M3 11h18v9H3zM3 11l-1-5L20 2l1 5-18 4zM7 5l3 5m5-7 3 5"/>',
  'users':'<path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m14-11a4 4 0 0 1 0 8m6 3v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',
  'list-checks':'<path d="m3 6 1.5 1.5L7 5m-4 8 1.5 1.5L7 12m-4 8 1.5 1.5L7 19M11 6h10m-10 7h10m-10 7h10"/>',
  'map-pin':'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
  'sliders':'<path d="M4 7h9m4 0h3M4 17h3m4 0h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
  'git-branch':'<circle cx="6" cy="3" r="2"/><path d="M6 5v10a4 4 0 0 0 4 4h8"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 15v2"/>',
  'search':'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  'plus':'<path d="M12 5v14M5 12h14"/>',
  'chevron-down':'<path d="m6 9 6 6 6-6"/>','chevron-right':'<path d="m9 18 6-6-6-6"/>',
  'arrow-right':'<path d="M5 12h14m-7-7 7 7-7 7"/>','arrow-left':'<path d="M19 12H5m7 7-7-7 7-7"/>',
  'check':'<path d="m4 12 5 5L20 6"/>','check-circle':'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  'download':'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>','upload':'<path d="M12 16V4m-5 5 5-5 5 5M4 18v3h16v-3"/>',
  'sun':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
  'moon':'<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13z"/>',
  'settings':'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a2 2 0 0 1 .4 2.2l-1 1.6a2 2 0 0 1-2.1.8l-1.4-.5a8 8 0 0 1-2 .8l-.3 1.4H11l-.3-1.4a8 8 0 0 1-2-.8l-1.4.5a2 2 0 0 1-2.1-.8l-1-1.6a2 2 0 0 1 .4-2.2l1-1a8 8 0 0 1 0-2l-1-1a2 2 0 0 1-.4-2.2l1-1.6a2 2 0 0 1 2.1-.8l1.4.5a8 8 0 0 1 2-.8L11 4.7h2l.3 1.4a8 8 0 0 1 2 .8l1.4-.5a2 2 0 0 1 2.1.8l1 1.6a2 2 0 0 1-.4 2.2l-1 1a8 8 0 0 1 0 2z"/>',
  'x':'<path d="M18 6 6 18M6 6l12 12"/>','trash':'<path d="M4 7h16m-10 4v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3"/>',
  'edit':'<path d="m3 17-1 5 5-1L20 8l-4-4L3 17zM14 6l4 4"/>','copy':'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4"/>',
  'file-text':'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8"/>',
  'message':'<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5A8 8 0 0 1 8 18.7L3 21l1.3-5A8.5 8.5 0 1 1 21 11.5z"/>',
  'code':'<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16"/>','link':'<path d="M10 13a5 5 0 0 0 7 .5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>','sparkles':'<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3zM20 17l.7 2.3L23 20l-2.3.7L20 23l-.7-2.3L17 20l2.3-.7L20 17z"/>',
  'alert':'<path d="M12 3 2 21h20L12 3zM12 9v5m0 3v1"/>','file-json':'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 12c-2 0-2 1-2 2s-1 1-1 2 1 1 1 2 0 2 2 2m6-8c2 0 2 1 2 2s1 1 1 2-1 1-1 2 0 2-2 2"/>',
  'more':'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  'move-up':'<path d="m7 14 5-5 5 5"/>','move-down':'<path d="m7 10 5 5 5-5"/>','filter':'<path d="M3 5h18M7 12h10m-7 7h4"/>',
  'play':'<path d="m7 4 13 8-13 8V4z"/>','rotate':'<path d="M3 12a9 9 0 1 0 3-6M3 3v5h5"/>'
};
const icon=(key,extra='')=>`<svg class="icon ${extra}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[key]||ICONS['file-text']}</svg>`;
const h=(value)=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fold=(s)=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
const trim=(s,n=120)=>String(s||'').length>n?String(s).slice(0,n-1)+'…':String(s||'');
const now=()=>new Date().toISOString();
const uid=(prefix)=>prefix+'_'+(globalThis.crypto?.randomUUID?.()||String(Date.now())+Math.random().toString(36).slice(2));
const demo=()=>({
 version:VERSION,meta:{name:'Pokémon Zenith',demo:true,createdAt:now(),updatedAt:now()},
 chapters:[
  {id:'ch1',number:1,title:'Khởi hành',description:'Một chuyến phiêu lưu bắt đầu từ thị trấn quê nhà.',status:'writing',notes:'Nội dung minh họa. Hãy thay bằng tuyến truyện của bạn.'},
  {id:'ch2',number:2,title:'Tín hiệu trong sương',description:'Những dấu vết lạ xuất hiện trên con đường hướng tới tòa tháp.',status:'draft',notes:''},
  {id:'ch3',number:3,title:'Bí mật Zenith',description:'Những manh mối dẫn tới bí ẩn lớn hơn.',status:'idea',notes:''}
 ],
 characters:[
  {id:'c_player',name:'Player',role:'Nhân vật chính',affiliation:'',description:'Người chơi bắt đầu chuyến hành trình Pokémon.',motivation:'Khám phá thế giới và trưởng thành.',arc:'Từ người mới trở thành nhà huấn luyện.',color:'#8c82ea',notes:''},
  {id:'c_rival',name:'Rival',role:'Đối thủ',affiliation:'',description:'Người bạn lớn lên cùng nhân vật chính.',motivation:'Trở thành nhà huấn luyện giỏi nhất.',arc:'Học cách hợp tác và trưởng thành.',color:'#e7a879',notes:''},
  {id:'c_professor',name:'Professor',role:'Nhân vật hỗ trợ',affiliation:'Phòng nghiên cứu',description:'Nhà nghiên cứu Pokémon và các hiện tượng lạ.',motivation:'Giải mã những tín hiệu bí ẩn.',arc:'',color:'#57bdb0',notes:''}
 ],
 locations:[
  {id:'l_town',name:'Thị trấn khởi đầu',region:'Vùng Zenith',mapId:'001',description:'Nơi nhân vật chính nhận Pokémon đầu tiên.',notes:''},
  {id:'l_route',name:'Route 01',region:'Vùng Zenith',mapId:'002',description:'Con đường nối thị trấn với khu rừng.',notes:''},
  {id:'l_tower',name:'Tháp sương mù',region:'Vùng Zenith',mapId:'018',description:'Tòa tháp nơi xuất hiện tín hiệu lạ.',notes:''}
 ],
 flags:[
  {id:'f_starter',key:'STARTER_RECEIVED',type:'switch',defaultValue:'OFF',description:'Người chơi đã nhận starter.'},
  {id:'f_rival',key:'RIVAL_BATTLE_01_DONE',type:'switch',defaultValue:'OFF',description:'Đã thắng/trải qua trận đấu Rival đầu tiên.'},
  {id:'f_mist',key:'MIST_SIGNAL_DISCOVERED',type:'switch',defaultValue:'OFF',description:'Đã phát hiện tín hiệu ở tháp.'},
  {id:'f_story',key:'STORY_PROGRESS',type:'variable',defaultValue:'0',description:'Mốc tiến trình truyện chính.'}
 ],
 quests:[
  {id:'q_start',title:'Bước chân đầu tiên',type:'main',chapterId:'ch1',status:'progress',description:'Nhận Pokémon đầu tiên và rời thị trấn.',objectives:['Đến phòng nghiên cứu','Nhận Pokémon đầu tiên','Gặp Rival trên Route 01'],reward:'Pokémon starter',unlock:'Bắt đầu game',notes:''},
  {id:'q_signal',title:'Tín hiệu bí ẩn',type:'main',chapterId:'ch2',status:'todo',description:'Điều tra nguồn phát tín hiệu kỳ lạ.',objectives:['Hỏi chuyện người dân','Đến tháp sương mù','Khám phá nguồn tín hiệu'],reward:'',unlock:'RIVAL_BATTLE_01_DONE',notes:''},
  {id:'q_lost',title:'Chiếc túi bị thất lạc',type:'side',chapterId:'ch1',status:'todo',description:'Một NPC nhờ tìm đồ vật trên Route 01.',objectives:['Nhận nhiệm vụ','Tìm chiếc túi','Trả lại cho NPC'],reward:'Potion x3',unlock:'',notes:''}
 ],
 scenes:[
  {id:'s_intro',chapterId:'ch1',order:1,title:'Lời mở đầu',type:'cutscene',locationId:'l_town',characterIds:['c_player','c_professor'],questIds:['q_start'],status:'done',summary:'Giới thiệu vùng đất và hành trình mới.',trigger:'New Game / Intro',conditions:'',effects:'STORY_PROGRESS = 1',mapId:'001',eventId:'001',prerequisites:[],dialogue:[{id:'d11',kind:'speech',speakerId:'c_professor',text:'Chào mừng đến với thế giới Pokémon!',emotion:'Vui vẻ',choices:[]},{id:'d12',kind:'narration',speakerId:'',text:'Một chuyến hành trình hoàn toàn mới đang chờ đợi.',emotion:'',choices:[]}],notes:'Hội thoại minh họa.',updatedAt:now()},
  {id:'s_starter',chapterId:'ch1',order:2,title:'Nhận Pokémon đầu tiên',type:'cutscene',locationId:'l_town',characterIds:['c_player','c_professor'],questIds:['q_start'],status:'writing',summary:'Giáo sư trao starter cho người chơi.',trigger:'Nói chuyện với Professor',conditions:'STORY_PROGRESS >= 1',effects:'STARTER_RECEIVED = ON',mapId:'001',eventId:'005',prerequisites:['s_intro'],dialogue:[{id:'d21',kind:'speech',speakerId:'c_professor',text:'Hãy chọn một người bạn đồng hành cho chuyến phiêu lưu!',emotion:'',choices:[]}],notes:'Thêm lựa chọn starter tại đây.',updatedAt:now()},
  {id:'s_rival',chapterId:'ch1',order:3,title:'Trận đấu với Rival',type:'battle',locationId:'l_route',characterIds:['c_player','c_rival'],questIds:['q_start'],status:'draft',summary:'Rival thách đấu trên con đường đầu tiên.',trigger:'Player Touch',conditions:'STARTER_RECEIVED = ON',effects:'RIVAL_BATTLE_01_DONE = ON',mapId:'002',eventId:'009',prerequisites:['s_starter'],dialogue:[{id:'d31',kind:'speech',speakerId:'c_rival',text:'Đã đến lúc xem ai mạnh hơn rồi!',emotion:'Hào hứng',choices:[]}],notes:'Sau trận đấu cần chuyển Switch.',updatedAt:now()},
  {id:'s_hint',chapterId:'ch2',order:1,title:'Lời đồn về màn sương',type:'dialogue',locationId:'l_route',characterIds:['c_rival'],questIds:['q_signal'],status:'idea',summary:'Rival nhắc đến những hiện tượng không thể giải thích.',trigger:'Auto / Route 01',conditions:'RIVAL_BATTLE_01_DONE = ON',effects:'STORY_PROGRESS = 2',mapId:'002',eventId:'014',prerequisites:['s_rival'],dialogue:[{id:'d41',kind:'speech',speakerId:'c_rival',text:'Cậu có thấy màn sương lạ ở phía bắc không?',emotion:'Bối rối',choices:[]}],notes:'',updatedAt:now()},
  {id:'s_tower',chapterId:'ch2',order:2,title:'Bên trong tháp',type:'exploration',locationId:'l_tower',characterIds:['c_player'],questIds:['q_signal'],status:'idea',summary:'Người chơi phát hiện dấu hiệu của một bí ẩn.',trigger:'Player Touch / tầng cuối',conditions:'STORY_PROGRESS >= 2',effects:'MIST_SIGNAL_DISCOVERED = ON',mapId:'018',eventId:'003',prerequisites:['s_hint'],dialogue:[],notes:'Thêm hiệu ứng âm thanh và hoạt ảnh.',updatedAt:now()},
  {id:'s_reveal',chapterId:'ch3',order:1,title:'Hé lộ bí mật',type:'cutscene',locationId:'l_tower',characterIds:['c_player','c_professor'],questIds:['q_signal'],status:'idea',summary:'Một sự thật được hé lộ qua những manh mối.',trigger:'Auto',conditions:'MIST_SIGNAL_DISCOVERED = ON',effects:'STORY_PROGRESS = 3',mapId:'018',eventId:'015',prerequisites:['s_tower'],dialogue:[],notes:'Phần này chưa có lời thoại.',updatedAt:now()}
 ]
});
function normalize(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw)||!Array.isArray(raw.scenes)||!Array.isArray(raw.chapters)) throw Error('Tệp không đúng định dạng Zenith Story Manager.');
 const d={version:VERSION,meta:{name:String(raw.meta?.name||'Pokémon Zenith'),demo:!!raw.meta?.demo,createdAt:raw.meta?.createdAt||now(),updatedAt:now()}};
 ['chapters','scenes','characters','quests','locations','flags'].forEach(k=>{
  const arr=raw[k];if(!Array.isArray(arr))throw Error(`Thiếu danh sách ${k}.`);
  if(arr.length>20000) throw Error('Tệp dữ liệu quá lớn.');
  d[k]=arr.filter(o=>o&&typeof o==='object'&&!Array.isArray(o)).map(o=>({...o,id:String(o.id||uid(k))}));
 });
 d.scenes=d.scenes.map(s=>({...s,characterIds:Array.isArray(s.characterIds)?s.characterIds:[],questIds:Array.isArray(s.questIds)?s.questIds:[],prerequisites:Array.isArray(s.prerequisites)?s.prerequisites:[],dialogue:Array.isArray(s.dialogue)?s.dialogue.map(l=>({...l,id:l.id||uid('dlg'),choices:Array.isArray(l.choices)?l.choices:[]})):[],order:Number(s.order)||1}));
 d.quests=d.quests.map(q=>({...q,objectives:Array.isArray(q.objectives)?q.objectives:[]}));
 return d;
}
function load(){try{const raw=localStorage.getItem(STORAGE);if(raw)return normalize(JSON.parse(raw))}catch(e){console.warn('Không đọc được dữ liệu:',e)}return demo()}
let db=load();
let view={page:'dashboard',selectedScene:db.scenes[0]?.id||null,sceneTab:'content',sceneQuery:'',sceneChapter:'all',sceneStatus:'all',questFilter:'all',flowAll:true,modal:null,searchQuery:'',previewIndex:0};
let light=localStorage.getItem(THEME_KEY)==='light';
document.documentElement.dataset.theme=light?'light':'dark';
function save(){db.meta.updatedAt=now();try{localStorage.setItem(STORAGE,JSON.stringify(db));return true}catch(e){toast('Không thể lưu dữ liệu. Hãy xuất JSON để sao lưu.','error');return false}}
function toast(msg,type=''){const wrap=document.querySelector('.toast-wrap');if(!wrap)return;const div=document.createElement('div');div.className='toast '+type;div.textContent=msg;wrap.append(div);setTimeout(()=>div.remove(),3500)}
const byId=(kind,id)=>db[kind].find(x=>x.id===id);
const chapterName=id=>byId('chapters',id)?.title||'Chưa gán chương';
const charName=id=>byId('characters',id)?.name||'Không rõ';
const placeName=id=>byId('locations',id)?.name||'Chưa gán địa điểm';
const badge=s=>`<span class="status ${h(s)}">${h(STATUS[s]||s||'Chưa rõ')}</span>`;
const options=(list,val,empty='— Chọn —')=>`<option value="">${empty}</option>`+list.map(x=>`<option value="${h(x.id)}" ${x.id===val?'selected':''}>${h(x.name||x.title)}</option>`).join('');
const valueOpt=(items,current)=>items.map(([value,label])=>`<option value="${h(value)}" ${String(current)===String(value)?'selected':''}>${h(label)}</option>`).join('');
const pageHeading=(eyebrow,title,sub,tools='')=>`<div class="page-header"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><div class="page-sub">${sub}</div></div><div class="page-tools">${tools}</div></div>`;
const displayDate=date=>{try{return new Date(date).toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'})}catch{return '—'}};
function chapterScenes(chId){return db.scenes.filter(s=>s.chapterId===chId).sort((a,b)=>(a.order||0)-(b.order||0))}
function completion(scenes){return scenes.length?Math.round(scenes.filter(x=>x.status==='done').length/scenes.length*100):0}
function blankPage(title,msg,act=''){return `<div class="empty">${icon('book-open','icon-lg')}<h3>${h(title)}</h3><p>${h(msg)}</p>${act}</div>`}
function demoBanner(){return db.meta.demo?`<div class="demo-note"><div>${icon('sparkles')} <b>Dữ liệu minh họa</b> — Các chương, cảnh và nhân vật hiện tại chỉ là ví dụ; bạn có thể sửa, xóa hoặc bắt đầu dự án trống.</div><button class="outline-btn small" data-action="blank-project">Bắt đầu trống</button></div>`:''}
function renderShell(){
 const nav=NAV.map(([key,title,ico])=>`<button class="navbtn ${view.page===key?'active':''}" data-action="nav" data-page="${key}">${icon(ico)}<span>${title}</span></button>`).join('');
 document.getElementById('app').innerHTML=`
 <header class="topbar">
  <div class="brand" data-action="nav" data-page="dashboard" role="button" tabindex="0"><div class="brand-icon">${icon('book-open')}</div><div><div class="brand-title">ZENITH <span style="color:var(--accent2)">STORY</span></div><div class="brand-sub">NARRATIVE WORKSPACE</div></div></div>
  <div class="global-search"><span class="search-icon">${icon('search')}</span><input readonly aria-label="Tìm kiếm toàn bộ nội dung" placeholder="Tìm trong toàn bộ câu chuyện..." data-action="search"/><span class="kbd">Ctrl K</span></div>
  <div class="top-actions"><button class="iconbtn" data-action="theme" title="Đổi giao diện sáng / tối">${icon(light?'sun':'moon')}</button><button class="iconbtn" data-action="data" title="Sao lưu / nhập dữ liệu">${icon('settings')}</button><button class="primary-btn" data-action="new-scene">${icon('plus')}<span>Thêm cảnh</span></button></div>
 </header><div class="nav-shell"><nav class="nav" aria-label="Các mục quản lý">${nav}</nav></div>
 <main class="main">${demoBanner()}<div id="page-content">${renderPage()}</div></main><div id="modal-root"></div><div class="toast-wrap" aria-live="polite"></div>`;
 drawFlow();
}
function renderPage(){switch(view.page){case 'dashboard':return dashboard();case 'chapters':return chapters();case 'scenes':return scenes();case 'characters':return characters();case 'quests':return quests();case 'locations':return locations();case 'flags':return flags();case 'flow':return flow();default:return dashboard()}}
function navigate(page,sceneId){view.page=page;if(sceneId)view.selectedScene=sceneId;view.modal=null;renderShell();window.scrollTo({top:0,behavior:'instant'})}
function dashboard(){
 const n=db.scenes.length,completed=db.scenes.filter(s=>s.status==='done').length,percent=completion(db.scenes);
 const recent=[...db.scenes].sort((a,b)=>String(b.updatedAt||'').localeCompare(String(a.updatedAt||''))).slice(0,5);
 const chapOrder=[...db.chapters].sort((a,b)=>(a.number||0)-(b.number||0));
 return `${pageHeading('THE NARRATIVE HQ','Không gian cốt truyện',`Xây dựng, kết nối và theo dõi toàn bộ câu chuyện của <b>${h(db.meta.name)}</b> ngay tại một nơi.`, `<button class="outline-btn" data-action="data">${icon('download')} Sao lưu dữ liệu</button>`)}
 <div class="hero"><div class="panel hero-main"><div class="eyebrow" style="color:var(--accent2)">YOUR STORY. ONE WORKSPACE.</div><h2>Mỗi câu chuyện lớn<br>bắt đầu từ một cảnh nhỏ.</h2><p>Viết hội thoại, tổ chức chương truyện, kết nối các sự kiện và đưa chúng vào RPG Maker XP.</p><div class="hero-actions"><button class="primary-btn" data-action="new-scene">${icon('plus')} Viết cảnh mới</button><button class="outline-btn" data-action="nav" data-page="flow">${icon('git-branch')} Xem Story Flow</button></div></div>
 <div class="panel hero-side"><div><div class="eyebrow">TIẾN ĐỘ CỐT TRUYỆN</div><div class="ring-wrap mt24"><div class="ring" style="--progress:${percent}%"><div class="ring-inner"><strong>${percent}%</strong><small>Hoàn tất</small></div></div><div class="ring-legend"><div><div class="num">${completed}<span class="muted"> / ${n}</span></div><div class="tiny-text muted">Cảnh hoàn thành</div></div><div><div class="num">${db.scenes.filter(s=>s.status==='writing').length}</div><div class="tiny-text muted">Đang viết</div></div></div></div></div><div class="divider"></div><div class="flex between tiny-text"><span class="muted">Cập nhật cuối</span><span>${displayDate(db.meta.updatedAt)}</span></div></div></div>
 <div class="metric-grid">${[['Chương truyện',db.chapters.length,'book-open','Bố cục tuyến truyện'],['Cảnh / Event',db.scenes.length,'clapperboard','Bao gồm hội thoại'],['Nhân vật',db.characters.length,'users','Có thể liên kết cảnh'],['Nhiệm vụ',db.quests.length,'list-checks','Main & Side Quest']].map(([lab,num,ic,foot])=>`<div class="panel metric"><div class="metric-top"><span>${lab}</span><div class="metric-icon">${icon(ic)}</div></div><strong>${num}</strong><div class="metric-footer">${foot}</div></div>`).join('')}</div>
 <div class="two-cols"><div class="panel panel-pad"><div class="panel-heading"><h2>Chương truyện</h2><button class="ghost-btn small" data-action="nav" data-page="chapters">Xem tất cả ${icon('arrow-right','icon-sm')}</button></div>${chapOrder.length?chapOrder.map(c=>{const list=chapterScenes(c.id);return `<div class="chapter-mini" data-action="nav" data-page="chapters" style="cursor:pointer"><div class="flex between gap12"><div><div class="eyebrow" style="font-size:9px">CHƯƠNG ${String(c.number||0).padStart(2,'0')}</div><div class="title" style="margin:5px 0">${h(c.title)}</div></div><div class="muted tiny-text nowrap">${list.filter(s=>s.status==='done').length}/${list.length} cảnh</div></div><div class="progress-track"><div class="progress-fill" style="width:${completion(list)}%"></div></div></div>`}).join(''):blankPage('Chưa có chương','Thêm chương đầu tiên để bắt đầu.',`<button class="primary-btn" data-action="new" data-kind="chapters">Tạo chương</button>`)}</div>
 <div class="panel panel-pad"><div class="panel-heading"><h2>Cảnh cập nhật gần đây</h2><button class="ghost-btn small" data-action="nav" data-page="scenes">Xem tất cả ${icon('arrow-right','icon-sm')}</button></div>${recent.length?recent.map(s=>`<div class="list-item" data-action="open-scene" data-id="${h(s.id)}"><div class="list-index">${String(s.order||1).padStart(2,'0')}</div><div class="grow"><div class="list-title">${h(s.title)}</div><div class="list-sub">${h(chapterName(s.chapterId))} · ${displayDate(s.updatedAt)}</div></div><div class="right-tag">${badge(s.status)}</div></div>`).join(''):blankPage('Chưa có cảnh','Tạo một scene để phát triển câu chuyện.')}</div></div>
 <div class="shortcut-legend"><span><kbd>Ctrl</kbd> + <kbd>K</kbd> tìm nhanh</span><span>Dữ liệu tự lưu trong trình duyệt</span><span>Xuất JSON để sao lưu / chuyển máy</span></div>`;
}
function chapters(){
 const sorted=[...db.chapters].sort((a,b)=>(a.number||0)-(b.number||0));
 return `${pageHeading('STORY STRUCTURE','Chương truyện','Thiết lập bố cục câu chuyện, tổng quan và tiến độ từng chương.',`<button class="primary-btn" data-action="new" data-kind="chapters">${icon('plus')} Thêm chương</button>`)}
 ${sorted.length?`<div class="cards-grid">${sorted.map(c=>{const ss=chapterScenes(c.id);return `<div class="panel entity-card" data-action="edit" data-kind="chapters" data-id="${h(c.id)}"><div class="chapter-stripe"></div><div class="card-topline"><span class="card-number">CHƯƠNG ${String(c.number||0).padStart(2,'0')}</span>${badge(c.status)}</div><h3>${h(c.title)}</h3><p>${h(trim(c.description,180)||'Chưa có tóm tắt chương.')}</p><div class="card-bottom"><span>${icon('clapperboard','icon-sm')} ${ss.length} cảnh</span><span>Hoàn tất ${completion(ss)}% ${icon('arrow-right','icon-sm')}</span></div><div class="progress-track"><div class="progress-fill" style="width:${completion(ss)}%"></div></div></div>`}).join('')}</div>`:blankPage('Chưa có chương truyện','Chia câu chuyện thành các chương để quản lý dễ dàng.',`<button class="primary-btn" data-action="new" data-kind="chapters">${icon('plus')} Tạo chương đầu tiên</button>`)}`;
}
function selectedScene(){return byId('scenes',view.selectedScene)||db.scenes[0]||null}
function filteredScenes(){return [...db.scenes].filter(s=>{
 if(view.sceneChapter!=='all'&&s.chapterId!==view.sceneChapter)return false;
 if(view.sceneStatus!=='all'&&s.status!==view.sceneStatus)return false;
 const q=fold(view.sceneQuery).trim();return !q||[s.title,s.summary,s.trigger,s.conditions,s.effects,chapterName(s.chapterId),s.id].some(x=>fold(x).includes(q));
 }).sort((a,b)=>{const ac=byId('chapters',a.chapterId)?.number||999,bc=byId('chapters',b.chapterId)?.number||999;return ac-bc||(a.order||0)-(b.order||0)})}
function scenes(){
 const s=selectedScene();const list=filteredScenes();
 const chOpts=`<option value="all">Tất cả chương</option>`+[...db.chapters].sort((a,b)=>a.number-b.number).map(x=>`<option value="${h(x.id)}" ${view.sceneChapter===x.id?'selected':''}>${h(x.title)}</option>`).join('');
 const stOpts=`<option value="all">Mọi trạng thái</option>`+Object.keys(STATUS).slice(0,5).map(k=>`<option value="${k}" ${view.sceneStatus===k?'selected':''}>${STATUS[k]}</option>`).join('');
 return `${pageHeading('SCENE WORKSPACE','Cảnh & hội thoại','Viết từng cảnh, quản lý lời thoại và xác định điều kiện kích hoạt trong RPG Maker XP.',`<button class="primary-btn" data-action="new-scene">${icon('plus')} Tạo Scene</button>`)}
 <div class="scenes-layout"><aside class="panel scene-sidebar"><div class="scene-sidebar-header"><div class="flex between mb16"><b>Thư viện Scene</b><span class="muted tiny-text">${list.length} cảnh</span></div><input class="input-box" value="${h(view.sceneQuery)}" placeholder="Lọc cảnh..." data-action-input="scene-search" aria-label="Lọc cảnh"/><div class="flex gap8 mt12"><select class="select-box" data-filter="sceneChapter" aria-label="Lọc chương">${chOpts}</select><select class="select-box" data-filter="sceneStatus" aria-label="Lọc trạng thái">${stOpts}</select></div></div><div class="scene-list" id="scene-list">${sceneListMarkup(list)}</div></aside>
 <section class="panel scene-editor" id="scene-editor">${s?sceneEditor(s):blankPage('Chưa có Scene','Tạo một cảnh đầu tiên để viết hội thoại.',`<button class="primary-btn" data-action="new-scene">Tạo Scene</button>`)}</section></div>`;
}
function sceneListMarkup(list){return list.length?list.map(s=>`<div class="scene-link ${s.id===view.selectedScene?'active':''}" data-action="open-scene" data-id="${h(s.id)}"><span class="scene-num">${String(s.order||1).padStart(2,'0')}</span><div class="grow"><h4>${h(s.title)}</h4><p>${h(chapterName(s.chapterId))} · ${h(SCENE_TYPES[s.type]||'Scene')}</p></div>${badge(s.status)}</div>`).join(''):blankPage('Không tìm thấy cảnh','Hãy thử bộ lọc khác hoặc tạo Scene mới.')}
const sf=(name,value,tag='input',optionsHtml='',rows=3,extra='')=>tag==='textarea'?`<textarea class="textarea-box" rows="${rows}" data-scene-field="${name}" ${extra}>${h(value)}</textarea>`:tag==='select'?`<select class="select-box" data-scene-field="${name}" ${extra}>${optionsHtml}</select>`:`<input class="input-box" value="${h(value)}" data-scene-field="${name}" ${extra}/>`;
const field=(label,html,help='')=>`<div class="field"><label>${label}</label>${html}${help?`<small>${help}</small>`:''}</div>`;
function sceneEditor(s){
 const tabButtons=[['content','Nội dung','file-text'],['dialogue','Hội thoại','message'],['logic','RPG Maker Logic','code'],['links','Liên kết','link']].map(([k,l,i])=>`<button class="tab ${view.sceneTab===k?'active':''}" data-action="scene-tab" data-tab="${k}">${icon(i,'icon-sm')} ${l}</button>`).join('');
 return `<div class="scene-editor-top"><div class="flex between gap12"><span class="eyebrow">SCENE · ${h(s.id.slice(0,12).toUpperCase())}</span>${badge(s.status)}</div><div class="flex gap8 center mt12"><input class="scene-title-input" value="${h(s.title)}" aria-label="Tên cảnh" data-scene-field="title"/><button class="iconbtn mini-ico" title="Nhân bản Scene" data-action="duplicate-scene">${icon('copy','icon-sm')}</button></div><div class="scene-meta">${h(chapterName(s.chapterId))} · ${h(placeName(s.locationId))} · Cập nhật ${displayDate(s.updatedAt)}</div></div>
 <div class="tabs">${tabButtons}</div><div class="editor-content">${view.sceneTab==='content'?sceneContent(s):view.sceneTab==='dialogue'?sceneDialogue(s):view.sceneTab==='logic'?sceneLogic(s):sceneLinks(s)}</div>
 <div class="editor-foot"><div class="save-indicator"><i class="dot"></i> Tự động lưu · Dữ liệu cục bộ</div><div class="flex gap8"><button class="danger-btn small" data-action="delete-scene">${icon('trash','icon-sm')} Xóa Scene</button><button class="outline-btn small" data-action="data">${icon('download','icon-sm')} Sao lưu</button></div></div>`;
}
function sceneContent(s){return `<div class="editor-section"><h3 class="section-kicker">${icon('file-text')} Thông tin cảnh</h3><div class="field-grid cols3">
 ${field('Chương',sf('chapterId',s.chapterId,'select',options(db.chapters,s.chapterId)))}
 ${field('Vị trí trong chương',sf('order',s.order,'input','','',`type="number" min="1"`))}
 ${field('Trạng thái',sf('status',s.status,'select',valueOpt(Object.entries(STATUS).slice(0,5),s.status)))}
 ${field('Loại cảnh',sf('type',s.type,'select',valueOpt(Object.entries(SCENE_TYPES),s.type)))}
 ${field('Địa điểm',sf('locationId',s.locationId,'select',options(db.locations,s.locationId)))}
 </div></div>
 <div class="editor-section"><h3 class="section-kicker">${icon('sparkles')} Nội dung & diễn biến</h3><div class="field-grid"> <div class="span2">${field('Tóm tắt cảnh',sf('summary',s.summary,'textarea','',4),'Điều gì diễn ra trong cảnh này?')}</div><div class="span2">${field('Ghi chú biên kịch',sf('notes',s.notes,'textarea','',4),'Những chi tiết cần nhớ hoặc chưa quyết định.')}</div></div></div>
 <div class="flex gap8"><button class="outline-btn" data-action="scene-tab" data-tab="dialogue">${icon('message')} Viết hội thoại ${icon('arrow-right','icon-sm')}</button><button class="ghost-btn" data-action="scene-tab" data-tab="logic">Thiết lập Event Logic ${icon('arrow-right','icon-sm')}</button></div>`}
function sceneDialogue(s){return `<div class="flex between mb16 gap8"><div><h3 class="section-kicker" style="margin-bottom:5px">${icon('message')} Kịch bản hội thoại</h3><div class="help">Mỗi đoạn có thể là lời thoại, lời dẫn hoặc một lựa chọn.</div></div><button class="outline-btn small" data-action="add-dialogue">${icon('plus','icon-sm')} Thêm đoạn</button></div>
 ${s.dialogue.length?s.dialogue.map((d,i)=>`<div class="dialogue-row"><span class="dialogue-index">${i+1}</span><div class="dialogue-fields"><div class="field-grid cols3 mb16">
 ${field('Loại',`<select class="select-box" data-dialogue-field="kind" data-dialogue-id="${h(d.id)}">${valueOpt([['speech','Lời thoại'],['narration','Lời dẫn'],['choice','Lựa chọn']],d.kind)}</select>`)}
 ${field('Nhân vật',`<select class="select-box" data-dialogue-field="speakerId" data-dialogue-id="${h(d.id)}">${options(db.characters,d.speakerId,'Người dẫn chuyện')}</select>`)}
 ${field('Sắc thái / cảm xúc',`<input class="input-box" data-dialogue-field="emotion" data-dialogue-id="${h(d.id)}" value="${h(d.emotion)}" placeholder="Ví dụ: Lo lắng"/>`)}
 </div>${field('Nội dung',`<textarea class="textarea-box dialogue-text" data-dialogue-field="text" data-dialogue-id="${h(d.id)}" placeholder="Nhập lời thoại...">${h(d.text)}</textarea>`)}
 ${d.kind==='choice'?`<div class="mt12">${field('Các lựa chọn (mỗi dòng một lựa chọn)',`<textarea class="textarea-box" data-dialogue-field="choices" data-dialogue-id="${h(d.id)}" placeholder="Đồng ý\nTừ chối">${h((d.choices||[]).join('\n'))}</textarea>`)}<div class="help mt12">Lựa chọn được lưu trong kịch bản; điều kiện và nhánh Event vẫn cần cài đặt trong RPG Maker.</div></div>`:''}</div>
 <div class="dialogue-controls"><button data-action="move-dialogue" data-id="${h(d.id)}" data-dir="-1" title="Đưa lên" ${i===0?'disabled':''}>${icon('move-up','icon-sm')}</button><button data-action="move-dialogue" data-id="${h(d.id)}" data-dir="1" title="Đưa xuống" ${i===s.dialogue.length-1?'disabled':''}>${icon('move-down','icon-sm')}</button><button class="delete" data-action="remove-dialogue" data-id="${h(d.id)}" title="Xóa đoạn">${icon('trash','icon-sm')}</button></div></div>`).join(''):blankPage('Chưa có hội thoại','Thêm lời thoại hoặc một đoạn dẫn chuyện.',`<button class="primary-btn small" data-action="add-dialogue">${icon('plus','icon-sm')} Thêm lời thoại</button>`)}
 <div class="flex gap8" style="flex-wrap:wrap"><button class="primary-btn small" data-action="add-dialogue">${icon('plus','icon-sm')} Thêm đoạn</button><button class="outline-btn small" data-action="preview-dialogue">${icon('play','icon-sm')} Xem thử lời thoại</button></div>`}
function sceneLogic(s){return `<div class="editor-section"><h3 class="section-kicker">${icon('code')} RPG Maker XP · Event Mapping</h3><div class="field-grid">${field('Map ID',sf('mapId',s.mapId),'Số Map trong RPG Maker XP.')}${field('Event ID',sf('eventId',s.eventId),'Số Event thuộc Map này.')}
 <div class="span2">${field('Trigger / Điều kiện khởi chạy',sf('trigger',s.trigger,'textarea','',3),'Ví dụ: Player Touch, Action Button, Auto...')}</div>
 <div class="span2">${field('Điều kiện (Conditions)',sf('conditions',s.conditions,'textarea','',4),'Ví dụ: STARTER_RECEIVED = ON')}</div>
 <div class="span2">${field('Kết quả / thay đổi Switch, Variable',sf('effects',s.effects,'textarea','',4),'Ví dụ: STORY_PROGRESS = 2; RIVAL_BATTLE_01_DONE = ON')}</div></div></div>
 <div class="data-warning">${icon('alert','icon-sm')} Các trường này là tài liệu thiết kế, không tự động tạo Event hoặc sửa dữ liệu RPG Maker XP. Bạn có thể dùng chúng để đối chiếu khi triển khai trong game.</div>
 <div class="mt18"><button class="outline-btn small" data-action="nav" data-page="flags">${icon('sliders','icon-sm')} Xem bảng Switch / Variable</button></div>`}
function sceneLinks(s){
 const checks=(items,field,label,description)=>`<div class="editor-section"><h3 class="section-kicker">${label}</h3><p class="help" style="margin-top:-9px;margin-bottom:15px">${description}</p><div class="multi-check">${items.length?items.map(x=>`<label class="check-chip"><input type="checkbox" data-scene-multi="${field}" value="${h(x.id)}" ${(s[field]||[]).includes(x.id)?'checked':''}/>${h(x.name||x.title)}</label>`).join(''):'<span class="quiet tiny-text">Chưa có dữ liệu. Hãy tạo mục tương ứng trước.</span>'}</div></div>`;
 return `${checks(db.characters,'characterIds',icon('users')+' Nhân vật xuất hiện','Liên kết nhân vật tham gia cảnh này.')}${checks(db.quests,'questIds',icon('list-checks')+' Nhiệm vụ liên quan','Một Scene có thể thuộc nhiều nhiệm vụ.')}${checks(db.scenes.filter(x=>x.id!==s.id),'prerequisites',icon('git-branch')+' Scene tiền đề','Chọn các cảnh phải diễn ra trước cảnh này. Dùng để vẽ Story Flow.')}`;
}
function characters(){return `${pageHeading('CAST & RELATIONSHIPS','Nhân vật','Lưu hồ sơ, mục tiêu, tuyến phát triển và những cảnh mà từng nhân vật tham gia.',`<button class="primary-btn" data-action="new" data-kind="characters">${icon('plus')} Thêm nhân vật</button>`)}${db.characters.length?`<div class="cards-grid">${db.characters.map(c=>{const scenes=db.scenes.filter(s=>(s.characterIds||[]).includes(c.id));return `<div class="panel entity-card" data-action="edit" data-kind="characters" data-id="${h(c.id)}"><div class="flex center gap12 mb16"><div class="person-avatar" style="--av:${h(c.color||'#8374cf')}">${h(initials(c.name))}</div><div class="grow"><h3 style="margin:0 0 6px">${h(c.name)}</h3><span class="role-tag">${h(c.role||'Nhân vật')}</span></div></div><p>${h(trim(c.description,175)||'Chưa có tiểu sử.')}</p><div class="card-bottom"><span>${icon('clapperboard','icon-sm')} ${scenes.length} cảnh xuất hiện</span>${icon('arrow-right','icon-sm')}</div></div>`}).join('')}</div>`:blankPage('Chưa có nhân vật','Thêm Player, Rival, NPC và nhân vật quan trọng.',`<button class="primary-btn" data-action="new" data-kind="characters">${icon('plus')} Thêm nhân vật</button>`)}`}
function initials(str){return String(str||'?').trim().split(/\s+/).slice(0,2).map(x=>x[0]?.toUpperCase()||'').join('')}
function quests(){const list=db.quests.filter(q=>view.questFilter==='all'||q.type===view.questFilter);return `${pageHeading('QUEST DESIGN','Nhiệm vụ','Quản lý nhiệm vụ chính, nhiệm vụ phụ, mục tiêu và phần thưởng.',`<button class="primary-btn" data-action="new" data-kind="quests">${icon('plus')} Thêm nhiệm vụ</button>`)}
 <div class="filterbar"><select class="select-box" data-filter="questFilter"><option value="all">Tất cả nhiệm vụ</option><option value="main" ${view.questFilter==='main'?'selected':''}>Main Quest</option><option value="side" ${view.questFilter==='side'?'selected':''}>Side Quest</option></select></div>
 <div class="panel table-scroll">${list.length?`<table class="data-table"><thead><tr><th>Nhiệm vụ</th><th>Loại</th><th>Chương</th><th>Mục tiêu</th><th>Trạng thái</th><th></th></tr></thead><tbody>${list.map(q=>`<tr data-action="edit" data-kind="quests" data-id="${h(q.id)}"><td class="main-cell">${h(q.title)}<div class="list-sub">${h(trim(q.description,80))}</div></td><td>${q.type==='side'?'Side Quest':'Main Quest'}</td><td>${h(chapterName(q.chapterId))}</td><td>${(q.objectives||[]).length} bước</td><td>${badge(q.status)}</td><td>${icon('chevron-right','icon-sm')}</td></tr>`).join('')}</tbody></table>`:blankPage('Không có nhiệm vụ','Hãy thêm một nhiệm vụ hoặc đổi bộ lọc.')}</div>`}
function locations(){return `${pageHeading('WORLD BUILDING','Địa điểm & bản đồ','Ghi lại các khu vực trong thế giới Zenith và Map ID tương ứng trong RPG Maker.',`<button class="primary-btn" data-action="new" data-kind="locations">${icon('plus')} Thêm địa điểm</button>`)}${db.locations.length?`<div class="cards-grid">${db.locations.map(l=>`<div class="panel entity-card" data-action="edit" data-kind="locations" data-id="${h(l.id)}"><div class="card-topline"><div class="metric-icon">${icon('map-pin')}</div><span class="role-tag">MAP ${h(l.mapId||'—')}</span></div><h3>${h(l.name)}</h3><div class="eyebrow" style="margin-bottom:11px;font-size:9px">${h(l.region)}</div><p>${h(trim(l.description,180)||'Chưa có mô tả.')}</p><div class="card-bottom"><span>${db.scenes.filter(s=>s.locationId===l.id).length} cảnh tại đây</span>${icon('arrow-right','icon-sm')}</div></div>`).join('')}</div>`:blankPage('Chưa có địa điểm','Thêm thành phố, tuyến đường, khu vực và các Map.',`<button class="primary-btn" data-action="new" data-kind="locations">${icon('plus')} Thêm địa điểm</button>`)}`}
function flags(){return `${pageHeading('EVENT LOGIC','Switch & Variable','Tạo danh mục các cờ và biến cốt truyện; dễ kiểm tra điều kiện khi tạo Event trong RPG Maker XP.',`<button class="primary-btn" data-action="new" data-kind="flags">${icon('plus')} Thêm Flag</button>`)}
 <div class="panel table-scroll">${db.flags.length?`<table class="data-table"><thead><tr><th>Tên kỹ thuật</th><th>Loại</th><th>Giá trị mặc định</th><th>Vai trò</th><th>Số Scene tham chiếu</th><th></th></tr></thead><tbody>${db.flags.map(f=>{const count=db.scenes.filter(s=>(s.conditions+' '+s.effects+' '+s.trigger).includes(f.key)).length;return `<tr data-action="edit" data-kind="flags" data-id="${h(f.id)}"><td class="main-cell"><code>${h(f.key)}</code></td><td>${f.type==='variable'?'Variable':'Switch'}</td><td>${h(f.defaultValue)}</td><td>${h(trim(f.description,95))}</td><td>${count}</td><td>${icon('chevron-right','icon-sm')}</td></tr>`}).join('')}</tbody></table>`:blankPage('Chưa có Switch / Variable','Lập danh sách để tránh nhầm lẫn điều kiện trong game.',`<button class="primary-btn" data-action="new" data-kind="flags">${icon('plus')} Thêm Flag</button>`)}</div>
 <p class="help mt18">Lưu ý: đây là bảng tài liệu hóa, chưa tự đồng bộ với danh sách Switch / Variable trong RPG Maker XP.</p>`}
function flow(){
 const sorted=[...db.chapters].sort((a,b)=>(a.number||0)-(b.number||0));
 const noChapter=db.scenes.filter(s=>!db.chapters.some(c=>c.id===s.chapterId));
 const columns=sorted.map(c=>({id:c.id,title:`CHƯƠNG ${String(c.number||0).padStart(2,'0')} · ${c.title}`,scenes:chapterScenes(c.id)}));if(noChapter.length)columns.push({id:'other',title:'CHƯA GÁN CHƯƠNG',scenes:noChapter});
 const enabled=s=>view.flowAll||s.status!=='done';
 return `${pageHeading('VISUAL STORY MAP','Story Flow','Sơ đồ luồng sự kiện dựa trên các Scene tiền đề mà bạn đã liên kết. Bấm vào một cảnh để mở trình biên tập.',`<button class="outline-btn" data-action="nav" data-page="scenes">${icon('clapperboard')} Mở Scene Editor</button>`)}
 <div class="flow-toolbar"><label class="check-chip"><input type="checkbox" data-filter-check="flowAll" ${view.flowAll?'checked':''}/>Hiện cả Scene đã hoàn tất</label><div class="flow-legend"><span class="line"></span> Kết nối tiền đề → cảnh tiếp theo</div></div>
 <div class="flow-wrap" id="flow-wrap">${columns.length?`<div class="flow-canvas" id="flow-canvas"><svg class="flow-lines" id="flow-lines" aria-hidden="true"></svg>${columns.map(c=>`<div class="flow-column"><h3 class="flow-column-title">${h(c.title)}</h3>${c.scenes.filter(enabled).length?c.scenes.filter(enabled).map(s=>`<div class="flow-card" data-node="${h(s.id)}" data-action="open-scene" data-id="${h(s.id)}"><div class="flex between gap8"><span class="tiny-text muted">${h(SCENE_TYPES[s.type]||'Scene')}</span>${badge(s.status)}</div><div class="flow-card-title">${h(s.title)}</div><div class="flow-card-meta">${icon('map-pin','icon-sm')} ${h(placeName(s.locationId))}</div></div>`).join(''):'<p class="flow-no-conn">Chưa có cảnh phù hợp.</p>'}</div>`).join('')}</div>`:blankPage('Chưa có tuyến truyện','Tạo Chapter và Scene để xem mạch truyện.')}</div>
 <p class="help mt18">Mỗi đường nối được tạo từ mục <b>Liên kết → Scene tiền đề</b> của Scene Editor. Các Scene không có liên kết vẫn xuất hiện riêng theo chương.</p>`;
}
function drawFlow(){const canvas=document.getElementById('flow-canvas'),svg=document.getElementById('flow-lines');if(!canvas||!svg)return;
 requestAnimationFrame(()=>{
  if(!document.getElementById('flow-lines'))return;
  const cRect=canvas.getBoundingClientRect(),w=canvas.scrollWidth,ht=canvas.scrollHeight;svg.setAttribute('width',w);svg.setAttribute('height',ht);svg.setAttribute('viewBox',`0 0 ${w} ${ht}`);
  let paths='<defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7" fill="none" stroke="var(--accent)" stroke-width="1.5"/></marker></defs>';
  for(const s of db.scenes){
   const b=canvas.querySelector(`[data-node="${CSS.escape(s.id)}"]`);if(!b)continue;
   const br=b.getBoundingClientRect();
   for(const pid of s.prerequisites||[]){
    const a=canvas.querySelector(`[data-node="${CSS.escape(pid)}"]`);if(!a)continue;
    const ar=a.getBoundingClientRect();
    const y1=ar.top-cRect.top+ar.height/2,y2=br.top-cRect.top+br.height/2;
    let path;
    if(Math.abs(ar.left-br.left)<10){
     const x1=ar.right-cRect.left,x2=br.right-cRect.left;
     path=`M${x1} ${y1} C${x1+35} ${y1} ${x2+35} ${y2} ${x2} ${y2}`;
    }else{
     const forward=ar.left<br.left;
     const x1=(forward?ar.right:ar.left)-cRect.left,x2=(forward?br.left:br.right)-cRect.left;
     const delta=Math.max(28,Math.abs(x2-x1)*.52),sign=forward?1:-1;
     path=`M${x1} ${y1} C${x1+sign*delta} ${y1} ${x2-sign*delta} ${y2} ${x2} ${y2}`;
    }
    paths+=`<path d="${path}" fill="none" stroke="var(--accent)" stroke-opacity=".62" stroke-width="2" marker-end="url(#arrow)"/>`;
   }
  }
  svg.innerHTML=paths;
 });}
function modalInput(name,label,value='',opts={}){return field(label,`<input class="input-box" name="${name}" value="${h(value)}" ${opts.required?'required':''} ${opts.type?`type="${opts.type}"`:''} ${opts.placeholder?`placeholder="${h(opts.placeholder)}"`:''} />`,opts.help||'')}
function modalArea(name,label,value='',rows=3){return field(label,`<textarea class="textarea-box" name="${name}" rows="${rows}">${h(value)}</textarea>`)}
function modalSelect(name,label,markup){return field(label,`<select class="select-box" name="${name}">${markup}</select>`)}
function modalTitle(kind){return {chapters:'chương truyện',characters:'nhân vật',quests:'nhiệm vụ',locations:'địa điểm',flags:'Switch / Variable'}[kind]||'mục'}
function modalFields(kind,obj){const o=obj||{};
 if(kind==='chapters')return `<div class="field-grid">${modalInput('title','Tên chương',o.title,{required:true,placeholder:'Ví dụ: Khởi hành'})}${modalInput('number','Số thứ tự',o.number||db.chapters.length+1,{type:'number'})}${modalSelect('status','Trạng thái',valueOpt(Object.entries(STATUS).slice(0,5),o.status||'idea'))}<div class="span2">${modalArea('description','Tóm tắt chương',o.description,4)}</div><div class="span2">${modalArea('notes','Ghi chú',o.notes,4)}</div></div>`;
 if(kind==='characters')return `<div class="field-grid">${modalInput('name','Tên nhân vật',o.name,{required:true})}${modalInput('role','Vai trò',o.role,{placeholder:'Rival, Gym Leader, NPC...'})}${modalInput('affiliation','Tổ chức / Phe',o.affiliation)}${field('Màu avatar',`<input type="color" name="color" value="${h(/^#[0-9a-fA-F]{6}$/.test(o.color||'')?o.color:'#8f7ad9')}" style="width:100%;height:41px;border:1px solid var(--line2);background:var(--panel2);border-radius:10px;padding:5px"/>`)}<div class="span2">${modalArea('description','Hồ sơ / Tiểu sử',o.description,4)}</div><div class="span2">${modalArea('motivation','Động lực / Mục tiêu',o.motivation,3)}</div><div class="span2">${modalArea('arc','Tuyến phát triển nhân vật',o.arc,3)}</div><div class="span2">${modalArea('notes','Ghi chú',o.notes,3)}</div></div>`;
 if(kind==='quests')return `<div class="field-grid">${modalInput('title','Tên nhiệm vụ',o.title,{required:true})}${modalSelect('type','Loại nhiệm vụ',valueOpt([['main','Main Quest'],['side','Side Quest']],o.type||'main'))}${modalSelect('chapterId','Chương',options(db.chapters,o.chapterId))}${modalSelect('status','Trạng thái',valueOpt([['todo','Chưa làm'],['progress','Đang làm'],['complete','Hoàn thành']],o.status||'todo'))}<div class="span2">${modalArea('description','Mô tả nhiệm vụ',o.description,3)}</div><div class="span2">${modalArea('objectives','Danh sách mục tiêu (mỗi dòng một bước)',(o.objectives||[]).join('\n'),5)}</div>${modalInput('reward','Phần thưởng',o.reward)}${modalInput('unlock','Điều kiện mở khóa',o.unlock)}<div class="span2">${modalArea('notes','Ghi chú',o.notes,3)}</div></div>`;
 if(kind==='locations')return `<div class="field-grid">${modalInput('name','Tên địa điểm',o.name,{required:true})}${modalInput('region','Khu vực / Region',o.region)}${modalInput('mapId','Map ID',o.mapId)}<div class="span2">${modalArea('description','Mô tả địa điểm',o.description,4)}</div><div class="span2">${modalArea('notes','Ghi chú',o.notes,4)}</div></div>`;
 if(kind==='flags')return `<div class="field-grid">${modalInput('key','Tên Switch / Variable',o.key,{required:true,placeholder:'STORY_PROGRESS'})}${modalSelect('type','Loại',valueOpt([['switch','Switch'],['variable','Variable']],o.type||'switch'))}${modalInput('defaultValue','Giá trị mặc định',o.defaultValue??'OFF')}<div class="span2">${modalArea('description','Ý nghĩa / Cách dùng',o.description,4)}</div></div>`;
 return '';
}
function openEdit(kind,id=null){const o=id?byId(kind,id):null;if(id&&!o)return toast('Không tìm thấy dữ liệu.','error');
 const label=modalTitle(kind);view.modal={type:'edit',kind,id};
 const html=`<div class="modal-overlay" data-close-overlay="1"><div class="modal" role="dialog" aria-modal="true" aria-label="Biên tập ${label}"><div class="modal-header"><div><div class="eyebrow">${id?'CHỈNH SỬA':'TẠO MỚI'}</div><h2>${id?'Chỉnh sửa':'Thêm'} ${label}</h2></div><button class="iconbtn" data-action="close-modal" aria-label="Đóng">${icon('x')}</button></div><div class="modal-content"><form id="entity-form" data-kind="${kind}" data-id="${h(id||'')}">${modalFields(kind,o)}</form></div><div class="modal-footer"><div>${id?`<button class="danger-btn small" data-action="delete-entity" data-kind="${kind}" data-id="${h(id)}">${icon('trash','icon-sm')} Xóa</button>`:''}</div><div class="flex gap8"><button class="ghost-btn" data-action="close-modal">Hủy</button><button class="primary-btn" data-action="save-entity">${icon('check','icon-sm')} Lưu thay đổi</button></div></div></div></div>`;
 document.getElementById('modal-root').innerHTML=html;document.querySelector('#entity-form input')?.focus();
}
function closeModal(){view.modal=null;const root=document.getElementById('modal-root');if(root)root.innerHTML=''}
function saveEntity(){const form=document.getElementById('entity-form');if(!form)return;const kind=form.dataset.kind,id=form.dataset.id;
 if(!form.reportValidity())return;
 const entries=Object.fromEntries(new FormData(form));
 for(const k of Object.keys(entries)) entries[k]=String(entries[k]).trim();
 if(kind==='flags'){
  entries.key=entries.key.toUpperCase().replace(/\s+/g,'_');
  if(db.flags.some(x=>x.id!==id&&x.key.toUpperCase()===entries.key)){toast('Tên Switch / Variable này đã tồn tại.','error');return;}
 }
 if(kind==='quests')entries.objectives=entries.objectives.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
 if(kind==='chapters')entries.number=Math.max(1,Number(entries.number)||1);
 if(kind==='characters'&&!/^#[0-9a-f]{6}$/i.test(entries.color))entries.color='#8f7ad9';
 if(id){const obj=byId(kind,id);if(!obj)return;Object.assign(obj,entries)}else {entries.id=uid(kind.slice(0,2));db[kind].push(entries)}
 db.meta.demo=false;save();closeModal();refresh();toast(`Đã lưu ${modalTitle(kind)}.`);
}
function newScene(){const chapterId=db.chapters[0]?.id||'';const count=db.scenes.filter(s=>s.chapterId===chapterId).length;
 const scene={id:uid('sc'),chapterId,order:count+1,title:'Scene chưa đặt tên',type:'dialogue',locationId:'',characterIds:[],questIds:[],status:'idea',summary:'',trigger:'',conditions:'',effects:'',mapId:'',eventId:'',prerequisites:[],dialogue:[],notes:'',updatedAt:now()};
 db.scenes.push(scene);db.meta.demo=false;save();view.selectedScene=scene.id;view.sceneTab='content';view.sceneChapter='all';view.sceneStatus='all';view.sceneQuery='';navigate('scenes',scene.id);toast('Đã tạo Scene mới.');
 setTimeout(()=>{const inp=document.querySelector('.scene-title-input');inp?.focus();inp?.select()},30);
}
function duplicateScene(){const orig=selectedScene();if(!orig)return;const clone=structuredClone(orig);clone.id=uid('sc');clone.title=(orig.title||'Scene')+' (bản sao)';clone.order=Math.max(0,...db.scenes.filter(s=>s.chapterId===orig.chapterId).map(s=>Number(s.order)||0))+1;clone.prerequisites=[...(orig.prerequisites||[])];clone.dialogue=(clone.dialogue||[]).map(d=>({...d,id:uid('dlg')}));clone.status='idea';clone.updatedAt=now();db.scenes.push(clone);db.meta.demo=false;save();view.selectedScene=clone.id;view.sceneTab='content';refresh();toast('Đã nhân bản Scene.');}
function removeEntity(kind,id){const obj=byId(kind,id);if(!obj)return;const name=obj.name||obj.title||obj.key||id;
 if(!confirm(`Xóa ${modalTitle(kind)} "${name}"?\nCác liên kết đến mục này cũng sẽ được gỡ. Hành động không thể hoàn tác.`))return;
 db[kind]=db[kind].filter(x=>x.id!==id);
 if(kind==='chapters'){db.scenes.forEach(s=>{if(s.chapterId===id)s.chapterId=''});db.quests.forEach(q=>{if(q.chapterId===id)q.chapterId=''})}
 if(kind==='characters')db.scenes.forEach(s=>{s.characterIds=(s.characterIds||[]).filter(x=>x!==id);(s.dialogue||[]).forEach(l=>{if(l.speakerId===id)l.speakerId=''})});
 if(kind==='locations')db.scenes.forEach(s=>{if(s.locationId===id)s.locationId=''});
 if(kind==='quests')db.scenes.forEach(s=>s.questIds=(s.questIds||[]).filter(x=>x!==id));
 if(kind==='scenes'){db.scenes.forEach(s=>s.prerequisites=(s.prerequisites||[]).filter(x=>x!==id));if(view.selectedScene===id)view.selectedScene=db.scenes[0]?.id||null}
 db.meta.demo=false;save();closeModal();refresh();toast(`Đã xóa ${name}.`);
}
function refresh(){const page=document.getElementById('page-content');if(page){page.innerHTML=renderPage();drawFlow()}else renderShell();
 const demoNote=document.querySelector('.demo-note');if(demoNote&&!db.meta.demo)demoNote.remove();
}
function updateSceneField(field,value){const s=selectedScene();if(!s)return;
 if(field==='order')value=Math.max(1,Number(value)||1);
 s[field]=value;s.updatedAt=now();db.meta.demo=false;save();
}
function updateDialogueField(id,field,value){const s=selectedScene();if(!s)return;const d=s.dialogue.find(x=>x.id===id);if(!d)return;d[field]=field==='choices'?value.split(/\r?\n/).map(x=>x.trim()).filter(Boolean):value;s.updatedAt=now();db.meta.demo=false;save()}
function searchMatches(q){const term=fold(q).trim();if(!term)return[];
 const all=[...db.chapters.map(x=>({kind:'chapters',id:x.id,title:x.title,sub:'Chương truyện · '+trim(x.description,75)})),...db.scenes.map(x=>({kind:'scenes',id:x.id,title:x.title,sub:'Scene · '+chapterName(x.chapterId)+' · '+trim(x.summary,65),extra:(x.dialogue||[]).map(d=>d.text).join(' ')})),...db.characters.map(x=>({kind:'characters',id:x.id,title:x.name,sub:'Nhân vật · '+trim(x.description,75)})),...db.quests.map(x=>({kind:'quests',id:x.id,title:x.title,sub:'Quest · '+trim(x.description,75)})),...db.locations.map(x=>({kind:'locations',id:x.id,title:x.name,sub:'Địa điểm · '+trim(x.description,75)})),...db.flags.map(x=>({kind:'flags',id:x.id,title:x.key,sub:'Switch / Variable · '+trim(x.description,75)}))];
 return all.filter(x=>[x.title,x.sub,x.extra].some(y=>fold(y).includes(term))).slice(0,30);
}
function searchResults(q){const items=searchMatches(q);return !q.trim()?`<div class="empty"><p>Nhập từ khóa để tìm nhanh chương, cảnh, hội thoại, nhân vật và nhiệm vụ.</p></div>`:items.length?items.map(x=>`<div class="search-result" data-action="search-result" data-kind="${x.kind}" data-id="${h(x.id)}">${icon(x.kind==='scenes'?'clapperboard':x.kind==='characters'?'users':x.kind==='quests'?'list-checks':x.kind==='locations'?'map-pin':x.kind==='flags'?'sliders':'book-open')}<div class="grow"><b>${h(x.title)}</b><small>${h(x.sub)}</small></div>${icon('arrow-right','icon-sm')}</div>`).join(''):blankPage('Không có kết quả','Hãy thử từ khóa khác.')}
function openSearch(){view.modal={type:'search'};const root=document.getElementById('modal-root');root.innerHTML=`<div class="modal-overlay" data-close-overlay="1"><div class="modal search-modal" role="dialog" aria-modal="true"><div class="modal-header"><div class="flex center gap12 grow">${icon('search')}<input id="search-input" class="input-box" style="border:0;background:transparent" placeholder="Tìm nhân vật, hội thoại, sự kiện..." value="${h(view.searchQuery)}" autocomplete="off" autofocus/></div><button class="iconbtn mini-ico" data-action="close-modal">${icon('x','icon-sm')}</button></div><div class="search-results" id="search-results">${searchResults(view.searchQuery)}</div><div class="modal-footer"><span class="help">Tìm kiếm trong toàn bộ dự án</span><span class="kbd-outline">ESC để đóng</span></div></div></div>`;document.getElementById('search-input')?.focus()}
function searchResult(kind,id){closeModal();if(kind==='scenes'){view.sceneTab='content';view.sceneQuery='';view.sceneChapter='all';view.sceneStatus='all';navigate('scenes',id)}else{navigate(kind);setTimeout(()=>openEdit(kind,id),20)}}
function openDataModal(){view.modal={type:'data'};document.getElementById('modal-root').innerHTML=`<div class="modal-overlay" data-close-overlay="1"><div class="modal" role="dialog" aria-modal="true"><div class="modal-header"><div><div class="eyebrow">DATA & BACKUP</div><h2>Quản lý dữ liệu dự án</h2></div><button class="iconbtn" data-action="close-modal" title="Đóng">${icon('x')}</button></div><div class="modal-content">
 <div class="data-action-card">${icon('download','icon-lg')}<div class="grow"><b>Xuất bản sao lưu JSON</b><p>Lưu tất cả chương, Scene, hội thoại, Quest và liên kết. Có thể nhập lại sau này.</p></div><button class="outline-btn small" data-action="export-json">Tải JSON</button></div>
 <div class="data-action-card">${icon('file-text','icon-lg')}<div class="grow"><b>Xuất kịch bản Markdown</b><p>Bản đọc tổng hợp cốt truyện và hội thoại; phù hợp review hoặc lưu Git.</p></div><button class="outline-btn small" data-action="export-md">Tải .md</button></div>
 <div class="data-action-card">${icon('upload','icon-lg')}<div class="grow"><b>Nhập dự án từ JSON</b><p>Khôi phục bản sao lưu hoặc chuyển dự án từ trình duyệt khác.</p></div><button class="outline-btn small" data-action="import-json">Chọn file</button><input id="import-file" type="file" accept=".json,application/json" hidden/></div>
 <div class="divider"></div><div class="data-warning">${icon('alert','icon-sm')} Website GitHub Pages không có máy chủ lưu dữ liệu. Thay đổi được tự lưu trong <b>trình duyệt hiện tại</b>, không tự đồng bộ giữa các thiết bị và có thể mất nếu xóa dữ liệu trình duyệt. Hãy xuất JSON định kỳ và lưu vào repository hoặc ổ đĩa của bạn.</div>
 <div class="flex gap8 mt18" style="flex-wrap:wrap"><button class="outline-btn small" data-action="load-demo">${icon('rotate','icon-sm')} Nạp dữ liệu minh họa</button><button class="danger-btn small" data-action="blank-project">${icon('trash','icon-sm')} Xóa dữ liệu, tạo dự án trống</button></div></div><div class="modal-footer"><span class="help">Dữ liệu: ${db.scenes.length} Scene · ${db.chapters.length} Chapter</span><button class="primary-btn" data-action="close-modal">Đóng</button></div></div></div>`}
function fileDownload(filename,text,type){const blob=new Blob([text],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200)}
function dateStamp(){return new Date().toISOString().slice(0,10)}
function exportJson(){fileDownload(`zenith-story-backup-${dateStamp()}.json`,JSON.stringify(db,null,2),'application/json;charset=utf-8');toast('Đã xuất bản sao lưu JSON.');}
function exportMarkdown(){const lines=[`# ${db.meta.name} — Story Bible`,'',`Xuất ngày: ${displayDate(now())}`,'',`## Nhân vật`,''];
 db.characters.forEach(c=>{lines.push(`### ${c.name}`,`- Vai trò: ${c.role||'—'}`,`- Tổ chức: ${c.affiliation||'—'}`,`- Tiểu sử: ${c.description||'—'}`,`- Động lực: ${c.motivation||'—'}`,`- Tuyến phát triển: ${c.arc||'—'}`,'')});
 lines.push('## Nội dung theo chương','');const chaps=[...db.chapters].sort((a,b)=>(a.number||0)-(b.number||0));if(db.scenes.some(s=>!s.chapterId))chaps.push({id:'',title:'Chưa gán chương'});
 for(const c of chaps){lines.push(`## ${c.title}`,'',c.description||'','');for(const s of db.scenes.filter(x=>x.chapterId===c.id).sort((a,b)=>a.order-b.order)){
  lines.push(`### ${s.order}. ${s.title}`,'',`- ID: ${s.id}`,`- Trạng thái: ${STATUS[s.status]||s.status}`,`- Loại: ${SCENE_TYPES[s.type]||s.type}`,`- Địa điểm: ${placeName(s.locationId)}`,`- Map ID / Event ID: ${s.mapId||'—'} / ${s.eventId||'—'}`,`- Nhân vật: ${(s.characterIds||[]).map(charName).join(', ')||'—'}`,`- Scene tiền đề: ${(s.prerequisites||[]).map(id=>byId('scenes',id)?.title||id).join(', ')||'—'}`,`- Trigger: ${s.trigger||'—'}`,`- Conditions: ${s.conditions||'—'}`,`- Effects: ${s.effects||'—'}`,'',s.summary||'','',`**Hội thoại**`,'');
  for(const d of s.dialogue||[]){lines.push(`**${d.kind==='narration'?'Người dẫn chuyện':charName(d.speakerId)}${d.emotion?' ('+d.emotion+')':''}**: ${d.text||''}`);if(d.kind==='choice'&&(d.choices||[]).length)d.choices.forEach(x=>lines.push(`- ${x}`));lines.push('')}
  if(s.notes)lines.push(`**Ghi chú:** ${s.notes}`,'');
 }}
 lines.push('## Nhiệm vụ','');db.quests.forEach(q=>{lines.push(`### ${q.title} (${q.type==='side'?'Side Quest':'Main Quest'})`,q.description||'','',...(q.objectives||[]).map((x,i)=>`${i+1}. ${x}`),'',`Phần thưởng: ${q.reward||'—'}`,'')});
 lines.push('## Switch & Variable','');db.flags.forEach(f=>lines.push(`- **${f.key}** (${f.type} / ${f.defaultValue}): ${f.description||''}`));
 fileDownload(`zenith-story-script-${dateStamp()}.md`,lines.join('\n'),'text/markdown;charset=utf-8');toast('Đã xuất tài liệu Markdown.');
}
async function importJson(file){if(!file)return;try{
 const txt=await file.text();if(txt.length>15*1024*1024)throw Error('Tệp lớn hơn 15 MB, không thể nhập.');const parsed=normalize(JSON.parse(txt));
 if(!confirm(`Nhập dữ liệu gồm ${parsed.chapters.length} chương và ${parsed.scenes.length} Scene?\nDữ liệu hiện tại sẽ được thay thế. Hãy sao lưu trước khi tiếp tục.`))return;
 db=parsed;save();view.selectedScene=db.scenes[0]?.id||null;view.sceneChapter='all';view.sceneStatus='all';view.sceneQuery='';view.modal=null;navigate('dashboard');toast('Đã khôi phục dữ liệu từ JSON.');
 }catch(e){toast('Không thể nhập JSON: '+e.message,'error')}
}
function blankProject(){if(!confirm('Xóa TOÀN BỘ dữ liệu hiện tại và bắt đầu từ dự án trống?\nHãy xuất JSON trước. Hành động không thể hoàn tác.'))return;
 db={version:VERSION,meta:{name:'Pokémon Zenith',demo:false,createdAt:now(),updatedAt:now()},chapters:[],scenes:[],characters:[],quests:[],locations:[],flags:[]};save();view.selectedScene=null;view.modal=null;navigate('dashboard');toast('Đã tạo dự án trống.');}
function loadDemo(){if(!confirm('Nạp lại dữ liệu minh họa? Toàn bộ dữ liệu hiện tại sẽ bị thay thế.'))return;db=demo();save();view.selectedScene=db.scenes[0]?.id||null;view.modal=null;navigate('dashboard');toast('Đã nạp dữ liệu minh họa.');}
function previewDialogue(){const s=selectedScene();if(!s?.dialogue?.length){toast('Cảnh này chưa có lời thoại để xem thử.','error');return}view.previewIndex=0;view.modal={type:'preview'};renderPreview()}
function renderPreview(){const s=selectedScene();if(!s)return;const i=Math.max(0,Math.min(view.previewIndex,s.dialogue.length-1)),d=s.dialogue[i];const speaker=d.kind==='narration'?'Người dẫn chuyện':d.kind==='choice'?'Lựa chọn':charName(d.speakerId);
 document.getElementById('modal-root').innerHTML=`<div class="modal-overlay" data-close-overlay="1"><div class="modal narrow" role="dialog" aria-modal="true"><div class="modal-header"><div><div class="eyebrow">DIALOGUE PREVIEW</div><h2>${h(s.title)}</h2></div><button class="iconbtn" data-action="close-modal">${icon('x')}</button></div><div class="modal-content"><div class="help">Đoạn ${i+1} / ${s.dialogue.length} ${d.emotion?'· '+h(d.emotion):''}</div><div class="speech-preview"><div class="speaker">${h(speaker)}</div><div class="speech">${h(d.text)||'<span class="quiet">(Chưa có nội dung)</span>'}</div>${d.kind==='choice'?(d.choices||[]).map((x,j)=>`<div class="check-chip mt12" style="display:block">${j+1}. ${h(x)}</div>`).join(''):''}</div></div><div class="modal-footer"><button class="outline-btn small" data-action="preview-step" data-dir="-1" ${i===0?'disabled':''}>${icon('arrow-left','icon-sm')} Trước</button><span class="help">Xem trước văn bản, chưa mô phỏng Event</span><button class="primary-btn small" data-action="preview-step" data-dir="1" ${i===s.dialogue.length-1?'disabled':''}>Tiếp ${icon('arrow-right','icon-sm')}</button></div></div></div>`;
}
function onClick(e){
 const overlay=e.target.closest('[data-close-overlay]');if(overlay&&e.target===overlay){closeModal();return}
 const el=e.target.closest('[data-action]');if(!el)return;
 const act=el.dataset.action,id=el.dataset.id,kind=el.dataset.kind;
 switch(act){
 case 'nav':navigate(el.dataset.page);break;
 case 'search':openSearch();break;
 case 'theme':light=!light;localStorage.setItem(THEME_KEY,light?'light':'dark');document.documentElement.dataset.theme=light?'light':'dark';renderShell();break;
 case 'data':openDataModal();break;
 case 'new-scene':newScene();break;
 case 'new':openEdit(kind);break;
 case 'edit':openEdit(kind,id);break;
 case 'close-modal':closeModal();break;
 case 'save-entity':saveEntity();break;
 case 'delete-entity':removeEntity(kind,id);break;
 case 'open-scene':view.sceneTab='content';navigate('scenes',id);break;
 case 'scene-tab':view.sceneTab=el.dataset.tab;refresh();break;
 case 'duplicate-scene':duplicateScene();break;
 case 'delete-scene':if(selectedScene())removeEntity('scenes',selectedScene().id);break;
 case 'add-dialogue':{const s=selectedScene();if(!s)return;s.dialogue.push({id:uid('dlg'),kind:'speech',speakerId:'',text:'',emotion:'',choices:[]});s.updatedAt=now();db.meta.demo=false;save();refresh();break}
 case 'remove-dialogue':{const s=selectedScene();s.dialogue=s.dialogue.filter(x=>x.id!==id);s.updatedAt=now();db.meta.demo=false;save();refresh();break}
 case 'move-dialogue':{const s=selectedScene(),ix=s.dialogue.findIndex(x=>x.id===id),next=ix+Number(el.dataset.dir);if(ix>=0&&next>=0&&next<s.dialogue.length){[s.dialogue[ix],s.dialogue[next]]=[s.dialogue[next],s.dialogue[ix]];s.updatedAt=now();db.meta.demo=false;save();refresh()}break}
 case 'preview-dialogue':previewDialogue();break;
 case 'preview-step':view.previewIndex+=Number(el.dataset.dir);renderPreview();break;
 case 'search-result':searchResult(kind,id);break;
 case 'export-json':exportJson();break;
 case 'export-md':exportMarkdown();break;
 case 'import-json':document.getElementById('import-file')?.click();break;
 case 'blank-project':blankProject();break;
 case 'load-demo':loadDemo();break;
 }
}
function onInput(e){const el=e.target;
 if(el.id==='search-input'){view.searchQuery=el.value;const r=document.getElementById('search-results');if(r)r.innerHTML=searchResults(el.value);return}
 if(el.dataset.actionInput==='scene-search'){view.sceneQuery=el.value;const list=document.getElementById('scene-list');if(list)list.innerHTML=sceneListMarkup(filteredScenes());return}
 if(el.dataset.sceneField){if(el.tagName!=='SELECT'){updateSceneField(el.dataset.sceneField,el.value)}return}
 if(el.dataset.dialogueField){if(el.tagName!=='SELECT')updateDialogueField(el.dataset.dialogueId,el.dataset.dialogueField,el.value)}
}
function dependsOn(sceneId,target,visited=new Set()){if(sceneId===target)return true;if(visited.has(sceneId))return false;visited.add(sceneId);const s=byId('scenes',sceneId);return (s?.prerequisites||[]).some(p=>dependsOn(p,target,visited));}
function onChange(e){const el=e.target;
 if(el.id==='import-file'){importJson(el.files?.[0]);return}
 if(el.dataset.filter){view[el.dataset.filter]=el.value;refresh();return}
 if(el.dataset.filterCheck){view[el.dataset.filterCheck]=el.checked;refresh();return}
 if(el.dataset.sceneMulti){const s=selectedScene();if(!s)return;const ids=[...document.querySelectorAll(`[data-scene-multi="${el.dataset.sceneMulti}"]:checked`)].map(x=>x.value);if(el.dataset.sceneMulti==='prerequisites'&&ids.some(id=>dependsOn(id,s.id))){toast('Liên kết này tạo vòng lặp trong Story Flow.','error');refresh();return}s[el.dataset.sceneMulti]=ids;s.updatedAt=now();db.meta.demo=false;save();return}
 if(el.dataset.sceneField){updateSceneField(el.dataset.sceneField,el.value);if(el.tagName==='SELECT'||el.dataset.sceneField==='order'){refresh()}return}
 if(el.dataset.dialogueField){updateDialogueField(el.dataset.dialogueId,el.dataset.dialogueField,el.value);if(el.dataset.dialogueField==='kind')refresh()}
}
document.addEventListener('click',onClick);
document.addEventListener('input',onInput);
document.addEventListener('change',onChange);
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&view.modal){closeModal();return}
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch()}
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'){e.preventDefault();save();toast('Đã lưu dữ liệu cục bộ.')}
 if(e.key==='Enter'&&e.target.closest('#entity-form')&&!e.target.matches('textarea')){e.preventDefault();saveEntity()}
});
window.addEventListener('resize',()=>{if(view.page==='flow')drawFlow()});
save();renderShell();
