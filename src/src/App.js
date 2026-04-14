import React, { useState, useEffect } from "react";
import { auth, provider, db } from "./firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const App = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Auth State Monitoring
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Save user profile to Firestore
        await setDoc(doc(db, "users", currentUser.uid), {
          uid: currentUser.uid,
          fullName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          lastActive: new Date(),
        }, { merge: true });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Google Login Function
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Authentication Error:", error.message);
    }
  };

  if (loading) return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className={`${darkMode ? "dark" : ""} transition-all duration-700`}>
      <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-200">
        
        {/* MAGICOS NAVBAR */}
        <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border-b border-white/20 dark:border-slate-800/50 px-8 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl rotate-3 shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform duration-500"></div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">Motigex</h1>
          </div>

          <div className="flex items-center gap-5">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/80 dark:bg-slate-800 shadow-xl border border-white dark:border-slate-700 hover:scale-110 transition-all active:scale-95"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-800">
                <img src={user.photoURL} className="w-11 h-11 rounded-2xl border-2 border-white dark:border-slate-700 shadow-md" alt="Avatar" />
                <button onClick={() => signOut(auth)} className="hidden md:block text-sm font-bold opacity-60 hover:opacity-100 transition">Logout</button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="px-8 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-bold shadow-2xl hover:shadow-blue-500/20 active:scale-95 transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </nav>

        {/* HERO SECTION */}
        <main className="max-w-6xl mx-auto py-16 px-6">
          
          {/* Back Navigation Button */}
          <button 
            onClick={() => window.history.back()}
            className="group flex items-center gap-3 mb-10 px-5 py-2.5 rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="font-bold text-sm">Go Back</span>
          </button>

          {/* Welcome Card */}
          <section className="relative p-12 md:p-20 rounded-[60px] bg-gradient-to-br from-white/90 to-white/40 dark:from-slate-800/80 dark:to-slate-800/30 backdrop-blur-3xl border border-white dark:border-slate-700 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
                Personalized Hub
              </span>
              <h2 className="text-6xl md:text-7xl font-black leading-tight tracking-tight">
                Hello, <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  {user ? user.displayName : "Guest Explorer"}
                </span> 👋
              </h2>
              <p className="mt-8 text-slate-500 dark:text-slate-400 text-xl md:text-2xl max-w-2xl leading-relaxed font-medium">
                {user 
                  ? "It's great to see you again. Your dashboard is updated with your latest activities." 
                  : "Welcome to Motigex. Sign in to unlock a world of personalized microelectronics and tech blogging."}
              </p>

              <div className="mt-12 flex flex-wrap gap-5">
                {user ? (
                  <>
                    <button className="px-10 py-5 bg-blue-600 text-white rounded-[24px] font-black shadow-xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all">
                      Create New Post
                    </button>
                    <button className="px-10 py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-[24px] font-black hover:bg-slate-50 transition-all shadow-sm">
                      View My Feed
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleLogin}
                    className="px-10 py-5 bg-slate-900 dark:bg-blue-600 text-white rounded-[24px] font-black shadow-2xl hover:scale-105 transition-all"
                  >
                    Get Started Now
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Featured Sections (Magicos Cards) */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {["Electronics", "Literature", "Gaming"].map((item) => (
              <div key={item} className="p-8 rounded-[40px] bg-white/50 dark:bg-slate-800/50 border border-white dark:border-slate-700 hover:shadow-xl transition-all cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                   <span className="text-blue-600">✨</span>
                </div>
                <h4 className="font-bold text-lg">{item}</h4>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
