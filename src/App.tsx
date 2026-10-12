import { useMemo, useState } from "react";

type IconName =
  | "arrow"
  | "bag"
  | "check"
  | "chevron"
  | "clock"
  | "heart"
  | "leaf"
  | "location"
  | "minus"
  | "plus"
  | "search"
  | "sparkle"
  | "store"
  | "user"
  | "x";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="m15 18-6-6 6-6" /><path d="M9 12h10" /></>,
    bag: <><path d="M6 8h12l1 12H5L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5a5.5 5.5 0 0 0 1.1-8.9Z" />,
    leaf: <><path d="M20 4c-8 0-14 4-14 10 0 3 2 5 5 5 6 0 9-7 9-15Z" /><path d="M4 21c2-5 6-9 12-12" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    minus: <path d="M5 12h14" />,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    sparkle: <><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
    store: <><path d="M4 10v10h16V10" /><path d="M3 4h18l-2 6H5L3 4Z" /><path d="M9 20v-6h6v6" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    x: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

type Share = {
  id: number;
  name: string;
  provider: string;
  providerType: string;
  location: string;
  distance: string;
  time: string;
  remaining: number;
  total: number;
  image: string;
  tag: string;
  closed?: boolean;
  description: string;
};

const initialShares: Share[] = [
  {
    id: 1,
    name: "오늘 구운 소금빵",
    provider: "오후의 빵집",
    providerType: "인증된 가게",
    location: "연남동 동진시장 앞",
    distance: "걸어서 6분",
    time: "오늘 18:30–20:00",
    remaining: 4,
    total: 10,
    image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=900&q=85",
    tag: "마감 임박",
    description: "오늘 매장에서 직접 구운 소금빵이에요. 영업 마감 후 남은 빵을 이웃과 나눕니다. 알레르기 유발 성분으로 밀, 우유, 버터가 포함되어 있어요.",
  },
  {
    id: 2,
    name: "제철 채소 도시락",
    provider: "소담 키친",
    providerType: "인증된 가게",
    location: "망원동 주민센터 근처",
    distance: "걸어서 9분",
    time: "오늘 19:00–20:30",
    remaining: 3,
    total: 6,
    image: "https://images.unsplash.com/photo-1784979472083-dd3c4c109345?auto=format&fit=crop&w=900&q=85",
    tag: "3개 남음",
    description: "제철 채소와 샌드위치로 구성한 가벼운 도시락입니다. 조리 후 냉장 보관했고 오늘 안에 드시길 권해요.",
  },
  {
    id: 3,
    name: "반찬 4종 한 팩",
    provider: "정다운 반찬",
    providerType: "인증된 가게",
    location: "성산동 성미산로",
    distance: "걸어서 12분",
    time: "오늘 20:00–21:00",
    remaining: 7,
    total: 12,
    image: "https://images.unsplash.com/photo-1562571708-527276a391ac?auto=format&fit=crop&w=900&q=85",
    tag: "인기",
    description: "매일 아침 만든 집밥 반찬 네 가지를 한 팩에 담았습니다. 구성은 당일 재고에 따라 조금 달라질 수 있어요.",
  },
  {
    id: 4,
    name: "크루아상과 페이스트리",
    provider: "버터하우스",
    providerType: "인증된 가게",
    location: "서교동 경의선숲길",
    distance: "걸어서 15분",
    time: "내일 10:00–11:00",
    remaining: 8,
    total: 8,
    image: "https://images.unsplash.com/photo-1702966600106-a964e69b0b5e?auto=format&fit=crop&w=900&q=85",
    tag: "내일",
    description: "바삭한 크루아상과 데니시 페이스트리 모음입니다. 종이 봉투에 담아 전달해 드립니다.",
  },
  {
    id: 5,
    name: "과일 한 바구니",
    provider: "연희동 이웃",
    providerType: "개인 나눔",
    location: "연희동 사러가마트 근처",
    distance: "걸어서 17분",
    time: "오늘 18:00–19:00",
    remaining: 0,
    total: 1,
    image: "https://images.unsplash.com/photo-1569420067112-b57b4f024595?auto=format&fit=crop&w=900&q=85",
    tag: "마감",
    closed: true,
    description: "선물 받은 과일이 많아 상태 좋은 것들로 나눠요. 정확한 수령 주소는 신청 후 안내합니다.",
  },
];

function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "icon";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return <button type={type} className={`button button-${variant} ${className}`} onClick={onClick} disabled={disabled}>{children}</button>;
}

function Header({ onHome, onRegister }: { onHome: () => void; onRegister: () => void }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={onHome} aria-label="한끼잇다 홈">
        <span className="brand-mark"><Icon name="leaf" size={21} /></span>
        <span>한끼잇다</span>
      </button>
      <nav className="desktop-nav" aria-label="주요 메뉴">
        <button className="nav-active" onClick={onHome}>나눔 찾기</button>
        <button>나의 신청</button>
        <button>한끼잇다 소개</button>
      </nav>
      <div className="header-actions">
        <Button variant="secondary" onClick={onRegister}><Icon name="plus" size={18} /> 음식 나누기</Button>
        <button className="profile" aria-label="내 프로필"><Icon name="user" size={19} /></button>
      </div>
    </header>
  );
}

function ShareCard({ share, onSelect }: { share: Share; onSelect: () => void }) {
  const [liked, setLiked] = useState(false);
  return (
    <article className={`share-card ${share.closed ? "is-closed" : ""}`}>
      <div className="card-image-wrap" onClick={onSelect}>
        <img className="card-image" src={share.image} alt={share.name} />
        <span className={`status-tag ${share.tag === "마감 임박" ? "urgent" : ""}`}>{share.tag}</span>
        <button
          className={`heart-button ${liked ? "liked" : ""}`}
          onClick={(event) => { event.stopPropagation(); setLiked(!liked); }}
          aria-label={liked ? "관심 목록에서 삭제" : "관심 목록에 추가"}
        >
          <Icon name="heart" size={19} />
        </button>
      </div>
      <button className="card-body" onClick={onSelect}>
        <div className="provider"><span>{share.provider}</span><span className="provider-check"><Icon name="check" size={10} /></span></div>
        <div className="card-title">{share.name}</div>
        <div className="card-meta"><Icon name="location" size={16} /><span>{share.location}</span><b>{share.distance}</b></div>
        <div className="card-meta"><Icon name="clock" size={16} /><span>{share.time}</span></div>
        <div className="quantity-row">
          <span>남은 수량</span>
          <strong>{share.closed ? "마감" : `${share.remaining}개`}</strong>
          {!share.closed && <div className="progress"><i style={{ width: `${(share.remaining / share.total) * 100}%` }} /></div>}
        </div>
      </button>
    </article>
  );
}

function ListScreen({ shares, onSelect, onRegister }: { shares: Share[]; onSelect: (share: Share) => void; onRegister: () => void }) {
  const [area, setArea] = useState("마포구");
  const [filter, setFilter] = useState("전체");
  const filtered = useMemo(() => filter === "마감 제외" ? shares.filter((share) => !share.closed) : shares, [filter, shares]);
  return (
    <main>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy-wrap">
            <div className="eyebrow"><span className="live-dot" /> 우리 동네 음식 나눔</div>
            <div className="hero-copy">
              <h1>남는 음식에,<br /><em>새로운 식탁을.</em></h1>
              <p>오늘 나눌 수 있는 음식을 가까운 이웃과 이어요.<br className="desktop-only" /> 필요한 만큼, 편한 시간에 따뜻한 한 끼를 만나보세요.</p>
              <div className="hero-actions">
                <Button onClick={() => document.querySelector(".content")?.scrollIntoView({ behavior: "smooth" })}>오늘의 나눔 보기 <Icon name="chevron" size={17} /></Button>
                <button className="hero-text-link" onClick={() => document.querySelector(".how-section")?.scrollIntoView({ behavior: "smooth" })}>어떻게 이용하나요?</button>
              </div>
            </div>
          </div>
          <div className="hero-art" aria-label="이웃과 나누는 한 끼">
            <span className="hero-sun" />
            <span className="hero-hill hero-hill-back" />
            <span className="hero-hill" />
            <div className="food-plate">
              <img src={shares[1].image} alt="이웃과 나누는 신선한 한 끼" />
            </div>
            <span className="art-leaf art-leaf-one"><Icon name="leaf" size={25} /></span>
            <span className="art-leaf art-leaf-two"><Icon name="leaf" size={20} /></span>
            <div className="floating-note">
              <span className="floating-note-icon"><Icon name="heart" size={17} /></span>
              <p><strong>오늘도 한 끼를 나눠요</strong>음식은 가까이, 마음은 함께</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="list-heading">
          <div>
            <span className="section-kicker">NEARBY SHARING</span>
            <h2>오늘의 나눔</h2>
          </div>
          <p>지금 우리 동네에서 <strong>{filtered.filter((item) => !item.closed).length}개</strong>의 음식이 기다리고 있어요</p>
        </div>

        <div className="filter-row">
          <button className="area-select" onClick={() => setArea(area === "마포구" ? "서대문구" : "마포구")}>
            <Icon name="location" size={17} /><strong>서울 {area}</strong><Icon name="chevron" size={15} />
          </button>
          <div className="filter-divider" />
          {["전체", "한 끼 식사", "반찬", "빵·간식", "마감 제외"].map((item) => (
            <button key={item} className={`filter-pill ${filter === item ? "selected" : ""}`} onClick={() => setFilter(item)}>{item}</button>
          ))}
          <button className="search-button" aria-label="검색"><Icon name="search" size={20} /></button>
        </div>

        <div className="share-grid">
          {filtered.map((share) => <ShareCard key={share.id} share={share} onSelect={() => onSelect(share)} />)}
        </div>

        <aside className="share-banner">
          <div className="banner-illustration"><span>🥖</span><span>🍎</span><span>🥬</span></div>
          <div><span className="section-kicker">GIVE A MEAL, SHARE A HEART</span><h3>남는 음식이 있나요?</h3><p>사진 한 장과 간단한 정보면 3분 안에 나눔을 시작할 수 있어요.</p></div>
          <Button onClick={onRegister}>음식 나누기 <Icon name="chevron" size={17} /></Button>
        </aside>

        <section className="how-section">
          <div className="how-copy">
            <span className="section-kicker">HOW IT WORKS</span>
            <h2>나눔은 간단하게,<br />마음은 따뜻하게</h2>
            <p>마음에 드는 음식을 찾아 신청하고,<br />안내된 시간에 만나세요.</p>
          </div>
          <div className="how-steps">
            <div className="how-step"><span><Icon name="search" /></span><b>음식 찾기</b><small>내 주변 나눔 살펴보기</small></div>
            <div className="how-step"><span><Icon name="check" /></span><b>간편 신청</b><small>수량과 시간 확인하기</small></div>
            <div className="how-step"><span><Icon name="bag" /></span><b>한 끼 만나기</b><small>안내된 장소에서 픽업</small></div>
          </div>
        </section>
      </section>
    </main>
  );
}

function DetailScreen({ share, onBack, onRequest }: { share: Share; onBack: () => void; onRequest: () => void }) {
  return (
    <main className="detail-page">
      <div className="detail-shell">
        <button className="back-link" onClick={onBack}><Icon name="arrow" size={19} /> 목록으로 돌아가기</button>
        <div className="detail-grid">
          <div className="detail-image-wrap">
            <img src={share.image} alt={share.name} />
            <span className="status-tag urgent">{share.tag}</span>
          </div>
          <div className="detail-copy">
            <div className="detail-provider">
              <span className="store-icon"><Icon name="store" /></span>
              <div><strong>{share.provider}</strong><span>{share.providerType}</span></div>
            </div>
            <h1>{share.name}</h1>
            <p className="description">{share.description}</p>
            <div className="detail-info">
              <div><span className="info-icon"><Icon name="bag" /></span><p><small>남은 수량</small><strong>{share.remaining}개 <em>/ 총 {share.total}개</em></strong></p></div>
              <div><span className="info-icon"><Icon name="clock" /></span><p><small>수령 가능 시간</small><strong>{share.time}</strong></p></div>
              <div><span className="info-icon"><Icon name="location" /></span><p><small>수령 장소</small><strong>{share.location}</strong><em>상세 주소는 신청 후 안내해 드려요</em></p></div>
            </div>
            <div className="pickup-note"><Icon name="sparkle" size={18} /><p><strong>이렇게 받아가세요</strong><span>매장 카운터에서 “한끼잇다 신청했어요”라고 말씀해 주세요. 다회용 가방을 가져오시면 더 좋아요.</span></p></div>
            <Button className="request-button" onClick={onRequest} disabled={share.closed}>{share.closed ? "나눔이 마감되었어요" : "수령 신청하기"}<Icon name="chevron" size={18} /></Button>
            <p className="safety-note">수령 전 음식 상태와 알레르기 정보를 꼭 확인해 주세요.</p>
          </div>
        </div>
      </div>
    </main>
  );
}

function RequestScreen({ share, onBack, onComplete }: { share: Share; onBack: () => void; onComplete: (quantity: number) => void }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <main className="form-page">
      <div className="form-shell request-shell">
        <button className="back-link" onClick={onBack}><Icon name="arrow" size={19} /> 나눔 상세로</button>
        <div className="form-title"><span className="step-label">PICKUP REQUEST</span><h1>수령할 수량을<br />확인해 주세요</h1><p>신청 후 정해진 시간에 꼭 방문해 주세요.</p></div>
        <div className="request-summary">
          <img src={share.image} alt="" />
          <div><span>{share.provider}</span><strong>{share.name}</strong><small>{share.time}</small></div>
        </div>
        <div className="quantity-picker">
          <div><strong>신청 수량</strong><span>최대 {share.remaining}개까지 신청할 수 있어요</span></div>
          <div className="stepper">
            <Button variant="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity === 1}><Icon name="minus" /></Button>
            <strong>{quantity}</strong>
            <Button variant="icon" onClick={() => setQuantity(Math.min(share.remaining, quantity + 1))} disabled={quantity === share.remaining}><Icon name="plus" /></Button>
          </div>
        </div>
        <label className="agreement"><input type="checkbox" defaultChecked /><span><i><Icon name="check" size={13} /></i>수령 시간과 장소를 확인했으며, 방문이 어려울 경우 미리 취소할게요.</span></label>
        <Button className="request-button" onClick={() => onComplete(quantity)}>{quantity}개 수령 신청하기</Button>
      </div>
    </main>
  );
}

function CompleteScreen({ share, quantity, onHome }: { share: Share; quantity: number; onHome: () => void }) {
  return (
    <main className="complete-page">
      <div className="complete-card">
        <span className="complete-icon"><Icon name="check" size={35} /></span>
        <span className="step-label">REQUEST COMPLETE</span>
        <h1>따뜻한 한 끼가<br />예약되었어요</h1>
        <p>잊지 말고 수령 시간에 맞춰 방문해 주세요.</p>
        <div className="receipt">
          <div><span>신청 음식</span><strong>{share.name}</strong></div>
          <div><span>신청 수량</span><strong>{quantity}개</strong></div>
          <div><span>수령 시간</span><strong>{share.time}</strong></div>
          <div><span>수령 장소</span><strong>{share.location}</strong></div>
        </div>
        <div className="pickup-code"><span>수령 확인 번호</span><strong>A-{share.id}42</strong><small>매장에서 이 번호를 보여주세요</small></div>
        <Button className="request-button" onClick={onHome}>내 주변 나눔 더 보기</Button>
      </div>
    </main>
  );
}

function RegisterScreen({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [agreed, setAgreed] = useState(true);
  return (
    <main className="form-page">
      <div className="register-shell">
        <div className="register-head">
          <div><span className="step-label">SHARE YOUR FOOD</span><h1>어떤 음식을<br />나눌까요?</h1><p>필요한 정보만 간단히 알려주세요.<br />3분이면 충분해요.</p></div>
          <button className="close-button" onClick={onClose} aria-label="닫기"><Icon name="x" /></button>
        </div>
        <form onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
          <div className="upload-box"><Icon name="plus" size={25} /><strong>음식 사진 올리기</strong><span>음식이 잘 보이는 사진을 선택해 주세요</span></div>
          <div className="field-grid">
            <label><span>음식 이름 *</span><input required placeholder="예: 오늘 구운 소금빵" /></label>
            <label><span>수량 *</span><input required min="1" type="number" placeholder="몇 개를 나눌까요?" /></label>
            <label className="full"><span>수령 장소 *</span><input required placeholder="동네와 알아보기 쉬운 장소를 입력해 주세요" /></label>
            <label><span>수령 시작 시간 *</span><input required type="datetime-local" /></label>
            <label><span>수령 종료 시간 *</span><input required type="datetime-local" /></label>
            <label className="full"><span>수령 방법</span><textarea placeholder="이웃이 어떻게 받아가면 되는지 알려주세요" /></label>
          </div>
          <label className="agreement"><input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} /><span><i><Icon name="check" size={13} /></i>음식 상태와 보관 방법을 확인했으며, 안전한 음식만 나눌게요.</span></label>
          <Button type="submit" className="request-button" disabled={!agreed}>나눔 등록하기</Button>
        </form>
      </div>
    </main>
  );
}

export default function App() {
  const [shares, setShares] = useState(initialShares);
  const [screen, setScreen] = useState<"list" | "detail" | "request" | "complete" | "register">("list");
  const [selected, setSelected] = useState<Share>(initialShares[0]);
  const [requestedQuantity, setRequestedQuantity] = useState(1);

  const goHome = () => { setScreen("list"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openDetail = (share: Share) => { setSelected(share); setScreen("detail"); window.scrollTo(0, 0); };
  const complete = (quantity: number) => {
    setRequestedQuantity(quantity);
    setShares((items) => items.map((item) => item.id === selected.id ? { ...item, remaining: item.remaining - quantity, closed: item.remaining - quantity === 0 } : item));
    setScreen("complete");
    window.scrollTo(0, 0);
  };

  return (
    <div className="app">
      {screen !== "register" && <Header onHome={goHome} onRegister={() => setScreen("register")} />}
      {screen === "list" && <ListScreen shares={shares} onSelect={openDetail} onRegister={() => setScreen("register")} />}
      {screen === "detail" && <DetailScreen share={selected} onBack={goHome} onRequest={() => setScreen("request")} />}
      {screen === "request" && <RequestScreen share={selected} onBack={() => setScreen("detail")} onComplete={complete} />}
      {screen === "complete" && <CompleteScreen share={selected} quantity={requestedQuantity} onHome={goHome} />}
      {screen === "register" && <RegisterScreen onClose={goHome} onSubmit={goHome} />}
      {screen === "list" && (
        <nav className="mobile-nav">
          <button className="active"><Icon name="search" /><span>나눔 찾기</span></button>
          <button onClick={() => setScreen("register")}><Icon name="plus" /><span>음식 나누기</span></button>
          <button><Icon name="user" /><span>나의 한끼</span></button>
        </nav>
      )}
    </div>
  );
}
