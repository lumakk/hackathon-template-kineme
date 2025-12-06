import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  FileText,
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  X,
  ChevronRight,
  TrendingUp,
  Filter,
  Home,
  Info,
  Settings,
  Menu,
  Moon,
  Sun,
  BookOpen,
  Users,
  Gavel,
  ArrowRight,
  Download,
  Share2,
  Bookmark
} from 'lucide-react';

// --- Components ---

const StatusBadge = ({ status }) => {
  const styles = {
    passed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    vetoed: 'bg-red-100 text-red-700 border-red-200',
    archived: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  const labels = {
    passed: 'Passed into Law',
    pending: 'In Review',
    vetoed: 'Vetoed',
    archived: 'Archived',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.pending} flex items-center gap-1.5`}>
      {status === 'passed' && <CheckCircle2 size={12} />}
      {status === 'pending' && <Clock size={12} />}
      {status === 'vetoed' && <AlertCircle size={12} />}
      {labels[status] || status}
    </span>
  );
};

const ProgressStepper = ({ progress, darkMode }) => {
  // Flatten stages for linear display
  const stages = [
    { key: 'firstReading', label: '1st Reading', completed: progress.senate.firstReading },
    { key: 'committee', label: 'Committee', completed: progress.senate.committee },
    { key: 'secondReading', label: '2nd Reading', completed: progress.senate.secondReading },
    { key: 'thirdReading', label: '3rd Reading', completed: progress.senate.thirdReading },
    { key: 'bicam', label: 'Bicameral', completed: progress.finalStage.bicam },
    { key: 'ratification', label: 'Ratification', completed: progress.finalStage.ratification },
    { key: 'presidentialAction', label: 'President', completed: progress.finalStage.presidentialAction },
  ];

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex items-center justify-between min-w-[600px] px-2">
        {stages.map((stage, index) => (
          <div key={stage.key} className="flex-1 flex flex-col items-center relative group">
            {/* Connector Line */}
            {index !== 0 && (
              <div 
                className={`absolute top-3 right-[50%] w-full h-1 -z-10 
                ${stage.completed ? 'bg-emerald-500' : darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} 
              />
            )}
            
            {/* Circle Indicator */}
            <div 
              className={`w-6 h-6 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-300
              ${stage.completed 
                ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                : darkMode ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-300'}`}
            >
              {stage.completed ? <CheckCircle2 size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
            </div>

            {/* Label */}
            <span className={`mt-2 text-[10px] font-medium uppercase tracking-wider text-center transition-colors duration-300
              ${stage.completed 
                ? 'text-emerald-600' 
                : darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              {stage.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color, darkMode }) => (
  <div className={`p-6 rounded-2xl border transition-all duration-200 hover:shadow-lg ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'}`}>
    <div className="flex items-start justify-between">
      <div>
        <p className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{title}</p>
        <h3 className={`text-3xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
    <div className="mt-4 flex items-center text-xs">
      <span className="text-emerald-500 font-medium flex items-center">
        <TrendingUp size={12} className="mr-1" /> +12%
      </span>
      <span className={`ml-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>from last month</span>
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBill, setSelectedBill] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- Fake Data ---
  const bills = useMemo(() => [
    {
      id: "RA 12180",
      title: "Economy, Planning, and Development Act",
      status: "passed",
      author: "Sen. Juan Miguel Zubiri",
      date: "April 10, 2024",
      summary: "The Act reorganizes the former National Economic and Development Authority (NEDA) into a full-fledged department: the Department of Economy, Planning, and Development (DEPDev). It aims to streamline economic policy-making and ensure sustainable growth.",
      sector: "Economy",
      progress: {
        senate: { firstReading: true, committee: true, secondReading: true, thirdReading: true },
        house: { firstReading: true, committee: true, secondReading: true, thirdReading: true },
        finalStage: { bicam: true, ratification: true, presidentialAction: true }
      }
    },
    {
      id: "SB 2451",
      title: "Educational Reform & Digital Access Bill",
      status: "pending",
      author: "Sen. Sherwin Gatchalian",
      date: "May 15, 2024",
      summary: "Mandates the inclusion of digital literacy in the basic education curriculum and provides funding for internet infrastructure in rural schools.",
      sector: "Education",
      progress: {
        senate: { firstReading: true, committee: true, secondReading: true, thirdReading: false },
        house: { firstReading: false, committee: false, secondReading: false, thirdReading: false },
        finalStage: { bicam: false, ratification: false, presidentialAction: false }
      }
    },
    {
      id: "HB 9921",
      title: "Universal Healthcare Expansion Act",
      status: "vetoed",
      author: "Rep. Stella Quimbo",
      date: "March 02, 2024",
      summary: "Proposed expansion of PhilHealth coverage to include mental health consultations and outpatient medicines. Vetoed due to lack of identified funding sources.",
      sector: "Health",
      progress: {
        senate: { firstReading: true, committee: true, secondReading: true, thirdReading: true },
        house: { firstReading: true, committee: true, secondReading: true, thirdReading: true },
        finalStage: { bicam: true, ratification: true, presidentialAction: false } // Failed at president
      }
    },
    {
      id: "SB 1029",
      title: "Green Energy Transition Framework",
      status: "pending",
      author: "Sen. Loren Legarda",
      date: "June 01, 2024",
      summary: "Establishes a framework for transitioning the national grid to 50% renewable energy by 2035.",
      sector: "Energy",
      progress: {
        senate: { firstReading: true, committee: true, secondReading: false, thirdReading: false },
        house: { firstReading: false, committee: false, secondReading: false, thirdReading: false },
        finalStage: { bicam: false, ratification: false, presidentialAction: false }
      }
    }
  ], []);

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bill.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bill.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bills.length,
    passed: bills.filter(b => b.status === 'passed').length,
    pending: bills.filter(b => b.status === 'pending').length,
    vetoed: bills.filter(b => b.status === 'vetoed').length,
  };

  const SidebarItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => { setActiveTab(id); setSelectedBill(null); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mb-1
        ${activeTab === id 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
          : darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
    >
      <Icon size={20} />
      {sidebarOpen && <span className="font-medium text-sm">{label}</span>}
    </button>
  );

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans`}>
      
      {/* --- Sidebar --- */}
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} flex flex-col border-r transition-all duration-300 z-20
          ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
      >
        <div className="h-16 flex items-center px-6 border-b border-dashed border-slate-200/50">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
            <Gavel size={18} />
          </div>
          {sidebarOpen && <span className="ml-3 font-bold text-lg tracking-tight">LegisLenz</span>}
        </div>

        <div className="flex-1 py-6 px-3 space-y-1">
          <div className={`px-4 mb-4 text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
            {sidebarOpen ? 'Menu' : '...'}
          </div>
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem id="bills" icon={FileText} label="Legislation" />
          <SidebarItem id="committees" icon={Users} label="Committees" />
          <SidebarItem id="bookmarks" icon={Bookmark} label="Bookmarks" />
          
          <div className={`px-4 mt-8 mb-4 text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-600' : 'text-slate-400'}`}>
            {sidebarOpen ? 'Settings' : '...'}
          </div>
          <SidebarItem id="settings" icon={Settings} label="Settings" />
          <SidebarItem id="help" icon={Info} label="Help Center" />
        </div>

        <div className={`p-4 border-t ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`w-full flex items-center justify-center p-2 rounded-lg transition-colors
              ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
          >
            {sidebarOpen ? <ChevronRight className="rotate-180" size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Header */}
        <header className={`h-16 flex items-center justify-between px-8 border-b z-10
          ${darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'} backdrop-blur-sm`}>
          
          {/* Search */}
          <div className="flex items-center flex-1 max-w-md">
            <div className="relative w-full group">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors 
                ${darkMode ? 'text-slate-500 group-focus-within:text-blue-500' : 'text-slate-400 group-focus-within:text-blue-600'}`} />
              <input
                type="text"
                placeholder="Search bills, authors, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-full text-sm outline-none border transition-all
                  ${darkMode 
                    ? 'bg-slate-800 border-slate-700 focus:border-blue-500 text-white placeholder-slate-500' 
                    : 'bg-slate-50 border-slate-200 focus:border-blue-500 focus:bg-white text-slate-900'}`}
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={`p-2 rounded-full transition-colors relative ${darkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}>
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium text-sm shadow-md">
              JD
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          
          {/* Stats Row */}
          {activeTab === 'dashboard' && !selectedBill && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Bills" value={stats.total} icon={FileText} color="bg-blue-500" darkMode={darkMode} />
              <StatCard title="Passed into Law" value={stats.passed} icon={CheckCircle2} color="bg-emerald-500" darkMode={darkMode} />
              <StatCard title="Pending Review" value={stats.pending} icon={Clock} color="bg-amber-500" darkMode={darkMode} />
              <StatCard title="Vetoed" value={stats.vetoed} icon={AlertCircle} color="bg-red-500" darkMode={darkMode} />
            </div>
          )}

          {/* Main List / Detail View Switch */}
          <div className="flex flex-col lg:flex-row gap-6 h-full min-h-0">
            
            {/* Bill List Section - conditionally hidden on mobile if detail open */}
            <div className={`flex-1 flex flex-col transition-all duration-500 ${selectedBill ? 'lg:w-1/3 lg:flex-none hidden lg:flex' : 'w-full'}`}>
              
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {activeTab === 'dashboard' ? 'Recent Activity' : 'All Legislation'}
                </h2>
                <div className="flex gap-2">
                  {['all', 'passed', 'pending'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setStatusFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors
                        ${statusFilter === filter 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                          : darkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`h-32 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 pb-20">
                  {filteredBills.map(bill => (
                    <div
                      key={bill.id}
                      onClick={() => setSelectedBill(bill)}
                      className={`group p-5 rounded-2xl border cursor-pointer transition-all duration-200 relative overflow-hidden
                        ${selectedBill?.id === bill.id 
                          ? 'ring-2 ring-blue-500 border-transparent shadow-lg' 
                          : darkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-md'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                          {bill.id}
                        </span>
                        <StatusBadge status={bill.status} />
                      </div>
                      
                      <h3 className={`font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-500 transition-colors ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                        {bill.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-4">
                        <div className="flex items-center gap-1.5">
                          <Users size={14} />
                          {bill.author}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {bill.date}
                        </div>
                      </div>

                      {/* Hover Arrow */}
                      <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                        <ArrowRight className="text-blue-500" size={20} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Detail View Panel */}
            {selectedBill && (
              <div className="flex-[2] flex flex-col animate-in slide-in-from-right-4 duration-300 fade-in">
                <div className={`h-full rounded-3xl border overflow-hidden flex flex-col shadow-xl
                  ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  
                  {/* Detail Header */}
                  <div className={`p-8 border-b ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-100 bg-white'}`}>
                    <div className="flex items-center justify-between mb-6">
                      <button 
                        onClick={() => setSelectedBill(null)}
                        className={`flex items-center gap-2 text-sm font-medium hover:underline ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}
                      >
                        <X size={16} /> Close View
                      </button>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600 transition-colors">
                          <Share2 size={18} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600 transition-colors">
                          <Download size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <StatusBadge status={selectedBill.status} />
                      <span className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        {selectedBill.sector}
                      </span>
                    </div>

                    <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {selectedBill.title}
                    </h1>

                    <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {selectedBill.summary}
                    </p>
                  </div>

                  {/* Detail Body */}
                  <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    
                    {/* Progress Tracker */}
                    <div className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                      <h3 className={`text-sm font-bold uppercase tracking-wider mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Legislative Status
                      </h3>
                      <ProgressStepper progress={selectedBill.progress} darkMode={darkMode} />
                    </div>

                    {/* Meta Data Grid */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/30' : 'bg-slate-50'}`}>
                        <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Primary Author</span>
                        <div className="flex items-center gap-2 font-medium">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">A</div>
                          {selectedBill.author}
                        </div>
                      </div>
                      <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-700/30' : 'bg-slate-50'}`}>
                        <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Date Filed</span>
                        <div className="flex items-center gap-2 font-medium">
                          <Clock size={16} className="text-slate-400" />
                          {selectedBill.date}
                        </div>
                      </div>
                    </div>

                    {/* Full Text Placeholder */}
                    <div>
                      <h3 className={`text-sm font-bold uppercase tracking-wider mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Document Preview
                      </h3>
                      <div className={`w-full h-64 rounded-xl flex flex-col items-center justify-center border-2 border-dashed
                        ${darkMode ? 'border-slate-700 bg-slate-900/30' : 'border-slate-200 bg-slate-50'}`}>
                        <FileText size={48} className="text-slate-300 mb-2" />
                        <p className="text-slate-400 text-sm font-medium">PDF Document Preview Unavailable</p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                          Download Full Text
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
