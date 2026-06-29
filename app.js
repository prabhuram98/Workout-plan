:root{
  --bg:#f2f2f7;
  --card:#fff;
  --text:#111;
  --muted:#8e8e93;
  --blue:#007aff;
  --radius:18px;
}

body{
  margin:0;
  font-family:-apple-system, BlinkMacSystemFont, "Inter", sans-serif;
  background:var(--bg);
  color:var(--text);
}

/* SCREEN SYSTEM */
.screen{
  display:none;
  padding:20px;
  min-height:100vh;
}

.screen.active{
  display:block;
}

/* HOME */
.title{
  font-size:28px;
  font-weight:800;
  margin-bottom:20px;
}

.grid{
  display:grid;
  gap:14px;
}

.card{
  background:var(--card);
  padding:28px;
  border-radius:var(--radius);
  font-size:18px;
  font-weight:600;
  box-shadow:0 6px 20px rgba(0,0,0,0.06);
  cursor:pointer;
}

/* FOOTER */
.footer{
  text-align:center;
  margin-top:30px;
  font-size:12px;
  color:var(--muted);
}

/* TOPBAR */
.topbar{
  display:flex;
  align-items:center;
  gap:10px;
  margin-bottom:20px;
}

.topbar button{
  border:none;
  background:#fff;
  padding:10px 14px;
  border-radius:12px;
}

/* PROGRESS BAR */
.progressBar{
  height:6px;
  background:#e5e5ea;
  border-radius:10px;
  margin-bottom:20px;
}

.fill{
  width:40%;
  height:100%;
  background:var(--blue);
  border-radius:10px;
}

/* EXERCISE CARD */
.exerciseCard{
  background:var(--card);
  padding:16px;
  border-radius:14px;
  margin-bottom:12px;
  box-shadow:0 4px 14px rgba(0,0,0,0.05);
  display:flex;
  justify-content:space-between;
}

/* BUTTON */
.primary{
  width:100%;
  padding:14px;
  border:none;
  border-radius:14px;
  background:var(--blue);
  color:white;
  font-weight:600;
  margin-top:20px;
}

/* STATS */
.statCard{
  background:var(--card);
  padding:18px;
  border-radius:14px;
  margin-bottom:12px;
}