"use client";

import React, { useState } from "react";
import { Settings, Sparkles, Plus, Trash2, Save, Layers, Share2, Globe } from "lucide-react";
import { SiteSettings, Skill } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

interface AdminSettingsManagerProps {
  initialSettings: SiteSettings;
  initialSkills: Skill[];
}

export function AdminSettingsManager({
  initialSettings,
  initialSkills,
}: AdminSettingsManagerProps) {
  const [activeTab, setActiveTab] = useState<"settings" | "skills">("settings");
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isSavingSkills, setIsSavingSkills] = useState(false);

  // New Skill form state
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState<Skill["category"]>("frontend");
  const [newSkillProficiency, setNewSkillProficiency] = useState(90);
  const [newSkillDesc, setNewSkillDesc] = useState("");

  const { showToast } = useToast();

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل حفظ الإعدادات");

      setSettings(data.settings);
      showToast("تم حفظ إعدادات الموقع بنجاح!", "success");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) {
      showToast("يرجى كتابة اسم المهارة", "error");
      return;
    }

    const newSkill: Skill = {
      id: `sk-${Date.now()}`,
      name: newSkillName.trim(),
      category: newSkillCategory,
      proficiency: Number(newSkillProficiency),
      description: newSkillDesc.trim(),
      sortOrder: skills.length + 1,
    };

    setSkills([...skills, newSkill]);
    setNewSkillName("");
    setNewSkillDesc("");
    showToast("تمت إضافة المهارة، لا تنسَ الضغط على 'حفظ قائمة المهارات'", "info");
  };

  const handleDeleteSkill = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const handleSaveSkills = async () => {
    setIsSavingSkills(true);
    try {
      const res = await fetch("/api/admin/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skills),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل حفظ المهارات");

      setSkills(data.skills);
      showToast("تم حفظ قائمة المهارات بنجاح!", "success");
    } catch (err: any) {
      showToast(err.message, "error");
    } finally {
      setIsSavingSkills(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white mb-1">الإعدادات والمهارات</h1>
        <p className="text-xs text-zinc-400">
          تخصيص نصوص الموقع، الروابط الاجتماعية، وقائمة المهارات المعروضة
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "settings"
              ? "bg-batta-yellow text-zinc-950 shadow-yellow-sm"
              : "bg-white/[0.04] text-zinc-400 hover:text-white"
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>إعدادات الموقع والهوية</span>
        </button>

        <button
          onClick={() => setActiveTab("skills")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === "skills"
              ? "bg-batta-yellow text-zinc-950 shadow-yellow-sm"
              : "bg-white/[0.04] text-zinc-400 hover:text-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>إدارة المهارات ({skills.length})</span>
        </button>
      </div>

      {/* Tab 1: Site Settings Form */}
      {activeTab === "settings" && (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          {/* Identity & Hero Texts */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Sparkles className="w-4 h-4 text-batta-yellow" />
              <span>هوية الموقع وقسم البداية (Hero)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  اسم الموقع
                </label>
                <input
                  type="text"
                  required
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  مسار اللوجو
                </label>
                <input
                  type="text"
                  required
                  value={settings.logoUrl}
                  onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-batta-yellow/60"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  شارة الترحيب (Badge)
                </label>
                <input
                  type="text"
                  required
                  value={settings.heroBadge}
                  onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  العنوان الرئيسي (Hero Title)
                </label>
                <input
                  type="text"
                  required
                  value={settings.heroTitle}
                  onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                الوصف التعريفي (Hero Subtitle)
              </label>
              <input
                type="text"
                required
                value={settings.heroSubtitle}
                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Share2 className="w-4 h-4 text-batta-yellow" />
              <span>قنوات التواصل والحسابات الاجتماعية</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  رابط فيسبوك (Facebook URL)
                </label>
                <input
                  type="url"
                  required
                  value={settings.facebookUrl}
                  onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-batta-yellow/60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  البريد الإلكتروني للتواصل
                </label>
                <input
                  type="email"
                  placeholder="contact@omar.dev"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-batta-yellow/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                نص التذييل (Footer Copyright)
              </label>
              <input
                type="text"
                required
                value={settings.footerText}
                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60"
              />
            </div>
          </div>

          {/* About texts */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <span>نصوص قسم عني (About)</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">من أنا</label>
                <textarea
                  rows={2}
                  value={settings.aboutWho}
                  onChange={(e) => setSettings({ ...settings, aboutWho: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">ماذا أتعلم</label>
                <textarea
                  rows={2}
                  value={settings.aboutLearning}
                  onChange={(e) => setSettings({ ...settings, aboutLearning: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">ماذا أبني</label>
                <textarea
                  rows={2}
                  value={settings.aboutBuilding}
                  onChange={(e) => setSettings({ ...settings, aboutBuilding: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">اهتماماتي</label>
                <textarea
                  rows={2}
                  value={settings.aboutInterests}
                  onChange={(e) => setSettings({ ...settings, aboutInterests: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">هدفي</label>
                <textarea
                  rows={2}
                  value={settings.aboutGoal}
                  onChange={(e) => setSettings({ ...settings, aboutGoal: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-batta-yellow/60 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" isLoading={isSavingSettings} rightIcon={<Save className="w-4 h-4" />}>
              حفظ جميع الإعدادات
            </Button>
          </div>
        </form>
      )}

      {/* Tab 2: Skills Editor */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          {/* Add Skill Box */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-batta-yellow" />
              <span>إضافة مهارة جديدة للقائمة</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">اسم المهارة</label>
                <input
                  type="text"
                  placeholder="مثال: Next.js"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-batta-yellow/60"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">التصنيف</label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-batta-yellow/60"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="tools">Tools & DevOps</option>
                  <option value="ai">AI</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">المستوى ({newSkillProficiency}%)</label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={newSkillProficiency}
                  onChange={(e) => setNewSkillProficiency(Number(e.target.value))}
                  className="w-full mt-2 accent-batta-yellow"
                />
              </div>

              <div className="flex items-end">
                <Button
                  type="button"
                  onClick={handleAddSkill}
                  size="sm"
                  className="w-full"
                  rightIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  إضافة
                </Button>
              </div>
            </div>
          </div>

          {/* Current Skills List */}
          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-white">المهارات الحالية المعروضة</span>
              <Button
                onClick={handleSaveSkills}
                isLoading={isSavingSkills}
                size="sm"
                rightIcon={<Save className="w-3.5 h-3.5" />}
              >
                حفظ قائمة المهارات
              </Button>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {skills.map((s, idx) => (
                <div
                  key={s.id}
                  className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-xs font-mono text-zinc-400">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{s.name}</h4>
                      <span className="text-xs text-zinc-400 uppercase font-mono">
                        {s.category} • {s.proficiency}%
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteSkill(s.id)}
                    className="p-2 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="حذف المهارة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}