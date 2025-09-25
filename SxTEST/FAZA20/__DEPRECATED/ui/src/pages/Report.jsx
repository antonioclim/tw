import React, { useEffect, useState } from "react";

const toCSV = rows => {
  const header=["lessonId","title","lang","duration","avgScore"];
  const esc = v => "\"" + String(v).replaceAll("\"","\"\"") + "\"";
  return "\\ufeff" + header.join(",") + "\\n" + rows.map(r=> header.map(h=>esc(r[h])).join(",")).join("\\n");
};
const toExcelXML = rows => {
  const cells=r=>`<Cell><Data ss:Type='Number'>${r.lessonId}</Data></Cell><Cell><Data ss:Type='String'>${r.title}</Data></Cell><Cell><Data ss:Type='String'>${r.lang}</Data></Cell><Cell><Data ss:Type='Number'>${r.duration}</Data></Cell><Cell><Data ss:Type='Number'>${r.avgScore}</Data></Cell>`;
  const Row=r=>`<Row>${cells(r)}</Row>`; const rowsXML=rows.map(Row).join('');
  return `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="Report"><Table><Row><Cell><Data ss:Type="String">lessonId</Data></Cell><Cell><Data ss:Type="String">title</Data></Cell><Cell><Data ss:Type="String">lang</Data></Cell><Cell><Data ss:Type="String">duration</Data></Cell><Cell><Data ss:Type="String">avgScore</Data></Cell></Row>${rowsXML}</Table></Worksheet></Workbook>`;
};
const dl=(name,text,mime='text/plain;charset=utf-8')=>{const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([text],{type:mime})); a.download=name; a.click(); URL.revokeObjectURL(a.href)};

function aggregate(lessons, progress){
  const by=new Map();
  for(const p of progress){
    const l = lessons.find(x=>x.id===p.lessonId); if(!l) continue;
    const rec = by.get(l.id) || { lessonId:l.id, title:l.title, lang:l.lang, duration:l.duration, scores:[] };
    rec.scores.push(p.score); by.set(l.id, rec);
  }
  const rows=[...by.values()].map(r=>({...r, avgScore: Math.round((r.scores.reduce((a,b)=>a+b,0)/r.scores.length)||0)}));
  const totalDuration = rows.reduce((a,b)=>a+b.duration,0);
  return { rows, totalDuration };
}

export default function Report(){
  const [lessons,setLessons]=useState([]);
  const [progress] = useState([{user:"u1",lessonId:1,score:80},{user:"u1",lessonId:2,score:60},{user:"u2",lessonId:1,score:90}]);
  const [q,setQ]=useState(""); const [lang,setLang]=useState(""); const [min,setMin]=useState(0);
  const [sort,setSort]=useState({key:"title",dir:"asc"}); const [page,setPage]=useState(1); const [per,setPer]=useState(20);

  useEffect(()=>{ (async()=>{
    try{
      const rc=await fetch("/api/courses"); if(!rc.ok) throw 0;
      const courses=await rc.json(); const res=[];
      for(const c of courses){ const r=await fetch(`/api/courses/${c.id}/lessons`); if(r.ok){ const ls=await r.json(); for(const l of ls) res.push({id:l.id,title:l.title,lang:l.lang,duration:l.duration}) } }
      setLessons(res);
    }catch{ setLessons([]); }
  })() },[]);

  const ag = aggregate(lessons, progress);
  const filtered = ag.rows.filter(r => (!q || (r.title+' '+r.lang).toLowerCase().includes(q.toLowerCase())) && (!lang || r.lang===lang) && (r.avgScore>=min));
  const sorted = [...filtered].sort((a,b)=> a[sort.key]<b[sort.key]?-1:a[sort.key]>b[sort.key]?1:0); const rows = sort.dir==="asc"?sorted:sorted.reverse();
  const pages = Math.max(1, Math.ceil(rows.length / per)); const pageRows = rows.slice((page-1)*per, (page-1)*per+per);

  function exportPDF(){
    const tableHTML = document.getElementById('rptTbl')?.outerHTML || '';
    const style = `<style>body{font-family:system-ui;color:#111;margin:1rem}table{border-collapse:collapse;width:100%}th,td{border:1px solid #999;padding:6px 8px}</style>`;
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>MiniLearn Report</title>${style}</head><body>${tableHTML}</body></html>`;
    let w=null; try{ w=window.open('','_blank','noopener,noreferrer,width=1024,height=768') }catch{}
    if(w && w.document){ w.document.open(); w.document.write(html); w.document.close(); w.focus(); setTimeout(()=> w.print(), 250); return; }
    const iframe=document.createElement('iframe'); iframe.style.width='0'; iframe.style.height='0'; document.body.appendChild(iframe);
    const doc=iframe.contentDocument||iframe.contentWindow.document; doc.open(); doc.write(html); doc.close(); setTimeout(()=>{ doc.defaultView.print(); document.body.removeChild(iframe) },300);
  }

  // grafic minimal donut + stacked
  const donut = (()=> {
    const W=240,H=160,cx=120,cy=80,R=60,r=35;
    const sum = rows.length || 1;
    const parts = Object.entries(rows.reduce((m,r)=> (m[r.lang]=(m[r.lang]||0)+1, m), {}));
    let start=0, arcs=''; const colors={ro:"#7aa2f7", en:"#a6e3a1", other:"#f38ba8"};
    for(const [lg,ct] of parts){
      const frac=ct/sum, end=start+frac*2*Math.PI;
      const x0=cx+R*Math.cos(start), y0=cy+R*Math.sin(start);
      const x1=cx+R*Math.cos(end),   y1=cy+R*Math.sin(end);
      arcs += \`<path d="M ${cx} ${cy} L ${x0} ${y0} A ${R} ${R} 0 \${(end-start)>Math.PI?1:0} 1 ${x1} ${y1} Z" fill="\${colors[lg]||colors.other}" opacity="0.85"></path>\`;
      start=end;
    }
    return \`<svg viewBox="0 0 \${W} \${H}" width="100%" height="100%"><circle cx="\${cx}" cy="\${cy}" r="\${r}" fill="#fff0"/>\${arcs}</svg>\`;
  })();

  const stacked = (()=> {
    const W=500,H=160,pad=20,bw=Math.max(10,Math.floor((W-2*pad)/Math.max(1,rows.length)));
    const maxD=Math.max(1,...rows.map(r=>r.duration)), maxS=100;
    const bars=rows.map((r,i)=>{ const dH=Math.round((r.duration/maxD)*(H-2*pad)), sH=Math.round((r.avgScore/maxS)*(H-2*pad));
      const x=pad+i*bw, yD=H-pad-dH, yS=yD-sH;
      return \`<rect x="\${x}" y="\${yD}" width="\${bw-2}" height="\${dH}" fill="#89b4fa"></rect>
              <rect x="\${x}" y="\${yS}" width="\${bw-2}" height="\${sH}" fill="#94e2d5" opacity="0.85"></rect>\`;
    }).join('');
    return \`<svg viewBox="0 0 \${W} \${H}" width="100%" height="100%">\${bars}</svg>\`;
  })();

  return <div className="card">
    <h2>Raport</h2>
    <div className="controls">
      <input placeholder="CautÄƒ..." value={q} onChange={e=>{setQ(e.target.value); setPage(1)}}/>
      <select value={lang} onChange={e=>{setLang(e.target.value); setPage(1)}}><option value="">(toate)</option><option>ro</option><option>en</option></select>
      <label>Scor minim: <input type="number" min="0" max="100" value={min} onChange={e=>{setMin(Number(e.target.value)||0); setPage(1)}} style={{width:"5rem"}}/></label>
      <label>Per paginÄƒ: <select value={per} onChange={e=>{setPer(Number(e.target.value)); setPage(1)}}><option>10</option><option>20</option><option>50</option></select></label>
    </div>

    <table id="rptTbl">
      <thead><tr>
        <th onClick={()=>setSort({key:"title",   dir:sort.key==="title"   &&sort.dir==="asc"?"desc":"asc"})}>Title</th>
        <th onClick={()=>setSort({key:"lang",    dir:sort.key==="lang"    &&sort.dir==="asc"?"desc":"asc"})}>Lang</th>
        <th onClick={()=>setSort({key:"duration",dir:sort.key==="duration"&&sort.dir==="asc"?"desc":"asc"})}>Duration</th>
        <th onClick={()=>setSort({key:"avgScore",dir:sort.key==="avgScore"&&sort.dir==="asc"?"desc":"asc"})}>Avg</th>
      </tr></thead>
      <tbody>{pageRows.map(r=> <tr key={r.lessonId}><td>{r.title}</td><td>{r.lang}</td><td>{r.duration}</td><td>{r.avgScore}</td></tr>)}</tbody>
    </table>

    <div className="controls"><button onClick={()=> setPage(p=> Math.max(1,p-1))}>Prev</button><span> Pagina {page}/{pages} </span><button onClick={()=> setPage(p=> Math.min(pages,p+1))}>Next</button></div>
    <div className="controls">
      <button onClick={()=> dl("report.csv", toCSV(rows))}>Export CSV</button>
      <button onClick={()=> dl("report.xls", toExcelXML(rows), "application/vnd.ms-excel")}>Export Excel</button>
      <button onClick={exportPDF}>Export PDF</button>
    </div>

    <div className="controls"><span className="hint">Grafice:</span></div>
    <div className="controls">
      <div className="chart" dangerouslySetInnerHTML={{__html: donut}}></div>
      <div className="chart" dangerouslySetInnerHTML={{__html: stacked}}></div>
    </div>
  </div>;
}
