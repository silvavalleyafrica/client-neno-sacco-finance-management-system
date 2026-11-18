"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";

type Module =
  | "Overview"
  | "Members"
  | "Savings"
  | "Loans"
  | "Dividends"
  | "Payments"
  | "Employees"
  | "Reports"
  | "Settings";

type IconName =
  | "overview"
  | "members"
  | "savings"
  | "loans"
  | "dividends"
  | "payments"
  | "employees"
  | "reports"
  | "settings"
  | "search"
  | "bell"
  | "plus"
  | "arrow"
  | "download"
  | "chevron"
  | "close"
  | "menu"
  | "trend";

type RecordRow = {
  id: string;
  name: string;
  detail: string;
  amount: string;
  status: "Completed" | "Pending" | "Active" | "Under review";
  date: string;
  initials: string;
  color: string;
};

const navigation: { label: Module; icon: IconName; group: string }[] = [
  { label: "Overview", icon: "overview", group: "Workspace" },
  { label: "Members", icon: "members", group: "Workspace" },
  { label: "Savings", icon: "savings", group: "Workspace" },
  { label: "Loans", icon: "loans", group: "Workspace" },
  { label: "Dividends", icon: "dividends", group: "Workspace" },
  { label: "Payments", icon: "payments", group: "Workspace" },
  { label: "Employees", icon: "employees", group: "Management" },
  { label: "Reports", icon: "reports", group: "Management" },
  { label: "Settings", icon: "settings", group: "Management" },
];

const initialRows: RecordRow[] = [
  { id: "NS-2408", name: "Grace Wanjiku", detail: "Monthly savings", amount: "+ KES 5,000", status: "Completed", date: "Today, 10:42 AM", initials: "GW", color: "lilac" },
  { id: "NS-2407", name: "Peter Kamau", detail: "Loan repayment", amount: "+ KES 12,500", status: "Completed", date: "Today, 9:18 AM", initials: "PK", color: "mint" },
  { id: "NS-2406", name: "Mary Njeri", detail: "Member withdrawal", amount: "− KES 8,000", status: "Pending", date: "Yesterday", initials: "MN", color: "peach" },
  { id: "NS-2405", name: "David Kiptoo", detail: "Share contribution", amount: "+ KES 2,000", status: "Completed", date: "Yesterday", initials: "DK", color: "blue" },
];

const memberRows: RecordRow[] = [
  { id: "NNO-00482", name: "Grace Wanjiku", detail: "Regular member · Joined Mar 2022", amount: "KES 184,500", status: "Active", date: "18 Nov 2026", initials: "GW", color: "lilac" },
  { id: "NNO-00481", name: "Peter Kamau", detail: "Premium member · Joined Aug 2021", amount: "KES 326,000", status: "Active", date: "17 Nov 2026", initials: "PK", color: "mint" },
  { id: "NNO-00480", name: "Mary Njeri", detail: "Regular member · Joined Jun 2023", amount: "KES 95,200", status: "Under review", date: "17 Nov 2026", initials: "MN", color: "peach" },
  { id: "NNO-00479", name: "David Kiptoo", detail: "Regular member · Joined Jan 2024", amount: "KES 142,800", status: "Active", date: "16 Nov 2026", initials: "DK", color: "blue" },
];

const dividendRows: RecordRow[] = [
  { id: "DIV-2026-01", name: "Grace Wanjiku", detail: "Share dividend · 2025", amount: "KES 18,450", status: "Completed", date: "15 Nov 2026", initials: "GW", color: "lilac" },
  { id: "DIV-2026-02", name: "Peter Kamau", detail: "Share dividend · 2025", amount: "KES 32,600", status: "Pending", date: "15 Nov 2026", initials: "PK", color: "mint" },
  { id: "DIV-2026-03", name: "Mary Njeri", detail: "Share dividend · 2025", amount: "KES 9,520", status: "Completed", date: "14 Nov 2026", initials: "MN", color: "peach" },
  { id: "DIV-2026-04", name: "David Kiptoo", detail: "Share dividend · 2025", amount: "KES 14,280", status: "Pending", date: "14 Nov 2026", initials: "DK", color: "blue" },
];

const employeeRows: RecordRow[] = [
  { id: "EMP-0018", name: "Joyce Atieno", detail: "Branch manager · Nairobi", amount: "Full access", status: "Active", date: "12 Feb 2020", initials: "JA", color: "lilac" },
  { id: "EMP-0017", name: "Brian Mwangi", detail: "Finance officer · Nairobi", amount: "Finance", status: "Active", date: "04 Jun 2021", initials: "BM", color: "mint" },
  { id: "EMP-0016", name: "Lucy Chebet", detail: "Member services · Nandi", amount: "Member services", status: "Active", date: "19 Oct 2022", initials: "LC", color: "peach" },
  { id: "EMP-0015", name: "Samuel Otieno", detail: "Credit officer · Nairobi", amount: "Lending", status: "Under review", date: "08 Jan 2023", initials: "SO", color: "blue" },
];

const pageCopy: Record<Module, { eyebrow: string; title: string; description: string }> = {
  Overview: { eyebrow: "WEDNESDAY, 18 NOVEMBER 2026", title: "Welcome back, Joyce", description: "Here’s what’s happening with your SACCO today." },
  Members: { eyebrow: "MEMBER MANAGEMENT", title: "Your members", description: "Manage member accounts, shares and membership activity." },
  Savings: { eyebrow: "SAVINGS & DEPOSITS", title: "Savings overview", description: "Track member deposits and the growth of your savings portfolio." },
  Loans: { eyebrow: "CREDIT MANAGEMENT", title: "Loans overview", description: "Review loan applications, disbursements and repayments." },
  Dividends: { eyebrow: "MEMBER RETURNS", title: "Dividends", description: "Keep track of share earnings and member distributions." },
  Payments: { eyebrow: "CASH FLOW", title: "Payments", description: "See contributions, repayments and withdrawals in one place." },
  Employees: { eyebrow: "TEAM & ACCESS", title: "Your team", description: "Manage your staff and the access they have to Neno SACCO." },
  Reports: { eyebrow: "INSIGHTS & EXPORTS", title: "Reports", description: "A clearer view of your financial and member performance." },
  Settings: { eyebrow: "WORKSPACE PREFERENCES", title: "Settings", description: "Manage your workspace details and operating preferences." },
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    overview: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
    members: <><path d="M16 20v-1.6a3.4 3.4 0 0 0-3.4-3.4H6.4A3.4 3.4 0 0 0 3 18.4V20" /><circle cx="9.5" cy="7" r="3.5" /><path d="M17 11a3.5 3.5 0 0 0 0-7m4 16v-1.6a3.4 3.4 0 0 0-2.6-3.3" /></>,
    savings: <><path d="M12 3v18m6-14H9.8a3.3 3.3 0 0 0 0 6.6h4.4a3.3 3.3 0 0 1 0 6.6H5" /><path d="m18 6 2-2-2-2" /></>,
    loans: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 10h18m-13 5h4" /></>,
    dividends: <><path d="M12 3v18m6-14H9.8a3.3 3.3 0 0 0 0 6.6h4.4a3.3 3.3 0 0 1 0 6.6H5" /></>,
    payments: <><path d="M5 12h14m-6-6 6 6-6 6" /><path d="M19 5v14" /></>,
    employees: <><circle cx="12" cy="8" r="3.5" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0m-4-7 2 2 3.5-3.5" /></>,
    reports: <><path d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" /><path d="M14 3.5v5h5m-9 4h4m-4 4h4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a7 7 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a7 7 0 0 1-1.5-.9l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.7a7 7 0 0 1 1.5-.9l.3-1.8H16l.3 1.8a7 7 0 0 1 1.5.9l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1-.1 1.7Z" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12a2 2 0 0 0 4 0" /></>,
    plus: <><path d="M12 5v14m-7-7h14" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5" /><path d="M5 17v3h14v-3" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    trend: <><path d="m3 16 6-6 4 4 8-8" /><path d="M15 6h6v6" /></>,
  };

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}

function formatCurrency(value: string) {
  return `KES ${Number(value).toLocaleString("en-KE")}`;
}

function getRows(module: Module, rows: RecordRow[], moduleRows: Partial<Record<Module, RecordRow[]>>): RecordRow[] {
  if (moduleRows[module]) return moduleRows[module];
  if (module === "Savings") return rows.filter((row) => row.detail.toLowerCase().includes("savings") || row.detail.toLowerCase().includes("share"));
  if (module === "Loans") return rows.filter((row) => row.detail.toLowerCase().includes("loan"));
  return rows;
}

export default function Home() {
  const [activeModule, setActiveModule] = useState<Module>("Overview");
  const [rows, setRows] = useState(initialRows);
  const [moduleRows, setModuleRows] = useState<Partial<Record<Module, RecordRow[]>>>({
    Members: memberRows,
    Savings: initialRows.filter((row) => row.detail.toLowerCase().includes("savings") || row.detail.toLowerCase().includes("share")),
    Loans: initialRows.filter((row) => row.detail.toLowerCase().includes("loan")),
    Dividends: dividendRows,
    Payments: initialRows,
    Employees: employeeRows,
  });
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [createModule, setCreateModule] = useState<Module>("Overview");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [period, setPeriod] = useState("This year");
  const copy = pageCopy[activeModule];
  const isList = ["Members", "Savings", "Loans", "Dividends", "Payments", "Employees"].includes(activeModule);
  const listRows = useMemo(() => {
    const data = getRows(activeModule, rows, moduleRows);
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return data;
    return data.filter((row) => `${row.name} ${row.id} ${row.detail} ${row.status}`.toLowerCase().includes(normalizedQuery));
  }, [activeModule, moduleRows, query, rows]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  }

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const detail = String(formData.get("detail") ?? "").trim();
    const amount = String(formData.get("amount") ?? "").trim();
    if (!name || !detail) return;
    const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
    const created: RecordRow = {
      id: `${createModule.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-5)}`,
      name,
      detail,
      amount: amount ? formatCurrency(amount) : "—",
      status: "Pending",
      date: "Just now",
      initials,
      color: "blue",
    };
    if (createModule === "Overview") {
      setRows((current) => [created, ...current]);
    } else {
      setModuleRows((current) => ({ ...current, [createModule]: [created, ...(current[createModule] ?? [])] }));
      if (createModule === "Payments") setRows((current) => [created, ...current]);
    }
    setModalOpen(false);
    showToast(`${createModule === "Payments" ? "Payment" : createModule === "Members" ? "Member" : createModule === "Employees" ? "Team member" : createModule === "Dividends" ? "Distribution" : createModule === "Overview" ? "Entry" : createModule.slice(0, -1)} added to this demo.`);
  }

  function chooseModule(module: Module) {
    setActiveModule(module);
    setQuery("");
    setMobileNavOpen(false);
  }

  function openCreate(target: Module = activeModule) {
    setCreateModule(target);
    setModalOpen(true);
  }

  return (
    <main className="app-shell">
      {mobileNavOpen && <button className="nav-scrim" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}
      <aside className={`sidebar ${mobileNavOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><span>n</span></div>
          <div className="brand-name">neno<span>sacco</span></div>
          <button className="icon-button mobile-close" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation"><Icon name="close" /></button>
        </div>
        <button className="workspace-switch" onClick={() => showToast("You’re viewing the Neno SACCO workspace.")}>
          <span className="workspace-avatar">N</span>
          <span className="workspace-info"><strong>Neno SACCO</strong><small>Finance workspace</small></span>
          <span className="workspace-caret">⌄</span>
        </button>
        <nav className="nav-groups" aria-label="Main navigation">
          {(["Workspace", "Management"] as const).map((group) => (
            <div className="nav-group" key={group}>
              <p className="nav-label">{group}</p>
              {navigation.filter((item) => item.group === group).map((item) => (
                <button key={item.label} className={`nav-item ${activeModule === item.label ? "active" : ""}`} onClick={() => chooseModule(item.label)}>
                  <Icon name={item.icon} size={17} /><span>{item.label}</span>
                  {item.label === "Loans" && <span className="nav-count">4</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">?</div>
            <div><strong>Need a hand?</strong><p>We’re here to help.</p></div>
            <button aria-label="Get help" onClick={() => showToast("Contact support at hello@nenosacco.co.ke.")}><Icon name="chevron" size={16} /></button>
          </div>
          <button className="profile-button" onClick={() => showToast("Signed in as Joyce Atieno · Administrator.")}>
            <span className="profile-avatar">JA</span>
            <span className="profile-info"><strong>Joyce Atieno</strong><small>Administrator</small></span>
            <span className="profile-dots">···</span>
          </button>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMobileNavOpen(true)} aria-label="Open navigation"><Icon name="menu" /></button>
          <div className="breadcrumbs"><span>Neno SACCO</span><Icon name="chevron" size={14} /><strong>{activeModule}</strong></div>
          <div className="topbar-actions">
            <label className="search-box">
              <Icon name="search" size={17} />
              <input aria-label="Search this page" placeholder="Search anything..." value={query} onChange={(event) => setQuery(event.target.value)} />
              <kbd>⌘ K</kbd>
            </label>
            <div className="notification-wrap">
              <button className={`icon-button notification-button ${showNotifications ? "selected" : ""}`} aria-label="Notifications" onClick={() => setShowNotifications((shown) => !shown)}><Icon name="bell" size={19} /><i /></button>
              {showNotifications && <div className="notification-popover"><strong>You’re all caught up</strong><p>New activity and reminders will appear here.</p></div>}
            </div>
            <div className="topbar-divider" />
            <button className="top-profile" onClick={() => showToast("Signed in as Joyce Atieno · Administrator.")}><span className="profile-avatar">JA</span><span className="top-profile-name">Joyce Atieno</span><span className="workspace-caret">⌄</span></button>
          </div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div><p className="eyebrow">{copy.eyebrow}</p><h1>{copy.title}</h1><p className="page-description">{copy.description}</p></div>
            <div className="heading-actions">
              {isList && <button className="button button-secondary" onClick={() => showToast("Your report is ready to export.")}><Icon name="download" size={16} /> Export</button>}
              <button className="button button-primary" onClick={() => openCreate()}><Icon name="plus" size={17} />{activeModule === "Payments" ? "Record payment" : activeModule === "Members" ? "Add member" : activeModule === "Employees" ? "Add employee" : activeModule === "Dividends" ? "New distribution" : "New entry"}</button>
            </div>
          </div>

          {activeModule === "Overview" ? (
            <Overview period={period} setPeriod={setPeriod} rows={rows} onCreate={() => openCreate("Payments")} onNavigate={chooseModule} onToast={showToast} />
          ) : isList ? (
            <ListPage activeModule={activeModule} listRows={listRows} query={query} onCreate={openCreate} onToast={showToast} />
          ) : activeModule === "Reports" ? (
            <ReportsPage onToast={showToast} />
          ) : (
            <SettingsPage onToast={showToast} />
          )}
        </div>
      </section>

      {modalOpen && <CreateModal activeModule={createModule} onClose={() => setModalOpen(false)} onSubmit={handleCreate} />}
      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  );
}

function Overview({
  period,
  setPeriod,
  rows,
  onCreate,
  onNavigate,
  onToast,
}: {
  period: string;
  setPeriod: (period: string) => void;
  rows: RecordRow[];
  onCreate: () => void;
  onNavigate: (module: Module) => void;
  onToast: (message: string) => void;
}) {
  return (
    <>
      <section className="stats-grid" aria-label="SACCO performance">
        <StatCard label="Total savings" value="KES 24.8M" change="+12.8%" icon="savings" tone="green" footnote="vs. last year" />
        <StatCard label="Active members" value="1,284" change="+8.2%" icon="members" tone="blue" footnote="vs. last year" />
        <StatCard label="Loans outstanding" value="KES 8.42M" change="+4.3%" icon="loans" tone="purple" footnote="vs. last year" />
        <StatCard label="Dividend pool" value="KES 1.26M" change="+16.4%" icon="dividends" tone="orange" footnote="this financial year" />
      </section>

      <section className="overview-grid">
        <div className="panel chart-panel">
          <div className="panel-heading">
            <div><p className="panel-kicker">FINANCIAL OVERVIEW</p><h2>Savings growth</h2><p className="panel-subtitle">A look at your SACCO’s financial health.</p></div>
            <select className="period-select" value={period} onChange={(event) => setPeriod(event.target.value)} aria-label="Chart period"><option>This year</option><option>Last year</option><option>Last 6 months</option></select>
          </div>
          <div className="chart-summary"><strong>KES 24,800,000</strong><span><span className="positive-pill"><Icon name="trend" size={12} />12.8%</span> vs last year</span></div>
          <div className="chart-wrap">
            <div className="chart-y-labels"><span>25M</span><span>20M</span><span>15M</span><span>10M</span><span>5M</span></div>
            <svg className="growth-chart" viewBox="0 0 680 210" role="img" aria-label="Savings increased steadily through the year, reaching KES 24.8 million in November">
              <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#27866c" stopOpacity=".17" /><stop offset="100%" stopColor="#27866c" stopOpacity="0" /></linearGradient></defs>
              <path className="chart-gridline" d="M0 10H680M0 52H680M0 94H680M0 136H680M0 178H680" />
              <path d="M0 164 C24 155 33 151 57 155 S89 141 114 146 S148 125 171 130 S203 110 228 115 S259 99 285 103 S317 83 342 91 S372 74 399 79 S429 64 456 68 S487 54 513 60 S543 42 570 49 S602 30 627 36 S654 20 680 18 V190 H0Z" fill="url(#chartFill)" />
              <path d="M0 164 C24 155 33 151 57 155 S89 141 114 146 S148 125 171 130 S203 110 228 115 S259 99 285 103 S317 83 342 91 S372 74 399 79 S429 64 456 68 S487 54 513 60 S543 42 570 49 S602 30 627 36 S654 20 680 18" fill="none" stroke="#27866c" strokeWidth="3" strokeLinecap="round" />
              <circle cx="680" cy="18" r="5" fill="#27866c" stroke="white" strokeWidth="3" />
            </svg>
            <div className="chart-x-labels"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span></div>
          </div>
          <div className="chart-legend"><span><i />Member savings</span><span className="legend-note">Updated just now</span></div>
        </div>

        <aside className="dividend-card">
          <div className="dividend-card-top"><span className="dividend-icon"><Icon name="dividends" size={18} /></span><span className="dividend-status"><i /> Distribution open</span></div>
          <p className="dividend-eyebrow">2025 FINANCIAL YEAR</p><h2>Share dividends</h2><p className="dividend-copy">Your members’ annual returns are ready for review.</p>
          <div className="dividend-amount">KES 1,260,000</div><div className="dividend-rate"><span>Proposed rate</span><strong>12% <span>per share</span></strong></div>
          <div className="dividend-progress"><div><span>Member distributions</span><strong>68%</strong></div><div className="progress-track"><span /></div><small>KES 856,800 of KES 1.26M allocated</small></div>
          <button className="button dividend-button" onClick={() => onNavigate("Dividends")}>Review distribution <Icon name="arrow" size={16} /></button>
        </aside>
      </section>

      <section className="lower-grid">
        <div className="panel transactions-panel">
          <div className="section-heading"><div><h2>Recent activity</h2><p>Keep an eye on your latest transactions.</p></div><button className="text-button" onClick={() => onNavigate("Payments")}>View all <Icon name="chevron" size={15} /></button></div>
          <div className="table-scroll"><table className="data-table"><thead><tr><th>MEMBER</th><th>TYPE</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th></tr></thead><tbody>{rows.slice(0, 4).map((row) => <TransactionRow key={row.id} row={row} />)}</tbody></table></div>
        </div>
        <aside className="panel actions-panel">
          <div className="section-heading"><div><h2>Quick actions</h2><p>Common tasks, one click away.</p></div></div>
          <div className="quick-actions">
            <button onClick={() => onNavigate("Members")}><span className="quick-icon quick-members"><Icon name="members" size={17} /></span><span><strong>Add a member</strong><small>Register a new SACCO member</small></span><Icon name="chevron" size={16} /></button>
            <button onClick={() => onNavigate("Loans")}><span className="quick-icon quick-loans"><Icon name="loans" size={17} /></span><span><strong>Review loans</strong><small>4 applications need attention</small></span><Icon name="chevron" size={16} /></button>
            <button onClick={() => onCreate()}><span className="quick-icon quick-payments"><Icon name="payments" size={17} /></span><span><strong>Record a payment</strong><small>Log a contribution or repayment</small></span><Icon name="chevron" size={16} /></button>
            <button onClick={() => onToast("Your financial summary is ready to export.")}><span className="quick-icon quick-reports"><Icon name="reports" size={17} /></span><span><strong>Generate a report</strong><small>Get a snapshot of your finances</small></span><Icon name="chevron" size={16} /></button>
          </div>
        </aside>
      </section>
    </>
  );
}

function StatCard({ label, value, change, icon, tone, footnote }: { label: string; value: string; change: string; icon: IconName; tone: string; footnote: string }) {
  return <article className="panel stat-card"><div className="stat-top"><span className={`stat-icon ${tone}`}><Icon name={icon} size={18} /></span><span className="stat-period">This year <span>⌄</span></span></div><p className="stat-label">{label}</p><div className="stat-value">{value}</div><div className="stat-foot"><span className="positive-pill"><Icon name="trend" size={12} />{change}</span><span>{footnote}</span></div></article>;
}

function TransactionRow({ row }: { row: RecordRow }) {
  return <tr><td><div className="member-cell"><span className={`member-avatar ${row.color}`}>{row.initials}</span><span><strong>{row.name}</strong><small>{row.id}</small></span></div></td><td>{row.detail}</td><td>{row.date}</td><td className={`amount-cell ${row.amount.startsWith("+") ? "amount-positive" : ""}`}>{row.amount}</td><td><StatusBadge status={row.status} /></td></tr>;
}

function StatusBadge({ status }: { status: RecordRow["status"] }) {
  const tone = status === "Completed" || status === "Active" ? "status-green" : status === "Pending" ? "status-amber" : "status-gray";
  return <span className={`status-badge ${tone}`}><i />{status}</span>;
}

function ListPage({ activeModule, listRows, query, onCreate, onToast }: { activeModule: Module; listRows: RecordRow[]; query: string; onCreate: () => void; onToast: (message: string) => void }) {
  const captions: Record<string, [string, string, string]> = {
    Members: ["1,284", "Active members", "+8.2% this year"],
    Savings: ["KES 24.8M", "Total savings", "+12.8% this year"],
    Loans: ["KES 8.42M", "Loans outstanding", "4 applications pending"],
    Dividends: ["KES 1.26M", "Dividend pool", "68% allocated"],
    Payments: ["KES 418,500", "Payments this month", "96% completed"],
    Employees: ["18", "Team members", "Across 3 branches"],
  };
  const [metric, label, note] = captions[activeModule] ?? captions.Payments;
  const title = activeModule === "Members" ? "All members" : activeModule === "Employees" ? "Team directory" : activeModule === "Dividends" ? "Member distributions" : activeModule === "Savings" ? "Recent deposits" : activeModule === "Loans" ? "Recent loan activity" : "Recent transactions";
  return (
    <>
      <div className="list-stats"><div className="panel list-metric"><span className="list-metric-icon mint"><Icon name="trend" /></span><span><small>{label}</small><strong>{metric}</strong><em>{note}</em></span></div><div className="panel list-metric"><span className="list-metric-icon blue"><Icon name="members" /></span><span><small>Records shown</small><strong>{listRows.length}</strong><em>{query ? "Matching your search" : "Up to date"}</em></span></div><div className="panel list-metric"><span className="list-metric-icon lilac"><Icon name="payments" /></span><span><small>Needs attention</small><strong>{listRows.filter((row) => row.status === "Pending" || row.status === "Under review").length}</strong><em>Review when you’re ready</em></span></div></div>
      <section className="panel list-panel"><div className="section-heading list-panel-heading"><div><h2>{title}</h2><p>Search, review and manage your SACCO records.</p></div><button className="button button-secondary" onClick={() => onToast("Your report is ready to export.")}><Icon name="download" size={16} /> Export</button></div><div className="table-scroll"><table className="data-table module-table"><thead><tr><th>{activeModule === "Employees" ? "EMPLOYEE" : activeModule === "Dividends" ? "MEMBER" : "MEMBER / ACCOUNT"}</th><th>{activeModule === "Members" ? "MEMBERSHIP" : "DETAILS"}</th><th>{activeModule === "Dividends" || activeModule === "Payments" ? "AMOUNT" : activeModule === "Employees" ? "ACCESS" : "BALANCE"}</th><th>DATE ADDED</th><th>STATUS</th><th /></tr></thead><tbody>{listRows.map((row) => <tr key={row.id}><td><div className="member-cell"><span className={`member-avatar ${row.color}`}>{row.initials}</span><span><strong>{row.name}</strong><small>{row.id}</small></span></div></td><td>{row.detail}</td><td className="amount-cell">{row.amount}</td><td>{row.date}</td><td><StatusBadge status={row.status} /></td><td><button className="row-action" aria-label={`View ${row.name}`} onClick={() => onToast(`${row.name} · ${row.detail}`)}><Icon name="chevron" size={17} /></button></td></tr>)}</tbody></table>{listRows.length === 0 && <div className="empty-state"><span className="empty-icon"><Icon name="search" size={20} /></span><strong>No matching records</strong><p>Try a different search or add a new record.</p><button className="button button-secondary" onClick={onCreate}><Icon name="plus" size={16} /> Add a record</button></div>}</div><div className="table-footer"><span>Showing <strong>{listRows.length}</strong> of <strong>{listRows.length}</strong> records</span><div><button disabled aria-label="Previous page">‹</button><button className="page-current">1</button><button aria-label="Next page" onClick={() => onToast("You’re viewing all available demo records.")}>›</button></div></div></section>
    </>
  );
}

function ReportsPage({ onToast }: { onToast: (message: string) => void }) {
  const reports = [["Member register", "Membership activity, status and share balances", "Updated today"], ["Financial position", "Savings, loans and current portfolio", "Updated today"], ["Dividend distribution", "Annual share earnings and allocation", "FY 2025"], ["Payment summary", "Contributions and repayments by period", "Updated yesterday"]];
  return <section className="panel reports-panel"><div className="section-heading"><div><h2>Financial reports</h2><p>Useful snapshots for your team and board.</p></div></div><div className="report-list">{reports.map(([title, detail, date]) => <article className="report-item" key={title}><span className="report-icon"><Icon name="reports" /></span><span className="report-copy"><strong>{title}</strong><small>{detail}</small></span><span className="report-date">{date}</span><button className="button button-secondary" onClick={() => onToast(`${title} is ready to export.`)}><Icon name="download" size={15} /> Export</button></article>)}</div></section>;
}

function SettingsPage({ onToast }: { onToast: (message: string) => void }) {
  return <section className="panel settings-panel"><div className="settings-title"><span className="workspace-avatar large">N</span><div><h2>Neno SACCO</h2><p>Finance workspace · Kenya</p></div><button className="button button-secondary" onClick={() => onToast("Workspace profile saved.")}>Edit workspace</button></div><div className="settings-row"><div><strong>Workspace details</strong><p>Organization name, contact details and location.</p></div><span>Neno SACCO · Nairobi, Kenya</span></div><div className="settings-row"><div><strong>Member access</strong><p>Member portal access and account preferences.</p></div><span className="settings-value"><i /> Active</span></div><div className="settings-row"><div><strong>Financial year</strong><p>Annual reporting and dividend period.</p></div><span>January – December</span></div><div className="settings-row"><div><strong>Team permissions</strong><p>Assign access for employees and officers.</p></div><button className="text-button" onClick={() => onToast("Manage employee roles in the Employees section.")}>Manage team <Icon name="chevron" size={15} /></button></div></section>;
}

function CreateModal({ activeModule, onClose, onSubmit }: { activeModule: Module; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  const subject = activeModule === "Members" ? "member" : activeModule === "Employees" ? "employee" : activeModule === "Payments" ? "payment" : activeModule === "Dividends" ? "distribution" : "entry";
  const title = `${activeModule === "Payments" ? "Record" : "Add"} ${subject}`;
  const detailLabel = activeModule === "Members" ? "Membership type" : activeModule === "Employees" ? "Role or department" : activeModule === "Payments" ? "Payment type" : activeModule === "Dividends" ? "Distribution details" : "Details";
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-heading"><div><p className="panel-kicker">NENO SACCO</p><h2 id="modal-title">{title}</h2><p>Enter the details below to add a record to this demo.</p></div><button className="icon-button" onClick={onClose} aria-label="Close dialog"><Icon name="close" /></button></div><form onSubmit={onSubmit}><label className="form-field"><span>{activeModule === "Employees" ? "Employee name" : activeModule === "Payments" ? "Member name" : "Full name"}</span><input name="name" placeholder="e.g. Alex Mwangi" required autoFocus /></label><label className="form-field"><span>{detailLabel}</span><input name="detail" placeholder={activeModule === "Payments" ? "e.g. Monthly contribution" : "e.g. Regular member"} required /></label><label className="form-field"><span>Amount <small>(KES, optional)</small></span><input name="amount" type="number" min="0" step="1" placeholder="0.00" /></label><div className="modal-note"><span>i</span>This is a demo workspace. No real financial transactions will be processed.</div><div className="modal-actions"><button type="button" className="button button-secondary" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit"><Icon name="plus" size={16} /> {title}</button></div></form></section></div>;
}
