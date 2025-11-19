"use client";

import React, { useState, useEffect } from "react";
import { useContact } from "./ContactContext";

export default function ContactModal() {
  const { isContactOpen, closeContact, subject } = useContact();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", subject: subject || "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setForm(f => ({ ...f, subject: subject || "" }));
  }, [subject]);

  useEffect(() => {
    if (isContactOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isContactOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);
    setErrorMsg("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "提交失败");
      }

      setSubmitStatus("success");
      setForm({ name: "", email: "", phone: "", company: "", subject: subject || "", message: "" });
      setTimeout(() => closeContact(), 2000);
    } catch (err: any) {
      setSubmitStatus("error");
      setErrorMsg(err.message || "网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  if (!isContactOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={closeContact} />

      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">在线咨询</h3>
            <button onClick={closeContact} className="text-gray-500 hover:text-gray-800">关闭</button>
          </div>

          {submitStatus === "success" && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded text-green-800">
              ✓ 感谢您的咨询！我们的客服将在工作时间内尽快联系您。
            </div>
          )}

          {submitStatus === "error" && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-800">
              ✗ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" value={form.name} onChange={handleChange} required placeholder="姓名" className="p-2 border rounded" disabled={loading} />
              <input name="email" value={form.email} onChange={handleChange} required placeholder="邮箱" className="p-2 border rounded" disabled={loading} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="phone" value={form.phone} onChange={handleChange} required placeholder="电话" className="p-2 border rounded" disabled={loading} />
              <input name="company" value={form.company} onChange={handleChange} placeholder="公司名称" className="p-2 border rounded" disabled={loading} />
            </div>

            <select name="subject" value={form.subject} onChange={handleChange} className="p-2 border rounded w-full" disabled={loading}>
              <option value="">选择主题（可选）</option>
              <option value="海运咨询">海运咨询</option>
              <option value="空运咨询">空运咨询</option>
              <option value="陆运咨询">陆运咨询</option>
              <option value="报关清关">报关清关</option>
              <option value="危险品运输">危险品运输</option>
            </select>

            <textarea name="message" value={form.message} onChange={handleChange} rows={4} required placeholder="请描述您的需求" className="p-2 border rounded w-full" disabled={loading} />

            <div className="flex justify-end gap-3">
              <button type="button" onClick={closeContact} className="px-4 py-2 border rounded" disabled={loading}>取消</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50" disabled={loading}>
                {loading ? "提交中..." : "提交咨询"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
