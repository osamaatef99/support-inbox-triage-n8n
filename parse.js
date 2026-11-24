const raw = $json.choices?.[0]?.message?.content ?? '';
const src = $('Normalize Email').item.json;
let out;
try { out = JSON.parse(raw); } catch (e) { out = null; }
const cats = ['billing','bug','sales','general'];
const urg = ['low','medium','high'];
if (!out || !out.reply) {
  return [{ json: { ...src, category: 'general', urgency: 'medium', summary: 'AI output unreadable, review manually', reply: '', ai_ok: false } }];
}
return [{ json: { ...src, category: cats.includes(out.category) ? out.category : 'general', urgency: urg.includes(out.urgency) ? out.urgency : 'medium', summary: String(out.summary || '').slice(0, 200), reply: String(out.reply), ai_ok: true } }];
