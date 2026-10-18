import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Lock,
  Unlock,
  ShieldCheck,
  Search,
  Download,
  Trash2,
  Phone,
  Mail,
  Building,
  Tag,
  CheckCircle2,
  RefreshCw,
  Eye,
  MessageCircle,
  ExternalLink,
  Users,
  Calendar,
  Sparkles,
  KeyRound,
  Filter
} from "lucide-react";
import { useAuth, B2BMember } from "../context/AuthContext";
import { getWhatsAppUrl } from "./WhatsAppChatWidget";

const DEFAULT_ADMIN_PINS = ["admin786", "trywears@2026", "trywears786", "admin2026", "786", "admin", "trywear", "trywears", "1234", "8824"];

export const AdminLeadsModal: React.FC = () => {
  const { isAdminModalOpen, closeAdminModal } = useAuth();

  const [isPinVerified, setIsPinVerified] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string | null>(null);

  const [leads, setLeads] = useState<B2BMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterInterest, setFilterInterest] = useState<string>("all");
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  }, []);

  // Fetch leads from server or localStorage fallback
  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    let loadedLeads: B2BMember[] = [];

    // 1. Try server fetch with admin pin
    try {
      const res = await fetch(`/api/leads?pin=${encodeURIComponent(pinInput || "admin786")}`);
      if (res.ok) {
        const data = await res.json();
        if (data.leads && Array.isArray(data.leads)) {
          loadedLeads = data.leads;
        }
      }
    } catch (err) {
      console.warn("Could not fetch leads from server, checking local backup:", err);
    }

    // 2. Also check local client storage backup
    try {
      const localStored = localStorage.getItem("trywears_b2b_all_leads");
      if (localStored) {
        const parsed = JSON.parse(localStored);
        if (Array.isArray(parsed)) {
          // Merge unique by email or id
          const existingIds = new Set(loadedLeads.map((l) => l.id || l.email));
          parsed.forEach((pl) => {
            if (!existingIds.has(pl.id || pl.email)) {
              loadedLeads.push(pl);
            }
          });
        }
      }
    } catch (e) {
      console.warn("Could not read local leads backup:", e);
    }

    // Sort newest first
    loadedLeads.sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime());
    setLeads(loadedLeads);
    setIsLoading(false);
  }, [pinInput]);

  useEffect(() => {
    if (isAdminModalOpen && isPinVerified) {
      fetchLeads();
    }
  }, [isAdminModalOpen, isPinVerified, fetchLeads]);

  if (!isAdminModalOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(null);
    if (!pinInput.trim()) {
      setPinError("Please enter your Admin Access PIN.");
      return;
    }

    if (DEFAULT_ADMIN_PINS.includes(pinInput.trim())) {
      setIsPinVerified(true);
      setPinError(null);
      fetchLeads();
      showToast("Admin access authorized. Welcome.");
    } else {
      setPinError("Incorrect PIN. Access denied.");
    }
  };

  const handleDeleteLead = async (id?: string, email?: string) => {
    if (!window.confirm("Are you sure you want to delete this buyer lead record?")) return;

    if (id) {
      try {
        await fetch(`/api/leads/${id}?pin=${encodeURIComponent(pinInput || "admin786")}`, {
          method: "DELETE"
        });
      } catch (e) {
        console.warn("Server lead delete error:", e);
      }
    }

    // Update local state and localStorage
    const updated = leads.filter((l) => (id ? l.id !== id : l.email !== email));
    setLeads(updated);
    try {
      localStorage.setItem("trywears_b2b_all_leads", JSON.stringify(updated));
    } catch (e) {}

    showToast("Lead removed successfully.");
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("No leads available to export.");
      return;
    }

    const headers = [
      "ID",
      "Full Name",
      "Phone / WhatsApp",
      "Email Address",
      "Company / Brand",
      "Products of Interest",
      "Estimated Order Volume",
      "Date Registered"
    ];

    const rows = leads.map((l) => [
      `"${l.id || ""}"`,
      `"${(l.name || "").replace(/"/g, '""')}"`,
      `"${(l.phone || "").replace(/"/g, '""')}"`,
      `"${(l.email || "").replace(/"/g, '""')}"`,
      `"${(l.company || "").replace(/"/g, '""')}"`,
      `"${(l.interests || []).join(" | ").replace(/"/g, '""')}"`,
      `"${(l.orderVolume || "").replace(/"/g, '""')}"`,
      `"${new Date(l.joinedAt).toLocaleString()}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `trywears_b2b_buyer_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast("CSV export downloaded successfully!");
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.phone.toLowerCase().includes(q) ||
      (lead.company && lead.company.toLowerCase().includes(q)) ||
      (lead.interests && lead.interests.some((i) => i.toLowerCase().includes(q)));

    const matchInterest =
      filterInterest === "all" ||
      (lead.interests && lead.interests.some((i) => i.toLowerCase().includes(filterInterest.toLowerCase())));

    return matchSearch && matchInterest;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAdminModal}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl bg-[#080c16] border-2 border-red-500/50 rounded-3xl shadow-[0_25px_90px_rgba(0,0,0,0.98)] overflow-hidden z-10 my-auto text-white"
        >
          {/* Top Bar */}
          <div className="px-5 sm:px-8 py-4 bg-[#0d1322] border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-600/20 border border-red-500/60 flex items-center justify-center text-red-500">
                <Lock className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-black text-sm uppercase tracking-wider text-white">
                    TRY WEARS · B2B BUYER LEADS VAULT
                  </h3>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-red-950/80 text-red-300 font-bold border border-red-800">
                    CONFIDENTIAL
                  </span>
                </div>
                <p className="text-[10px] font-mono text-neutral-400">
                  Private factory database · Accessible exclusively by authorized administrators
                </p>
              </div>
            </div>

            <button
              onClick={closeAdminModal}
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              title="Close Admin Vault"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Toast */}
          {notification && (
            <div className="bg-emerald-600 text-white font-mono text-xs px-4 py-2 flex items-center gap-2 border-b border-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{notification}</span>
            </div>
          )}

          {/* If PIN is NOT verified yet, show PIN prompt */}
          {!isPinVerified ? (
            <div className="p-8 sm:p-12 max-w-md mx-auto text-center space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-red-600/20 border-2 border-red-500/60 flex items-center justify-center text-red-500 mx-auto shadow-2xl shadow-red-950/60">
                <KeyRound className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-display font-black text-xl uppercase tracking-tight text-white">
                  ENTER AUTHORIZATION PIN
                </h4>
                <p className="font-mono text-xs text-neutral-400 mt-1">
                  This portal is strictly confidential. Enter the admin PIN to access registered customer signups.
                </p>
              </div>

              <form onSubmit={handleVerifyPin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    autoFocus
                    placeholder="Enter Admin PIN (e.g. admin786)"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#0e1628] border border-neutral-700 text-white font-mono text-center tracking-widest text-sm focus:outline-none focus:border-red-500 transition"
                  />
                  {pinError && (
                    <p className="text-red-400 font-mono text-xs mt-1.5">{pinError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#E21D1D] hover:bg-red-600 text-white font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950/60 transition cursor-pointer"
                >
                  <Unlock className="w-4 h-4" />
                  <span>AUTHORIZE &amp; VIEW LEADS</span>
                </button>
              </form>

              <div className="pt-2 text-[10px] font-mono text-neutral-500">
                Default PIN: <code className="text-neutral-400">admin786</code> or <code className="text-neutral-400">trywears@2026</code>
              </div>
            </div>
          ) : (
            /* Unlocked Admin Leads Dashboard */
            <div className="p-5 sm:p-7 space-y-5 max-h-[78vh] overflow-y-auto">
              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div className="p-3.5 rounded-2xl bg-[#0d1424] border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Total Signups</span>
                  <span className="text-2xl font-display font-black text-white">{leads.length}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0d1424] border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">WhatsApp Leads</span>
                  <span className="text-2xl font-display font-black text-emerald-400">
                    {leads.filter((l) => l.phone).length}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0d1424] border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Verified Emails</span>
                  <span className="text-2xl font-display font-black text-sky-400">
                    {leads.filter((l) => l.email).length}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0d1424] border border-neutral-800">
                  <span className="text-[10px] text-neutral-400 block uppercase">Brand Founders</span>
                  <span className="text-2xl font-display font-black text-amber-400">
                    {leads.filter((l) => l.company).length}
                  </span>
                </div>
              </div>

              {/* Controls & Search Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
                {/* Search Bar */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, email, phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0e1628] border border-neutral-700 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter and Export buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <select
                    value={filterInterest}
                    onChange={(e) => setFilterInterest(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[#0e1628] border border-neutral-700 text-xs text-neutral-300 font-mono focus:outline-none"
                  >
                    <option value="all">All Product Interests</option>
                    <option value="sports">Sports Wears</option>
                    <option value="gym">Gym & Fitness</option>
                    <option value="street">Streetwear</option>
                    <option value="jackets">Jackets</option>
                    <option value="combat">Combat Gear</option>
                    <option value="custom">Custom OEM</option>
                  </select>

                  <button
                    onClick={fetchLeads}
                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 cursor-pointer"
                    title="Refresh list"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                  </button>

                  <button
                    onClick={handleExportCSV}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer"
                    title="Download complete database as CSV"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>DOWNLOAD CSV</span>
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-[#090d18]">
                {filteredLeads.length === 0 ? (
                  <div className="p-12 text-center text-neutral-400 font-mono text-xs space-y-2">
                    <Users className="w-8 h-8 text-neutral-600 mx-auto" />
                    <p className="text-white font-bold">No buyer signups match the criteria.</p>
                    <p className="text-[11px] text-neutral-500">
                      When users sign up through the website's free unlock modal, their complete details will appear here in real-time.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono text-xs">
                      <thead className="bg-[#0e1628] text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                        <tr>
                          <th className="py-3 px-4">Date &amp; Time</th>
                          <th className="py-3 px-4">Buyer Name &amp; Brand</th>
                          <th className="py-3 px-4">Direct Contact</th>
                          <th className="py-3 px-4">Products of Interest</th>
                          <th className="py-3 px-4">Est. Volume</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/80">
                        {filteredLeads.map((lead) => {
                          const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
                          const waUrl = cleanPhone
                            ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                `Hi ${lead.name}, thank you for registering on Try Wears! We saw you're interested in ${
                                  (lead.interests || []).join(", ") || "custom sportswear"
                                }. How can our factory assist your brand?`
                              )}`
                            : "";

                          return (
                            <tr key={lead.id || lead.email} className="hover:bg-neutral-800/40 transition">
                              {/* Date */}
                              <td className="py-3 px-4 text-neutral-400 text-[11px] whitespace-nowrap">
                                <div className="flex items-center gap-1.5">
                                  <Calendar className="w-3 h-3 text-neutral-500 shrink-0" />
                                  <span>{new Date(lead.joinedAt).toLocaleDateString()}</span>
                                </div>
                                <span className="text-[9px] text-neutral-500 block">
                                  {new Date(lead.joinedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </td>

                              {/* Buyer Name & Brand */}
                              <td className="py-3 px-4 whitespace-nowrap">
                                <div className="font-bold text-white text-xs">{lead.name}</div>
                                {lead.company ? (
                                  <div className="text-[10px] text-amber-300 flex items-center gap-1 mt-0.5">
                                    <Building className="w-3 h-3 text-amber-400 shrink-0" />
                                    <span>{lead.company}</span>
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-neutral-500">Private Buyer</span>
                                )}
                              </td>

                              {/* Direct Contact (WhatsApp & Email) */}
                              <td className="py-3 px-4 whitespace-nowrap space-y-1">
                                {lead.phone && (
                                  <div className="flex items-center gap-2">
                                    <span className="text-neutral-300 text-xs font-mono">{lead.phone}</span>
                                    {waUrl && (
                                      <a
                                        href={waUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-2 py-0.5 rounded bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-[9px] font-bold uppercase transition flex items-center gap-1"
                                        title="Chat on WhatsApp"
                                      >
                                        <MessageCircle className="w-2.5 h-2.5" />
                                        <span>WhatsApp</span>
                                      </a>
                                    )}
                                  </div>
                                )}
                                <div className="flex items-center gap-2">
                                  <span className="text-neutral-400 text-[11px]">{lead.email}</span>
                                  <a
                                    href={`mailto:${lead.email}?subject=Try Wears Wholesale Inquiry - ${lead.name}`}
                                    className="text-[9px] text-sky-400 hover:underline flex items-center gap-0.5"
                                  >
                                    <Mail className="w-2.5 h-2.5" />
                                    <span>Mail</span>
                                  </a>
                                </div>
                              </td>

                              {/* Interests */}
                              <td className="py-3 px-4">
                                <div className="flex flex-wrap gap-1 max-w-xs">
                                  {(lead.interests || []).map((int, iIdx) => (
                                    <span
                                      key={iIdx}
                                      className="text-[9px] px-2 py-0.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-200"
                                    >
                                      {int}
                                    </span>
                                  ))}
                                </div>
                              </td>

                              {/* Order Volume */}
                              <td className="py-3 px-4 text-neutral-300 text-[11px] whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700 text-[10px]">
                                  {lead.orderVolume || "Not specified"}
                                </span>
                              </td>

                              {/* Action */}
                              <td className="py-3 px-4 text-right whitespace-nowrap">
                                <button
                                  onClick={() => handleDeleteLead(lead.id, lead.email)}
                                  className="p-1.5 rounded-lg bg-neutral-800/80 hover:bg-red-950 text-neutral-400 hover:text-red-400 transition cursor-pointer"
                                  title="Delete lead record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Bottom Instructions */}
              <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-400 pt-2 border-t border-neutral-800 gap-2">
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Hidden Admin Portal: press <strong>Ctrl+Shift+A</strong> or type <strong>#admin</strong> in URL to reopen.</span>
                </span>
                <button
                  onClick={closeAdminModal}
                  className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition cursor-pointer"
                >
                  Exit Admin Vault
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
